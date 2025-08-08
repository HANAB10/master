
"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useAuth } from '@/contexts/auth-context'
import Link from "next/link"
import {
  Users,
  Lightbulb,
  BookOpen,
  Mic,
  Play,
  Pause,
  Brain,
  Network,
  HelpCircle,
  GitBranch,
  Compass,
  Archive,
  Puzzle,
  ExternalLink,
  FileText,
  Globe,
  Plus,
  Settings,
  User,
  LogOut,
} from "lucide-react"

// 这里包含你原来page.tsx中的所有接口定义
interface Discussion {
  id: string
  speaker: string
  content: string
  timestamp: Date
  quality: number
  keywords: string[]
  concepts: string[]
  logicalStructure: {
    hasEvidence: boolean
    hasClaim: boolean
    hasReasoning: boolean
    hasCounterargument: boolean
  }
  thoughtType: "question" | "answer" | "example" | "theory" | "challenge" | "synthesis"
  connectsTo: string[]
}

interface ThinkingNode {
  id: string
  type: "concept" | "question" | "insight" | "connection" | "conclusion"
  content: string
  position: { x: number; y: number }
  connections: Array<{
    to: string
    type: "leads_to" | "supports" | "contradicts" | "explains" | "examples"
    strength: number
  }>
  discussionIds: string[]
  timestamp: Date
  importance: number
}

interface KnowledgeBase {
  concepts: Array<{
    id: string
    name: string
    definition: string
    examples: string[]
    relatedConcepts: string[]
    sourceDiscussions: string[]
    confidence: number
  }>
  relationships: Array<{
    from: string
    to: string
    type: "is_a" | "part_of" | "causes" | "enables" | "conflicts_with"
    evidence: string[]
    strength: number
  }>
  insights: Array<{
    id: string
    content: string
    supportingEvidence: string[]
    confidence: number
    timestamp: Date
  }>
}

interface AIIntervention {
  id: string
  type:
    | "socratic_question"
    | "knowledge_synthesis"
    | "logic_clarification"
    | "resource_provision"
    | "process_guidance"
    | "summary_generation"
  content: string
  timestamp: Date
  priority: "low" | "medium" | "high"
  relatedKeywords: string[]
  targetSpeaker?: string
  followUpQuestions?: string[]
  resources?: Array<{
    id: string
    title: string
    type: "document" | "webpage" | "research" | "video"
    url?: string
    content?: string
    summary: string
  }>
  context: {
    triggerType: "silence" | "confusion" | "depth_needed" | "synthesis_time" | "knowledge_gap" | "user_message" | "logic_clarification" | "general" | "discussion_start"
    relatedNodes: string[]
  }
}

interface DiscussionSummary {
  phase: string
  keyPoints: string[]
  unresolved: string[]
  insights: string[]
  nextSteps: string[]
  knowledgeGaps: string[]
}

interface TeamMember {
  id: string
  name: string
  avatar: string
  participationLevel: number
  lastSpoke: Date | null
  speakingTime: number
  thinkingPatterns: {
    analytical: number
    creative: number
    critical: number
    practical: number
  }
  contributionTypes: {
    questions: number
    examples: number
    theories: number
    challenges: number
  }
}

interface Resource {
  id: string
  title: string
  type: "document" | "webpage" | "research" | "video"
  url?: string
  content?: string
  summary: string
}

declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

