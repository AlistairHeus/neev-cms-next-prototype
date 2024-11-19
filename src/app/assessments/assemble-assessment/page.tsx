'use client'

import { StepOneForm } from '@/components/forms/assessments/assemble-assessments/step-one'
import StepThreeForm from '@/components/forms/assessments/assemble-assessments/step-three'
import { StepTwoForm } from '@/components/forms/assessments/assemble-assessments/step-two'
import { Stepper } from '@/components/forms/assessments/assemble-assessments/utils/form-stepper/form-stepper'
import { Medium, Project, Subject } from '@/components/forms/form-utils/form-types'
import { Button } from '@/components/ui/button'
import { useState } from 'react'





export default function StepperForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    assessmentName: '',
    project: null as Project | null,
    grade: null as number | null,
    subject: null as Subject | null,
    medium: null as Medium | null
  })

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const isStepOneValid = () => {
    const { assessmentName, project, grade, subject, medium } = formData
    console.log("Form Data:", formData);
    return assessmentName && project && grade && subject && medium
  }

  const getAvailableGrades = () => {
    switch (formData.project) {
      case "Neev":
        return [{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }]
      case "Asset":
      case "Cares":
        return [{ label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }, { label: "6", value: "6" }, { label: "7", value: "7" }, { label: "8", value: "8" }, { label: "9", value: "9" }, { label: "10", value: "10" }]
      default:
        return []
    }
  }

  const getAvailableSubjects = () => {
    switch (formData.project) {
      case "Cares":
        return [
          { _id: "5f9a572abb48fa346619c46e", name: "English" },
          { _id: "5f9a572fbb48fa346619c46f", name: "Maths" },
          { _id: "5f9a572abb48fa346619c470", name: "Science" },
          { _id: "5f9a572fbb48fa346619c471", name: "Social Science" },
          { _id: "5f9a572abb48fa346619c472", name: "Hindi" }
        ];
      case "Asset":
        return [
          { _id: "5f9a572abb48fa346619c473", name: "English" },
          { _id: "5f9a572fbb48fa346619c476", name: "Social Studies" },
          { _id: "5f9a572abb48fa346619c477", name: "Hindi" }
        ];
      case "Neev":
        return [
          { _id: "5f9a572abb48fa346619c46e", name: "Maths" },
          { _id: "5f9a572fbb48fa346619c46f", name: "Language" }
        ];
      default:
        return [];
    }
  }

  const getAvailableMediums = () => {
    return [
      { id: "5f9a56edbb48fa346619c166", name: "English" },
      { id: "5f9a56fabb48fa346619c168", name: "Hindi" },
      { id: "5fe3286c997e253a7f752a18", name: "Gujarati" },
      { id: "618e1291b578f608d95e4571", name: "Kannada" },
      { id: "618e15d8b578f608d95e4572", name: "Telugu" },
      { id: "623181ba2d958875d7a12fc9", name: "Tamil" },
      { id: "623181d72d958875d7a12fca", name: "Marathi" },
      { id: "623181e72d958875d7a12fcb", name: "Punjabi" },
      { id: "623181fa2d958875d7a12fcc", name: "Urdu" },
      { id: "6231822b2d958875d7a12fcd", name: "Odia" }
    ];
  }

  return (
    <div className="flex justify-center w-full min-h-svh  overflow-scroll">
      <div className="w-full flex flex-col bg-white border-t">

        <header className=''>
          <Stepper currentStep={currentStep} />
        </header>


        <main className='flex-grow w-full h-full'>
          {/* Step 1: Assessment Details */}
          {currentStep === 1 && (
            <StepOneForm
              assessmentName={formData.assessmentName}
              setAssessmentName={(name: string) => setFormData((prev) => ({ ...prev, assessmentName: name }))}
              project={formData.project}
              setProject={(project: Project) => setFormData((prev) => ({ ...prev, project }))}
              grade={formData.grade}
              setGrade={(grade: number) => setFormData((prev) => ({ ...prev, grade }))}
              subject={formData.subject}
              setSubject={(subject: Subject) => setFormData((prev) => ({ ...prev, subject }))}
              medium={formData.medium}
              setMedium={(medium: Medium) => setFormData((prev) => ({ ...prev, medium }))}
              getAvailableGrades={getAvailableGrades}
              getAvailableSubjects={getAvailableSubjects}
              getAvailableMediums={getAvailableMediums}
            />
          )}
          {/* Step 2: Select Questions */}
          {currentStep === 2 && (
            <StepTwoForm
              formData={formData}
              handlePrevStep={handlePrevStep}
              handleNextStep={handleNextStep}
            />
          )}
          {/* Step 3: Review & Submit (Placeholder) */}
          {currentStep === 3 && (
            <StepThreeForm handlePrevStep={handlePrevStep} />
          )}
        </main>


        <footer>
          <div className="w-full p-4 border-t border-b flex justify-start space-x-4">
            {currentStep > 1 && (
              <Button variant="secondary" onClick={handlePrevStep} className="w-full sm:w-auto">
                Back
              </Button>
            )}

            {currentStep < 3 && (
              <Button
                variant="default"
                onClick={handleNextStep}
                disabled={currentStep === 1 && !isStepOneValid()} // Disable "Next" in Step 1 if invalid
                className="w-full sm:w-auto"
              >
                Next
              </Button>
            )}

            {currentStep === 3 && (
              <Button variant="default" className="w-full sm:w-auto">
                Submit
              </Button>
            )}
          </div>
        </footer>

      </div>
    </div>
  )
}
