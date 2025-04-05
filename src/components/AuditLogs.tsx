
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Download, Filter, Calendar, Clock, Shield, ShieldCheck } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const initialLogs = [
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
  },
  { 
    id: 6, 
    timestamp: '2025-04-05 11:05:33',
    user: 'david.lee@company.com',
    action: 'ACCOUNT_LOCKED',
    details: 'Account locked after 5 failed login attempts',
    ip: '192.168.1.78',
    category: 'security'
  },
  { 
    id: 7, 
    timestamp: '2025-04-05 11:30:15',
    user: 'alex.wang@company.com',
    action: 'ROLE_CHANGE',
    details: 'User promoted to Admin role',
    ip: '192.168.1.145',
    category: 'admin'
  },
  { 
    id: 8, 
    timestamp: '2025-04-05 11:42:08',
    user: 'robert.miller@company.com',
    action: 'FILE_DOWNLOAD',
    details: 'Downloaded quarterly financial report',
    ip: '192.168.1.201',
    category: 'data'
  }
];

const AuditLogs = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [timeRange, setTimeRange] = useState('24h');
  const itemsPerPage = 5;
  
  // Filter logs based on search term and category
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm);
      
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Pagination
  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Export Complete",
        description: "Audit logs have been exported to CSV successfully.",
        variant: "default",
      });
    }, 1500);
  };
  
  const handleSIEMIntegration = () => {
    toast({
      title: "SIEM Integration",
      description: "Configuring SIEM integration will redirect you to the integration page.",
      variant: "default",
    });
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'authentication':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500">Authentication</Badge>;
      case 'admin':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500">Admin</Badge>;
      case 'data':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">Data</Badge>;
      case 'security':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">Security</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };
  
  const getActionIcon = (action: string) => {
    if (action.includes('LOGIN') || action.includes('PASSWORD')) {
      return <Shield className="h-3 w-3 mr-1" />;
    } else if (action.includes('MFA') || action.includes('ROLE')) {
      return <ShieldCheck className="h-3 w-3 mr-1" />;
    } 
    return null;
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
            <Button variant="outline" onClick={handleExport} disabled={isExporting}>
              <Download className="h-4 w-4 mr-2" /> {isExporting ? "Exporting..." : "Export"}
            </Button>
            <Button onClick={handleSIEMIntegration}>SIEM Integration</Button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search logs..." 
                className="w-full pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="mr-2 flex items-center">
              <Filter className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by:</span>
            </div>
            <Button 
              variant={selectedCategory === 'all' ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="h-8"
            >
              All
            </Button>
            <Button 
              variant={selectedCategory === 'authentication' ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory('authentication')}
              className="h-8"
            >
              Authentication
            </Button>
            <Button 
              variant={selectedCategory === 'admin' ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory('admin')}
              className="h-8"
            >
              Admin
            </Button>
            <Button 
              variant={selectedCategory === 'data' ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory('data')}
              className="h-8"
            >
              Data
            </Button>
            <Button 
              variant={selectedCategory === 'security' ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory('security')}
              className="h-8"
            >
              Security
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">IP Address</TableHead>
                <TableHead className="hidden md:table-cell">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLogs.length > 0 ? (
                currentLogs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        {log.timestamp}
                      </div>
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell className="font-mono whitespace-nowrap">
                      <div className="flex items-center">
                        {getActionIcon(log.action)}
                        {log.action}
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(log.category)}</TableCell>
                    <TableCell className="font-mono text-xs hidden md:table-cell">{log.ip}</TableCell>
                    <TableCell className="text-sm hidden md:table-cell">{log.details}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No audit logs found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {currentLogs.length} of {filteredLogs.length} entries
        </div>
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <Button 
                    variant={currentPage === i + 1 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handlePageChange(i + 1)}
                    className="w-8 h-8 p-0"
                  >
                    {i + 1}
                  </Button>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuditLogs;
