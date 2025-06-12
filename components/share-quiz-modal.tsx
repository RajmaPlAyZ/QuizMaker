"use client"

import type React from "react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Copy } from "lucide-react"

interface ShareQuizModalProps {
  quiz: any | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ShareQuizModal: React.FC<ShareQuizModalProps> = ({ quiz, open, onOpenChange }) => {
  const [linkCopied, setLinkCopied] = useState(false)

  const quizLink = quiz ? `${window.location.origin}/quiz/${quiz.id}` : ""

  const handleCopyLink = () => {
    navigator.clipboard.writeText(quizLink)
    setLinkCopied(true)
    setTimeout(() => {
      setLinkCopied(false)
    }, 2000)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share Quiz</AlertDialogTitle>
          <AlertDialogDescription>Share this quiz with your audience using the link below.</AlertDialogDescription>
        </AlertDialogHeader>
        {quiz ? (
          <>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="link">Quiz Link</Label>
                <div className="flex items-center">
                  <Input id="link" value={quizLink} readOnly className="mr-2" />
                  <Button variant="outline" size="sm" onClick={handleCopyLink} disabled={linkCopied}>
                    {linkCopied ? (
                      "Copied!"
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </>
        ) : (
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">No quiz selected.</p>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
