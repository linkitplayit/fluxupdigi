'use client';

import { useState } from 'react';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { Card } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Button } from '@/src/components/ui/Button';
import { createClient } from '@/src/lib/supabase/client';

export default function CollaborationPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await supabase.from('collaboration_requests').insert([formData]);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12" data-testid="collaboration-page">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-4">Partner With Us</h1>
          <p className="text-gray-400 text-center mb-8">Let's grow together. Fill out the form below to start a collaboration.</p>
          
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                data-testid="collab-name-input"
              />
              <Input
                type="email"
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                data-testid="collab-email-input"
              />
              <Textarea
                label="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                data-testid="collab-message-input"
              />
              <Button type="submit" className="w-full" disabled={loading} data-testid="collab-submit-btn">
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
              {success && (
                <p className="text-green-400 text-center" data-testid="collab-success-message">Thank you! We'll get back to you soon.</p>
              )}
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
