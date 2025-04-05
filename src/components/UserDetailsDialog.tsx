
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, X, Clock, Shield, Mail, MapPin } from 'lucide-react';

interface UserDetailsDialogProps {
  user: {
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserDetailsDialog = ({ user, open, onOpenChange }: UserDetailsDialogProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500">Inactive</Badge>;
      case 'locked':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">Locked</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View and manage user details
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="pt-2">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/3 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">User Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Full Name</Label>
                      <div>{user.name}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {user.email}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Department</Label>
                      <div>{user.department}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Role</Label>
                      <div>{user.role}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Location</Label>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {user.location}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Status</Label>
                      <div>{getStatusBadge(user.status)}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="w-full md:w-1/3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Account Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Last Active</Label>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {user.lastActive}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">MFA Status</Label>
                      <div className="flex items-center gap-1">
                        {user.mfa ? (
                          <>
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-green-500">Enabled</span>
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 text-red-500" />
                            <span className="text-red-500">Disabled</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" className="w-full">
                        Edit User
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage user security and access settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Multi-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.mfa ? "MFA is currently enabled" : "MFA is not enabled"}
                    </p>
                  </div>
                  <Button variant={user.mfa ? "destructive" : "default"} size="sm">
                    {user.mfa ? "Disable MFA" : "Enable MFA"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Password Reset</h4>
                    <p className="text-sm text-muted-foreground">
                      Send a password reset link to the user
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Reset Password</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Account Status</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.status === "active" 
                        ? "User account is currently active" 
                        : `User account is ${user.status}`}
                    </p>
                  </div>
                  <Button 
                    variant={user.status === "active" ? "destructive" : "default"} 
                    size="sm"
                  >
                    {user.status === "active" ? "Deactivate Account" : "Activate Account"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>View user's recent login activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Last Login</p>
                        <p className="text-xs text-muted-foreground">{user.lastLogin}</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500">
                        Login Success
                      </Badge>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Profile Updated</p>
                        <p className="text-xs text-muted-foreground">2025-04-01 15:22:10</p>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                        Profile Change
                      </Badge>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Password Changed</p>
                        <p className="text-xs text-muted-foreground">2025-03-25 09:15:33</p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
                        Security Event
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
