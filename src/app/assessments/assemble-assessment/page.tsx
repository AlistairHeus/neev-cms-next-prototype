'use client'

import { StepOneForm } from '@/components/forms/assessments/assemble-assessments/step-one'
import StepThreeForm from '@/components/forms/assessments/assemble-assessments/step-three'
import { StepTwoForm } from '@/components/forms/assessments/assemble-assessments/step-two'
import { Medium, Project, Subject } from '@/components/forms/form-utils/form-types'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Assessment Details', 'Select Questions', 'Review & Submit'];

  return (
    <div className="flex items-center justify-between mb-6 w-full lg:w-2/3 mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {/* Step Number */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              currentStep === index + 1 ? 'bg-black text-white' : 'text-black border-gray-400 border'
            }`}
            style={{ minWidth: '2rem', minHeight: '2rem' }}
          >
            {index + 1}
          </div>

          {/* Step Label */}
          <span
            className={`ml-2 font-semibold ${
              currentStep === index + 1 ? 'text-black' : 'text-gray-500'
            }`}
            style={{ whiteSpace: 'nowrap' }}
          >
            {step}
          </span>

          {/* Divider Line */}
          {index < steps.length - 1 && (
            <div className="flex items-center mx-4 w-12 lg:w-24">
              <div className={`w-full h-1 ${currentStep > index + 1 ? 'bg-black' : 'bg-gray-400'}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};





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
    return assessmentName && project && grade && subject && medium
  }

  const getAvailableGrades = () => {
    switch (formData.project) {
      case "Neev":
        return [1, 2, 3]
      case "Asset":
      case "Cares":
        return [3, 4, 5, 6, 7, 8, 9, 10]
      default:
        return []
    }
  }

  const getAvailableSubjects = () => {
    switch (formData.project) {
      case "Cares":
        return ["English", "Maths", "Science", "Social Science", "Hindi"]
      case "Asset":
        return ["English", "Maths", "Science", "Social Studies", "Hindi"]
      case "Neev":
        return ["Foundational Literacy", "Foundational Numeracy"]
      default:
        return []
    }
  }

  const getAvailableMediums = () => {
    return ["English", "Hindi", "Gujarati", "Marathi", "Kannada"] // Available mediums (example list)
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-full bg-white rounded-lg p-6 space-y-6">
        {/* Stepper Component */}
        <Stepper currentStep={currentStep} />

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
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
          />
        )}

        {/* Step 3: Review & Submit (Placeholder) */}
        {currentStep === 3 && (
     <StepThreeForm handlePrevStep={handlePrevStep} />
        )}

       {/* Button Row */}
<div className="w-full flex justify-start space-x-4">
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

      </div>
    </div>
  )
}
