
import React from 'react';
import Header from '@/components/Header';
import AuditLogs from '@/components/AuditLogs';

const Audit = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Audit & Compliance</h1>
          <div className="text-sm text-muted-foreground">GDPR, ISO 27001, SOC2</div>
        </div>
        
        <div className="space-y-6">
          <AuditLogs />
        </div>
      </main>
    </div>
  );
};

export default Audit;
