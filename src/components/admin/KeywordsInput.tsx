import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface KeywordsInputProps {
  value: string[];
  onChange: (keywords: string[]) => void;
}

export function KeywordsInput({ value, onChange }: KeywordsInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword();
    }
  };

  const addKeyword = () => {
    const keyword = inputValue.trim().toLowerCase();
    if (keyword && !value.includes(keyword)) {
      onChange([...value, keyword]);
    }
    setInputValue('');
  };

  const removeKeyword = (keyword: string) => {
    onChange(value.filter(k => k !== keyword));
  };

  return (
    <div className="space-y-2">
      <Label>Mots-clés</Label>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addKeyword}
        placeholder="Tapez un mot-clé et appuyez sur Entrée..."
      />
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((keyword) => (
            <Badge key={keyword} variant="secondary" className="gap-1">
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(keyword)}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Ajoutez au moins 3 mots-clés pour un bon référencement
      </p>
    </div>
  );
}
