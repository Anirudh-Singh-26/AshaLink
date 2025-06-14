import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../../hooks/use-toast';
import { Bell, Plus, Calendar, Clock, Pause, Play } from 'lucide-react';

const RemindersPanel = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    type: '',
    title: '',
    message: '',
    time: '',
    frequency: 'daily'
  });

  const [reminders, setReminders] = useState([
    {
      id: 1,
      type: 'medication',
      title: 'Prenatal Vitamins',
      message: 'Time to take your daily prenatal vitamins',
      time: '09:00',
      frequency: 'daily',
      status: 'active'
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Doctor Checkup',
      message: 'Your prenatal checkup is tomorrow at 10:00 AM',
      time: '08:30',
      frequency: 'weekly',
      status: 'active'
    },
    {
      id: 3,
      type: 'health',
      title: 'Drink Water',
      message: 'Remember to stay hydrated! Drink a glass of water.',
      time: '14:00',
      frequency: 'daily',
      status: 'active'
    },
    {
      id: 4,
      type: 'nutrition',
      title: 'Healthy Snack',
      message: 'Time for a nutritious snack. Try some fruits or nuts!',
      time: '16:00',
      frequency: 'daily',
      status: 'paused'
    }
  ]);

  const handleAddReminder = (e) => {
    e.preventDefault();
    
    const reminder = {
      id: Date.now(),
      ...newReminder,
      status: 'active'
    };
    
    setReminders(prev => [...prev, reminder]);
    
    toast({
      title: "Reminder Created!",
      description: `Reminder "${newReminder.title}" has been scheduled.`,
    });
    
    setNewReminder({
      type: '',
      title: '',
      message: '',
      time: '',
      frequency: 'daily'
    });
    setShowAddForm(false);
  };

  const toggleReminder = (id) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, status: reminder.status === 'active' ? 'paused' : 'active' }
          : reminder
      )
    );
    
    const reminder = reminders.find(r => r.id === id);
    const newStatus = reminder.status === 'active' ? 'paused' : 'active';
    
    toast({
      title: "Reminder Updated",
      description: `Reminder ${newStatus === 'active' ? 'activated' : 'paused'}.`,
    });
  };

  const getTypeIcon = (type) => {
    const icons = {
      medication: '💊',
      appointment: '🏥',
      health: '❤️',
      nutrition: '🥗'
    };
    return icons[type] || '🔔';
  };

  const getTypeColor = (type) => {
    const colors = {
      medication: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      appointment: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      health: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      nutrition: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Reminders</h2>
          <p className="text-sm text-muted-foreground">
            Manage your health reminders
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center bg-primary/90 text-sm  "
          size="sm"
        >
          <Plus className="flex items-center justify-center h-3 w-3 mr-1" />
          Add Reminder
        </Button>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Bell className="h-4 w-4 mr-2" />
              Create Reminder
            </CardTitle>
            <CardDescription className="text-sm">
              Set up automated health reminders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddReminder} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="type" className="text-sm">
                    Type
                  </Label>
                  <Select
                    value={newReminder.type}
                    onValueChange={(value) =>
                      setNewReminder({ ...newReminder, type: value })
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medication">💊 Medication</SelectItem>
                      <SelectItem value="appointment">
                        🏥 Appointment
                      </SelectItem>
                      <SelectItem value="health">❤️ Health Check</SelectItem>
                      <SelectItem value="nutrition">🥗 Nutrition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="time" className="text-sm">
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminder.time}
                    onChange={(e) =>
                      setNewReminder({ ...newReminder, time: e.target.value })
                    }
                    required
                    className="h-9"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="title" className="text-sm">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Take Prenatal Vitamins"
                  value={newReminder.title}
                  onChange={(e) =>
                    setNewReminder({ ...newReminder, title: e.target.value })
                  }
                  required
                  className="h-9"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="message" className="text-sm">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Reminder message"
                  value={newReminder.message}
                  onChange={(e) =>
                    setNewReminder({ ...newReminder, message: e.target.value })
                  }
                  required
                  className="min-h-[60px] text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="frequency" className="text-sm">
                  Frequency
                </Label>
                <Select
                  value={newReminder.frequency}
                  onValueChange={(value) =>
                    setNewReminder({ ...newReminder, frequency: value })
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-sm h-9"
                >
                  Create Reminder
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="text-sm h-9"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Existing Reminders */}
      <div className="grid gap-3">
        {reminders.map((reminder) => (
          <Card key={reminder.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-start justify-between space-x-3">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="text-lg flex-shrink-0">
                    {getTypeIcon(reminder.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col space-y-1 md:flex-row md:items-center md:space-y-0 md:space-x-2 mb-1">
                      <h3 className="font-medium text-sm truncate">
                        {reminder.title}
                      </h3>
                      <Badge
                        className={`${getTypeColor(
                          reminder.type
                        )} text-xs w-fit`}
                      >
                        {reminder.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {reminder.message}
                    </p>
                    <div className="flex flex-col space-y-1 md:flex-row md:items-center md:space-y-0 md:space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {reminder.time}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {reminder.frequency}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2 flex-shrink-0">
                  <Badge
                    variant={
                      reminder.status === "active" ? "default" : "secondary"
                    }
                    className=" text-xs w-fit p-2 "
                  >
                    {reminder.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleReminder(reminder.id)}
                    className=" flex items-center justify-center h-7 text-xs px-2"
                  >
                    {reminder.status === "active" ? (
                      <>
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 mr-1" />
                        Resume
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RemindersPanel;
