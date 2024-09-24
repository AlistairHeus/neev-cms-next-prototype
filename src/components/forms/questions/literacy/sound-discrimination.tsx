'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { DropzoneSingle } from '@/components/forms/form-utils/dropzone-single'
import { X } from 'lucide-react'

type SoundQuestion = {
  audioFile: string | null
  description: string
  isCorrect: boolean
}

export default function SoundDiscriminationForm() {
  const [questions, setQuestions] = useState<SoundQuestion[]>([])

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { audioFile: null, description: '', isCorrect: false }
    ])
  }

  // Remove a question by index
  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index)
    setQuestions(updatedQuestions)
  }

  // Handle audio file upload for a question
  const handleAudioUpload = (index: number, file: string) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, audioFile: file } : q
    )
    setQuestions(updatedQuestions)
  }

  // Handle description input change for a question
  const handleDescriptionChange = (index: number, value: string) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, description: value } : q
    )
    setQuestions(updatedQuestions)
  }

  // Handle correct option checkbox change
  const handleCorrectOptionChange = (index: number) => {
    // Ensure only one correct option is selected at a time
    const updatedQuestions = questions.map((q, i) => ({
      ...q,
      isCorrect: i === index
    }))
    setQuestions(updatedQuestions)
  }

  return (
    <div className="space-y-6 py-6 bg-white">
      {/* List of Sound Questions */}
      {questions.map((question, index) => (
        <div key={index} className="space-y-4 border p-4 rounded-md">
          <div className="flex items-center justify-between">
            <Label className="font-semibold">Audio {index + 1}</Label>
            <Button variant="ghost" className="text-red-600" onClick={() => removeQuestion(index)}>
              <X />
            </Button>
          </div>

          {/* Audio File Upload */}
          <div className="space-y-2">
            <Label className="font-semibold">Upload Audio</Label>
            <DropzoneSingle
              onChange={(file) => handleAudioUpload(index, file)}
              
              fileExtension="mp3,wav"
            />
            {question.audioFile && (
              <div className="mt-2">
                <audio controls src={question.audioFile} className="w-full">
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>

          {/* Audio Description Input */}
          <div className="space-y-2">
            <Label htmlFor={`description-${index}`} className="font-semibold">Audio Description</Label>
            <Textarea
              id={`description-${index}`}
              placeholder="Enter the audio description..."
              value={question.description}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              className="border-gray-300 rounded-md focus:border-black focus:ring-black"
            />
          </div>

          {/* Correct Option Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={question.isCorrect}
              onCheckedChange={() => handleCorrectOptionChange(index)}
            />
            <Label>Correct Option</Label>
          </div>
        </div>
      ))}

<Button variant="outline" onClick={addQuestion} className="mb-4">
        + Add Sound
      </Button>
    </div>
  )
}
