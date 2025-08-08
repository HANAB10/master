
"use client"

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoginPage from './login/page'

// 学生端主界面组件
function StudentDashboard() {
  // 这里是你当前的学生端界面代码
  // 我会把原来page.tsx的内容移到这里
  return (
    <div>
      {/* 这里放置你的学生端界面代码 */}
      <h1>学生端主界面</h1>
      <p>欢迎来到学生端，这里是团队讨论平台</p>
      {/* 之后我们会把完整的学生界面代码放在这里 */}
    </div>
  )
}

// 教师端主界面组件
function TeacherDashboard() {
  return (
    <div>
      <h1>教师端主界面</h1>
      <p>欢迎来到教师端，这里是管理和监控平台</p>
      {/* 教师端的功能界面 */}
    </div>
  )
}

export default function MainPage() {
  const { user, userData, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // 如果已经认证，根据角色跳转到对应的仪表板
    if (!loading && user && userData) {
      if (userData.role === 'teacher') {
        router.push('/staff-dashboard')
      }
      // 学生保持在当前页面，显示学生界面
    }
  }, [user, userData, loading, router])

  // 显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // 如果没有登录，显示登录页面
  if (!user) {
    return <LoginPage />
  }

  // 如果是学生，显示学生界面
  if (userData?.role === 'student') {
    return <StudentDashboard />
  }

  // 如果是老师，会在useEffect中跳转，这里作为备用
  if (userData?.role === 'teacher') {
    return <TeacherDashboard />
  }

  // 默认情况，如果角色未知
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">加载中...</h1>
        <p className="text-gray-600">正在获取用户信息...</p>
      </div>
    </div>
  )
}
