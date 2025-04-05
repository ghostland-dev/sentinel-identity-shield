
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, Filter } from 'lucide-react';

const logs = [
  { 
    id: 1, 
    timestamp: '2025-04-05 09:32:14',
    user: 'john.smith@company.com',
    action: 'LOGIN',
    details: 'Successful login via SSO',
    ip: '192.168.1.105',
    category: 'authentication'
  },
  { 
    id: 2, 
    timestamp: '2025-04-05 09:45:22',
    user: 'sarah.parker@company.com',
    action: 'DATA_ACCESS',
    details: 'Accessed financial records database',
    ip: '192.168.1.156',
    category: 'data'
  },
  { 
    id: 3, 
    timestamp: '2025-04-05 10:01:05',
    user: 'admin@company.com',
    action: 'PERMISSION_CHANGE',
    details: 'Added "View Reports" permission to Marketing group',
    ip: '192.168.1.2',
    category: 'admin'
  },
  { 
    id: 4, 
    timestamp: '2025-04-05 10:15:47',
    user: 'james.wilson@company.com',
    action: 'PASSWORD_RESET',
    details: 'Password reset requested',
    ip: '192.168.1.187',
    category: 'authentication'
  },
  { 
    id: 5, 
    timestamp: '2025-04-05 10:23:11',
    user: 'maria.johnson@company.com',
    action: 'MFA_SETUP',
    details: 'Configured mobile authenticator app',
    ip: '192.168.1.210',
    category: 'authentication'
  }
];

const AuditLogs = () => {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'authentication':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500">Authentication</Badge>;
      case 'admin':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500">Admin</Badge>;
      case 'data':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">Data</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Audit Logs</CardTitle>
            <CardDescription>Complete activity logs for compliance and security</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button>SIEM Integration</Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search logs..." className="w-full pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map(log => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell className="font-mono">{log.action}</TableCell>
                <TableCell>{getCategoryBadge(log.category)}</TableCell>
                <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                <TableCell className="text-sm">{log.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AuditLogs;
