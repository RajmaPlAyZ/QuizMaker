"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { quizTemplates } from "@/data/templates"
import { useAuth } from "@/hooks/useAuth"
import { createQuiz } from "@/lib/firebase"
import {
    ArrowLeft,
    FileText,
    Loader2,
    Palette,
  Plus,
  Settings,
  Sparkles,
    Trash2
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Question {
  id: string
  text: string
  type: "multiple-choice" | "true-false" | "short-answer"
  options?: string[]
  correctAnswer: string
  points: number
}

export default function CreateQuizPage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")

  const { user } = useAuth()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [activeTab, setActiveTab] = useState("questions")
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Load template data if template ID is provided
  useEffect(() => {
    if (templateId) {
      const template = quizTemplates.find((t) => t.id === Number(templateId))
      if (template) {
        setTitle(template.title)
        setDescription(template.description)
        setTags(template.tags)

        // Convert template questions to the required format
        const formattedQuestions: Question[] = template.questions.map((q, index) => ({
          id: Math.random().toString(36).substr(2, 9),
          text: q.question,
          type: q.type,
          options: q.options,
          correctAnswer: q.correctAnswer,
          points: 1,
        }))

        setQuestions(formattedQuestions)

        // Set appropriate time limit based on template's estimated time
        // Assuming a default time limit if template.estimatedTime is not provided
        // You might want to implement a more robust time limit setting logic based on the template
      }
    }
  }, [templateId])

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      text: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 1
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSave = async () => {
    if (!user) {
      alert("Please log in to create a quiz")
      return
    }

    if (!title.trim()) {
      alert("Please enter a title for your quiz")
      return
    }

    if (questions.length === 0) {
      alert("Please add at least one question to your quiz")
      return
    }

    // Validate all questions have required fields
    const invalidQuestions = questions.filter(q => 
      !q.text.trim() || 
      !q.correctAnswer.trim() || 
      (q.type === "multiple-choice" && (!q.options || q.options.some(opt => !opt.trim())))
    )

    if (invalidQuestions.length > 0) {
      alert("Please fill in all required fields for each question")
      return
    }

    setLoading(true)
    try {
      const quizData = {
        title: title.trim(),
        description: description.trim(),
        tags: tags,
        questions: questions.map(q => ({
          text: q.text.trim(),
          type: q.type,
          options: q.options?.map(opt => opt.trim()),
          correctAnswer: q.correctAnswer.trim(),
          points: q.points
        })),
        settings: {
          timeLimit: 0,
          shuffleQuestions: false,
          showResults: true
        },
        theme: {
          primaryColor: "#000000",
          secondaryColor: "#ffffff",
          fontFamily: "Inter"
        },
        status: "draft",
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        userId: user.uid,
        isTemplate: false,
        featured: false
      }

      const quizId = await createQuiz(quizData, user.uid)
      router.push(`/edit-quiz/${quizId}`)
    } catch (error) {
      console.error("Error creating quiz:", error)
      alert("Failed to create quiz. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const generateQuizWithAI = async () => {
    if (!user) {
      alert("Please log in to use AI generation")
      return
    }

    setIsGenerating(true)
    try {
    // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setTitle("JavaScript ES6 Features")
      setDescription("Test your knowledge of modern JavaScript ES6 features and syntax")
      setTags(["Programming", "JavaScript", "Web Development"])
      
      const generatedQuestions: Question[] = [
        {
          id: Math.random().toString(36).substr(2, 9),
          text: "Which of the following is NOT an ES6 feature?",
          type: "multiple-choice",
          options: ["Arrow Functions", "let and const", "Template Literals", "Optional Chaining"],
          correctAnswer: "Optional Chaining",
          points: 1
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          text: "Which of the following are valid ways to declare variables in ES6?",
          type: "multiple-choice",
          options: ["var", "let", "const", "def"],
          correctAnswer: "let",
          points: 1
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          text: "Arrow functions in ES6 have their own 'this' binding.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: "False",
          points: 1
        }
      ]
      
      setQuestions(generatedQuestions)
    } catch (error) {
      console.error("Error generating quiz:", error)
      alert("Failed to generate quiz. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            <h1 className="text-2xl font-bold">Create Quiz</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Quiz"}
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              Publish Quiz
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="questions" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="questions">
                  <FileText className="h-4 w-4 mr-2" />
                  Questions
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="theme">
                  <Palette className="h-4 w-4 mr-2" />
                  Theme
                </TabsTrigger>
          </TabsList>

              <TabsContent value="questions">
          <Card>
            <CardHeader>
                    <CardTitle>Quiz Questions</CardTitle>
                    <CardDescription>Add and manage your quiz questions</CardDescription>
            </CardHeader>
                  <CardContent>
                    {questions.map((question, index) => (
                      <Card key={question.id} className="mb-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle>Question {index + 1}</CardTitle>
                        <Button
                          variant="ghost"
                            size="icon"
                          onClick={() => removeQuestion(question.id)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <Label>Question Text</Label>
                        <Input
                                value={question.text}
                                onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                      placeholder="Enter your question"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`question-type-${question.id}`}>Question Type</Label>
                              <select
                                id={`question-type-${question.id}`}
                                value={question.type}
                                onChange={(e) => updateQuestion(question.id, "type", e.target.value)}
                                className="w-full p-2 border rounded"
                                aria-label="Select question type"
                              >
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="true-false">True/False</option>
                                <option value="short-answer">Short Answer</option>
                              </select>
                            </div>
                            {question.type === "multiple-choice" && (
                              <div className="space-y-2">
                                <Label>Options</Label>
                                {question.options?.map((option, optionIndex) => (
                                <Input
                                    key={optionIndex}
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...(question.options || [])]
                                      newOptions[optionIndex] = e.target.value
                                      updateQuestion(question.id, "options", newOptions)
                                    }}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  />
                                ))}
                              </div>
                            )}
                            <div>
                              <Label htmlFor={`correct-answer-${question.id}`}>Correct Answer</Label>
                              {question.type === "multiple-choice" ? (
                                <select
                                  id={`correct-answer-${question.id}`}
                                  value={question.correctAnswer}
                                  onChange={(e) => updateQuestion(question.id, "correctAnswer", e.target.value)}
                                  className="w-full p-2 border rounded"
                                  aria-label="Select correct answer"
                                >
                                  <option value="">Select correct answer</option>
                                  {question.options?.map((option, index) => (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <Input
                                  value={question.correctAnswer}
                                  onChange={(e) => updateQuestion(question.id, "correctAnswer", e.target.value)}
                                  placeholder="Enter correct answer"
                                />
                              )}
                            </div>
                            <div>
                              <Label>Points</Label>
                      <Input
                                type="number"
                                min="1"
                                value={question.points}
                                onChange={(e) => updateQuestion(question.id, "points", parseInt(e.target.value))}
                              />
                            </div>
                  </div>
                </CardContent>
              </Card>
            ))}

                    <Button onClick={addQuestion} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
                  </CardContent>
                </Card>
        </TabsContent>

              <TabsContent value="settings">
          <Card>
            <CardHeader>
                    <CardTitle>Quiz Settings</CardTitle>
                    <CardDescription>Configure your quiz settings</CardDescription>
            </CardHeader>
                  <CardContent>
                    {/* Your existing settings content */}
            </CardContent>
          </Card>
        </TabsContent>

              <TabsContent value="theme">
          <Card>
            <CardHeader>
                    <CardTitle>Quiz Theme</CardTitle>
                    <CardDescription>Customize the appearance of your quiz</CardDescription>
            </CardHeader>
                  <CardContent>
                    {/* Your existing theme content */}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
                  </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter quiz title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter quiz description"
                    />
                  </div>
                  <div>
                    <Label>Tags</Label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                      />
                      <Button onClick={addTag}>Add</Button>
                          </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                          <button
                            className="ml-1 hover:text-destructive"
                            onClick={() => removeTag(tag)}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Generate quiz content with AI</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={generateQuizWithAI}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with AI
                    </>
                  )}
            </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
