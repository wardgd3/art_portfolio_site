'use client';

import { Database } from '@/lib/supabase/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Edition = Database['public']['Tables']['editions']['Row'];

interface EditionSelectorProps {
  editions: Edition[];
  selectedEdition: Edition | null;
  onSelect: (edition: Edition) => void;
}

export function EditionSelector({
  editions,
  selectedEdition,
  onSelect,
}: EditionSelectorProps) {
  return (
    <div className="space-y-4 rounded-lg border p-6">
      <h2 className="text-lg font-semibold">Select Edition</h2>
      <RadioGroup
        value={selectedEdition?.id}
        onValueChange={(value) => {
          const edition = editions.find((e) => e.id === value);
          if (edition) onSelect(edition);
        }}
      >
        <div className="space-y-3">
          {editions.map((edition) => (
            <div
              key={edition.id}
              className="flex items-center justify-between space-x-2 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value={edition.id} id={edition.id} />
                <Label
                  htmlFor={edition.id}
                  className="cursor-pointer font-normal"
                >
                  <div className="font-medium">{edition.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {edition.remaining} of {edition.edition_size} remaining
                  </div>
                </Label>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  ${(edition.price_cents / 100).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {edition.sku}
                </div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
