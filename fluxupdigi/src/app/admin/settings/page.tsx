'use client';

import { useEffect, useState } from 'react';
import { Save, Power, PowerOff } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Settings } from '@/src/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
    
    // Real-time subscription
    const subscription = supabase
      .channel('settings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, (payload) => {
        console.log('Settings change:', payload);
        fetchSettings();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('settings')
        .select('*')
        .single();
      if (data) setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;
    setSaving(true);

    try {
      await supabase
        .from('settings')
        .update(settings)
        .eq('id', settings.id);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const toggleMaintenance = async () => {
    if (!settings) return;
    const newValue = !settings.maintenance_mode;
    
    const confirmMsg = newValue 
      ? 'Enable maintenance mode? Website will be inaccessible to users.'
      : 'Disable maintenance mode? Website will be live.';
    
    if (!confirm(confirmMsg)) return;

    try {
      await supabase
        .from('settings')
        .update({ maintenance_mode: newValue })
        .eq('id', settings.id);
      setSettings({ ...settings, maintenance_mode: newValue });
      alert(`Maintenance mode ${newValue ? 'enabled' : 'disabled'} successfully!`);
    } catch (error) {
      console.error('Error toggling maintenance:', error);
    }
  };

  const togglePaymentMode = async () => {
    if (!settings) return;
    const newMode = settings.payment_mode === 'manual' ? 'automatic' : 'manual';
    
    try {
      await supabase
        .from('settings')
        .update({ payment_mode: newMode })
        .eq('id', settings.id);
      setSettings({ ...settings, payment_mode: newMode });
      alert(`Payment mode switched to ${newMode}`);
    } catch (error) {
      console.error('Error toggling payment mode:', error);
    }
  };

  if (loading) {
    return <Card><p className="text-gray-400">Loading settings...</p></Card>;
  }

  if (!settings) {
    return <Card><p className="text-gray-400">No settings found</p></Card>;
  }

  return (
    <div className="space-y-6" data-testid="admin-settings-page">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Configure your site settings and preferences</p>
      </div>

      {/* Maintenance Mode - TOP PRIORITY */}
      <Card className="p-6 border-2 border-yellow-500/20">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          {settings.maintenance_mode ? <PowerOff className="text-yellow-500" /> : <Power className="text-green-500" />}
          Maintenance Mode Control
        </h2>
        <div className="flex items-center justify-between p-6 bg-dark-lighter rounded-xl">
          <div>
            <p className="text-white font-medium text-lg">
              {settings.maintenance_mode ? '⚠️ MAINTENANCE MODE ACTIVE' : '✅ Website is LIVE'}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {settings.maintenance_mode 
                ? 'Only admins can access the website. Users see maintenance page.' 
                : 'Website is accessible to all users.'}
            </p>
          </div>
          <Button
            onClick={toggleMaintenance}
            variant={settings.maintenance_mode ? 'outline' : 'primary'}
            className={settings.maintenance_mode 
              ? 'text-yellow-400 border-yellow-400 hover:bg-yellow-500/10' 
              : 'bg-green-600 hover:bg-green-700'}
            data-testid="toggle-maintenance"
          >
            {settings.maintenance_mode ? (
              <>
                <Power size={20} className="mr-2" />
                Turn OFF Maintenance
              </>
            ) : (
              <>
                <PowerOff size={20} className="mr-2" />
                Turn ON Maintenance
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Payment Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Payment Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-dark-lighter rounded-xl">
            <div>
              <p className="text-white font-medium">Payment Mode</p>
              <p className="text-gray-400 text-sm">
                Current: <span className="text-primary font-semibold">{settings.payment_mode.toUpperCase()}</span>
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {settings.payment_mode === 'manual' 
                  ? 'Users upload payment screenshot for approval' 
                  : 'Automatic payment via Razorpay'}
              </p>
            </div>
            <Button
              onClick={togglePaymentMode}
              data-testid="toggle-payment-mode"
            >
              Switch to {settings.payment_mode === 'manual' ? 'Automatic' : 'Manual'}
            </Button>
          </div>

          {settings.payment_mode === 'automatic' && (
            <>
              <Input
                label="Razorpay Key ID"
                value={settings.razorpay_key || ''}
                onChange={(e) => setSettings({ ...settings, razorpay_key: e.target.value })}
                placeholder="rzp_test_xxxxx"
                data-testid="razorpay-key-input"
              />

              <Input
                label="Razorpay Secret"
                type="password"
                value={settings.razorpay_secret || ''}
                onChange={(e) => setSettings({ ...settings, razorpay_secret: e.target.value })}
                placeholder="Enter secret key"
                data-testid="razorpay-secret-input"
              />
            </>
          )}
        </div>
      </Card>

      {/* Site Configuration */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Site Configuration</h2>
        <div className="space-y-4">
          <Input
            label="Telegram Support Username"
            value={settings.telegram_support}
            onChange={(e) => setSettings({ ...settings, telegram_support: e.target.value })}
            placeholder="@errorzxl"
            data-testid="telegram-support-input"
          />

          <Input
            label="Telegram Group Link"
            value={settings.telegram_group_link || ''}
            onChange={(e) => setSettings({ ...settings, telegram_group_link: e.target.value })}
            placeholder="https://t.me/your_group"
            data-testid="telegram-group-input"
          />

          <Input
            label="UPI ID (for manual payments)"
            value={settings.upi_id}
            onChange={(e) => setSettings({ ...settings, upi_id: e.target.value })}
            placeholder="rajakumar349030@oksbi"
            data-testid="upi-id-input"
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={saveSettings}
          disabled={saving}
          size="lg"
          data-testid="save-settings-btn"
        >
          <Save size={20} className="mr-2" />
          {saving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>
    </div>
  );
}