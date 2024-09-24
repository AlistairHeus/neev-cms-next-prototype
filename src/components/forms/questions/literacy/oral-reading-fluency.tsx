import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const OralReadingFluencyForm = () => {
  const [paragraph, setParagraph] = useState<string>("") // Track the paragraph input

  return (
    <div className="space-y-6 py-6 bg-white">
      {/* Paragraph Input */}
      <div className="space-y-2">
        <Label htmlFor="paragraph" className="font-semibold text-lg">Reading Paragraph</Label>
        <Textarea
          id="paragraph"
          placeholder="Enter the paragraph for the student to read..."
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          className="border-gray-300 rounded-md focus:border-black focus:ring-black min-h-[150px]"
        />
      </div>

    
    </div>
  )
}

export default OralReadingFluencyForm
