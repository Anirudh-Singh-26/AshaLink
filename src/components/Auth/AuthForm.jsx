
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Heart, UserPlus, LogIn, User, Stethoscope, Shield, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const AuthForm = ({ onBack }) => {
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'patient',
    age: '',
    location: '',
    pregnancyDuration: '',
    specialization: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login(loginData);
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await register(registerData);
      if (result.success) {
        toast.success('Account created successfully!');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'doctor': return <Stethoscope className="h-4 w-4" />;
      case 'admin': return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'doctor': return 'from-green-500 to-emerald-600';
      case 'admin': return 'from-purple-500 to-violet-600';
      default: return 'from-blue-500 to-cyan-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:bg-muted/50 transition-all duration-300 focus-ring"
          >
            <ArrowLeft className="h-9 w-4 mr-2" />
            <b>Back to Home</b>
          </Button>
        )}

        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 medical-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-subtle">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="flex items-center justify-center text-gradient bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            AshaLink
          </h1>
          <p className="flex items-center justify-center ">
            Your comprehensive maternal healthcare platform
          </p>
        </div>

        <Card className="glass shadow-2xl border-border/50 hover-lift">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center text-2xl">
              Welcome
            </CardTitle>
            <CardDescription className="flex items-center justify-center">
              Join thousands of healthcare professionals and patients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
                <TabsTrigger
                  value="login"
                  className="flex items-center justify-center data-[state=active]:bg-pink-500/100 rounded-lg "
                >
                  <LogIn className="h-9 w-4 mr-2" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="flex items-center justify-center data-[state=active]:bg-pink-500/100 rounded-lg"
                >
                  <UserPlus className="h-9 w-4 mr-2" />
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="login-email"
                      className="text-sm font-medium"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                      className="focus-ring transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="login-password"
                      className="text-sm font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        required
                        className="focus-ring transition-all duration-300 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
                    <p className="font-medium mb-2">Demo Credentials:</p>
                    <p>Patient: jane.doe@example.com / patient123</p>
                    <p>Doctor: dr.sarah@ashalink.com / doctor123</p>
                    <p>Admin: admin@ashalink.com / admin123</p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full medical-gradient-primary text-white hover:scale-105 transition-all duration-300 btn-shine focus-ring"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Account Type</Label>
                    <Select
                      value={registerData.role}
                      onValueChange={(value) =>
                        setRegisterData({ ...registerData, role: value })
                      }
                    >
                      <SelectTrigger className="focus-ring">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                        <div>
                          <SelectItem value="patient">
                            <div className="flex items-center m-3">
                              <User className="h-4 w-4 mr-2" />
                              Patient
                            </div>
                          </SelectItem>
                          <SelectItem value="doctor">
                            <div className="flex items-center m-3">
                              <Stethoscope className="h-4 w-4 mr-2" />
                              Doctor
                            </div>
                          </SelectItem>
                          <SelectItem value="admin">
                            <div className="flex items-center m-3">
                              <Shield className="h-4 w-4 mr-2" />
                              Administrator
                            </div>
                          </SelectItem>
                        </div>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="register-name"
                        className="text-sm font-medium"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Full name"
                        value={registerData.name}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            name: e.target.value,
                          })
                        }
                        required
                        className="focus-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="register-phone"
                        className="text-sm font-medium"
                      >
                        Phone
                      </Label>
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="Phone number"
                        value={registerData.phone}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            phone: e.target.value,
                          })
                        }
                        required
                        className="focus-ring"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="register-email"
                      className="text-sm font-medium"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      required
                      className="focus-ring"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="register-password"
                      className="text-sm font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showRegPassword ? "text" : "password"}
                        placeholder="Create a password (min 6 chars)"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                        required
                        className="focus-ring pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                      >
                        {showRegPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {registerData.role === "patient" && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label
                          htmlFor="register-age"
                          className="text-sm font-medium"
                        >
                          Age
                        </Label>
                        <Input
                          id="register-age"
                          type="number"
                          placeholder="Age"
                          min="13"
                          max="60"
                          value={registerData.age}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              age: e.target.value,
                            })
                          }
                          required
                          className="focus-ring"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="register-pregnancy"
                          className="text-sm font-medium"
                        >
                          Weeks
                        </Label>
                        <Input
                          id="register-pregnancy"
                          type="number"
                          placeholder="Pregnancy weeks"
                          min="1"
                          max="42"
                          value={registerData.pregnancyDuration}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              pregnancyDuration: e.target.value,
                            })
                          }
                          required
                          className="focus-ring"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="register-location"
                          className="text-sm font-medium"
                        >
                          Location
                        </Label>
                        <Input
                          id="register-location"
                          type="text"
                          placeholder="City"
                          value={registerData.location}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              location: e.target.value,
                            })
                          }
                          required
                          className="focus-ring"
                        />
                      </div>
                    </div>
                  )}

                  {registerData.role === "doctor" && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="register-specialization"
                        className="text-sm font-medium"
                      >
                        Specialization
                      </Label>
                      <Input
                        id="register-specialization"
                        type="text"
                        placeholder="Medical specialization"
                        value={registerData.specialization}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            specialization: e.target.value,
                          })
                        }
                        required
                        className="focus-ring"
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${getRoleColor(
                      registerData.role
                    )} text-white hover:scale-105 transition-all duration-300 btn-shine focus-ring`}
                    disabled={isLoading}
                  >
                    <div className="flex items-center justify-center">
                      {getRoleIcon(registerData.role)}
                      <span className="ml-2">
                        {isLoading
                          ? "Creating Account..."
                          : `Create ${
                              registerData.role.charAt(0).toUpperCase() +
                              registerData.role.slice(1)
                            } Account`}
                      </span>
                    </div>
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;
