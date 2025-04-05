
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Shield } from 'lucide-react';

const MFAStatus = () => {
  const [departments, setDepartments] = useState([
    { name: 'IT', total: 45, enabled: 45, percentage: 100 },
    { name: 'Finance', total: 28, enabled: 25, percentage: 89 },
    { name: 'Marketing', total: 34, enabled: 30, percentage: 88 },
    { name: 'Engineering', total: 56, enabled: 50, percentage: 89 },
    { name: 'HR', total: 18, enabled: 13, percentage: 72 },
    { name: 'Sales', total: 41, enabled: 32, percentage: 78 },
    { name: 'Customer Service', total: 62, enabled: 42, percentage: 68 },
  ]);
  
  const [isEnforcing, setIsEnforcing] = useState(false);

  const getProgressColorClass = (percentage: number): string => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const handleEnforceMFA = () => {
    setIsEnforcing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update all departments to 100% MFA
      const updatedDepartments = departments.map(dept => ({
        ...dept,
        enabled: dept.total,
        percentage: 100
      }));
      
      setDepartments(updatedDepartments);
      setIsEnforcing(false);
      
      toast({
        title: "MFA Enforcement Complete",
        description: "Multi-Factor Authentication has been enforced across all departments.",
        variant: "default",
      });
    }, 1500);
  };

  // Calculate overall MFA percentage
  const totalUsers = departments.reduce((sum, dept) => sum + dept.total, 0);
  const enabledUsers = departments.reduce((sum, dept) => sum + dept.enabled, 0);
  const overallPercentage = Math.round((enabledUsers / totalUsers) * 100);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Multi-Factor Authentication Status</CardTitle>
            <CardDescription>MFA adoption across departments</CardDescription>
          </div>
          <Button 
            onClick={handleEnforceMFA} 
            disabled={isEnforcing || overallPercentage === 100}
          >
            {isEnforcing ? "Enforcing..." : "Enforce MFA"}
          </Button>
        </div>
        
        {/* Overall status */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-1 text-primary" />
              Overall MFA Status
            </div>
            <div className="text-sm text-muted-foreground">
              {enabledUsers} / {totalUsers} users ({overallPercentage}%)
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full ${getProgressColorClass(overallPercentage)}`} 
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <span className="text-xs w-10">
              {overallPercentage}%
            </span>
          </div>
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
                <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getProgressColorClass(dept.percentage)}`} 
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
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
