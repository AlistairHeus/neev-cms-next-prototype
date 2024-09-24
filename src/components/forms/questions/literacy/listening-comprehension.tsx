import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { DropzoneSingle } from '@/components/forms/form-utils/dropzone-single'
import { X } from 'lucide-react'

// Define the type for SubQuestion explicitly
type SubQuestion = {
  audioFile: string | null
  answer: string
}

const ListeningComprehensionForm = () => {
  const [paragraphAudio, setParagraphAudio] = useState<string | null>(null)
  const [subQuestions, setSubQuestions] = useState<SubQuestion[]>([])

  // Add a new sub-question
  const addSubQuestion = () => {
    setSubQuestions([
      ...subQuestions,
      { audioFile: null, answer: '' }
    ])
  }

  // Remove a sub-question by index
  const removeSubQuestion = (index: number) => {
    const updatedSubQuestions = subQuestions.filter((_, i) => i !== index)
    setSubQuestions(updatedSubQuestions)
  }

  // Handle audio file upload for the paragraph
  const handleParagraphAudioUpload = (file: string) => {
    setParagraphAudio(file)
  }

  // Handle audio file upload for a sub-question
  const handleSubQuestionAudioUpload = (index: number, file: string) => {
    const updatedSubQuestions = subQuestions.map((sq, i) =>
      i === index ? { ...sq, audioFile: file } : sq
    )
    setSubQuestions(updatedSubQuestions)
  }

  // Handle change in sub-question answer input
  const handleSubQuestionChange = (index: number, value: string) => {
    const updatedSubQuestions = subQuestions.map((sq, i) =>
      i === index ? { ...sq, answer: value } : sq
    )
    setSubQuestions(updatedSubQuestions)
  }

  return (
    <div className="space-y-6 py-6 bg-white">
      {/* Paragraph Audio Upload */}
      <div className="space-y-2">
        <Label className="font-semibold text-lg">Upload Paragraph Audio</Label>
        <DropzoneSingle
          onChange={(file) => handleParagraphAudioUpload(file)}
          fileExtension="mp3,wav"
        />
        {paragraphAudio && (
          <div className="mt-2">
            <audio controls src={paragraphAudio} className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>

      {/* Sub-Questions */}
      <div className="space-y-4 flex-col flex">
        <Label className="font-semibold text-lg">Enter the Audio Questions with their respective Answers</Label>

        {subQuestions.map((subQuestion, index) => (
          <div key={index} className="space-y-4 border p-4 rounded-md">
            {/* Remove Question Button */}
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Audio Question {index + 1}</Label>
              <Button variant="ghost" className="text-red-600" onClick={() => removeSubQuestion(index)}>
                <X />
              </Button>
            </div>

            {/* Audio File Upload for Question */}
            <div className="space-y-2">
              <Label className="font-semibold">Upload Question Audio</Label>
              <DropzoneSingle
                onChange={(file) => handleSubQuestionAudioUpload(index, file)}
                fileExtension="mp3,wav"
              />
              {subQuestion.audioFile && (
                <div className="mt-2">
                  <audio controls src={subQuestion.audioFile} className="w-full">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>

            {/* Answer Input */}
            <div className="space-y-2">
              <Label htmlFor={`answer-${index}`} className="font-semibold">Enter Answer</Label>
              <Input
                id={`answer-${index}`}
                type="text"
                placeholder="Enter the answer..."
                value={subQuestion.answer}
                onChange={(e) => handleSubQuestionChange(index, e.target.value)}
                className="border-gray-300 rounded-md focus:border-black focus:ring-black"
              />
            </div>
          </div>
        ))}

        {/* Add New Sub-Question Button */}
        <Button variant="outline" onClick={addSubQuestion} className="mt-4 inline-block w-max">
          + Add Audio Question
        </Button>
      </div>
    </div>
  )
}

export default ListeningComprehensionForm