export default function StudentDashboard() {
  const { user, userData, logout } = useAuth()
  
  // 原来的所有状态变量
  const [isDiscussionActive, setIsDiscussionActive] = useState(false)
  const [discussionTime, setDiscussionTime] = useState(0)
  const [currentTopic, setCurrentTopic] = useState("Home Healthcare Management: Quality and Safety")
  const [tRATQuestion, setTRATQuestion] = useState(
    "Based on the assigned readings and case studies, what are the three most critical factors for ensuring patient safety in home healthcare settings? Rank them in order of importance and justify your ranking with evidence from the literature and real-world examples.",
  )
  const [isListening, setIsListening] = useState(false)
  const [silenceTime, setSilenceTime] = useState(0)
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [thinkingNetwork, setThinkingNetwork] = useState<ThinkingNode[]>([])
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase>({
    concepts: [],
    relationships: [],
    insights: [],
  })
  const [aiInterventions, setAiInterventions] = useState<AIIntervention[]>([])
  const [discussionSummary, setDiscussionSummary] = useState<DiscussionSummary>({
    phase: "opening",
    keyPoints: [],
    unresolved: [],
    insights: [],
    nextSteps: [],
    knowledgeGaps: [],
  })
  const [discussionPhase, setDiscussionPhase] = useState<"opening" | "exploration" | "deepening" | "synthesis">(
    "opening",
  )
  const [aiActiveMode, setAiActiveMode] = useState(true)
  const recognitionRef = useRef<any>(null)
  const [isVoiceCalibrating, setIsVoiceCalibrating] = useState(false)
  const [voiceCalibrationComplete, setVoiceCalibrationComplete] = useState(false)
  const [showVoiceCalibrationDialog, setShowVoiceCalibrationDialog] = useState(false)
  const [memberSpeakingTimes, setMemberSpeakingTimes] = useState<Record<string, number>>({
    Alice: 0,
    Bob: 0,
    Carol: 0,
    David: 0,
  })
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [userQuestions, setUserQuestions] = useState<
    Array<{
      id: string
      content: string
      timestamp: Date
      author: string
    }>
  >([])
  const [currentQuestionInput, setCurrentQuestionInput] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [showAIFeedback, setShowAIFeedback] = useState(false)

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Alice",
      avatar: "/placeholder.svg?height=40&width=40",
      participationLevel: 85,
      lastSpoke: null,
      speakingTime: 0,
      thinkingPatterns: { analytical: 0.8, creative: 0.6, critical: 0.7, practical: 0.9 },
      contributionTypes: { questions: 0, examples: 0, theories: 0, challenges: 0 },
    },
    {
      id: "2",
      name: "Bob",
      avatar: "/placeholder.svg?height=40&width=40",
      participationLevel: 72,
      lastSpoke: null,
      speakingTime: 0,
      thinkingPatterns: { analytical: 0.9, creative: 0.8, critical: 0.6, practical: 0.7 },
      contributionTypes: { questions: 0, examples: 0, theories: 0, challenges: 0 },
    },
    {
      id: "3",
      name: "Carol",
      avatar: "/placeholder.svg?height=40&width=40",
      participationLevel: 68,
      lastSpoke: null,
      speakingTime: 0,
      thinkingPatterns: { analytical: 0.7, creative: 0.9, critical: 0.8, practical: 0.6 },
      contributionTypes: { questions: 0, examples: 0, theories: 0, challenges: 0 },
    },
    {
      id: "4",
      name: "David",
      avatar: "/placeholder.svg?height=40&width=40",
      participationLevel: 91,
      lastSpoke: null,
      speakingTime: 0,
      thinkingPatterns: { analytical: 0.6, creative: 0.7, critical: 0.9, practical: 0.8 },
      contributionTypes: { questions: 0, examples: 0, theories: 0, challenges: 0 },
    },
  ]

  // 这里添加你原来的所有函数...
  // 为了简洁，我只展示部分关键函数，你需要把原来的所有函数都复制过来

  const handleLogout = async () => {
    await logout()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startDiscussion = () => {
    setIsDiscussionActive(true)
    setDiscussionTime(0)
    setDiscussionPhase("opening")
    setIsListening(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-slate-700 flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              Edu AI - 学生端讨论平台
            </h1>
            <div className="flex items-center gap-4">
              {/* 用户信息显示 */}
              <div className="text-sm text-slate-600">
                欢迎, {userData?.name || user?.email}
              </div>
              
              {/* Voice Setup Button */}
              {!voiceCalibrationComplete && (
                <Button
                  onClick={() => setShowVoiceCalibrationDialog(true)}
                  variant="outline"
                  className="border-orange-200 hover:bg-orange-50"
                >
                  <Mic className="w-4 h-4 mr-2 text-orange-600" />
                  <span className="text-orange-600">语音设置</span>
                </Button>
              )}

              {/* Discussion Control */}
              {!isDiscussionActive ? (
                <Button
                  onClick={startDiscussion}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                  disabled={!voiceCalibrationComplete}
                >
                  <Play className="w-4 h-4 mr-2" />
                  开始讨论
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsDiscussionActive(false)
                    setIsListening(false)
                  }}
                  variant="outline"
                  className="border-red-200 hover:bg-red-50"
                >
                  <Pause className="w-4 h-4 mr-2 text-red-600" />
                  <span className="text-red-600">结束讨论</span>
                </Button>
              )}

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

          {/* Topic Section */}
          <div className="bg-white rounded-lg p-4 mb-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-slate-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-600" />
                课程主题
              </h3>
            </div>
            <p className="text-slate-800">{currentTopic}</p>
          </div>

          {/* tRAT Question */}
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              团队讨论问题
            </h3>
            <p className="text-blue-900 leading-relaxed">{tRATQuestion}</p>
          </div>
        </div>

        {/* Main Content - 这里你需要添加原来的主要内容布局 */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>讨论摘要</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {isDiscussionActive 
                    ? `讨论进行中: ${formatTime(discussionTime)}`
                    : "等待开始讨论"
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Center Content */}
          <div className="col-span-6">
            <Card className="h-96">
              <CardHeader>
                <CardTitle>AI 指导</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500">
                  AI 指导内容将在这里显示
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>团队仪表板</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  团队成员参与情况
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
