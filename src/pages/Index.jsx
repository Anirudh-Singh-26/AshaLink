
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/Auth/AuthForm';
import LandingPage from '../components/Landing/LandingPage';
import Header from '../components/Layout/Header';
import Navigation from '../components/Layout/Navigation';
import Dashboard from '../components/Dashboard/Dashboard';
import RemindersPanel from '../components/Reminders/RemindersPanel';
import HealthTipsPanel from '../components/HealthTips/HealthTipsPanel';
import MessagingPanel from '../components/Messaging/MessagingPanel';
import AdminPanel from '../components/Admin/AdminPanel';

const Index = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAuth, setShowAuth] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/5">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 medical-gradient-primary rounded-3xl flex items-center justify-center mx-auto animate-pulse-subtle shadow-lg">
            <span className="text-white font-bold text-3xl">AL</span>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Loading AshaLink...</h2>
            <div className="w-64 h-2 bg-muted rounded-full mx-auto overflow-hidden">
              <div className="h-full medical-gradient-primary rounded-full animate-slide-in"></div>
            </div>
            <p className="text-muted-foreground">Preparing your healthcare dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user && !showAuth) {
    return <LandingPage onGetStarted={() => setShowAuth(true)} />;
  }

  if (!user && showAuth) {
    return <AuthForm onBack={() => setShowAuth(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'reminders':
        return <RemindersPanel />;
      case 'health-tips':
        return <HealthTipsPanel />;
      case 'messaging':
        return <MessagingPanel />;
      case 'admin':
        return user.role === 'admin' ? <AdminPanel /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <Header />
      
      <div className="flex flex-col md:flex-row">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
