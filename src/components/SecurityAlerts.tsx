
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertOctagon, Bell, XCircle } from 'lucide-react';

const alerts = [
  { 
    id: 1, 
    title: 'Brute Force Attempt', 
    description: '5 failed login attempts for user admin@company.com',
    level: 'high',
    time: '12 min ago'
  },
  { 
    id: 2, 
    title: 'Unusual Login Location', 
    description: 'User john.doe logged in from Kyiv, Ukraine',
    level: 'medium',
    time: '43 min ago'
  },
  { 
    id: 3, 
    title: 'Sensitive Data Access', 
    description: 'User sarah.parker accessed financial records DB',
    level: 'critical',
    time: '1 hour ago'
  },
  { 
    id: 4, 
    title: 'Permission Change', 
    description: 'Admin rights granted to user dev.test',
    level: 'low',
    time: '3 hours ago'
  }
];

const SecurityAlerts = () => {
  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <AlertOctagon className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <Bell className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">Critical</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500">Medium</Badge>;
      default:
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500">Low</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Security Alerts</CardTitle>
          <CardDescription>Recent security alerts that need attention</CardDescription>
        </div>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-4 flex justify-between items-center alert-${alert.level} border-l-4`}>
              <div className="flex items-start space-x-3">
                <span className="pt-0.5">
                  {getAlertIcon(alert.level)}
                </span>
                <div>
                  <div className="font-medium flex items-center mb-1">
                    {alert.title} {getAlertBadge(alert.level)}
                  </div>
                  <div className="text-sm text-muted-foreground">{alert.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityAlerts;
