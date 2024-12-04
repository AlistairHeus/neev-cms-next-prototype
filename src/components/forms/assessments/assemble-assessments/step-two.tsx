import { useState } from "react";
import { QuestionSidebar } from "./utils/question-sidebar";
import { AssembledTestPreview } from "./utils/assembled-test-preview";
import { Section, Question, Subtest } from "./utils/assembly-types";

export const StepTwoForm = ({ formData, handlePrevStep, handleNextStep }: any) => {
  const [sections, setSections] = useState<Section[]>([
    { title: "Section 1", questions: [], nestedSections: [] },
  ]);
  const [numberFormat, setNumberFormat] = useState("normal");
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
  const [activeParentIndex, setActiveParentIndex] = useState<number | null>(null);
  const [addedQuestionIds, setAddedQuestionIds] = useState<string[]>([]);
  const [addedSubtestIds, setAddedSubtestIds] = useState<string[]>([]);

  // Function to toggle between normal and Roman numeral question number formats
  const toggleNumberFormat = () => {
    setNumberFormat((prevFormat) => (prevFormat === "normal" ? "roman" : "normal"));
  };

  // Function to add a question to a specific section
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
    if (selectedSectionIndex === null) return;

    const updatedSections = sections.map((section, idx) => {
      if (idx === selectedSectionIndex) {
        return { ...section, questions: [...section.questions, ...subtest.questions] };
      }
      return section;
    });
    setSections(updatedSections);
  };

  // Function to add a new section
  const addSection = () => {
    const newSection = { title: "", questions: [], nestedSections: [] };
    setSections([...sections, newSection]);
    setSelectedSectionIndex(sections.length); // Set the newly created section as the active one
  };

  // Function to handle section selection
  const setActiveSection = (sectionIndex: number | null) => {
    console.log("Setting active section:", sectionIndex);
    setSelectedSectionIndex(sectionIndex);
    // Only reset activeParentIndex if we're changing sections
    if (sectionIndex !== selectedSectionIndex) {
      setActiveParentIndex(null);
    }
  };

  // Function to add a question to the active section
  const addQuestionToActiveSection = (question: Question) => {
    if (selectedSectionIndex === null) return;

    const sectionToUpdate = sections[selectedSectionIndex];

    if (!sectionToUpdate) {
      console.error("Section to update is undefined.");
      return;
    }

    const updatedSections = [...sections];

    if (sectionToUpdate.nestedSections && sectionToUpdate.nestedSections.length > 0) {
      if (activeParentIndex !== null) {
        const nestedSection = sectionToUpdate.nestedSections[activeParentIndex];
        if (nestedSection) {
          nestedSection.questions.push(question);
        } else {
          console.error("Nested section is undefined.");
        }
      } else {
        console.error("Selected nested section index is null, cannot add question to nested section.");
      }
    } else {
      updatedSections[selectedSectionIndex].questions.push(question);
    }

    setSections(updatedSections);
  };

  return (
    <div className="flex w-full h-full border-t">
      {/* Sidebar: Filters and Available Questions */}
      <QuestionSidebar
        formData={formData}
        sections={sections}
        addQuestionToActiveSection={addQuestionToActiveSection}
        addSubtestToSection={addSubtestToSection}
        activeSectionIndex={selectedSectionIndex}
        activeParentIndex={activeParentIndex}
        setActiveParentIndex={setActiveParentIndex}
        setSections={setSections}
        addedQuestionIds={addedQuestionIds}
        setAddedQuestionIds={setAddedQuestionIds}
        addedSubtestIds={addedSubtestIds}
        setAddedSubtestIds={setAddedSubtestIds}
      />

      {/* Main Preview Section */}
      <AssembledTestPreview
        sections={sections}
        setSections={setSections}
        numberFormat={numberFormat}
        toggleNumberFormat={toggleNumberFormat}
        addSection={addSection}
        activeSectionIndex={selectedSectionIndex}
        setActiveSection={setActiveSection}
        formData={formData}
        activeParentIndex={activeParentIndex}
        setActiveParentIndex={setActiveParentIndex}
        setAddedQuestionIds={setAddedQuestionIds}
        setAddedSubtestIds={setAddedSubtestIds}
        addedQuestionIds={addedQuestionIds}
        addedSubtestIds={addedSubtestIds}
      />
    </div>
  );
};
