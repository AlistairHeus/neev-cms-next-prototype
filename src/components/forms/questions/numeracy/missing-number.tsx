import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const MissingNumberForm = () => {
  const [inputs, setInputs] = useState<string[]>(['', '', '', '']) // 4 default inputs
  const [answer, setAnswer] = useState<string>('') // Answer input

  // Handle input change for number inputs
  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = [...inputs]
    updatedInputs[index] = value
    setInputs(updatedInputs)
  }

  // Add more inputs dynamically
  const addMoreInputs = () => {
    setInputs([...inputs, '']) // Add a new empty input field
  }

  return (
    <div className="space-y-6 py-6 bg-white">
      <Label className="font-semibold text-lg">Missing Number Inputs</Label>

      {/* Number Inputs */}
      <div className="space-y-4">
        {inputs.map((input, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Enter number ${index + 1}`}
              className="border-gray-300 rounded-md focus:border-black focus:ring-black"
            />
          </div>
        ))}
      </div>

      {/* Button to Add More Inputs */}
      <Button variant="outline" onClick={addMoreInputs} className="w-full">
        Add More Numbers
      </Button>

      {/* Answer Input */}
      <div className="space-y-2">
        <Label htmlFor="answer" className="font-semibold text-lg">Answer</Label>
        <Input
          id="answer"
          type="text"
          placeholder="Enter the correct answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border-gray-300 rounded-md focus:border-black focus:ring-black"
        />
      </div>

      
    </div>
  )
}

export default MissingNumberForm
