
"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Settings, User } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部导航 */}
        <div className="mb-6 flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回主页
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">个人主页</h1>
        </div>

        {/* 用户信息卡片 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">用户名</h2>
                <p className="text-gray-600">student@university.edu</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800">参与讨论</h3>
                <p className="text-2xl font-bold text-blue-600">15</p>
                <p className="text-sm text-blue-700">次讨论</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">总发言时间</h3>
                <p className="text-2xl font-bold text-green-600">2.5</p>
                <p className="text-sm text-green-700">小时</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800">讨论质量</h3>
                <p className="text-2xl font-bold text-purple-600">4.2</p>
                <p className="text-sm text-purple-700">平均分</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 最近活动 */}
        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium">参与了 Home Healthcare Management 讨论</h4>
                <p className="text-sm text-gray-600">2小时前</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium">完成了 Patient Safety 练习</h4>
                <p className="text-sm text-gray-600">1天前</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-medium">获得了 Active Participant 徽章</h4>
                <p className="text-sm text-gray-600">3天前</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
