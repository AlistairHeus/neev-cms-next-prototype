import { Input } from '@/components/ui/input'
import CustomSelect from '../../form-utils/custom-select'
import { Project } from '../../form-utils/form-types'



export const StepOneForm = ({
    assessmentName, setAssessmentName, project, setProject, grade, setGrade, subject, setSubject, medium, setMedium, getAvailableGrades, getAvailableSubjects, getAvailableMediums
  }: any) => (
    <div className="w-full space-y-6">
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
          options={["Neev", "Asset", "Cares"]}
          onChange={(value: Project) => setProject(value)}
        />
        <CustomSelect
          label="Grade"
          placeholder="Select Grade"
          value={grade ? `Grade ${grade}` : ''}
          options={getAvailableGrades().map((g: number) => `Grade ${g}`)}
          onChange={(value: string) => setGrade(parseInt(value.split(' ')[1]))}
        />
        <CustomSelect
          label="Subject"
          placeholder="Select Subject"
          value={subject}
          options={getAvailableSubjects()}
          onChange={setSubject}
        />
        <CustomSelect
          label="Language Medium"
          placeholder="Select Medium"
          value={medium}
          options={getAvailableMediums()}
          onChange={setMedium}
        />
      </div>
    </div>
  )