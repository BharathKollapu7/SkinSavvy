
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, Loader2 } from 'lucide-react';

interface SkinDetailsSectionProps {
  formData: {
    skin_type: string;
    skin_concerns: string[];
  };
  isUpdating: boolean;
  onInputChange: (field: string, value: string) => void;
  onSkinConcernChange: (concern: string, checked: boolean) => void;
  onSave: () => void;
}

const skinTypes = ['normal', 'oily', 'dry', 'combination', 'sensitive'];
const skinConcerns = [
  'tan',
  'acne', 
  'sensitivity',
  'dark_spots',
  'redness',
  'dryness',
  'aging',
  'pores',
  'hyperpigmentation',
  'blackheads_whiteheads'
];

const concernLabels: Record<string, string> = {
  'tan': 'Tan',
  'acne': 'Acne',
  'sensitivity': 'Sensitivity',
  'dark_spots': 'Dark Spots',
  'redness': 'Redness',
  'dryness': 'Dryness',
  'aging': 'Aging',
  'pores': 'Pores',
  'hyperpigmentation': 'Hyperpigmentation',
  'blackheads_whiteheads': 'Blackheads & Whiteheads'
};

const SkinDetailsSection: React.FC<SkinDetailsSectionProps> = ({
  formData,
  isUpdating,
  onInputChange,
  onSkinConcernChange,
  onSave
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Skin Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="skin_type">Skin Type</Label>
          <Select value={formData.skin_type} onValueChange={(value) => onInputChange('skin_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your skin type" />
            </SelectTrigger>
            <SelectContent>
              {skinTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Primary Skin Concerns</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {skinConcerns.map((concern) => (
              <div key={concern} className="flex items-center space-x-2">
                <Checkbox
                  id={concern}
                  checked={formData.skin_concerns.includes(concern)}
                  onCheckedChange={(checked) => onSkinConcernChange(concern, checked as boolean)}
                />
                <Label htmlFor={concern} className="text-sm">
                  {concernLabels[concern]}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Button onClick={onSave} disabled={isUpdating}>
          {isUpdating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Update Skin Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default SkinDetailsSection;
