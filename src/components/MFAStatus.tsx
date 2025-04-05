
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const MFAStatus = () => {
  const departments = [
    { name: 'IT', total: 45, enabled: 45, percentage: 100 },
    { name: 'Finance', total: 28, enabled: 25, percentage: 89 },
    { name: 'Marketing', total: 34, enabled: 30, percentage: 88 },
    { name: 'Engineering', total: 56, enabled: 50, percentage: 89 },
    { name: 'HR', total: 18, enabled: 13, percentage: 72 },
    { name: 'Sales', total: 41, enabled: 32, percentage: 78 },
    { name: 'Customer Service', total: 62, enabled: 42, percentage: 68 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Multi-Factor Authentication Status</CardTitle>
            <CardDescription>MFA adoption across departments</CardDescription>
          </div>
          <Button>Enforce MFA</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departments.map(dept => (
            <div key={dept.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium">{dept.name}</div>
                <div className="text-sm text-muted-foreground">
                  {dept.enabled} / {dept.total} users ({dept.percentage}%)
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress
                  value={dept.percentage}
                  className="h-2"
                  indicatorColor={
                    dept.percentage >= 90 ? "bg-green-500" :
                    dept.percentage >= 75 ? "bg-blue-500" : 
                    dept.percentage >= 50 ? "bg-yellow-500" : "bg-red-500"
                  }
                />
                <span className="text-xs w-10">
                  {dept.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MFAStatus;
