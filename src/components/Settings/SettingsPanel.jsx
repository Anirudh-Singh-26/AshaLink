
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { X, User, Bell, Lock, Globe, Smartphone, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    smsReminders: true,
    emailUpdates: false,
    language: 'english'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-background shadow-2xl animate-slide-in-right overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-md flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Settings</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-muted/50 rounded-full h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Profile Section */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.phone}</p>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground flex items-center">
                <Bell className="h-4 w-4 mr-2 text-primary" />
                Notifications
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                  <div>
                    <p className="font-medium text-foreground text-sm">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">App notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                  <div>
                    <p className="font-medium text-foreground text-sm">SMS Reminders</p>
                    <p className="text-xs text-muted-foreground">Text reminders</p>
                  </div>
                  <Switch
                    checked={settings.smsReminders}
                    onCheckedChange={(checked) => handleSettingChange('smsReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                  <div>
                    <p className="font-medium text-foreground text-sm">Email Updates</p>
                    <p className="text-xs text-muted-foreground">Weekly health tips</p>
                  </div>
                  <Switch
                    checked={settings.emailUpdates}
                    onCheckedChange={(checked) => handleSettingChange('emailUpdates', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground flex items-center">
                <Lock className="h-4 w-4 mr-2 text-green-600" />
                Security
              </h3>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm h-9">
                  <Lock className="h-3 w-3 mr-2" />
                  Change Password
                </Button>
                
                <Button variant="outline" className="w-full justify-start text-sm h-9">
                  <Smartphone className="h-3 w-3 mr-2" />
                  Update Phone
                </Button>
              </div>
            </div>

            {/* App Settings */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground flex items-center">
                <Globe className="h-4 w-4 mr-2 text-purple-600" />
                Appearance
              </h3>
              
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div>
                  <p className="font-medium text-foreground text-sm">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Toggle dark theme</p>
                </div>
                <Switch
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </div>

            {/* Logout Section */}
            <div className="pt-4 border-t border-border">
              <Button
                onClick={logout}
                variant="outline"
                className="w-full justify-start text-destructive border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50 text-sm h-9"
              >
                <LogOut className="h-3 w-3 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
