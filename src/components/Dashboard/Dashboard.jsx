
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const Dashboard = () => {
  const { user } = useAuth();

  const calculatePregnancyProgress = () => {
    const weeks = parseInt(user?.pregnancyDuration || 0);
    return Math.min((weeks / 40) * 100, 100);
  };

  const getPregnancyStage = () => {
    const weeks = parseInt(user?.pregnancyDuration || 0);
    if (weeks <= 12) return { stage: 'First Trimester', color: 'bg-healthcare-success' };
    if (weeks <= 28) return { stage: 'Second Trimester', color: 'bg-healthcare-warning' };
    return { stage: 'Third Trimester', color: 'bg-healthcare-accent' };
  };

  const upcomingAppointments = [
    { type: 'Prenatal Checkup', date: '2024-06-15', time: '10:00 AM' },
    { type: 'Ultrasound', date: '2024-06-22', time: '2:30 PM' },
    { type: 'Blood Test', date: '2024-06-28', time: '9:00 AM' },
  ];

  const healthMetrics = [
    { label: 'Weight Gain', value: '12 kg', target: '11-16 kg', status: 'good' },
    { label: 'Blood Pressure', value: '120/80', target: '<140/90', status: 'good' },
    { label: 'Heart Rate', value: '78 bpm', target: '60-100 bpm', status: 'good' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="medical-gradient-primary rounded-2xl p-6 text-white">
        <div className="welcome-text">
          <h2 className="text-2xl font-bold mb-2 text-white text-left">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="opacity-90 text-white text-left">
            You're doing great! Here's your pregnancy journey overview.
          </p>
        </div>
      </div>

      {/* Pregnancy Progress */}
      <Card className="medical-card-gradient border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pregnancy Progress</CardTitle>
            <Badge className={`${getPregnancyStage().color} text-white`}>
              {getPregnancyStage().stage}
            </Badge>
          </div>
          <CardDescription>
            Week {user?.pregnancyDuration} of 40
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={calculatePregnancyProgress()} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Week {user?.pregnancyDuration}</span>
              <span>{Math.round(calculatePregnancyProgress())}% Complete</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                Target: {metric.target}
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                ✓ Normal
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Don't miss these important checkups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="text-left">
                  <div className="font-medium text-foreground">
                    {appointment.type}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {appointment.date} at {appointment.time}
                  </div>
                </div>
                <CardTitle>
                  <i>Scheduled</i>
                </CardTitle>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-sm text-muted-foreground">Messages Sent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="text-sm text-muted-foreground">Appointments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">15</div>
            <div className="text-sm text-muted-foreground">Reminders Set</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-muted-foreground">Health Score</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
