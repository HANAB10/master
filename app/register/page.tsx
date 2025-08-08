
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Users } from 'lucide-react'

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("student")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleRegister = async (userType: string, formData: FormData) => {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    
    setLoading(true)
    setError("")
    setSuccess("")
    
    // 基本验证
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }
    
    try {
      // 使用 Supabase 注册用户
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            user_type: userType,
            // 根据用户类型添加额外信息
            ...(userType === "student" ? {
              student_id: formData.get("studentId"),
              course: formData.get("course"),
              year_of_study: formData.get("yearOfStudy")
            } : {
              staff_id: formData.get("staffId"),
              department: formData.get("department"),
              position: formData.get("position")
            })
          }
        }
      })
      
      if (signUpError) {
        setError(signUpError.message)
        return
      }
      
      if (data.user && !data.user.email_confirmed_at) {
        setSuccess("Registration successful! Please check your email to confirm your account.")
        // 3秒后跳转到登录页
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } else {
        setSuccess("Registration successful!")
        router.push("/login")
      }
      
    } catch (err) {
      setError("An error occurred during registration")
      console.error("Registration error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md shadow-lg border border-edu-light bg-white">
        <CardHeader className="space-y-1 text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Join Edu AI
          </CardTitle>
          <CardDescription className="text-gray-600">Create your academic account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-50">
              <TabsTrigger 
                value="student" 
                className="flex items-center gap-2 data-[state=active]:text-gray-800 transition-all duration-300 border"
                style={{ 
                  backgroundColor: activeTab === 'student' ? '#EFF4FF' : undefined,
                  borderColor: activeTab === 'student' ? '#E5E7EB' : 'transparent'
                }}
              >
                <GraduationCap className="h-4 w-4" />
                Student
              </TabsTrigger>
              <TabsTrigger 
                value="staff" 
                className="flex items-center gap-2 data-[state=active]:text-gray-800 transition-all duration-300 border"
                style={{ 
                  backgroundColor: activeTab === 'staff' ? '#EFF4FF' : undefined,
                  borderColor: activeTab === 'staff' ? '#E5E7EB' : 'transparent'
                }}
              >
                <Users className="h-4 w-4" />
                Staff
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="student" className="space-y-4 mt-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                  {success}
                </div>
              )}
              <form action={(formData) => handleRegister("student", formData)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-firstName" className="text-gray-700 font-medium">First Name</Label>
                    <Input 
                      id="student-firstName" 
                      name="firstName"
                      type="text" 
                      placeholder="John"
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
                    <Label htmlFor="student-lastName" className="text-gray-700 font-medium">Last Name</Label>
                    <Input 
                      id="student-lastName" 
                      name="lastName"
                      type="text" 
                      placeholder="Smith"
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="student-studentId" className="text-gray-700 font-medium">Student ID</Label>
                  <Input 
                    id="student-studentId" 
                    name="studentId"
                    type="text" 
                    placeholder="e.g., 2024001234"
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
                  <Label htmlFor="student-email" className="text-gray-700 font-medium">Email Address</Label>
                  <Input 
                    id="student-email" 
                    name="email"
                    type="email" 
                    placeholder="john.smith@university.edu"
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
                  <Label htmlFor="student-course" className="text-gray-700 font-medium">Course of Study</Label>
                  <Select name="course" required>
                    <SelectTrigger className="border-gray-200 bg-white transition-all duration-300"
                      style={{ 
                        '--tw-ring-color': '#EFF4FF',
                        borderColor: 'var(--focus-border, #e5e7eb)'
                      }}
                      onFocus={(e) => e.currentTarget.style.setProperty('--focus-border', '#EFF4FF')}
                      onBlur={(e) => e.currentTarget.style.setProperty('--focus-border', '#e5e7eb')}
                    >
                      <SelectValue placeholder="Select your course" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="business">Business Studies</SelectItem>
                      <SelectItem value="psychology">Psychology</SelectItem>
                      <SelectItem value="english">English Literature</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="student-year" className="text-gray-700 font-medium">Year of Study</Label>
                  <Select name="yearOfStudy" required>
                    <SelectTrigger className="border-gray-200 bg-white transition-all duration-300"
                      style={{ 
                        '--tw-ring-color': '#EFF4FF',
                        borderColor: 'var(--focus-border, #e5e7eb)'
                      }}
                      onFocus={(e) => e.currentTarget.style.setProperty('--focus-border', '#EFF4FF')}
                      onBlur={(e) => e.currentTarget.style.setProperty('--focus-border', '#e5e7eb')}
                    >
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                      <SelectItem value="masters">Masters</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="student-password" className="text-gray-700 font-medium">Password</Label>
                  <Input 
                    id="student-password" 
                    name="password"
                    type="password" 
                    placeholder="Create a strong password"
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
                  <Label htmlFor="student-confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                  <Input 
                    id="student-confirmPassword" 
                    name="confirmPassword"
                    type="password" 
                    placeholder="Confirm your password"
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
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Student Account"}
                </Button>
              </form>
              
              <div className="text-center">
                <div className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="hover:underline font-medium transition-colors duration-300" style={{ color: '#94ABF5' }}>
                    Sign in here
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="staff" className="space-y-4 mt-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                  {success}
                </div>
              )}
              <form action={(formData) => handleRegister("staff", formData)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="staff-firstName" className="text-gray-700 font-medium">First Name</Label>
                    <Input 
                      id="staff-firstName" 
                      name="firstName"
                      type="text" 
                      placeholder="Dr. Jane"
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
                    <Label htmlFor="staff-lastName" className="text-gray-700 font-medium">Last Name</Label>
                    <Input 
                      id="staff-lastName" 
                      name="lastName"
                      type="text" 
                      placeholder="Doe"
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="staff-staffId" className="text-gray-700 font-medium">Staff ID</Label>
                  <Input 
                    id="staff-staffId" 
                    name="staffId"
                    type="text" 
                    placeholder="e.g., STAFF001234"
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
                  <Label htmlFor="staff-email" className="text-gray-700 font-medium">Email Address</Label>
                  <Input 
                    id="staff-email" 
                    name="email"
                    type="email" 
                    placeholder="jane.doe@university.edu"
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
                  <Label htmlFor="staff-department" className="text-gray-700 font-medium">Department</Label>
                  <Select name="department" required>
                    <SelectTrigger className="border-gray-200 bg-white transition-all duration-300"
                      style={{ 
                        '--tw-ring-color': '#EFF4FF',
                        borderColor: 'var(--focus-border, #e5e7eb)'
                      }}
                      onFocus={(e) => e.currentTarget.style.setProperty('--focus-border', '#EFF4FF')}
                      onBlur={(e) => e.currentTarget.style.setProperty('--focus-border', '#e5e7eb')}
                    >
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="business">Business School</SelectItem>
                      <SelectItem value="psychology">Psychology</SelectItem>
                      <SelectItem value="english">English Department</SelectItem>
                      <SelectItem value="history">History Department</SelectItem>
                      <SelectItem value="administration">Administration</SelectItem>
                      <SelectItem value="library">Library Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="staff-position" className="text-gray-700 font-medium">Position</Label>
                  <Select name="position" required>
                    <SelectTrigger className="border-gray-200 bg-white transition-all duration-300"
                      style={{ 
                        '--tw-ring-color': '#EFF4FF',
                        borderColor: 'var(--focus-border, #e5e7eb)'
                      }}
                      onFocus={(e) => e.currentTarget.style.setProperty('--focus-border', '#EFF4FF')}
                      onBlur={(e) => e.currentTarget.style.setProperty('--focus-border', '#e5e7eb')}
                    >
                      <SelectValue placeholder="Select your position" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="associate-professor">Associate Professor</SelectItem>
                      <SelectItem value="assistant-professor">Assistant Professor</SelectItem>
                      <SelectItem value="lecturer">Lecturer</SelectItem>
                      <SelectItem value="senior-lecturer">Senior Lecturer</SelectItem>
                      <SelectItem value="teaching-assistant">Teaching Assistant</SelectItem>
                      <SelectItem value="researcher">Researcher</SelectItem>
                      <SelectItem value="administrator">Administrator</SelectItem>
                      <SelectItem value="librarian">Librarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="staff-password" className="text-gray-700 font-medium">Password</Label>
                  <Input 
                    id="staff-password" 
                    name="password"
                    type="password" 
                    placeholder="Create a strong password"
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
                  <Label htmlFor="staff-confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                  <Input 
                    id="staff-confirmPassword" 
                    name="confirmPassword"
                    type="password" 
                    placeholder="Confirm your password"
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
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Staff Account"}
                </Button>
              </form>
              
              <div className="text-center">
                <div className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="hover:underline font-medium transition-colors duration-300" style={{ color: '#94ABF5' }}>
                    Sign in here
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
