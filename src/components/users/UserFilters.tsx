
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFiltersProps {
  searchTerm: string;
  departmentFilter: string;
  mfaFilter: string;
  departments: string[];
  showFilters: boolean;
  setSearchTerm: (value: string) => void;
  setDepartmentFilter: (value: string) => void;
  setMfaFilter: (value: string) => void;
  setShowFilters: (value: boolean) => void;
  handleClearFilters: () => void;
}

const UserFilters = ({
  searchTerm,
  departmentFilter,
  mfaFilter,
  departments,
  showFilters,
  setSearchTerm,
  setDepartmentFilter,
  setMfaFilter,
  setShowFilters,
  handleClearFilters
}: UserFiltersProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search users..." 
            className="w-full pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-muted" : ""}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">MFA Status</label>
            <Select value={mfaFilter} onValueChange={setMfaFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by MFA status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All MFA Status</SelectItem>
                <SelectItem value="enabled">MFA Enabled</SelectItem>
                <SelectItem value="disabled">MFA Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearFilters}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilters;
