
import React from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from 'lucide-react';
import { UserData } from './types';

interface UserActionsMenuProps {
  user: UserData;
  onViewDetails: (user: UserData) => void;
  onToggleMfa: (userId: number, currentStatus: boolean) => void;
  onToggleStatus: (userId: number, currentStatus: string) => void;
}

const UserActionsMenu = ({ user, onViewDetails, onToggleMfa, onToggleStatus }: UserActionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails(user)}>View Details</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onViewDetails(user)}>Edit User</DropdownMenuItem>
        <DropdownMenuItem>Reset Password</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onToggleMfa(user.id, user.mfa)}>
          {user.mfa ? 'Disable MFA' : 'Enable MFA'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className={user.status === 'active' ? "text-red-500" : "text-green-500"}
          onClick={() => onToggleStatus(user.id, user.status)}
        >
          {user.status === 'active' ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionsMenu;
