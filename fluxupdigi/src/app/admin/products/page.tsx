'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Upload, X } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Select } from '@/src/components/ui/Select';
import { Dialog } from '@/src/components/ui/Dialog';
import { Product } from '@/src/types';
import { formatCurrency } from '@/src/lib/utils/helpers';
import { PRODUCT_CATEGORIES } from '@/src/lib/utils/constants';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: 'ai_tools',
    telegram_group_link: '',
    verified: true
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productFile, setProductFile] = useState<File | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File, bucket: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let image_url = editingProduct?.image_url;
      let file_url = editingProduct?.file_url;

      if (imageFile) {
        image_url = await uploadFile(imageFile, 'product-images');
      }

      if (productFile) {
        file_url = await uploadFile(productFile, 'course-pdfs');
      }

      const productData = {
        ...formData,
        image_url,
        file_url
      };

      if (editingProduct) {
        await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
      } else {
        await supabase.from('products').insert([productData]);
      }

      setShowDialog(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      telegram_group_link: product.telegram_group_link || '',
      verified: product.verified
    });
    setShowDialog(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      category: 'ai_tools',
      telegram_group_link: '',
      verified: true
    });
    setImageFile(null);
    setProductFile(null);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6" data-testid="admin-products-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Digital Store Management</h1>
          <p className="text-gray-400 mt-1">Manage your products, courses, and digital assets</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowDialog(true);
          }}
          data-testid="add-product-btn"
        >
          <Plus size={20} className="mr-2" />
          Add Product
        </Button>
      </div>

      {loading ? (
        <Card><p className="text-gray-400">Loading products...</p></Card>
      ) : products.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No products yet. Add your first product!</p>
            <Button onClick={() => setShowDialog(true)}>
              <Plus size={20} className="mr-2" />
              Add Product
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="relative group">
              {product.image_url && (
                <div className="w-full h-48 bg-dark-lighter rounded-lg mb-4 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</span>
                <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                  {PRODUCT_CATEGORIES.find(c => c.value === product.category)?.label}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(product)}
                  className="flex-1"
                  data-testid={`edit-product-${product.id}`}
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                  className="text-red-400 border-red-400 hover:bg-red-500/10"
                  data-testid={`delete-product-${product.id}`}
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
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="AI Toolkit Pro"
            data-testid="product-title-input"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            placeholder="Detailed product description..."
            data-testid="product-description-input"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₹)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
              placeholder="499"
              data-testid="product-price-input"
            />

            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              options={PRODUCT_CATEGORIES}
              data-testid="product-category-select"
            />
          </div>

          <Input
            label="Telegram Group Link (Optional)"
            value={formData.telegram_group_link}
            onChange={(e) => setFormData({ ...formData, telegram_group_link: e.target.value })}
            placeholder="https://t.me/your_group"
            data-testid="product-telegram-input"
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer px-4 py-2 bg-dark-lighter border border-primary/20 rounded-xl text-white hover:border-primary transition-all"
                data-testid="image-upload-btn"
              >
                <Upload size={16} className="inline mr-2" />
                Choose Image
              </label>
              {imageFile && (
                <span className="text-sm text-gray-400">{imageFile.name}</span>
              )}
              {editingProduct?.image_url && !imageFile && (
                <span className="text-sm text-green-400">Current image set</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product File (PDF/APK)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf,.apk"
                onChange={(e) => setProductFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer px-4 py-2 bg-dark-lighter border border-primary/20 rounded-xl text-white hover:border-primary transition-all"
                data-testid="file-upload-btn"
              >
                <Upload size={16} className="inline mr-2" />
                Choose File
              </label>
              {productFile && (
                <span className="text-sm text-gray-400">{productFile.name}</span>
              )}
              {editingProduct?.file_url && !productFile && (
                <span className="text-sm text-green-400">Current file set</span>
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
              data-testid="save-product-btn"
            >
              {uploading ? 'Uploading...' : editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
