
import React, { useState } from 'react';
import Header from '@/components/Header';
import UsersList from '@/components/UsersList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Users as UsersIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import UserFormDialog from '@/components/UserFormDialog';
import { useToast } from "@/hooks/use-toast";

const Users = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const handleCreateUser = () => {
    setIsCreateDialogOpen(true);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

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
          <Button onClick={handleCreateUser} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add User
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="locked">Locked</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="space-y-6">
            <UsersList statusFilter="all" />
          </TabsContent>
          <TabsContent value="active" className="space-y-6">
            <UsersList statusFilter="active" />
          </TabsContent>
          <TabsContent value="inactive" className="space-y-6">
            <UsersList statusFilter="inactive" />
          </TabsContent>
          <TabsContent value="locked" className="space-y-6">
            <UsersList statusFilter="locked" />
          </TabsContent>
        </Tabs>
      </main>
      
      <UserFormDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={() => {
          toast({
            title: "User created successfully",
            description: "The new user has been added to your organization.",
          });
        }}
      />
    </div>
  );
};

export default Users;
