import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Key, Eye, EyeOff } from 'lucide-react';

interface SecuritySectionProps {
  passwordData: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  };
  setPasswordData: React.Dispatch<React.SetStateAction<{
    current_password: string;
    new_password: string;
    confirm_password: string;
  }>>;
  onPasswordChange: () => void;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({
  passwordData,
  setPasswordData,
  onPasswordChange
}) => {
  // State for toggling visibility of each password field
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Label htmlFor="current_password">Current Password</Label>
            <Input
              id="current_password"
              type={showCurrent ? "text" : "password"}
              value={passwordData.current_password}
              onChange={(e) => setPasswordData(prev => ({ ...prev, current_password: e.target.value }))}
              placeholder="Enter current password"
              autoComplete="current-password"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-700"
              onClick={() => setShowCurrent((prev) => !prev)}
              aria-label={showCurrent ? "Hide password" : "Show password"}
            >
              {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative">
            <Label htmlFor="new_password">New Password</Label>
            <Input
              id="new_password"
              type={showNew ? "text" : "password"}
              value={passwordData.new_password}
              onChange={(e) => setPasswordData(prev => ({ ...prev, new_password: e.target.value }))}
              placeholder="Enter new password"
              autoComplete="new-password"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-700"
              onClick={() => setShowNew((prev) => !prev)}
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              type={showConfirm ? "text" : "password"}
              value={passwordData.confirm_password}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirm_password: e.target.value }))}
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-700"
              onClick={() => setShowConfirm((prev) => !prev)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <Button onClick={onPasswordChange}>
          Update Password
        </Button>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;
