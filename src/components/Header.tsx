
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Users, Lock, FileText, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-primary/10 text-primary' : 'text-muted-foreground';
  };
  
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-primary" />
          <span className="hidden md:inline-block">Sentinel Identity Shield</span>
        </div>
        <nav className="ml-auto flex gap-2">
          <Button variant="ghost" size="sm" className={`${isActive('/')} flex items-center gap-1`} asChild>
            <Link to="/">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden md:inline-block ml-1">Dashboard</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className={`${isActive('/users')} flex items-center gap-1`} asChild>
            <Link to="/users">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline-block ml-1">Users</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className={`${isActive('/permissions')} flex items-center gap-1`} asChild>
            <Link to="/permissions">
              <Lock className="h-4 w-4" />
              <span className="hidden md:inline-block ml-1">Permissions</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className={`${isActive('/audit')} flex items-center gap-1`} asChild>
            <Link to="/audit">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline-block ml-1">Audit Logs</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
