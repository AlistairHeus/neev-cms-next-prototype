import { useState } from "react";
import { QuestionSidebar } from "./utils/question-sidebar";
import { AssembledTestPreview } from "./utils/assembled-test-preview";

interface Question {
  id: number;
  text: string;
}

interface Section {
  title: string;
  questions: Question[]; // Update this to hold Question objects
}

export const StepTwoForm = ({ handlePrevStep, handleNextStep }: any) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [numberFormat, setNumberFormat] = useState("normal");
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null); // Track the active section index

  // Function to toggle between normal and Roman numeral question number formats
  const toggleNumberFormat = () => {
    setNumberFormat((prevFormat) => (prevFormat === "normal" ? "roman" : "normal"));
  };

  // Function to add a question to the active section from the sidebar
  const addQuestionToSection = (question: { id: number; text: string }) => {
    if (activeSectionIndex === null) return; // No section selected

    const updatedSections = sections.map((section, idx) => {
      if (idx === activeSectionIndex) {
        return { ...section, questions: [...section.questions, question] }; // Add question to active section
      }
      return section;
    });
    setSections(updatedSections);
  };

  // Add a new section and set it as the active section
  const addSection = () => {
    const newSectionIndex = sections.length; // Index of the new section
    setSections([...sections, { title: "", questions: [] }]);
    setActiveSectionIndex(newSectionIndex); // Set the newly created section as the active one
  };

  // Function to handle section selection (if you want to allow users to select which section is active)
  const setActiveSection = (sectionIndex: number) => {
    setActiveSectionIndex(sectionIndex);
  };

  return (
    <div className="flex w-full h-full">
      {/* Sidebar: Filters and Available Questions */}
      <QuestionSidebar
        sections={sections}
        addQuestionToSection={addQuestionToSection} // Add questions to the active section from the sidebar
      />

      {/* Main Preview Section */}
      <AssembledTestPreview
        sections={sections}
        setSections={setSections}
        numberFormat={numberFormat}
        toggleNumberFormat={toggleNumberFormat}
        addSection={addSection}
        activeSectionIndex={activeSectionIndex} // Pass the active section index to display it in the UI
        setActiveSection={setActiveSection} // Pass the function to allow users to change the active section
      />
    </div>
  );
};
