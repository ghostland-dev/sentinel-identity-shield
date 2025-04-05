
import React from 'react';
import { Badge } from "@/components/ui/badge";

type UserStatus = 'active' | 'inactive' | 'locked';

interface UserStatusBadgeProps {
  status: UserStatus;
}

const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  switch (status) {
    case 'active':
      return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">Active</Badge>;
    case 'inactive':
      return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500">Inactive</Badge>;
    case 'locked':
      return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">Locked</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default UserStatusBadge;
