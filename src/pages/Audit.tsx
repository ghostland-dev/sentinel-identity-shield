
import React from 'react';
import Header from '@/components/Header';
import AuditLogs from '@/components/AuditLogs';
import ComplianceStatus from '@/components/ComplianceStatus';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from 'lucide-react';

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
          <div className="grid md:grid-cols-2 gap-6">
            <ComplianceStatus />
            <Card className="bg-blue-500/5 border border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Audit Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm font-medium">Total Audit Events (24h)</span>
                    <span className="font-mono">1,254</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm font-medium">Security Alerts</span>
                    <span className="font-mono">3</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-sm font-medium">Last Compliance Review</span>
                    <span className="font-mono">2025-03-15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pending Issues</span>
                    <span className="font-mono">7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <AuditLogs />
        </div>
      </main>
    </div>
  );
};

export default Audit;
