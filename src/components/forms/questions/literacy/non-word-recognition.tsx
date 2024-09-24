'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function NonWordRecognitionForm() {
  const [word, setWord] = useState<string>("")

  return (
    <div className="space-y-6 py-6 bg-white">
      {/* Word Input */}
      <div className="space-y-2">
        <Label htmlFor="word" className="font-semibold text-lg">Enter Word</Label>
        <Input
          id="word"
          placeholder="Enter the word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="border-gray-300 rounded-md focus:border-black focus:ring-black"
        />
      </div>
    </div>
  )
}
