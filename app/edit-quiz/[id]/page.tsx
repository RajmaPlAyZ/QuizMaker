"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { getQuiz, updateQuiz } from "@/lib/firebase";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer: string;
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  tags: string[];
  questions: Question[];
  status: "draft" | "published";
  createdAt: string;
  lastModified: string;
}

export default function EditQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchQuiz = async () => {
      try {
        const quizData = await getQuiz(id);
        if (quizData) {
          setQuiz(quizData);
        } else {
          alert("Quiz not found");
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        alert("Failed to load quiz");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, user, router]);

  const handleSave = async (status: "draft" | "published" = "draft") => {
    if (!quiz) return;

    setSaving(true);
    try {
      await updateQuiz(quiz.id, {
        ...quiz,
        status,
        lastModified: new Date().toISOString()
      });
      
      if (status === "published") {
        router.push(`/quiz/${quiz.id}`);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz");
    } finally {
      setSaving(false);
    }
  };

  const addQuestion = () => {
    if (!quiz) return;
    
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      text: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 1
    };
    
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion]
    });
  };

  const removeQuestion = (id: string) => {
    if (!quiz) return;
    
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter(q => q.id !== id)
    });
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    if (!quiz) return;
    
    setQuiz({
      ...quiz,
      questions: quiz.questions.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      )
    });
  };

  const addTag = () => {
    if (!quiz) return;
    
    if (newTag.trim() && !quiz.tags.includes(newTag.trim())) {
      setQuiz({
        ...quiz,
        tags: [...quiz.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (!quiz) return;
    
    setQuiz({
      ...quiz,
      tags: quiz.tags.filter(tag => tag !== tagToRemove)
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!quiz) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Quiz</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleSave("draft")} 
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Draft"}
            </Button>
            <Button 
              onClick={() => handleSave("published")} 
              disabled={saving}
            >
              {saving ? "Publishing..." : "Publish Quiz"}
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quiz Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={quiz.title}
                  onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                  placeholder="Enter quiz title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={quiz.description}
                  onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                  placeholder="Enter quiz description"
                />
              </div>
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button onClick={addTag}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quiz.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <Card key={question.id || index}>
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
                    <Label htmlFor={`question-text-${question.id}`}>Question Text</Label>
                    <Input
                      id={`question-text-${question.id}`}
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
                            const newOptions = [...(question.options || [])];
                            newOptions[optionIndex] = e.target.value;
                            updateQuestion(question.id, "options", newOptions);
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
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        id={`correct-answer-${question.id}`}
                        value={question.correctAnswer}
                        onChange={(e) => updateQuestion(question.id, "correctAnswer", e.target.value)}
                        placeholder="Enter correct answer"
                      />
                    )}
                  </div>
                  <div>
                    <Label htmlFor={`points-${question.id}`}>Points</Label>
                    <Input
                      id={`points-${question.id}`}
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
        </div>
      </div>
    </div>
  );
} 