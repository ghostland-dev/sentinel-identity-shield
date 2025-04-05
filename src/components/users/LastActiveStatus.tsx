
import React from 'react';
import { Clock } from 'lucide-react';

interface LastActiveStatusProps {
  lastActive: string;
  status: string;
}

const LastActiveStatus = ({ lastActive, status }: LastActiveStatusProps) => {
  return (
    <div className="flex items-center gap-1">
      {status === 'inactive' || status === 'locked' ? 
        <Clock className="h-4 w-4 text-orange-500" /> : 
        <Clock className="h-4 w-4 text-muted-foreground" />}
      {lastActive}
    </div>
  );
};

export default LastActiveStatus;
