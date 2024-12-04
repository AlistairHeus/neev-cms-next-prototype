import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, ArrowDown, Trash, MoreVertical, FileText, BookTemplate, LucideSave } from "lucide-react"; // Lucide Icons
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // ShadCN Dialog
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Question, QuestionOption, Section, Subject } from "./assembly-types";
import QuestionDetailsDialog from "@/components/ui/QuestionDetailsDialog";
import { QuestionDisplayItem } from "@/components/forms/assessments/assemble-assessments/utils/question-display-item/question-display-item";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import ShadCN RadioGroup components
import { Medium, Project } from "@/components/forms/form-utils/form-types";
import { AssembledSection } from "./assembled-section";



export const AssembledTestPreview = ({
  sections,
  setSections,
  numberFormat,
  toggleNumberFormat,
  addSection,
  activeSectionIndex,
  setActiveSection,
  formData,
  activeParentIndex,
  setActiveParentIndex,
  setAddedQuestionIds,
  setAddedSubtestIds,
  addedQuestionIds,
  addedSubtestIds,
}: {
  sections: any[];
  setSections: (sections: any[]) => void;
  numberFormat: string;
  toggleNumberFormat: () => void;
  addSection: () => void;
  activeSectionIndex: number | null; // Active section can be null
  setActiveSection: (sectionIndex: number | null) => void;
  activeParentIndex: number | null; // Active Parent can be null
  setActiveParentIndex: (sectionIndex: number | null) => void;

  formData: {
    assessmentName: string;
    project: Project;
    grade: number;
    subject: Subject;
    medium: Medium;
  };

  setAddedQuestionIds: React.Dispatch<React.SetStateAction<string[]>>;
  setAddedSubtestIds: React.Dispatch<React.SetStateAction<string[]>>;
  addedQuestionIds: string[];
  addedSubtestIds: string[];
}) => {
  // Set the initial active section to the first section if not already set
  if (activeSectionIndex === null && sections.length > 0) {
    setActiveSection(0);
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Update removeQuestion to handle subtest IDs
  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const updatedSections = [...sections];
    const removedQuestion = updatedSections[sectionIndex].questions[questionIndex];

    // Remove the question from the section
    updatedSections[sectionIndex].questions = updatedSections[sectionIndex].questions.filter((_: any, idx: number) => idx !== questionIndex);
    setSections(updatedSections);

    // Check if the removed item is a subtest by checking for subtest-specific properties
    const isSubtest = 'name' in removedQuestion && 'rules' in removedQuestion;

    // Remove the ID from appropriate list
    if (isSubtest) {
      setAddedSubtestIds(prev => prev.filter(id => id !== removedQuestion._id));
    } else {
      setAddedQuestionIds(prev => prev.filter(id => id !== removedQuestion._id));
    }
  };

  // Update removeSection to handle both questions and subtests
  const removeSection = (sectionIndex: number) => {
    const removedSection = sections[sectionIndex];

    // Get all question and subtest IDs from the removed section and its nested sections
    const getAllIds = (section: Section): { questionIds: string[], subtestIds: string[] } => {
      const ids = {
        questionIds: section.questions.filter(q => !('name' in q && 'rules' in q)).map(q => q._id),
        subtestIds: section.questions.filter(q => 'name' in q && 'rules' in q).map(q => q._id)
      };

      if (section.nestedSections) {
        section.nestedSections.forEach((nestedSection: Section) => {
          const nestedIds = getAllIds(nestedSection);
          ids.questionIds.push(...nestedIds.questionIds);
          ids.subtestIds.push(...nestedIds.subtestIds);
        });
      }
      return ids;
    };

    const removedIds = getAllIds(removedSection);

    // Remove the section
    const updatedSections = sections.filter((_, idx) => idx !== sectionIndex);
    setSections(updatedSections);

    // Remove IDs from respective lists
    setAddedQuestionIds(prev => prev.filter(id => !removedIds.questionIds.includes(id)));
    setAddedSubtestIds(prev => prev.filter(id => !removedIds.subtestIds.includes(id)));
  };

  // Move a question up or down within a section
  const moveQuestion = (sectionIndex: number, questionIndex: number, direction: "up" | "down") => {
    const updatedSections = sections.map((section, idx) => {
      if (idx === sectionIndex) {
        const questions = [...section.questions];
        if (direction === "up" && questionIndex > 0) {
          [questions[questionIndex - 1], questions[questionIndex]] = [questions[questionIndex], questions[questionIndex - 1]];
        }
        if (direction === "down" && questionIndex < questions.length - 1) {
          [questions[questionIndex + 1], questions[questionIndex]] = [questions[questionIndex], questions[questionIndex + 1]];
        }
        return { ...section, questions };
      }
      return section;
    });
    setSections(updatedSections);
  };

  // Function to save a section as a subtest
  const saveAsSubtest = (sectionIndex: number) => {
    const sectionToSave = sections[sectionIndex];
    // Implement the logic to save the section as a subtest
    console.log("Saving section as subtest:", sectionToSave);
  };

  return (
    <main className="w-full h-full border-l">
      {/* Header */}
      <header className="flex justify-between items-center border-b py-2 px-2">
        <h2 className=""><span className="font-bold">{formData.assessmentName}</span>
          : Test Preview
        </h2>

        <h4>
          Max Marks: 100
        </h4>
        {/* Options Icon Button with Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Options</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Select Number Format */}
              <div>
                <label className="font-bold mb-2 block">Select Number Format</label>
                <Select onValueChange={toggleNumberFormat} value={numberFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">1, 2, 3</SelectItem>
                    <SelectItem value="roman">I, II, III</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Blueprint Button */}
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Blueprint
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      {/* Preview Sections */}
      <div className="p-2">
        {sections.map((section, index) => (
          <AssembledSection
            key={index}
            section={section}
            sectionIndex={index}
            activeSectionIndex={activeSectionIndex}
            setActiveSection={setActiveSection}
            removeSection={removeSection}
            numberFormat={numberFormat}
            sections={sections}
            setSections={setSections}
            moveQuestion={moveQuestion}
            setSelectedQuestion={setSelectedQuestion}
            setIsDialogOpen={setIsDialogOpen}
            removeQuestion={removeQuestion}
            setActiveParentIndex={setActiveParentIndex}
            activeParentIndex={activeParentIndex}
          />
        ))}

        {/* Add Section Button */}
        <Button onClick={addSection}>Add Section</Button>
      </div>

      <QuestionDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        question={selectedQuestion}
      />
    </main>
  );
};
