"use client"

import { ShareQuizModal } from "@/components/share-quiz-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/useAuth"
import { deleteQuiz, duplicateQuiz, getUserQuizzes, toggleQuizFeatured } from "@/lib/firebase"
import {
    BarChart3,
    BookOpen,
    Calendar,
    Clock,
    Copy,
    Filter,
    MoreVertical,
    Plus,
    Search,
    Share2,
    Star,
    Trash2,
    Users
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Quiz {
  id: string
  title: string
  description: string
  questions: number
  responses: number
  status: "draft" | "published"
  createdAt: string
  lastModified: string
  tags: string[]
  featured: boolean
  isTemplate: boolean
  completionRate?: number
  averageScore?: number
}

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!user) {
        router.push("/login")
        return
      }

      try {
        const userQuizzes = await getUserQuizzes(user.uid)
        setQuizzes(userQuizzes)
      } catch (error) {
        console.error("Error fetching quizzes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [user, router])

  // Get all unique tags
  const allTags = Array.from(new Set(quizzes.flatMap((quiz) => quiz.tags)))

  // Filter quizzes based on search query, tab, and tags
  const filteredQuizzes = quizzes
    .filter(
      (quiz) =>
        (quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (activeTab === "all" ||
          (activeTab === "published" && quiz.status === "published") ||
          (activeTab === "drafts" && quiz.status === "draft") ||
          (activeTab === "featured" && quiz.featured) ||
          (activeTab === "templates" && quiz.isTemplate)) &&
        (selectedTags.length === 0 || selectedTags.every((tag) => quiz.tags.includes(tag))),
    )
    .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())

  const handleShareQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setShareModalOpen(true)
  }

  const handleDeleteQuiz = async (quizId: string) => {
    if (!user) return

    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await deleteQuiz(quizId)
        setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId))
      } catch (error) {
        console.error("Error deleting quiz:", error)
        alert("Failed to delete quiz")
      }
    }
  }

  const handleToggleFeatured = async (quizId: string, currentFeatured: boolean) => {
    try {
      await toggleQuizFeatured(quizId, !currentFeatured)
      setQuizzes(quizzes.map(quiz => 
        quiz.id === quizId ? { ...quiz, featured: !currentFeatured } : quiz
      ))
    } catch (error) {
      console.error("Error toggling featured status:", error)
      alert("Failed to update featured status")
    }
  }

  const handleDuplicateQuiz = async (quizId: string) => {
    try {
      const newQuizId = await duplicateQuiz(quizId, user!.uid)
      const newQuiz = quizzes.find(q => q.id === quizId)
      if (newQuiz) {
        setQuizzes([...quizzes, { ...newQuiz, id: newQuizId, title: `${newQuiz.title} (Copy)`, isTemplate: false }])
      }
    } catch (error) {
      console.error("Error duplicating quiz:", error)
      alert("Failed to duplicate quiz")
    }
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // Calculate stats
  const totalQuizzes = quizzes.length
  const publishedQuizzes = quizzes.filter((q) => q.status === "published").length
  const totalResponses = quizzes.reduce((sum, quiz) => sum + quiz.responses, 0)
  const avgCompletionRate = quizzes.reduce((sum, quiz) => sum + quiz.completionRate, 0) / quizzes.length || 0

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

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
              <Link href="/analytics">
                <Button variant="ghost">Analytics</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <ThemeToggle />
              <Button variant="outline" onClick={() => router.push("/login")}>Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your quizzes and track performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalQuizzes}</div>
              <p className="text-xs text-muted-foreground">{publishedQuizzes} published</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalResponses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgCompletionRate.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">Average across all quizzes</p>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Management */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Your Quizzes</CardTitle>
                <CardDescription>Create and manage your quiz collection</CardDescription>
              </div>
              <div className="flex gap-2">
                <Link href="/create-quiz">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Quiz
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">SORT BY</DropdownMenuLabel>
                    <DropdownMenuItem>Newest First</DropdownMenuItem>
                    <DropdownMenuItem>Oldest First</DropdownMenuItem>
                    <DropdownMenuItem>Most Popular</DropdownMenuItem>
                    <DropdownMenuItem>Highest Score</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                      SHOW ONLY
                    </DropdownMenuLabel>
                    <DropdownMenuItem>Published</DropdownMenuItem>
                    <DropdownMenuItem>Drafts</DropdownMenuItem>
                    <DropdownMenuItem>Featured</DropdownMenuItem>
                    <DropdownMenuItem>Templates</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                {selectedTags.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])}>
                    Clear filters
                  </Button>
                )}
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Quiz List */}
            {filteredQuizzes.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg mb-1">No quizzes found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Link href="/create-quiz">
                  <Button>Create a New Quiz</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="border rounded-lg p-4 hover:bg-accent/50 transition-colors relative group"
                  >
                    {quiz.featured && (
                      <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{quiz.title}</h3>
                          <Badge variant={quiz.status === "published" ? "default" : "secondary"}>{quiz.status}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{quiz.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {quiz.questions} questions
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {quiz.responses} responses
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {quiz.createdAt}
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            {quiz.averageScore}% avg score
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {quiz.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShareQuiz(quiz)}
                          className="hidden sm:flex"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Link href={`/quiz/${quiz.id}`}>
                          <Button variant="outline" size="sm" className="hidden sm:flex">
                            View
                          </Button>
                        </Link>
                        <Link href={`/edit-quiz/${quiz.id}`}>
                          <Button variant="outline" size="sm" className="hidden sm:flex">
                            Edit
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="sm:hidden" onClick={() => handleShareQuiz(quiz)}>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="sm:hidden" asChild>
                              <Link href={`/quiz/${quiz.id}`}>
                                <BookOpen className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="sm:hidden" asChild>
                              <Link href={`/edit-quiz/${quiz.id}`}>
                                <BookOpen className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/analytics/quiz/${quiz.id}`}>
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Analytics
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="h-4 w-4 mr-2" />
                              {quiz.featured ? "Unfeature" : "Feature"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteQuiz(quiz.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Share Modal */}
      <ShareQuizModal quiz={selectedQuiz} open={shareModalOpen} onOpenChange={setShareModalOpen} />
    </div>
  )
}
