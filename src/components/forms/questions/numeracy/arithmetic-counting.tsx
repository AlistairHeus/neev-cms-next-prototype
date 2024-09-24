import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DropzoneSingle } from '../../form-utils/dropzone-single' // Assume this is the single file version of Dropzone

const ArithmeticCountingForm = () => {
  const [question, setQuestion] = useState<string>("")
  const [image, setImage] = useState<string | null>(null) // Track the uploaded image as a URL
  const [answer, setAnswer] = useState<string>("")

  return (
    <div className="space-y-6 py-6 bg-white">
      {/* Question Input */}
      <div className="space-y-2">
        <label htmlFor="question" className="font-semibold text-lg">Question Description</label>
        <Textarea
          id="question"
          placeholder="Enter the question description..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border-gray-300 rounded-md focus:border-black focus:ring-black"
        />
      </div>

      {/* Single Image Upload */}
      <DropzoneSingle onChange={(file) => setImage(file)}  />

      {/* Image Preview */}
      {image && (
        <div className="space-y-2">
          <label className="font-semibold text-lg">Uploaded Image</label>
          <img src={image} alt="Uploaded" className="w-64 aspect-square object-cover rounded-lg shadow-md" />
        </div>
      )}

      {/* Answer Input */}
      <div className="space-y-2">
        <label htmlFor="answer" className="font-semibold text-lg">Answer</label>
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

export default ArithmeticCountingForm
