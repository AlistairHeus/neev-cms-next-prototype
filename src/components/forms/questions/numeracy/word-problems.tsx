import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch' // Import Switch from ShadCN
import { DropzoneSingle } from '@/components/forms/form-utils/dropzone-single' // For single file upload

const WordProblemsForm = () => {
  const [isAudio, setIsAudio] = useState(false) // State to toggle between Text and Audio
  const [question, setQuestion] = useState<string>("")
  const [audioFile, setAudioFile] = useState<string | null>(null) // Track uploaded audio file if applicable
  const [answer, setAnswer] = useState<string>("")

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

      {/* Switch for Question Type (Text/Audio) */}
      <div className="flex items-center space-x-4">
        <Label className="font-semibold text-lg">Audio Question</Label>
        <Switch checked={isAudio} onCheckedChange={setIsAudio} />
      </div>

      {/* Audio Upload Section */}
      {isAudio && (
        <div className="space-y-2">
          <Label className="font-semibold text-lg">Upload Audio</Label>
          <DropzoneSingle
            onChange={(file) => setAudioFile(file)}
            fileExtension="mp3,wav"
          />
          {/* Audio File Preview */}
          {audioFile && (
            <div className="mt-2">
              <p className="font-semibold">Uploaded Audio:</p>
              <audio controls src={audioFile} className="mt-2 w-full">
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      )}

      {/* Answer Input */}
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

export default WordProblemsForm
