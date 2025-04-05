
import React from 'react';
import Header from '@/components/Header';
import DashboardStats from '@/components/DashboardStats';
import SecurityAlerts from '@/components/SecurityAlerts';
import RecentActivity from '@/components/RecentActivity';
import MFAStatus from '@/components/MFAStatus';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Security Dashboard</h1>
          <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</div>
        </div>
        
        <DashboardStats />
        
        <div className="grid gap-6 lg:grid-cols-2">
          <SecurityAlerts />
          <RecentActivity />
        </div>
        
        <MFAStatus />
      </main>
    </div>
  );
};

export default Dashboard;
