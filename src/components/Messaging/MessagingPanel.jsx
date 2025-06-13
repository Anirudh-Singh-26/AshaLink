
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Send, Phone, User } from 'lucide-react';

const MessagingPanel = () => {
  const { user } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState({});
  const messagesEndRef = useRef(null);

  const healthcareProviders = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Obstetrician',
      status: 'online',
      location: 'Rural Health Center',
      phone: '+1234567890',
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Nurse Mary Williams',
      role: 'Midwife',
      status: 'offline',
      location: 'Community Health',
      phone: '+1234567891',
      avatar: 'MW'
    },
    {
      id: 3,
      name: 'Dr. James Brown',
      role: 'General Practitioner',
      status: 'online',
      location: 'Local Clinic',
      phone: '+1234567892',
      avatar: 'JB'
    }
  ];

  // Mock messages data
  useEffect(() => {
    const mockMessages = {
      1: [
        {
          id: 1,
          sender: 'provider',
          message: 'Hello! How are you feeling today?',
          timestamp: '10:30 AM',
          date: '2024-06-12'
        },
        {
          id: 2,
          sender: 'user',
          message: 'Hi Dr. Johnson! I\'m feeling good but have some questions about my diet.',
          timestamp: '10:32 AM',
          date: '2024-06-12'
        },
        {
          id: 3,
          sender: 'provider',
          message: 'Of course! What specific questions do you have about your diet?',
          timestamp: '10:35 AM',
          date: '2024-06-12'
        },
        {
          id: 4,
          sender: 'user',
          message: 'Is it safe to eat fish during pregnancy? And how much is recommended?',
          timestamp: '10:37 AM',
          date: '2024-06-12'
        },
        {
          id: 5,
          sender: 'provider',
          message: 'Great question! Fish is very beneficial during pregnancy. Aim for 2-3 servings per week of low-mercury fish like salmon, sardines, or cod. Avoid high-mercury fish like shark, swordfish, and king mackerel.',
          timestamp: '10:40 AM',
          date: '2024-06-12'
        }
      ],
      2: [
        {
          id: 1,
          sender: 'provider',
          message: 'Good morning! How did your sleep go last night?',
          timestamp: '9:15 AM',
          date: '2024-06-12'
        },
        {
          id: 2,
          sender: 'user',
          message: 'Not too well, I had trouble finding a comfortable position.',
          timestamp: '9:45 AM',
          date: '2024-06-12'
        }
      ],
      3: [
        {
          id: 1,
          sender: 'provider',
          message: 'Hello! I hope you\'re doing well. Do you have any concerns you\'d like to discuss?',
          timestamp: '2:20 PM',
          date: '2024-06-11'
        }
      ]
    };
    setMessages(mockMessages);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedProvider]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedProvider) return;

    const message = {
      id: Date.now(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0]
    };

    setMessages(prev => ({
      ...prev,
      [selectedProvider.id]: [...(prev[selectedProvider.id] || []), message]
    }));

    setNewMessage('');

    // Simulate provider response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: 'provider',
        message: 'Thank you for your message. I\'ll get back to you shortly with detailed information.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0]
      };

      setMessages(prev => ({
        ...prev,
        [selectedProvider.id]: [...(prev[selectedProvider.id] || []), response]
      }));
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4">
      {/* Providers List */}
      <div className="lg:w-1/3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Healthcare Providers</CardTitle>
            <CardDescription>
              Connect with local healthcare professionals
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 p-4">
              {healthcareProviders.map((provider) => (
                <div
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                    selectedProvider?.id === provider.id
                      ? 'bg-healthcare-primary/10 border-healthcare-primary'
                      : 'bg-muted/50 border-transparent hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-healthcare-primary text-white">
                          {provider.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        provider.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-sem

ibold text-sm truncate">{provider.name}</h3>
                        <Badge variant={provider.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                          {provider.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{provider.role}</p>
                      <p className="text-xs text-muted-foreground">{provider.location}</p>
                    </div>
                  </div>
                  {messages[provider.id] && messages[provider.id].length > 0 && (
                    <div className="mt-2 p-2 bg-white/50 rounded text-xs">
                      <span className="text-muted-foreground">Last message: </span>
                      <span className="font-medium">
                        {messages[provider.id][messages[provider.id].length - 1].message.substring(0, 30)}...
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="lg:w-2/3">
        <Card className="h-full flex flex-col">
          {selectedProvider ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-healthcare-primary text-white">
                        {selectedProvider.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedProvider.name}</CardTitle>
                      <CardDescription>
                        {selectedProvider.role} • {selectedProvider.location}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={selectedProvider.status === 'online' ? 'default' : 'secondary'}>
                      {selectedProvider.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-96 p-4">
                  <div className="space-y-4">
                    {(messages[selectedProvider.id] || []).map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-healthcare-primary text-white ml-4'
                              : 'bg-muted mr-4'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <form onSubmit={sendMessage} className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={!newMessage.trim()}
                    className="bg-healthcare-primary hover:bg-healthcare-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <User className="h-16 w-16 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold">Select a Provider</h3>
                  <p className="text-muted-foreground">
                    Choose a healthcare provider to start messaging
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessagingPanel;
