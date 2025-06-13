
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Home, Calendar, Heart, MessageCircle, Settings } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'reminders', label: 'Reminders', icon: Calendar },
    { id: 'health-tips', label: 'Health Tips', icon: Heart },
    { id: 'messaging', label: 'Messages', icon: MessageCircle },
  ];

  if (user?.role === 'admin') {
    tabs.push({ id: 'admin', label: 'Admin', icon: Settings });
  }

  return (
    <nav className="glass border-t border-border/50 md:border-t-0 md:border-r fixed bottom-0 left-0 right-0 z-40 md:relative md:w-64 md:min-h-screen shadow-lg md:shadow-none">
      <div className="flex md:flex-col md:p-6">
        {tabs.map((tab, index) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-button flex-1 md:flex-none py-4 px-2 md:px-4 md:py-3 md:rounded-xl transition-all duration-300 transform hover:scale-105 focus-ring ${
                isActive
                  ? 'medical-gradient-primary text-white shadow-lg scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fade-in 0.5s ease-out forwards'
              }}
            >
              <IconComponent className={`h-5 w-5 md:h-5 md:w-5 transition-all duration-300 ${
                isActive ? 'scale-110' : ''
              }`} />
              <span className={`text-xs md:text-sm font-medium transition-all duration-300 ${
                isActive ? 'font-semibold' : ''
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full md:hidden animate-pulse-subtle"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
