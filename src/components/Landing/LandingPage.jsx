
import React from 'react';
import { Button } from '../ui/button';
import { Heart, Shield, MessageCircle, Calendar } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const features = [
    {
      icon: Heart,
      title: "Maternal Care",
      description: "Comprehensive health tracking and personalized care for expecting mothers"
    },
    {
      icon: Calendar,
      title: "Smart Reminders",
      description: "Never miss important check-ups, medications, or appointments"
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      description: "Connect directly with healthcare providers and ASHA workers"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is protected with industry-standard security"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              AshaLink
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Empowering
            <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent block">
              Rural Mothers
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connecting expecting mothers with healthcare providers through smart reminders, 
            personalized care, and direct communication - bridging the gap in rural healthcare.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Care Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for a healthy pregnancy journey, designed specifically for rural communities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-blue-600 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-lg opacity-90">Mothers Supported</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Healthcare Providers</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of mothers who trust AshaLink for their healthcare needs.
          </p>
          <Button 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
