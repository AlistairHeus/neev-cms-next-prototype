'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Dropzone } from "@/components/forms/form-utils/dropzone" // Import the Dropzone component

export default function ShapeRecognitionForm() {
  const [question, setQuestion] = useState<string>("")
  const [images, setImages] = useState<{ src: string; isCorrect: boolean }[]>([])

  // Handle the uploaded files and add them to the images state
  const handleFilesUpload = (newFiles: string[]) => {
    const newImages = newFiles.map((file) => ({
      src: file,
      isCorrect: false, // Mark as not correct initially
    }))
    setImages((prevImages) => [...prevImages, ...newImages]) // Properly append new images to existing ones
  }

  // Toggle the correct shape checkbox
  const toggleCorrectShape = (index: number) => {
    const updatedImages = images.map((image, i) =>
      i === index ? { ...image, isCorrect: !image.isCorrect } : image
    )
    setImages(updatedImages)
  }

  return (
    <div className="space-y-6 py-6 bg-white">
      {/* Question Input */}
      <div className="space-y-2">
        <Label htmlFor="question" className="font-semibold text-lg">Question Description</Label>
        <Textarea
          id="question"
          placeholder="Enter the question description..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border-gray-300 rounded-md focus:border-black focus:ring-black"
        />
      </div>

      {/* Image Upload Section using Dropzone */}
      <Dropzone  onChange={(newFiles) => handleFilesUpload(newFiles)} className=""  />

      {/* Preview of uploaded images with the correct shape checkbox */}
      {images.length > 0 && (
        <div className="space-y-4">
          <Label className="font-semibold text-lg">Uploaded Shape Images</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {images.map((image, index) => (
              <div key={index} className="space-y-2 text-center">
                <img src={image.src} alt="Uploaded" className="w-full aspect-square object-cover rounded-lg shadow-md" />
                <div className="flex items-center justify-start space-x-2">
                  <Checkbox
                    checked={image.isCorrect}
                    onCheckedChange={() => toggleCorrectShape(index)}
                  />
                  <Label>Correct Shape</Label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

     
    </div>
  )
}
