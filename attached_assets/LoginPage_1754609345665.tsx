import React, { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

// Icons as React components (you can replace with your preferred icon library)
const GraduationCapIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

interface LoginPageProps {
  onLogin?: (userType: string, credentials: { email: string; password: string }) => void
  onNavigateToRegister?: () => void
  onForgotPassword?: (userType: string) => void
}

export default function LoginPage({ 
  onLogin, 
  onNavigateToRegister, 
  onForgotPassword 
}: LoginPageProps) {
  const [activeTab, setActiveTab] = useState("student")

  const handleSubmit = (userType: string) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    if (onLogin) {
      onLogin(userType, { email, password })
    } else {
      console.log(`${userType} login:`, { email, password })
    }
  }

  const handleForgotPassword = (userType: string) => {
    if (onForgotPassword) {
      onForgotPassword(userType)
    } else {
      console.log(`Forgot password for ${userType}`)
    }
  }

  const handleNavigateToRegister = () => {
    if (onNavigateToRegister) {
      onNavigateToRegister()
    } else {
      console.log("Navigate to register")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md shadow-lg border border-edu-light bg-white">
        <CardHeader className="space-y-1 text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-800">
            EduAI
          </CardTitle>
          <CardDescription className="text-gray-600">Access your academic account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-50">
              <TabsTrigger 
                value="student" 
                className="flex items-center gap-2 data-[state=active]:text-gray-800 transition-all duration-300 border"
                style={{ 
                  backgroundColor: activeTab === 'student' ? '#EFF4FF' : undefined,
                  borderColor: activeTab === 'student' ? '#E5E7EB' : 'transparent'
                }}
              >
                <GraduationCapIcon />
                Student Login
              </TabsTrigger>
              <TabsTrigger 
                value="staff" 
                className="flex items-center gap-2 data-[state=active]:text-gray-800 transition-all duration-300 border"
                style={{ 
                  backgroundColor: activeTab === 'staff' ? '#EFF4FF' : undefined,
                  borderColor: activeTab === 'staff' ? '#E5E7EB' : 'transparent'
                }}
              >
                <UsersIcon />
                Staff Login
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="student" className="space-y-4 mt-6">
              <form onSubmit={handleSubmit("student")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email" className="text-gray-700 font-medium">Student ID / Email</Label>
                  <Input 
                    id="student-email" 
                    name="email"
                    type="email" 
                    placeholder="Enter your student ID or email"
                    className="border-gray-200 bg-white transition-all duration-300"
                    style={{ 
                      '--tw-ring-color': '#EFF4FF',
                      borderColor: 'var(--focus-border, #e5e7eb)'
                    }}
                    onFocus={(e) => e.target.style.setProperty('--focus-border', '#EFF4FF')}
                    onBlur={(e) => e.target.style.setProperty('--focus-border', '#e5e7eb')}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password" className="text-gray-700 font-medium">Password</Label>
                  <Input 
                    id="student-password" 
                    name="password"
                    type="password" 
                    placeholder="Enter your password"
                    className="border-gray-200 bg-white transition-all duration-300"
                    style={{ 
                      '--tw-ring-color': '#EFF4FF',
                      borderColor: 'var(--focus-border, #e5e7eb)'
                    }}
                    onFocus={(e) => e.target.style.setProperty('--focus-border', '#EFF4FF')}
                    onBlur={(e) => e.target.style.setProperty('--focus-border', '#e5e7eb')}
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full text-gray-800 transition-all duration-300 font-medium border"
                  style={{ 
                    backgroundColor: '#EFF4FF',
                    borderColor: '#E5E7EB'
                  }}
                >
                  Student Login
                </Button>
              </form>
              <div className="text-center space-y-2">
                <button 
                  onClick={() => handleForgotPassword("student")}
                  className="text-sm hover:underline transition-colors duration-300 bg-transparent border-none cursor-pointer" 
                  style={{ color: '#94ABF5' }}
                >
                  Forgot password?
                </button>
                <div className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button 
                    onClick={handleNavigateToRegister}
                    className="hover:underline font-medium transition-colors duration-300 bg-transparent border-none cursor-pointer" 
                    style={{ color: '#94ABF5' }}
                  >
                    Student Registration
                  </button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="staff" className="space-y-4 mt-6">
              <form onSubmit={handleSubmit("staff")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="staff-email" className="text-gray-700 font-medium">Staff ID / Email</Label>
                  <Input 
                    id="staff-email" 
                    name="email"
                    type="email" 
                    placeholder="Enter your staff ID or email"
                    className="border-gray-200 bg-white transition-all duration-300"
                    style={{ 
                      '--tw-ring-color': '#EFF4FF',
                      borderColor: 'var(--focus-border, #e5e7eb)'
                    }}
                    onFocus={(e) => e.target.style.setProperty('--focus-border', '#EFF4FF')}
                    onBlur={(e) => e.target.style.setProperty('--focus-border', '#e5e7eb')}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staff-password" className="text-gray-700 font-medium">Password</Label>
                  <Input 
                    id="staff-password" 
                    name="password"
                    type="password" 
                    placeholder="Enter your password"
                    className="border-gray-200 bg-white transition-all duration-300"
                    style={{ 
                      '--tw-ring-color': '#EFF4FF',
                      borderColor: 'var(--focus-border, #e5e7eb)'
                    }}
                    onFocus={(e) => e.target.style.setProperty('--focus-border', '#EFF4FF')}
                    onBlur={(e) => e.target.style.setProperty('--focus-border', '#e5e7eb')}
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full text-gray-800 transition-all duration-300 font-medium border"
                  style={{ 
                    backgroundColor: '#EFF4FF',
                    borderColor: '#E5E7EB'
                  }}
                >
                  Staff Login
                </Button>
              </form>
              <div className="text-center space-y-2">
                <button 
                  onClick={() => handleForgotPassword("staff")}
                  className="text-sm hover:underline transition-colors duration-300 bg-transparent border-none cursor-pointer" 
                  style={{ color: '#94ABF5' }}
                >
                  Forgot password?
                </button>
                <div className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button 
                    onClick={handleNavigateToRegister}
                    className="hover:underline font-medium transition-colors duration-300 bg-transparent border-none cursor-pointer" 
                    style={{ color: '#94ABF5' }}
                  >
                    Staff Registration
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
