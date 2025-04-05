
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserCog, Shield, FileText } from 'lucide-react';

const activities = [
  { 
    id: 1, 
    action: 'Login', 
    user: 'maria.johnson@company.com',
    details: 'Successful login from 192.168.1.105',
    time: '2 min ago',
    icon: 'login'
  },
  { 
    id: 2, 
    action: 'Permission Change', 
    user: 'admin@company.com',
    details: 'Added "View Reports" permission to Marketing group',
    time: '15 min ago',
    icon: 'permission'
  },
  { 
    id: 3, 
    action: 'MFA Setup', 
    user: 'dev.new@company.com',
    details: 'Configured mobile authenticator app',
    time: '37 min ago',
    icon: 'security'
  },
  { 
    id: 4, 
    action: 'Logout', 
    user: 'james.wilson@company.com',
    details: 'Session timed out after inactivity',
    time: '1 hour ago',
    icon: 'logout'
  },
  { 
    id: 5, 
    action: 'Password Reset', 
    user: 'support@company.com',
    details: 'Self-service password reset completed',
    time: '2 hours ago',
    icon: 'user'
  }
];

const RecentActivity = () => {
  const getActivityIcon = (icon: string) => {
    switch (icon) {
      case 'login':
        return <LogIn className="h-4 w-4 text-green-500" />;
      case 'logout':
        return <LogOut className="h-4 w-4 text-blue-500" />;
      case 'permission':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'security':
        return <Shield className="h-4 w-4 text-primary" />;
      default:
        return <UserCog className="h-4 w-4 text-orange-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions across the system</CardDescription>
        </div>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-start">
              <div className="mr-4 mt-1 rounded-full bg-primary/10 p-1.5">
                {getActivityIcon(activity.icon)}
              </div>
              <div className="space-y-1">
                <div className="font-medium flex items-center">
                  {activity.action}
                </div>
                <div className="text-sm">{activity.user}</div>
                <div className="text-sm text-muted-foreground">{activity.details}</div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
