
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import UserDetailsDialog from './UserDetailsDialog';
import UserFilters from './users/UserFilters';
import UsersTable from './users/UsersTable';
import UsersPagination from './users/UsersPagination';
import { allUsers } from './users/usersData';
import { UserData, StatusFilter } from './users/types';

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
        
        <UserFilters 
          searchTerm={searchTerm}
          departmentFilter={departmentFilter}
          mfaFilter={mfaFilter}
          departments={departments}
          showFilters={showFilters}
          setSearchTerm={setSearchTerm}
          setDepartmentFilter={setDepartmentFilter}
          setMfaFilter={setMfaFilter}
          setShowFilters={setShowFilters}
          handleClearFilters={handleClearFilters}
        />
      </CardHeader>
      
      <CardContent>
        <UsersTable 
          users={currentUsers}
          onViewDetails={handleViewDetails}
          onToggleMfa={handleToggleMfa}
          onToggleStatus={handleToggleStatus}
        />
      </CardContent>
      
      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {currentUsers.length > 0 ? indexOfFirstUser + 1 : 0}-
          {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
        </div>
        
        <UsersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
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
