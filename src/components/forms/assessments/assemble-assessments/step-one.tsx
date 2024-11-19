import React from 'react';
import { Input } from '@/components/ui/input'
import CustomSelect from '../../form-utils/custom-select'
import { Project } from '../../form-utils/form-types'



export const StepOneForm = ({
  assessmentName, setAssessmentName, project, setProject, grade, setGrade, subject, setSubject, medium, setMedium, getAvailableGrades, getAvailableSubjects, getAvailableMediums
}: any) => {
  return (
    <div className="w-full border-t p-4 space-y-6">
      {/* Assessment Name */}
      <div className="space-y-2">
        <label className="font-semibold text-lg">Assessment Name</label>
        <Input
          type="text"
          placeholder="Enter assessment name"
          value={assessmentName}
          onChange={(e) => setAssessmentName(e.target.value)}
          className="w-full border-gray-300 rounded-md focus:border-black focus:ring-black"
        />
      </div>

      {/* Selection Fields */}
      <div className="w-full grid grid-cols-4 gap-6">
        <CustomSelect
          label="Project"
          placeholder="Select Project"
          value={project}
          options={[{ label: "Neev", value: "Neev" }, { label: "Asset", value: "Asset" }, { label: "Cares", value: "Cares" }]}
          onChange={(value: string) => setProject(value)}
        />
        <CustomSelect
          label="Grade"
          placeholder="Select Grade"
          value={grade ? `Grade ${grade}` : ''}
          options={getAvailableGrades(project).map((g: { label: string, value: string }) => ({
            label: `Grade ${g.label}`,
            value: g.value,
          }))}
          onChange={(value: any) => {
            setGrade(value)
          }}
        />
        <CustomSelect
          label="Subject"
          placeholder="Select Subject"
          value={subject ? subject.name : ''}
          options={getAvailableSubjects(project).map((s: { _id: string, name: string }) => ({
            label: s.name,
            value: s._id,
          }))}
          onChange={(selectedSubjectId: string) => {
            const selectedSubject = getAvailableSubjects(project).find(
              (s: { _id: string; name: string }) => s._id === selectedSubjectId
            );
            if (selectedSubject) {
              setSubject(selectedSubject);
            } else {
              setSubject(null); // or handle the error appropriately
            }
          }}
        />
        <CustomSelect
          label="Language Medium"
          placeholder="Select Medium"
          value={medium ? medium.name : ''}
          options={getAvailableMediums().map((m: { id: string, name: string }) => ({
            label: m.name,
            value: m.id,
          }))}
          onChange={(selectedMediumId: string) => {
            const selectedMedium = getAvailableMediums().find((m: { id: string }) => m.id === selectedMediumId);
            setMedium(selectedMedium);
          }}
        />
      </div>


    </div>
  );
}