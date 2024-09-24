'use client'

import FamiliarWordRecognitionForm from "@/components/forms/questions/literacy/familiar-word-recognition";
import ListeningComprehensionForm from "@/components/forms/questions/literacy/listening-comprehension";
import NonWordRecognitionForm from "@/components/forms/questions/literacy/non-word-recognition";
import OralReadingFluencyForm from "@/components/forms/questions/literacy/oral-reading-fluency"; // Add literacy forms
import OralVocabularyForm from "@/components/forms/questions/literacy/oral-vocabulary";
import ReadingComprehensionForm from "@/components/forms/questions/literacy/reading-comprehension";
import SoundDiscriminationForm from "@/components/forms/questions/literacy/sound-discrimination";
import ArithmeticCountingForm from "@/components/forms/questions/numeracy/arithmetic-counting";
import ArithmeticFactsForm from "@/components/forms/questions/numeracy/arithmetic-facts";
import ArithmeticProcessForm from "@/components/forms/questions/numeracy/arithmetic-process";
import MissingNumberForm from "@/components/forms/questions/numeracy/missing-number";
import ShapeRecognitionForm from "@/components/forms/questions/numeracy/shape-recognition";
import WordProblemsForm from "@/components/forms/questions/numeracy/word-problems";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestionType } from "@/config/question-types";
import { Subject, SUBJECTS } from "@/config/subjects";
import { useState } from "react";

export default function CreateQuestion() {
  // Set the state to be either Subject or null
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([])
  const [selectedQuestionType, setSelectedQuestionType] = useState<string | null>(null)

  const handleSubjectChange = (value: string) => {
    // Find the selected subject in the SUBJECTS array
    const selected = SUBJECTS.find(subject => subject.name === value)
    setSelectedSubject(selected || null) // Update the state with Subject or null
    setQuestionTypes(selected ? selected.questionTypes : []) // Update question types based on selected subject
  }

  const handleQuestionTypeChange = (value: string) => {
    setSelectedQuestionType(value) // Update question type
  }

  const renderForm = () => {
    switch (selectedQuestionType) {
      // Numeracy question types
      case "Arithmetic Process":
        return <ArithmeticProcessForm />
      case "Arithmetic Facts":
        return <ArithmeticFactsForm />
      case "Counting":
        return <ArithmeticCountingForm />
      case "Missing Number":
        return <MissingNumberForm />
      case "Shape Recognition":
        return <ShapeRecognitionForm />
      case "Word Problem":
        return <WordProblemsForm />

      // Literacy question types
      case "Oral Reading Fluency":
        return <OralReadingFluencyForm />

      case "Oral Vocabulary":
        return <OralVocabularyForm />

      case "Reading Comprehension":
        return <ReadingComprehensionForm />

      case "Listening Comprehension":
        return <ListeningComprehensionForm />

      case "Sound Discrimination":
        return <SoundDiscriminationForm />

      case "Familiar Word Recognition":
        return <FamiliarWordRecognitionForm />
        case "Non-Word Recognition":
          return <NonWordRecognitionForm />
      // Add other Literacy question types here as needed

      default:
        return <p>Please select a question type</p>
    }
  }

  return (
    <div className="w-full h-full">
      <Card className="w-full border-0 p-4">
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Subject Selection */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select onValueChange={handleSubjectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((subject, index) => (
                    <SelectItem key={index} value={subject.name}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Question Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="questionType">Question Type</Label>
              <Select onValueChange={handleQuestionTypeChange}>
                <SelectTrigger id="questionType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type, index) => (
                    <SelectItem key={index} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dynamic form rendering based on question type */}
          {renderForm()}

        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Question</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

