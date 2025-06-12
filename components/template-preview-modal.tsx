"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { FileQuestion, Clock, Star, ChevronRight, ChevronLeft } from "lucide-react"
import { categories } from "@/data/templates"

interface TemplatePreviewModalProps {
  template: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onUseTemplate: (templateId: number) => void
}

export function TemplatePreviewModal({ template, open, onOpenChange, onUseTemplate }: TemplatePreviewModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  if (!template) return null

  const categoryData = categories.find((c) => c.id === template.category)

  const handleNextQuestion = () => {
    if (currentQuestionIndex < template.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{template.title}</DialogTitle>
              <DialogDescription>{template.description}</DialogDescription>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              {categoryData?.name}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FileQuestion className="h-4 w-4 text-muted-foreground" />
            <span>{template.questionCount} questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>~{template.estimatedTime} min</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-muted-foreground" />
            <span>{template.difficulty}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Question Preview</TabsTrigger>
            <TabsTrigger value="details">Template Details</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">
                  Question {currentQuestionIndex + 1} of {template.questions.length}
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === template.questions.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-lg font-medium">{template.questions[currentQuestionIndex].question}</p>
                      {template.questions[currentQuestionIndex].image && (
                        <div className="mt-2 border rounded-md overflow-hidden">
                          <img
                            src={template.questions[currentQuestionIndex].image || "/placeholder.svg"}
                            alt="Question"
                            className="w-full h-auto max-h-48 object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      {template.questions[currentQuestionIndex].options.map((option: string, index: number) => (
                        <div
                          key={index}
                          className={`p-3 border rounded-md ${
                            template.questions[currentQuestionIndex].correctAnswer === index
                              ? "border-green-500 bg-green-50"
                              : ""
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full border flex items-center justify-center mr-3 text-sm">
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span>{option}</span>
                            {template.questions[currentQuestionIndex].correctAnswer === index && (
                              <Badge className="ml-auto" variant="outline">
                                Correct
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {template.questions[currentQuestionIndex].explanation && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm font-medium mb-1">Explanation:</p>
                        <p className="text-sm">{template.questions[currentQuestionIndex].explanation}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="details" className="py-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">About this template</h3>
                <p className="text-muted-foreground">{template.fullDescription || template.description}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">What's included</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>{template.questionCount} carefully crafted questions</li>
                  <li>Answer explanations for each question</li>
                  <li>Difficulty level: {template.difficulty}</li>
                  <li>Estimated completion time: {template.estimatedTime} minutes</li>
                  <li>Fully customizable after selection</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Perfect for</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {template.suitableFor.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-4 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onUseTemplate(template.id)}>Use This Template</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
