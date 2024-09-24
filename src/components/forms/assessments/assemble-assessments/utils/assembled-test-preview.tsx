import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, ArrowDown, Trash, MoreVertical, FileText } from "lucide-react"; // Lucide Icons
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // ShadCN Dialog
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AssembledTestPreview = ({
  sections,
  setSections,
  numberFormat,
  toggleNumberFormat,
  addSection,
  activeSectionIndex,
  setActiveSection,
}: {
  sections: any[];
  setSections: (sections: any[]) => void;
  numberFormat: string;
  toggleNumberFormat: () => void;
  addSection: () => void;
  activeSectionIndex: number | null; // Active section can be null
  setActiveSection: (sectionIndex: number) => void;
}) => {

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

  return (
    <main className="w-3/4 p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Test Assembly Preview</h2>

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
      <div>
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`border p-4 mb-4 ${activeSectionIndex === sectionIndex ? "border-blue-500" : ""}`}
          >
            <div className="flex justify-between items-center mb-2">
              {/* Radio button to select active section */}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="activeSection"
                  value={sectionIndex}
                  checked={activeSectionIndex === sectionIndex}
                  onChange={() => setActiveSection(sectionIndex)}
                  className="mr-2"
                />
                {`Section ${sectionIndex + 1}`}
              </label>

              {/* Button to remove section */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSection(sectionIndex)}
                className="ml-4"
              >
                <Trash className="h-5 w-5" />
              </Button>
            </div>

            {/* Section Title Input */}
            <Input
              placeholder={`Enter Section Title`}
              className="mb-2"
              value={section.title || ""}
              onChange={(e) => {
                const newSections = sections.map((s, i) =>
                  i === sectionIndex ? { ...s, title: e.target.value } : s
                );
                setSections(newSections); // Update the sections state
              }}
            />

            {/* List of Selected Questions */}
            <ul>
              {section.questions.map((question: { id: number, text: string }, questionIndex: number) => (
                <li key={questionIndex} className="flex items-center mb-2">
                  <span className="flex-1">
                    {`Question ${
                      numberFormat === "normal" ? questionIndex + 1 : convertToRoman(questionIndex + 1)
                    }: ${question.text}`} (ID: {question.id})
                  </span>

                  {/* Move Up Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveQuestion(sectionIndex, questionIndex, "up")}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>

                  {/* Move Down Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveQuestion(sectionIndex, questionIndex, "down")}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>

                  {/* Remove Question Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeQuestion(sectionIndex, questionIndex)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Add Section Button */}
        <Button onClick={addSection}>Add Section</Button>
      </div>
    </main>
  );
};

// Helper function to convert numbers to Roman numerals
const convertToRoman = (num: number) => {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  return romanNumerals[num - 1] || num;
};
