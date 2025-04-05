
import React from 'react';
import Header from '@/components/Header';
import UsersList from '@/components/UsersList';

const Users = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <div className="text-sm text-muted-foreground">1,284 total users</div>
        </div>
        
        <div className="space-y-6">
          <UsersList />
        </div>
      </main>
    </div>
  );
};

export default Users;
