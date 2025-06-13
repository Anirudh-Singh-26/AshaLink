
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Bell, X, Calendar, Heart, MessageCircle, AlertCircle } from 'lucide-react';

const NotificationPanel = ({ isOpen, onClose, notifications, onMarkAsRead }) => {
  if (!isOpen) return null;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment':
        return Calendar;
      case 'health':
        return Heart;
      case 'message':
        return MessageCircle;
      default:
        return AlertCircle;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'appointment':
        return 'from-blue-500 to-purple-600';
      case 'health':
        return 'from-emerald-500 to-teal-600';
      case 'message':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl animate-slide-in-right">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Bell className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground text-left">Notifications</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-muted/50 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-center">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                      notification.read ? 'bg-muted/50 border-border' : 'bg-card border-primary/20 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-foreground truncate text-left">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary text-center">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2 text-left">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground text-left">
                            {notification.time}
                          </p>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onMarkAsRead(notification.id)}
                              className="text-xs text-primary hover:text-primary/80 hover:bg-primary/10 text-center"
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
