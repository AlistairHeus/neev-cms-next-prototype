import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DropzoneSingle } from '@/components/forms/form-utils/dropzone-single' // Import DropzoneSingle for single file upload
import { Label } from '@/components/ui/label'

const OralVocabularyForm = () => {
  const [question, setQuestion] = useState<string>("")
  const [answer, setAnswer] = useState<string>("")
  const [image, setImage] = useState<string | null>(null) // Track uploaded image

  return (
    <div className="space-y-6 py-6 bg-white">
      {/* Question Input */}
      <div className="space-y-2">
        <Label htmlFor="question" className="font-semibold text-lg">Question</Label>
        <Textarea
          id="question"
          placeholder="Enter the question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border-gray-300 rounded-md focus:border-black focus:ring-black"
        />
      </div>

      {/* Answer Input */}
   

      {/* Image Upload Section using Dropzone */}
      <div className="space-y-2">
        <Label className="font-semibold text-lg">Upload Image</Label>
        <DropzoneSingle
          onChange={(file) => setImage(file)}
          fileExtension="jpg,jpeg,png"
        />
        {/* Image Preview */}
        {image && (
          <div className="mt-4">
            <Label className="font-semibold">Uploaded Image:</Label>
            <img src={image} alt="Uploaded" className="mt-2 w-full aspect-square object-cover rounded-lg shadow-md" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="answer" className="font-semibold text-lg">Answer</Label>
        <Input
          id="answer"
          type="text"
          placeholder="Enter the correct answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border-gray-300 rounded-md focus:border-black focus:ring-black"
        />
      </div>

    </div>
  )
}

export default OralVocabularyForm
