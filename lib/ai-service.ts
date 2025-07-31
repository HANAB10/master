"use client"

interface AIResponse {
  type: "suggestion" | "question" | "resource" | "analysis"
  content: string
  confidence: number
  relatedKeywords: string[]
}

interface DiscussionContext {
  currentPhase: string
  recentDiscussions: any[]
  silenceDuration: number
  participationLevels: Record<string, number>
}

class AIService {
  private apiKey = ""
  private baseUrl = "https://api.openai.com/v1"

  constructor() {
    // 在实际应用中，API密钥应该从环境变量获取
    // this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
  }

  async generateResponse(context: DiscussionContext): Promise<AIResponse> {
    try {
      // 在实际应用中，这里会调用真实的AI API
      // const response = await fetch(`${this.baseUrl}/chat/completions`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${this.apiKey}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     model: 'gpt-4',
      //     messages: this.buildPrompt(context),
      //     temperature: 0.7,
      //     max_tokens: 200
      //   })
      // })

      // 模拟AI响应
      return this.simulateAIResponse(context)
    } catch (error) {
      console.error("AI服务调用失败:", error)
      return this.getFallbackResponse(context)
    }
  }

  private simulateAIResponse(context: DiscussionContext): AIResponse {
    const responses = {
      opening: [
        {
          type: "suggestion" as const,
          content: "💡 建议大家先分享一个与主题相关的个人经历，这样能快速进入讨论状态",
          confidence: 0.85,
          relatedKeywords: ["个人经历", "破冰", "讨论状态"],
        },
        {
          type: "question" as const,
          content: '🤔 我们先来明确一下：大家理解的"有效沟通"是什么样的？',
          confidence: 0.9,
          relatedKeywords: ["有效沟通", "定义", "理解"],
        },
      ],
      exploration: [
        {
          type: "analysis" as const,
          content: "📊 我发现大家提到了几个关键问题，让我们分析一下它们之间的关联性",
          confidence: 0.8,
          relatedKeywords: ["关键问题", "关联性", "分析"],
        },
        {
          type: "resource" as const,
          content: "📚 相关研究表明：团队沟通效率与心理安全感呈正相关，安全感越高，沟通越开放",
          confidence: 0.95,
          relatedKeywords: ["研究", "心理安全感", "沟通效率"],
        },
      ],
      deepening: [
        {
          type: "question" as const,
          content: "🎯 基于刚才的讨论，哪个解决方案最具可操作性？实施时需要什么资源支持？",
          confidence: 0.88,
          relatedKeywords: ["解决方案", "可操作性", "资源支持"],
        },
      ],
      synthesis: [
        {
          type: "suggestion" as const,
          content: "📝 建议我们整理一下讨论成果：问题识别→原因分析→解决方案→实施计划",
          confidence: 0.92,
          relatedKeywords: ["讨论成果", "整理", "实施计划"],
        },
      ],
    }

    const phaseResponses = responses[context.currentPhase as keyof typeof responses] || responses.opening
    return phaseResponses[Math.floor(Math.random() * phaseResponses.length)]
  }

  private getFallbackResponse(context: DiscussionContext): AIResponse {
    return {
      type: "suggestion",
      content: "💭 让我们继续深入讨论这个话题，每个人的观点都很重要",
      confidence: 0.6,
      relatedKeywords: ["深入讨论", "观点", "重要"],
    }
  }

  async analyzeDiscussionQuality(discussions: any[]): Promise<{
    averageQuality: number
    suggestions: string[]
    participationBalance: number
  }> {
    // 模拟讨论质量分析
    const averageQuality =
      discussions.length > 0 ? discussions.reduce((acc, d) => acc + d.quality, 0) / discussions.length : 0

    const suggestions = ["建议增加具体案例来支撑观点", "可以尝试从不同角度分析问题", "鼓励更多成员参与讨论"]

    const speakers = new Set(discussions.map((d) => d.speaker))
    const participationBalance = speakers.size / 4 // 假设4人小组

    return {
      averageQuality,
      suggestions,
      participationBalance,
    }
  }

  async generateMindMap(discussions: any[]): Promise<any[]> {
    // 模拟思维导图生成
    const keywords = discussions.flatMap((d) => d.keywords || [])
    const uniqueKeywords = [...new Set(keywords)]

    return uniqueKeywords.slice(0, 8).map((keyword, index) => ({
      id: `node-${index}`,
      label: keyword,
      type: "concept",
      x: 200 + (index % 3) * 150,
      y: 100 + Math.floor(index / 3) * 80,
      connections: [],
    }))
  }

  async pushRelevantResources(keywords: string[]): Promise<any[]> {
    // 模拟资源推送
    const resourceDatabase = [
      {
        title: "团队沟通效率研究",
        type: "research",
        content: "MIT研究显示，高效团队的沟通频率比普通团队高40%",
        relevance: 0.9,
      },
      {
        title: "Google项目亚里士多德",
        type: "case",
        content: "Google发现心理安全感是高效团队的最重要因素",
        relevance: 0.85,
      },
      {
        title: "沟通漏斗理论",
        type: "theory",
        content: "信息传递过程中的逐层衰减现象分析",
        relevance: 0.8,
      },
    ]

    return resourceDatabase
      .filter(() => Math.random() > 0.4)
      .slice(0, 2)
      .map((resource) => ({
        ...resource,
        id: Date.now().toString() + Math.random(),
      }))
  }
}

export const aiService = new AIService()
