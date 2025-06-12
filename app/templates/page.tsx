"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Search,
  Filter,
  BookmarkPlus,
  Briefcase,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Globe,
  ChevronRight,
  Clock,
  FileQuestion,
  Star,
  Eye,
} from "lucide-react"
import { quizTemplates, categories } from "@/data/templates"
import { TemplatePreviewModal } from "@/components/template-preview-modal"

export default function TemplatesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [previewTemplate, setPreviewTemplate] = useState<any>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  // Filter templates based on search query and selected category
  const filteredTemplates = quizTemplates.filter(
    (template) =>
      (template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === "all" || template.category === selectedCategory),
  )

  const handleUseTemplate = (templateId: number) => {
    // In a real app, this would clone the template and redirect to the edit page
    router.push(`/create-quiz?template=${templateId}`)
  }

  const handlePreview = (template: any) => {
    setPreviewTemplate(template)
    setPreviewOpen(true)
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return <GraduationCap className="h-5 w-5" />
      case "business":
        return <Briefcase className="h-5 w-5" />
      case "entertainment":
        return <Gamepad2 className="h-5 w-5" />
      case "health":
        return <HeartPulse className="h-5 w-5" />
      case "science":
        return <Lightbulb className="h-5 w-5" />
      case "general":
        return <Globe className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
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
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/create-quiz">
                <Button variant="ghost">Create Quiz</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Quiz Templates</h1>
          <p className="text-muted-foreground">
            Choose from our pre-built templates to quickly create professional quizzes
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Link href="/create-quiz">
                <Button>
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Create Custom Quiz
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="flex flex-wrap h-auto">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
                  {getCategoryIcon(category.id)}
                  <span>{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-1">No templates found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Link href="/create-quiz">
              <Button>Create a Custom Quiz</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const categoryData = categories.find((c) => c.id === template.category)
              return (
                <Card key={template.id} className="overflow-hidden flex flex-col">
                  <div className="h-3" style={{ backgroundColor: categoryData?.color || "var(--primary)" }}></div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle>{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getCategoryIcon(template.category)}
                        <span>{categoryData?.name}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileQuestion className="h-4 w-4" />
                        <span>{template.questionCount} questions</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>~{template.estimatedTime} min</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        <span>{template.difficulty}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {template.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <Button variant="outline" size="sm" onClick={() => handlePreview(template)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" onClick={() => handleUseTemplate(template.id)}>
                      Use Template
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}

        {/* Featured Templates Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Featured Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quizTemplates
              .filter((t) => t.featured)
              .slice(0, 3)
              .map((template) => {
                const categoryData = categories.find((c) => c.id === template.category)
                return (
                  <Card key={template.id} className="overflow-hidden">
                    <div className="h-3" style={{ backgroundColor: categoryData?.color || "var(--primary)" }}></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{template.title}</CardTitle>
                        <Badge variant="secondary">Featured</Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileQuestion className="h-4 w-4" />
                          <span>{template.questionCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{template.estimatedTime} min</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-4">
                      <Button variant="outline" size="sm" onClick={() => handlePreview(template)}>
                        Preview
                      </Button>
                      <Button size="sm" onClick={() => handleUseTemplate(template.id)}>
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
          </div>
        </div>
      </div>

      {/* Template Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  )
}
