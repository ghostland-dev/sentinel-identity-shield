
import React from 'react';
import Header from '@/components/Header';
import UsersList from '@/components/UsersList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Users as UsersIcon } from 'lucide-react';

const Users = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">User Management</h1>
            <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded text-sm">
              <UsersIcon className="h-4 w-4 text-primary" />
              <span>12 total users</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="space-y-6">
            <UsersList />
          </TabsContent>
          <TabsContent value="active" className="space-y-6">
            <UsersList />
          </TabsContent>
          <TabsContent value="inactive" className="space-y-6">
            <UsersList />
          </TabsContent>
          <TabsContent value="pending" className="space-y-6">
            <UsersList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Users;
