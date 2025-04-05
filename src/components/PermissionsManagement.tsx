
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Users, Shield } from 'lucide-react';

const roles = [
  { 
    id: 1, 
    name: 'Administrator', 
    type: 'system',
    users: 5,
    permissions: 'Full system access',
    description: 'Complete control over all system functions and data'
  },
  { 
    id: 2, 
    name: 'Finance Manager', 
    type: 'custom',
    users: 8,
    permissions: 'Financial data access',
    description: 'Access to financial reports, transactions and budgets'
  },
  { 
    id: 3, 
    name: 'HR Staff', 
    type: 'custom',
    users: 12,
    permissions: 'Employee records access',
    description: 'View and edit employee information and HR documents'
  },
  { 
    id: 4, 
    name: 'Marketing User', 
    type: 'custom',
    users: 24,
    permissions: 'Limited access',
    description: 'Access to marketing campaigns and analytics tools'
  },
  { 
    id: 5, 
    name: 'Auditor', 
    type: 'system',
    users: 3,
    permissions: 'Read-only access',
    description: 'View-only access to system logs and configuration'
  }
];

const PermissionsManagement = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Roles & Permissions</CardTitle>
            <CardDescription>Manage access control and permissions</CardDescription>
          </div>
          <Button>Create Role</Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search roles..." className="w-full pl-8" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map(role => (
              <TableRow key={role.id}>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center">
                      {role.name}
                      {role.type === 'system' && 
                        <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-500 border-blue-500">System</Badge>
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">{role.description}</div>
                  </div>
                </TableCell>
                <TableCell>{role.type === 'system' ? 'System' : 'Custom'}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    {role.users}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-muted-foreground" />
                    {role.permissions}
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
                      <DropdownMenuItem>Edit Role</DropdownMenuItem>
                      <DropdownMenuItem>View Permissions</DropdownMenuItem>
                      <DropdownMenuItem>View Users</DropdownMenuItem>
                      {role.type !== 'system' && (
                        <DropdownMenuItem className="text-red-500">Delete Role</DropdownMenuItem>
                      )}
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

export default PermissionsManagement;
