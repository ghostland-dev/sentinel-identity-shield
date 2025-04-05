
export type UserData = {
  id: number;
  name: string; 
  email: string;
  role: string;
  department: string;
  status: string;
  mfa: boolean;
  lastActive: string;
  location: string;
  lastLogin: string;
};

export type StatusFilter = 'all' | 'active' | 'inactive' | 'locked';
