'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Dialog } from '@/src/components/ui/Dialog';
import { Game } from '@/src/types';
import { formatCurrency } from '@/src/lib/utils/helpers';

export default function AdminGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    referral_link: '',
    category: '',
    verified: true
  });
  
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchGames();
    
    // Real-time subscription
    const subscription = supabase
      .channel('games-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'games' }, (payload) => {
        console.log('Game change:', payload);
        fetchGames();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchGames = async () => {
    try {
      const { data } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadThumbnail = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('game-thumbnails')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('game-thumbnails')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let thumbnail_url = editingGame?.thumbnail_url;

      if (thumbnailFile) {
        thumbnail_url = await uploadThumbnail(thumbnailFile);
      }

      const gameData = {
        ...formData,
        thumbnail_url
      };

      if (editingGame) {
        await supabase
          .from('games')
          .update(gameData)
          .eq('id', editingGame.id);
      } else {
        await supabase.from('games').insert([gameData]);
      }

      setShowDialog(false);
      resetForm();
      fetchGames();
    } catch (error) {
      console.error('Error saving game:', error);
      alert('Error saving game');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this game?')) return;

    try {
      await supabase.from('games').delete().eq('id', id);
      fetchGames();
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const handleEdit = (game: Game) => {
    setEditingGame(game);
    setFormData({
      title: game.title,
      description: game.description,
      price: game.price,
      referral_link: game.referral_link,
      category: game.category,
      verified: game.verified
    });
    setShowDialog(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      referral_link: '',
      category: '',
      verified: true
    });
    setThumbnailFile(null);
    setEditingGame(null);
  };

  return (
    <div className="space-y-6" data-testid="admin-games-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Earn ₹500+ Management</h1>
          <p className="text-gray-400 mt-1">Manage earning games and referral links</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowDialog(true);
          }}
          data-testid="add-game-btn"
        >
          <Plus size={20} className="mr-2" />
          Add Game
        </Button>
      </div>

      {loading ? (
        <Card><p className="text-gray-400">Loading games...</p></Card>
      ) : games.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No games yet. Add your first game!</p>
            <Button onClick={() => setShowDialog(true)}>
              <Plus size={20} className="mr-2" />
              Add Game
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="relative group">
              {game.thumbnail_url && (
                <div className="w-full h-48 bg-dark-lighter rounded-lg mb-4 overflow-hidden">
                  <img
                    src={game.thumbnail_url}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{game.category}</p>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{game.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-secondary">{formatCurrency(game.price)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(game)}
                  className="flex-1"
                  data-testid={`edit-game-${game.id}`}
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(game.id)}
                  className="text-red-400 border-red-400 hover:bg-red-500/10"
                  data-testid={`delete-game-${game.id}`}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
          resetForm();
        }}
        title={editingGame ? 'Edit Game' : 'Add New Game'}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Game Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="BattleQuest"
            data-testid="game-title-input"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            placeholder="Game description..."
            data-testid="game-description-input"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Entry Fee (₹)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
              placeholder="399"
              data-testid="game-price-input"
            />

            <Input
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              placeholder="Battle, Crypto, Sports"
              data-testid="game-category-input"
            />
          </div>

          <Input
            label="Referral/Play Link"
            value={formData.referral_link}
            onChange={(e) => setFormData({ ...formData, referral_link: e.target.value })}
            required
            placeholder="https://game.com/ref=123"
            data-testid="game-link-input"
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Game Thumbnail
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                className="hidden"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="cursor-pointer px-4 py-2 bg-dark-lighter border border-primary/20 rounded-xl text-white hover:border-primary transition-all"
                data-testid="thumbnail-upload-btn"
              >
                <Upload size={16} className="inline mr-2" />
                Choose Thumbnail
              </label>
              {thumbnailFile && (
                <span className="text-sm text-gray-400">{thumbnailFile.name}</span>
              )}
              {editingGame?.thumbnail_url && !thumbnailFile && (
                <span className="text-sm text-green-400">Current thumbnail set</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="verified"
              checked={formData.verified}
              onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="verified" className="text-sm text-gray-300">
              Mark as Verified
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowDialog(false);
                resetForm();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={uploading}
              className="flex-1"
              data-testid="save-game-btn"
            >
              {uploading ? 'Uploading...' : editingGame ? 'Update Game' : 'Add Game'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}