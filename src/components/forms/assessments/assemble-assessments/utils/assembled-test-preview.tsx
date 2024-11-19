import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, ArrowDown, Trash, MoreVertical, FileText, BookTemplate, LucideSave } from "lucide-react"; // Lucide Icons
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // ShadCN Dialog
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Question, QuestionOption, Subject } from "./assembly-types";
import QuestionDetailsDialog from "@/components/ui/QuestionDetailsDialog";
import { QuestionDisplayItem } from "@/components/forms/assessments/assemble-assessments/utils/question-display-item/question-display-item";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import ShadCN RadioGroup components
import { Medium, Project } from "@/components/forms/form-utils/form-types";



export const AssembledTestPreview = ({
  sections,
  setSections,
  numberFormat,
  toggleNumberFormat,
  addSection,
  activeSectionIndex,
  setActiveSection,
  formData,
}: {
  sections: any[];
  setSections: (sections: any[]) => void;
  numberFormat: string;
  toggleNumberFormat: () => void;
  addSection: () => void;
  activeSectionIndex: number | null; // Active section can be null
  setActiveSection: (sectionIndex: number) => void;
  formData: {
    assessmentName: string;
    project: Project;
    grade: number;
    subject: Subject;
    medium: Medium;
  };
}) => {
  // Set the initial active section to the first section if not already set
  if (activeSectionIndex === null && sections.length > 0) {
    setActiveSection(0);
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Remove a question from a section
  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const updatedSections = sections.map((section, idx) => {
      if (idx === sectionIndex) {
        return {
          ...section,
          questions: section.questions.filter((_: { id: number, text: string }, qIdx: number) => qIdx !== questionIndex), // Explicitly typing `_`
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  // Remove a section
  const removeSection = (sectionIndex: number) => {
    const updatedSections = sections.filter((_, idx) => idx !== sectionIndex);
    setSections(updatedSections);

    // If the removed section was active, reset the active section
    if (activeSectionIndex === sectionIndex || updatedSections.length === 0) {
      setActiveSection(null as any); // Type assertion to assign null
    } else if (activeSectionIndex !== null && sectionIndex < activeSectionIndex) {
      // Adjust the active section index if the removed section was before the active one
      setActiveSection(activeSectionIndex - 1);
    }
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
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={` border-2 rounded-md mb-4 ${activeSectionIndex === sectionIndex ? " border-2  border-black" : ""}`}
            onClick={() => setActiveSection(sectionIndex)}
          >
            <div className="flex justify-between items-center p-4">
              <div className="">
                Section {numberFormat === "normal" ? sectionIndex + 1 : convertToRoman(sectionIndex + 1)}
                : &nbsp;
                <span className="font-bold">
                  {section.title}
                </span>
              </div>

              <div className="flex items-center space-x-2 flex-1 justify-end ">
                <Button
                  variant="default"
                  onClick={(e) => {
                    e.stopPropagation();
                    saveAsSubtest(sectionIndex);
                  }}
                  className="flex gap-2 text-xs"
                >
                  <LucideSave className="h-5 w-5" />
                  Save as new template
                </Button>
                <Button
                  variant="ghost"
                  className="flex gap-2 text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BookTemplate className="h-5 w-5" />
                  Import Template
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSection(sectionIndex);
                  }}
                >
                  <Trash className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className=" flex justify-between items-center pb-4 px-4">
              <RadioGroup
                value={String(activeSectionIndex)}
                onValueChange={(value) => setActiveSection(Number(value))}
                className="flex items-center flex-1"
              >
                <RadioGroupItem
                  value={String(sectionIndex)}
                  className="mr-2"
                />
              </RadioGroup>
              <Input
                placeholder={`Enter Section Title`}
                className=""
                value={section.title || ""}
                onChange={(e) => {
                  const newSections = sections.map((s, i) =>
                    i === sectionIndex ? { ...s, title: e.target.value } : s
                  );
                  setSections(newSections); // Update the sections state
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            {/* List of Selected Questions */}
            <ul className="border-t">
              {section.questions.map((question: Question, questionIndex: number) => (
                <QuestionDisplayItem
                  key={questionIndex}
                  question={question}
                  questionIndex={questionIndex}
                  sectionIndex={sectionIndex}
                  numberFormat={numberFormat}
                  onQuestionClick={() => {
                    console.log("Question clicked:", question);
                    setSelectedQuestion(question);
                    setIsDialogOpen(true);
                  }}
                  moveQuestion={moveQuestion}
                  removeQuestion={removeQuestion}
                />
              ))}
            </ul>
          </div>
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

// Helper function to convert numbers to Roman numerals
const convertToRoman = (num: number) => {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  return romanNumerals[num - 1] || num;
};
