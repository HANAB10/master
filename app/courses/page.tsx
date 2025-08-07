
"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Clock, Users, Play } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "Home Healthcare Management",
      description: "学习家庭医疗管理的核心概念和实践方法",
      status: "进行中",
      progress: 75,
      participants: 24,
      duration: "8周",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Patient Safety and Quality Care",
      description: "深入了解患者安全和质量护理的关键要素",
      status: "即将开始",
      progress: 0,
      participants: 18,
      duration: "6周",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Healthcare Technology Integration",
      description: "探索医疗技术在现代医疗体系中的应用",
      status: "已完成",
      progress: 100,
      participants: 30,
      duration: "10周",
      color: "bg-purple-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部导航 */}
        <div className="mb-6 flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回主页
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            我的课程
          </h1>
        </div>

        {/* 课程列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-4 h-4 rounded-full ${course.color}`}></div>
                  <Badge variant={course.status === "进行中" ? "default" : course.status === "即将开始" ? "secondary" : "outline"}>
                    {course.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{course.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>进度</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${course.color}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.participants} 学生
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                </div>

                <Link href={course.status === "进行中" ? "/" : "#"}>
                  <Button 
                    className="w-full" 
                    disabled={course.status === "即将开始"}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {course.status === "进行中" ? "继续学习" : 
                     course.status === "即将开始" ? "即将开始" : "查看课程"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
