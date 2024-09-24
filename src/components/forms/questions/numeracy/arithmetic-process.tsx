'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ArithmeticProcessForm() {
  const [inputs, setInputs] = useState<number[]>([0, 0])
  const [operands, setOperands] = useState<string[]>(["+"])
  const [answer, setAnswer] = useState<number | string>("")

  // Function to dynamically calculate the answer
  const calculateAnswer = () => {
    let result = inputs[0]
    for (let i = 0; i < operands.length; i++) {
      switch (operands[i]) {
        case "+":
          result += inputs[i + 1]
          break
        case "-":
          result -= inputs[i + 1]
          break
        case "*":
          result *= inputs[i + 1]
          break
        case "/":
          if (inputs[i + 1] === 0) {
            return "Error" // Handle division by zero
          }
          result /= inputs[i + 1]
          break
        default:
          return
      }
    }
    setAnswer(result)
  }

  // Recalculate the answer whenever inputs or operands change
  useEffect(() => {
    calculateAnswer()
  }, [inputs, operands])

  const addInput = () => {
    setInputs([...inputs, 0])
    setOperands([...operands, ""])
  }

  const handleInputChange = (index: number, value: number) => {
    const updatedInputs = [...inputs]
    updatedInputs[index] = value
    setInputs(updatedInputs)
  }

  const handleOperandChange = (index: number, value: string) => {
    const updatedOperands = [...operands]
    updatedOperands[index] = value
    setOperands(updatedOperands)
  }

  return (
    <div className="space-y-4">
      <Label>Arithmetic Inputs</Label>
      <div className="flex flex-wrap items-center space-x-2">
        {inputs.map((input, index) => (
          <div key={index} className="flex items-center space-x-2">
            {/* Number Input */}
            <Input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, Number(e.target.value))}
              className="w-12" // Consistent width for number inputs
            />

            {/* Operand Selector */}
            {index < inputs.length - 1 && (
              <Select
                value={operands[index]}
                onValueChange={(value) => handleOperandChange(index, value)}
              >
             <SelectTrigger className="w-16">
  <SelectValue>{operands[index] || "+"}</SelectValue> {/* Display selected operand or default "+" */}
</SelectTrigger>

                <SelectContent>
                  <SelectItem value="+">+</SelectItem>
                  <SelectItem value="-">-</SelectItem>
                  <SelectItem value="*">*</SelectItem>
                  <SelectItem value="/">/</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        ))}
      </div>

      {/* Add more inputs button */}
      <Button variant="outline" onClick={addInput}>Add More Input</Button>

      {/* Automatically calculated answer */}
      <div className="space-y-2">
        <Label htmlFor="answer">Calculated Answer</Label>
        <Input
          id="answer"
          type="text"
          value={answer}
          readOnly
          className="bg-gray-100 w-32" // Consistent width for the answer
        />
      </div>
    </div>
  )
}
