
import React from 'react';
import { Check, X } from 'lucide-react';

interface MFAStatusProps {
  enabled: boolean;
}

const MFAStatus = ({ enabled }: MFAStatusProps) => {
  if (enabled) {
    return <div className="flex items-center gap-1 text-green-500"><Check className="h-4 w-4" /> Enabled</div>;
  }
  return <div className="flex items-center gap-1 text-red-500"><X className="h-4 w-4" /> Disabled</div>;
};

export default MFAStatus;
