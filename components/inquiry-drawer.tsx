'use client';

import { useState } from 'react';
import { Database } from '@/lib/supabase/types';
import { supabase } from '@/lib/supabase/client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

type Artwork = Database['public']['Tables']['artworks']['Row'];
type Edition = Database['public']['Tables']['editions']['Row'];
type InquiryInsert = Database['public']['Tables']['inquiries']['Insert'];

interface InquiryDrawerProps {
  artwork: Artwork;
  edition: Edition | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InquiryDrawer({
  artwork,
  edition,
  open,
  onOpenChange,
}: InquiryDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await (supabase.from('inquiries').insert as any)([
        {
          artwork_id: artwork.id,
          edition_id: edition?.id || null,
          name: formData.name,
          email: formData.email,
          country: formData.country || null,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      toast.success('Inquiry submitted successfully!');
      onOpenChange(false);
      setFormData({ name: '', email: '', country: '', message: '' });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Inquire About This Artwork</SheetTitle>
          <SheetDescription>
            Fill out the form below and we'll get back to you as soon as
            possible.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">{artwork.title}</h3>
            {artwork.year && (
              <p className="text-sm text-muted-foreground">{artwork.year}</p>
            )}
            {edition && (
              <p className="mt-2 text-sm">
                Edition: <span className="font-medium">{edition.label}</span>
              </p>
            )}
            {artwork.price_cents && (
              <p className="mt-1 text-lg font-semibold">
                ${(artwork.price_cents / 100).toLocaleString()}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Please let us know if you have any questions or special requests..."
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Inquiry'
              )}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
