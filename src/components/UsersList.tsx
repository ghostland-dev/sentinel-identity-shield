import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreHorizontal, Check, X, Clock, Filter } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UserDetailsDialog from './UserDetailsDialog';
import { useToast } from "@/hooks/use-toast";

// Extended user data with more fields
const allUsers = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@company.com',
    role: 'Administrator',
    department: 'IT',
    status: 'active',
    mfa: true,
    lastActive: '15 minutes ago',
    location: 'New York',
    lastLogin: '2025-04-05 09:32:15'
  },
  { 
    id: 2, 
    name: 'Sarah Parker', 
    email: 'sarah.parker@company.com',
    role: 'Manager',
    department: 'Finance',
    status: 'active',
    mfa: true,
    lastActive: '3 hours ago',
    location: 'Chicago',
    lastLogin: '2025-04-05 06:47:22'
  },
  { 
    id: 3, 
    name: 'James Wilson', 
    email: 'james.wilson@company.com',
    role: 'Analyst',
    department: 'Marketing',
    status: 'inactive',
    mfa: false,
    lastActive: '47 days ago',
    location: 'Remote',
    lastLogin: '2025-02-17 14:05:33'
  },
  { 
    id: 4, 
    name: 'Maria Johnson', 
    email: 'maria.johnson@company.com',
    role: 'Developer',
    department: 'Engineering',
    status: 'active',
    mfa: true,
    lastActive: '2 minutes ago',
    location: 'San Francisco',
    lastLogin: '2025-04-05 10:57:08'
  },
  { 
    id: 5, 
    name: 'Robert Davis', 
    email: 'robert.davis@company.com',
    role: 'Support Specialist',
    department: 'Customer Service',
    status: 'locked',
    mfa: false,
    lastActive: '30+ days ago',
    location: 'Austin',
    lastLogin: '2025-03-01 09:12:45'
  },
  { 
    id: 6, 
    name: 'Emma Thompson', 
    email: 'emma.thompson@company.com',
    role: 'Designer',
    department: 'UX/UI',
    status: 'active',
    mfa: true,
    lastActive: '1 hour ago',
    location: 'Seattle',
    lastLogin: '2025-04-05 09:05:51'
  },
  { 
    id: 7, 
    name: 'Michael Brown', 
    email: 'michael.brown@company.com',
    role: 'Team Lead',
    department: 'Engineering',
    status: 'active',
    mfa: true,
    lastActive: '4 hours ago',
    location: 'Boston',
    lastLogin: '2025-04-05 06:22:17'
  },
  { 
    id: 8, 
    name: 'Jennifer Lopez', 
    email: 'jennifer.lopez@company.com',
    role: 'Project Manager',
    department: 'Operations',
    status: 'active',
    mfa: true,
    lastActive: '10 minutes ago',
    location: 'Miami',
    lastLogin: '2025-04-05 10:49:33'
  },
  { 
    id: 9, 
    name: 'David Miller', 
    email: 'david.miller@company.com',
    role: 'Sales Representative',
    department: 'Sales',
    status: 'inactive',
    mfa: false,
    lastActive: '15 days ago',
    location: 'Denver',
    lastLogin: '2025-03-21 15:30:22'
  },
  { 
    id: 10, 
    name: 'Patricia Clark', 
    email: 'patricia.clark@company.com',
    role: 'HR Specialist',
    department: 'Human Resources',
    status: 'active',
    mfa: true,
    lastActive: '30 minutes ago',
    location: 'Chicago',
    lastLogin: '2025-04-05 10:29:41'
  },
  { 
    id: 11, 
    name: 'Thomas Wright', 
    email: 'thomas.wright@company.com',
    role: 'Quality Assurance',
    department: 'Engineering',
    status: 'active',
    mfa: true,
    lastActive: '1 day ago',
    location: 'Portland',
    lastLogin: '2025-04-04 11:15:07'
  },
  { 
    id: 12, 
    name: 'Linda Young', 
    email: 'linda.young@company.com',
    role: 'Financial Analyst',
    department: 'Finance',
    status: 'locked',
    mfa: false,
    lastActive: '45 days ago',
    location: 'New York',
    lastLogin: '2025-02-19 08:42:19'
  }
];

type UserData = typeof allUsers[0];
type StatusFilter = 'all' | 'active' | 'inactive' | 'locked';

interface UsersListProps {
  statusFilter?: StatusFilter;
}

const UsersList = ({ statusFilter = 'all' }: UsersListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [mfaFilter, setMfaFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  const usersPerPage = 5;

  // Get all unique departments for filter
  const departments = [...new Set(allUsers.map(user => user.department))];

  // Filter users based on search and filters
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    const matchesMfa = mfaFilter === 'all' || 
      (mfaFilter === 'enabled' && user.mfa) || 
      (mfaFilter === 'disabled' && !user.mfa);
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesMfa;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('all');
    setMfaFilter('all');
  };

  const handleViewDetails = (user: UserData) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  const handleToggleMfa = (userId: number, currentStatus: boolean) => {
    toast({
      title: `MFA ${currentStatus ? 'Disabled' : 'Enabled'}`,
      description: `Multi-factor authentication has been ${currentStatus ? 'disabled' : 'enabled'} for this user.`,
    });
  };

  const handleToggleStatus = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast({
      title: `User ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
      description: `The user account has been ${newStatus}.`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Accounts</CardTitle>
            <CardDescription>Manage user accounts and security settings</CardDescription>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search users..." 
                className="w-full pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-muted" : ""}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">MFA Status</label>
                <Select value={mfaFilter} onValueChange={setMfaFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by MFA status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All MFA Status</SelectItem>
                    <SelectItem value="enabled">MFA Enabled</SelectItem>
                    <SelectItem value="disabled">MFA Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
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
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
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
                          <DropdownMenuItem onClick={() => handleViewDetails(user)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewDetails(user)}>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleMfa(user.id, user.mfa)}>
                            {user.mfa ? 'Disable MFA' : 'Enable MFA'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className={user.status === 'active' ? "text-red-500" : "text-green-500"}
                            onClick={() => handleToggleStatus(user.id, user.status)}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
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
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {currentUsers.length > 0 ? indexOfFirstUser + 1 : 0}-
          {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={handlePreviousPage} 
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink 
                      isActive={pageNumber === currentPage}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              
              if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                return (
                  <PaginationItem key={`ellipsis-${pageNumber}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              
              return null;
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={handleNextPage}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>

      {selectedUser && (
        <UserDetailsDialog
          user={selectedUser}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </Card>
  );
};

export default UsersList;
