"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, BarChart3, Users, Clock, ArrowUpRight, ArrowDownRight, Calendar, Download } from "lucide-react"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")

  // Mock data
  const quizzes = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      responses: 234,
      avgScore: 72,
      completionRate: 78,
    },
    {
      id: 2,
      title: "React Components Quiz",
      responses: 89,
      avgScore: 68,
      completionRate: 65,
    },
    {
      id: 3,
      title: "CSS Grid & Flexbox",
      responses: 156,
      avgScore: 84,
      completionRate: 92,
    },
    {
      id: 4,
      title: "TypeScript Advanced Types",
      responses: 42,
      avgScore: 62,
      completionRate: 58,
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      responses: 118,
      avgScore: 76,
      completionRate: 85,
    },
  ]

  const totalResponses = quizzes.reduce((sum, quiz) => sum + quiz.responses, 0)
  const avgScore = Math.round(quizzes.reduce((sum, quiz) => sum + quiz.avgScore, 0) / quizzes.length)
  const avgCompletionRate = Math.round(quizzes.reduce((sum, quiz) => sum + quiz.completionRate, 0) / quizzes.length)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">QuizMaster</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Button variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics</h1>
            <p className="text-muted-foreground">Track performance and engagement across your quizzes</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalResponses.toLocaleString()}</div>
              <div className="flex items-center pt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500 font-medium">+12.5%</span>
                <span className="text-xs text-muted-foreground ml-1">from previous period</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgScore}%</div>
              <div className="flex items-center pt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500 font-medium">+3.2%</span>
                <span className="text-xs text-muted-foreground ml-1">from previous period</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgCompletionRate}%</div>
              <div className="flex items-center pt-1">
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-xs text-red-500 font-medium">-1.8%</span>
                <span className="text-xs text-muted-foreground ml-1">from previous period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Response Trends</CardTitle>
                <CardDescription>Quiz responses over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Quizzes */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Quizzes</CardTitle>
                <CardDescription>Based on completion rate and average score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizzes
                    .sort((a, b) => b.completionRate - a.completionRate)
                    .slice(0, 3)
                    .map((quiz, index) => (
                      <div key={quiz.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{quiz.title}</h4>
                            <p className="text-sm text-muted-foreground">{quiz.responses} responses</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{quiz.completionRate}%</div>
                          <div className="text-sm text-muted-foreground">completion rate</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Performance</CardTitle>
                <CardDescription>Detailed metrics for each quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{quiz.title}</h4>
                        <Link href={`/analytics/quiz/${quiz.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Responses</div>
                          <div className="font-medium">{quiz.responses}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Avg Score</div>
                          <div className="font-medium">{quiz.avgScore}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Completion</div>
                          <div className="font-medium">{quiz.completionRate}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Where your quiz takers are located</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center">
                      <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Geographic chart would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Types</CardTitle>
                  <CardDescription>How users access your quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Desktop</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mobile</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tablet</span>
                      <span className="text-sm font-medium">7%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "7%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Time to Complete</CardTitle>
                  <CardDescription>Average time spent on quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Time distribution chart would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Drop-off Points</CardTitle>
                  <CardDescription>Where users typically abandon quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Question 1</span>
                      <span className="text-sm font-medium">5% drop-off</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Question 3</span>
                      <span className="text-sm font-medium">12% drop-off</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Question 7</span>
                      <span className="text-sm font-medium">18% drop-off</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Question 10</span>
                      <span className="text-sm font-medium">25% drop-off</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
