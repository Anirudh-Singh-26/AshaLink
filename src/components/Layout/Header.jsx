
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Bell, User, Settings, Moon, Sun, Stethoscope, Shield } from 'lucide-react';
import NotificationPanel from '../Notifications/NotificationPanel';
import SettingsPanel from '../Settings/SettingsPanel';

const Header = () => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Check-up',
      message: 'Your prenatal appointment is scheduled for tomorrow at 10:00 AM',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'health',
      title: 'Daily Health Tip',
      message: 'Remember to take your folic acid supplement today',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'message',
      title: 'Message from Dr. Smith',
      message: 'Your recent test results look great! Keep up the good work.',
      time: '1 day ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'doctor': return <Stethoscope className="h-4 w-4 text-white" />;
      case 'admin': return <Shield className="h-4 w-4 text-white" />;
      default: return <User className="h-4 w-4 text-white" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'doctor': return 'from-green-500 to-emerald-600';
      case 'admin': return 'from-purple-500 to-violet-600';
      default: return 'from-blue-500 to-cyan-600';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'doctor': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <>
      <header className="glass border-b border-border/50 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 medical-gradient-primary rounded-xl flex items-center justify-center shadow-lg animate-pulse-subtle">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent text-left">
                  AshaLink
                </h1>
                <p className="text-xs text-muted-foreground -mt-1 text-left">Healthcare Platform</p>
              </div>
            </div>
            
            {user && (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative hover:bg-muted/50 rounded-full p-2 transition-all duration-300 hover:scale-105 focus-ring"
                  onClick={() => setShowNotifications(true)}
                >
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-subtle">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleTheme}
                  className="hover:bg-muted/50 rounded-full p-2 transition-all duration-300 hover:scale-105 focus-ring"
                >
                  {isDark ? 
                    <Sun className="h-5 w-5 text-yellow-500" /> : 
                    <Moon className="h-5 w-5 text-slate-600" />
                  }
                </Button>
                
                <div className="flex items-center space-x-3 glass rounded-full px-4 py-2 border border-border/50">
                  <div className={`w-8 h-8 bg-gradient-to-r ${getRoleColor(user.role)} rounded-full flex items-center justify-center shadow-sm`}>
                    {getRoleIcon(user.role)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground leading-tight text-left">{user.name}</span>
                    <Badge variant="outline" className={`text-xs px-2 py-0 ${getRoleBadgeColor(user.role)} border-0`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowSettings(true)}
                  className="hover:bg-muted/50 rounded-full p-2 transition-all duration-300 hover:scale-105 focus-ring"
                >
                  <Settings className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
};

export default Header;
