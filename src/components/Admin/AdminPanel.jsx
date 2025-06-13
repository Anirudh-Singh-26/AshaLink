
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Users, MessageSquare, Calendar, AlertTriangle, Search, MoreHorizontal } from 'lucide-react';

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'Priya Sharma',
      phone: '+91-9876543210',
      age: 28,
      location: 'Rural Village A',
      pregnancyWeeks: 24,
      status: 'active',
      lastActive: '2024-06-12',
      missedAppointments: 0,
      messagesCount: 15
    },
    {
      id: 2,
      name: 'Anita Devi',
      phone: '+91-9876543211',
      age: 22,
      location: 'Rural Village B',
      pregnancyWeeks: 16,
      status: 'active',
      lastActive: '2024-06-11',
      missedAppointments: 1,
      messagesCount: 8
    },
    {
      id: 3,
      name: 'Sunita Kumari',
      phone: '+91-9876543212',
      age: 26,
      location: 'Rural Village C',
      pregnancyWeeks: 32,
      status: 'inactive',
      lastActive: '2024-06-08',
      missedAppointments: 2,
      messagesCount: 22
    }
  ];

  const messageExchanges = [
    {
      id: 1,
      userName: 'Priya Sharma',
      providerName: 'Dr. Sarah Johnson',
      lastMessage: 'Thank you for the dietary advice.',
      timestamp: '2024-06-12 10:45 AM',
      status: 'active'
    },
    {
      id: 2,
      userName: 'Anita Devi',
      providerName: 'Nurse Mary Williams',
      lastMessage: 'When should I schedule my next appointment?',
      timestamp: '2024-06-12 9:30 AM',
      status: 'awaiting_response'
    },
    {
      id: 3,
      userName: 'Sunita Kumari',
      providerName: 'Dr. James Brown',
      lastMessage: 'I missed my appointment yesterday.',
      timestamp: '2024-06-11 3:20 PM',
      status: 'urgent'
    }
  ];

  const appointments = [
    {
      id: 1,
      userName: 'Priya Sharma',
      type: 'Prenatal Checkup',
      date: '2024-06-15',
      time: '10:00 AM',
      provider: 'Dr. Sarah Johnson',
      status: 'scheduled'
    },
    {
      id: 2,
      userName: 'Anita Devi',
      type: 'Ultrasound',
      date: '2024-06-14',
      time: '2:00 PM',
      provider: 'Dr. James Brown',
      status: 'missed'
    },
    {
      id: 3,
      userName: 'Sunita Kumari',
      type: 'Blood Test',
      date: '2024-06-13',
      time: '9:00 AM',
      provider: 'Nurse Mary Williams',
      status: 'completed'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-red-100 text-red-800 border-red-200',
      scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
      missed: 'bg-red-100 text-red-800 border-red-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      urgent: 'bg-red-100 text-red-800 border-red-200',
      awaiting_response: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Manage users, monitor communications, and track appointments
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Users</p>
                <p className="text-2xl font-bold text-blue-700">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Messages</p>
                <p className="text-2xl font-bold text-green-700">{messageExchanges.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Appointments</p>
                <p className="text-2xl font-bold text-purple-700">{appointments.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Missed Appointments</p>
                <p className="text-2xl font-bold text-red-700">
                  {appointments.filter(apt => apt.status === 'missed').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="messages">Message Tracking</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Monitor and manage registered users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">User</th>
                      <th className="text-left py-3 px-4 font-medium">Contact</th>
                      <th className="text-left py-3 px-4 font-medium">Pregnancy</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Alerts</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Age: {user.age} • {user.location}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">{user.phone}</div>
                          <div className="text-xs text-muted-foreground">
                            Last active: {user.lastActive}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm font-medium">Week {user.pregnancyWeeks}</div>
                          <div className="text-xs text-muted-foreground">
                            {Math.round((user.pregnancyWeeks / 40) * 100)}% complete
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            {user.missedAppointments > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {user.missedAppointments} missed
                              </Badge>
                            )}
                            <div className="text-xs text-muted-foreground">
                              {user.messagesCount} messages
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Tracking</CardTitle>
              <CardDescription>
                Monitor communication between users and healthcare providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messageExchanges.map((exchange) => (
                  <div key={exchange.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{exchange.userName}</span>
                        <span className="text-muted-foreground">↔</span>
                        <span className="text-sm text-muted-foreground">{exchange.providerName}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        "{exchange.lastMessage}"
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {exchange.timestamp}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(exchange.status)}>
                        {exchange.status.replace('_', ' ')}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View Chat
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>
                Track scheduled, completed, and missed appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Patient</th>
                      <th className="text-left py-3 px-4 font-medium">Appointment</th>
                      <th className="text-left py-3 px-4 font-medium">Provider</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="font-medium">{appointment.userName}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium">{appointment.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.date} at {appointment.time}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">{appointment.provider}</div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {appointment.status === 'missed' && (
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
