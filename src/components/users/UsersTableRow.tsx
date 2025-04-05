
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { UserData } from './types';
import UserStatusBadge from './UserStatusBadge';
import MFAStatus from './MFAStatus';
import LastActiveStatus from './LastActiveStatus';
import UserActionsMenu from './UserActionsMenu';

interface UsersTableRowProps {
  user: UserData;
  onViewDetails: (user: UserData) => void;
  onToggleMfa: (userId: number, currentStatus: boolean) => void;
  onToggleStatus: (userId: number, currentStatus: string) => void;
}

const UsersTableRow = ({ user, onViewDetails, onToggleMfa, onToggleStatus }: UsersTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </div>
      </TableCell>
      <TableCell>{user.department}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell><UserStatusBadge status={user.status as 'active' | 'inactive' | 'locked'} /></TableCell>
      <TableCell><MFAStatus enabled={user.mfa} /></TableCell>
      <TableCell>
        <LastActiveStatus lastActive={user.lastActive} status={user.status} />
      </TableCell>
      <TableCell>
        <UserActionsMenu 
          user={user} 
          onViewDetails={onViewDetails} 
          onToggleMfa={onToggleMfa} 
          onToggleStatus={onToggleStatus} 
        />
      </TableCell>
    </TableRow>
  );
};

export default UsersTableRow;
