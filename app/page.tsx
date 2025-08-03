"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Send,
  Mic,
  Play,
  Pause,
  Brain,
  Users,
  BookOpen,
  Settings,
  Plus,
  MoreHorizontal,
  Share,
  FileText,
  Lightbulb,
  HelpCircle,
  Network,
  Menu,
  X
} from "lucide-react"

interface Discussion {
  id: string
  speaker: string
  content: string
  timestamp: Date
  type: "user" | "ai" | "system"
  quality?: number
  keywords?: string[]
}

interface TeamMember {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  lastActive: Date
}

export default function EduMindAI() {
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isDiscussionActive, setIsDiscussionActive] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentTopic, setCurrentTopic] = useState("Home Healthcare Management: Quality and Safety")
  const [showSettings, setShowSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const teamMembers: TeamMember[] = [
    { id: "1", name: "Alice", avatar: "A", isOnline: true, lastActive: new Date() },
    { id: "2", name: "Bob", avatar: "B", isOnline: true, lastActive: new Date() },
    { id: "3", name: "Carol", avatar: "C", isOnline: false, lastActive: new Date(Date.now() - 300000) },
    { id: "4", name: "David", avatar: "D", isOnline: true, lastActive: new Date() },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [discussions])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Discussion = {
      id: Date.now().toString(),
      speaker: "You",
      content: inputMessage,
      timestamp: new Date(),
      type: "user"
    }

    setDiscussions(prev => [...prev, newMessage])
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Discussion = {
        id: (Date.now() + 1).toString(),
        speaker: "EduMind AI",
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        type: "ai"
      }
      setDiscussions(prev => [...prev, aiResponse])
    }, 1000)
  }

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "That's an excellent point about home healthcare safety. Can you elaborate on how this factor specifically impacts patient outcomes?",
      "I see you're focusing on medication management. How does this relate to the caregiver training protocols mentioned in the assigned readings?",
      "Great insight! This connects well to the emergency response framework. What evidence from the case studies supports this ranking?",
      "Interesting perspective. Have you considered how technology integration might affect the priority of these safety factors?",
      "This is a thoughtful analysis. How might different patient demographics change your safety factor priorities?"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startDiscussion = () => {
    setIsDiscussionActive(true)
    const welcomeMessage: Discussion = {
      id: "welcome",
      speaker: "EduMind AI",
      content: "Welcome to your Team-Based Learning discussion on home healthcare safety! I'm here to facilitate your conversation and provide guidance. Please begin by sharing your initial thoughts on the three most critical safety factors in home healthcare settings.",
      timestamp: new Date(),
      type: "system"
    }
    setDiscussions([welcomeMessage])
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-gray-200 flex flex-col bg-gray-50`}>
        {sidebarOpen && (
          <>
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold text-gray-900">EduMind AI</h1>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                onClick={startDiscussion}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                disabled={isDiscussionActive}
              >
                <Plus className="w-4 h-4 mr-2" />
                {isDiscussionActive ? "Discussion Active" : "Start New Discussion"}
              </Button>
            </div>

            {/* Discussion Topic */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Current Topic</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{currentTopic}</p>
            </div>

            {/* Team Members */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Team Members</h3>
              <div className="space-y-2">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-sm bg-blue-500 text-white">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                        member.isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">
                        {member.isOnline ? 'Online' : `Last active ${Math.floor((Date.now() - member.lastActive.getTime()) / 60000)}m ago`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="p-4 flex-1">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Resources</h3>
              <div className="space-y-2">
                <div className="p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">Chapter 12: Home Healthcare Quality</span>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Patient Safety Research</span>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-700">Technology Integration Case Study</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="p-4 border-t border-gray-200">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!sidebarOpen && (
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                  <Menu className="w-4 h-4" />
                </Button>
              )}
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                <h1 className="text-lg font-semibold text-gray-900">Team-Based Learning Discussion</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="max-w-4xl mx-auto">
              {discussions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <Brain className="w-16 h-16 text-gray-300 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Welcome to EduMind AI
                  </h2>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Start your team-based learning discussion. I'll help facilitate conversations, provide resources, and guide your learning process.
                  </p>
                  <Button onClick={startDiscussion} className="bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Discussion
                  </Button>
                </div>
              ) : (
                <div className="p-4 space-y-6">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="group">
                      <div className={`flex gap-4 ${discussion.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {discussion.type !== 'user' && (
                          <Avatar className="w-8 h-8 mt-1">
                            <AvatarFallback className={`text-sm ${
                              discussion.type === 'ai' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'
                            }`}>
                              {discussion.type === 'ai' ? <Brain className="w-4 h-4" /> : 'S'}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-3xl ${discussion.type === 'user' ? 'order-1' : ''}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-sm font-medium ${
                              discussion.type === 'user' ? 'text-gray-900' : 
                              discussion.type === 'ai' ? 'text-blue-600' : 'text-gray-600'
                            }`}>
                              {discussion.speaker}
                            </span>
                            <span className="text-xs text-gray-500">
                              {discussion.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <div className={`p-4 rounded-2xl ${
                            discussion.type === 'user' 
                              ? 'bg-blue-600 text-white ml-auto' 
                              : discussion.type === 'ai'
                              ? 'bg-gray-100 text-gray-900'
                              : 'bg-green-50 text-green-800 border border-green-200'
                          }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {discussion.content}
                            </p>
                          </div>
                        </div>
                        {discussion.type === 'user' && (
                          <Avatar className="w-8 h-8 mt-1">
                            <AvatarFallback className="text-sm bg-gray-600 text-white">
                              You
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        {isDiscussionActive && (
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="min-h-[44px] pr-12 resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    <Mic className={`w-4 h-4 ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                  size="lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{inputMessage.length}/2000</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Customize your EduMind AI experience
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Voice Recognition</label>
              <Button variant="outline" className="w-full justify-start">
                <Mic className="w-4 h-4 mr-2" />
                Calibrate Voice
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">AI Assistance Level</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>High - Frequent guidance</option>
                <option>Medium - Balanced assistance</option>
                <option>Low - Minimal intervention</option>
              </select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}