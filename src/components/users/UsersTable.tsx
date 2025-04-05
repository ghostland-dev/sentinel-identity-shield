
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserData } from './types';
import UsersTableRow from './UsersTableRow';

interface UsersTableProps {
  users: UserData[];
  onViewDetails: (user: UserData) => void;
  onToggleMfa: (userId: number, currentStatus: boolean) => void;
  onToggleStatus: (userId: number, currentStatus: string) => void;
}

const UsersTable = ({ users, onViewDetails, onToggleMfa, onToggleStatus }: UsersTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>MFA</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map(user => (
              <UsersTableRow 
                key={user.id}
                user={user}
                onViewDetails={onViewDetails}
                onToggleMfa={onToggleMfa}
                onToggleStatus={onToggleStatus}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No users found matching the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
