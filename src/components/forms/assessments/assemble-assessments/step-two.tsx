import { useState } from "react";
import { QuestionSidebar } from "./utils/question-sidebar";
import { AssembledTestPreview } from "./utils/assembled-test-preview";


import { Section, Question, Subtest } from "./utils/assembly-types";
export const StepTwoForm = ({ formData, handlePrevStep, handleNextStep }: any) => {
  const [sections, setSections] = useState<Section[]>([
    { title: "Section 1", questions: [] },
  ]);
  const [numberFormat, setNumberFormat] = useState("normal");
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null); // Track the active section index

  // Function to toggle between normal and Roman numeral question number formats
  const toggleNumberFormat = () => {
    setNumberFormat((prevFormat) => (prevFormat === "normal" ? "roman" : "normal"));
  };

  // Function to add a question to the active section from the sidebar
  const addQuestionToSection = (question: Question, sectionIndex: number | null) => {
    if (sectionIndex === null || sectionIndex < 0 || sectionIndex >= sections.length) {
      console.error("Invalid section index:", sectionIndex);
      return;
    }

    const section = sections[sectionIndex];
    if (!section || !section.questions) {
      console.error("Section or questions are undefined");
      return;
    }

    const questionExists = section.questions.some((q: Question) => q._id === question._id);

    if (questionExists) {
      console.log("Question already exists in the section.");
      return;
    }

    // Add the question to the section
    const updatedSections = sections.map((s, i) =>
      i === sectionIndex ? { ...s, questions: [...s.questions, question] } : s
    );

    setSections(updatedSections);
  };

  // Function to add a subtest to the active section
  const addSubtestToSection = (subtest: Subtest) => {
    // if (activeSectionIndex === null) return; // No section selected

    // const updatedSections = sections.map((section, idx) => {
    //   if (idx === activeSectionIndex) {
    //     return { ...section, questions: [...section.questions, subtest] }; // Assuming subtest can be added to questions
    //   }
    //   return section;
    // });
    // setSections(updatedSections);
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
    <div className="flex w-full h-full border-t">




      {/* Sidebar: Filters and Available Questions */}
      <QuestionSidebar
        formData={formData}
        sections={sections}
        addQuestionToSection={addQuestionToSection}
        addSubtestToSection={addSubtestToSection}
        activeSectionIndex={activeSectionIndex ?? -1}
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
        formData={formData}
      />
    </div>
  );
};
