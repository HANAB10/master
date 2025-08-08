
"use client"

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Brain, Users, BookOpen, BarChart3, Settings, User, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export default function StaffDashboard() {
  const { user, userData, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // 检查用户是否有权限访问教师端
    if (userData && userData.role !== 'teacher') {
      router.push('/')
    }
  }, [userData, router])

  const handleLogout = async () => {
    await logout()
  }

  if (!user || !userData || userData.role !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-indigo-800 flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              Edu AI - 教师管理平台
            </h1>
            <div className="flex items-center gap-4">
              {/* 教师信息显示 */}
              <div className="text-sm text-indigo-700">
                欢迎, {userData.name} 老师
                {userData.subject && <span className="ml-2">({userData.subject})</span>}
              </div>

              {/* User Menu */}
              <div className="relative group">
                <Avatar className="w-10 h-10 border-2 border-indigo-200 cursor-pointer hover:border-indigo-300 transition-colors">
                  <AvatarFallback className="bg-indigo-100">
                    <User className="w-5 h-5 text-indigo-600" />
                  </AvatarFallback>
                </Avatar>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <Link href="/profile">
                      <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                        <User className="w-4 h-4" />
                        个人资料
                      </div>
                    </Link>
                    <Link href="/settings">
                      <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                        <Settings className="w-4 h-4" />
                        设置
                      </div>
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div 
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      退出登录
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 教师面板概览 */}
          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <h3 className="font-medium text-indigo-800 mb-2">教师管理面板</h3>
            <p className="text-indigo-700">监控学生讨论活动，查看分析报告，管理课程内容</p>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 课堂管理 */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Users className="w-5 h-5" />
                课堂管理
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  查看活跃讨论
                </Button>
                <Button className="w-full" variant="outline">
                  管理学生分组
                </Button>
                <Button className="w-full" variant="outline">
                  设置讨论话题
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 学习分析 */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <BarChart3 className="w-5 h-5" />
                学习分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  参与度报告
                </Button>
                <Button className="w-full" variant="outline">
                  讨论质量分析
                </Button>
                <Button className="w-full" variant="outline">
                  学习成果评估
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 课程资源 */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <BookOpen className="w-5 h-5" />
                课程资源
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  管理阅读材料
                </Button>
                <Button className="w-full" variant="outline">
                  创建讨论问题
                </Button>
                <Button className="w-full" variant="outline">
                  AI辅助资源
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 实时监控 */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Brain className="w-5 h-5" />
                实时讨论监控
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-600">当前没有活跃的讨论会话</p>
                <p className="text-sm text-gray-500 mt-2">学生开始讨论时，这里会显示实时数据</p>
              </div>
            </CardContent>
          </Card>

          {/* 快速操作 */}
          <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-800">快速操作</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" size="sm">
                  创建新的讨论
                </Button>
                <Button className="w-full" size="sm" variant="outline">
                  导出数据报告
                </Button>
                <Button className="w-full" size="sm" variant="outline">
                  课程设置
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 最近活动 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>暂无最近活动记录</p>
              <p className="text-sm mt-2">学生活动将在这里显示</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
