'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const purposeOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'purchase', label: 'Purchase Inquiry' },
  { value: 'commission', label: 'Commission Request' },
  { value: 'exhibition', label: 'Exhibition Opportunity' },
  { value: 'wholesale', label: 'Wholesale Inquiry' },
  { value: 'media', label: 'Press & Media' },
];

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      toast.success('Message sent successfully! We\'ll be in touch soon.');
      setFormData({ name: '', email: '', purpose: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try emailing us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-card p-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose">Purpose *</Label>
        <Select
          value={formData.purpose}
          onValueChange={(value) =>
            setFormData({ ...formData, purpose: value })
          }
          disabled={loading}
          required
        >
          <SelectTrigger id="purpose">
            <SelectValue placeholder="Select inquiry type" />
          </SelectTrigger>
          <SelectContent>
            {purposeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          rows={8}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Tell us more about your inquiry..."
          required
          disabled={loading}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}
