
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Info } from 'lucide-react';

type ComplianceFramework = {
  name: string;
  status: 'compliant' | 'in-progress' | 'review-required';
  lastAudit: string;
  nextAudit: string;
  controls: {
    passed: number;
    total: number;
  };
};

const ComplianceStatus = () => {
  const frameworks: ComplianceFramework[] = [
    {
      name: 'GDPR',
      status: 'compliant',
      lastAudit: '2025-02-15',
      nextAudit: '2025-08-15',
      controls: { passed: 67, total: 67 },
    },
    {
      name: 'ISO 27001',
      status: 'in-progress',
      lastAudit: '2024-11-03',
      nextAudit: '2025-05-03',
      controls: { passed: 92, total: 114 },
    },
    {
      name: 'SOC 2',
      status: 'compliant',
      lastAudit: '2025-01-22',
      nextAudit: '2025-07-22',
      controls: { passed: 116, total: 116 },
    },
    {
      name: 'HIPAA',
      status: 'review-required',
      lastAudit: '2024-09-10',
      nextAudit: '2025-04-10',
      controls: { passed: 56, total: 75 },
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500">Compliant</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500">In Progress</Badge>;
      case 'review-required':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500">Review Required</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getProgressPercentage = (passed: number, total: number) => {
    return Math.round((passed / total) * 100);
  };

  const getProgressColorClass = (percentage: number): string => {
    if (percentage === 100) return "bg-green-500";
    if (percentage >= 80) return "bg-blue-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Status</CardTitle>
        <CardDescription>Status of compliance frameworks and regulations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {frameworks.map((framework) => {
            const percentage = getProgressPercentage(framework.controls.passed, framework.controls.total);
            
            return (
              <div key={framework.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{framework.name}</h3>
                    {framework.status === 'compliant' && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  {getStatusBadge(framework.status)}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">Controls Implemented</div>
                    <div>
                      {framework.controls.passed}/{framework.controls.total}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressColorClass(percentage)}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs w-10">
                      {percentage}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Info className="h-3 w-3 mr-1" />
                      Last audit: {framework.lastAudit}
                    </div>
                    <div>
                      Next audit: {framework.nextAudit}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceStatus;
