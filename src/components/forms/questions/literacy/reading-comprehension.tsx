import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { DropzoneSingle } from '@/components/forms/form-utils/dropzone-single'
import { X } from 'lucide-react'

// Define the type for SubQuestion explicitly
type SubQuestion = {
  type: 'text' | 'audio'
  question: string
  audioFile: string | null
  answer: string
}

const ReadingComprehensionForm = () => {
  const [paragraph, setParagraph] = useState<string>("")
  const [subQuestions, setSubQuestions] = useState<SubQuestion[]>([])

  // Add a new sub-question
  const addSubQuestion = () => {
    // Ensure type is either 'text' or 'audio'
    setSubQuestions([
      ...subQuestions,
      { type: 'text', question: '', audioFile: null, answer: '' }
    ])
  }

  // Remove a sub-question by index
  const removeSubQuestion = (index: number) => {
    const updatedSubQuestions = subQuestions.filter((_, i) => i !== index)
    setSubQuestions(updatedSubQuestions)
  }

  // Toggle between text/audio for a sub-question
// Toggle between text/audio for a sub-question
const toggleQuestionType = (index: number) => {
    const updatedSubQuestions = subQuestions.map((sq, i) =>
      i === index
        ? { ...sq, type: sq.type === 'text' ? 'audio' : 'text' as 'text' | 'audio' } // Explicitly cast the type
        : sq
    )
    setSubQuestions(updatedSubQuestions)
  }
  
  // Handle change in sub-question input
  const handleSubQuestionChange = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedSubQuestions = subQuestions.map((sq, i) =>
      i === index ? { ...sq, [field]: value } : sq
    )
    setSubQuestions(updatedSubQuestions)
  }

  // Handle audio file upload for a sub-question
  const handleAudioUpload = (index: number, file: string) => {
    const updatedSubQuestions = subQuestions.map((sq, i) =>
      i === index ? { ...sq, audioFile: file } : sq
    )
    setSubQuestions(updatedSubQuestions)
  }

  return (
    <div className="space-y-6 py-6 bg-white">
      {/* Paragraph Input */}
      <div className="space-y-2">
        <Label htmlFor="paragraph" className="font-semibold text-lg">Enter Paragraph</Label>
        <Textarea
          id="paragraph"
          placeholder="Enter the main paragraph for reading comprehension..."
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          className="border-gray-300 rounded-md focus:border-black focus:ring-black min-h-[150px]"
        />
      </div>

      {/* Sub-Questions */}
      <div className="space-y-4 flex-col flex">
        <Label className="font-semibold text-lg">Enter the Questions with their respective Answers</Label>

        {subQuestions.map((subQuestion, index) => (
          <div key={index} className="space-y-4 border p-4 rounded-md">
            {/* Toggle between Text/Audio Question */}
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Label className="font-semibold">{'Audio Question'}</Label>
                <Switch
                  checked={subQuestion.type === 'audio'}
                  onCheckedChange={() => toggleQuestionType(index)}
                />
              </div>

              {/* Remove Question Button */}
              <Button variant="ghost" className="text-red-600" onClick={() => removeSubQuestion(index)}>
                <X />
              </Button>
            </div>

            {/* Question Input (Text/Audio) */}
            {subQuestion.type === 'text' ? (
              <div className="space-y-2">
                <Label htmlFor={`question-${index}`} className="font-semibold">Enter Question</Label>
                <Textarea
                  id={`question-${index}`}
                  placeholder="Enter the question..."
                  value={subQuestion.question}
                  onChange={(e) => handleSubQuestionChange(index, 'question', e.target.value)}
                  className="border-gray-300 rounded-md focus:border-black focus:ring-black"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label className="font-semibold">Upload Audio</Label>
                <DropzoneSingle
                  onChange={(file) => handleAudioUpload(index, file)}
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
            )}

            {/* Answer Input */}
            <div className="space-y-2">
              <Label htmlFor={`answer-${index}`} className="font-semibold">Enter Answer</Label>
              <Input
                id={`answer-${index}`}
                type="text"
                placeholder="Enter the answer..."
                value={subQuestion.answer}
                onChange={(e) => handleSubQuestionChange(index, 'answer', e.target.value)}
                className="border-gray-300 rounded-md focus:border-black focus:ring-black"
              />
            </div>
          </div>
        ))}

        {/* Add New Sub-Question Button */}
        <Button variant="outline" onClick={addSubQuestion} className="mt-4 inline-block w-max">
          + Add Question
        </Button>
      </div>

   
    </div>
  )
}

export default ReadingComprehensionForm
