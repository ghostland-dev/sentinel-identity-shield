
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Check, X, Clock, Shield } from 'lucide-react';

const users = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@company.com',
    role: 'Administrator',
    department: 'IT',
    status: 'active',
    mfa: true,
    lastActive: '15 minutes ago'
  },
  { 
    id: 2, 
    name: 'Sarah Parker', 
    email: 'sarah.parker@company.com',
    role: 'Manager',
    department: 'Finance',
    status: 'active',
    mfa: true,
    lastActive: '3 hours ago'
  },
  { 
    id: 3, 
    name: 'James Wilson', 
    email: 'james.wilson@company.com',
    role: 'Analyst',
    department: 'Marketing',
    status: 'inactive',
    mfa: false,
    lastActive: '47 days ago'
  },
  { 
    id: 4, 
    name: 'Maria Johnson', 
    email: 'maria.johnson@company.com',
    role: 'Developer',
    department: 'Engineering',
    status: 'active',
    mfa: true,
    lastActive: '2 minutes ago'
  },
  { 
    id: 5, 
    name: 'Robert Davis', 
    email: 'robert.davis@company.com',
    role: 'Support Specialist',
    department: 'Customer Service',
    status: 'locked',
    mfa: false,
    lastActive: '30+ days ago'
  }
];

const UsersList = () => {
  const getStatusBadge = (status: string) => {
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

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Accounts</CardTitle>
            <CardDescription>Manage user accounts and security settings</CardDescription>
          </div>
          <Button>Add User</Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search users..." className="w-full pl-8" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </CardHeader>
      <CardContent>
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
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{user.mfa ? 
                  <div className="flex items-center gap-1 text-green-500"><Check className="h-4 w-4" /> Enabled</div> : 
                  <div className="flex items-center gap-1 text-red-500"><X className="h-4 w-4" /> Disabled</div>}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {user.status === 'inactive' || user.status === 'locked' ? 
                      <Clock className="h-4 w-4 text-orange-500" /> : 
                      <Clock className="h-4 w-4 text-muted-foreground" />}
                    {user.lastActive}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      <DropdownMenuItem>Enable MFA</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersList;
