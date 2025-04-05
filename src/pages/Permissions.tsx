
import React from 'react';
import Header from '@/components/Header';
import PermissionsManagement from '@/components/PermissionsManagement';

const Permissions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Access Management</h1>
          <div className="text-sm text-muted-foreground">RBAC/ABAC Controls</div>
        </div>
        
        <div className="space-y-6">
          <PermissionsManagement />
        </div>
      </main>
    </div>
  );
};

export default Permissions;
