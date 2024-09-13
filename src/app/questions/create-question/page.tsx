'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UploadIcon } from "lucide-react"

export default function CreateQuestion() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full h-full">
      <Card className="w-full border-0 p-4">
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maths">Mathematics</SelectItem>
                  <SelectItem value="Language">Language</SelectItem>

                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="gujarati">Gujarati</SelectItem>
                  <SelectItem value="kannada">Kannada</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                  <SelectItem value="marathi">Marathi</SelectItem>
                  <SelectItem value="punjabi">Punjabi</SelectItem>
                  <SelectItem value="urdu">Urdu</SelectItem>
                  <SelectItem value="odia">Odia</SelectItem>
                </SelectContent>

              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="questionType">Question Type</Label>
              <Select>
                <SelectTrigger id="questionType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
                  <SelectItem value="trueFalse">True/False</SelectItem>
                  <SelectItem value="shortAnswer">Short Answer</SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <div className="flex items-center space-x-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Label
                htmlFor="image"
                className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <UploadIcon className="w-8 h-8 text-gray-400" />
                )}
              </Label>
              {imagePreview && (
                <Button variant="outline" onClick={() => setImagePreview(null)}>
                  Remove Image
                </Button>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="questionDescription">Question Description</Label>
            <Textarea
              id="questionDescription"
              placeholder="Enter the question description here..."
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="answer">Answer</Label>
            <Textarea id="answer" placeholder="Enter the answer here..." className="min-h-[100px]" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Question</Button>
        </CardFooter>
      </Card>
    </div>
  )
}