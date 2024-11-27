import { BookTemplate, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Question, Section } from "./assembly-types";
import { LucideSave } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { QuestionDisplayItem } from "./question-display-item/question-display-item";

// Helper function to convert numbers to Roman numerals
const convertToRoman = (num: number) => {
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return romanNumerals[num - 1] || num;
};

// New AssembledSection component
export const AssembledSection = ({
    section,
    sectionIndex,
    activeSectionIndex,
    setActiveSection,
    removeSection,
    saveAsSubtest,
    numberFormat,
    sections,
    setSections,
    moveQuestion,
    setSelectedQuestion,
    setIsDialogOpen,
    removeQuestion,
}: {
    section: any;
    sections: Section[]
    sectionIndex: number;
    activeSectionIndex: number | null;
    setActiveSection: (sectionIndex: number) => void;
    removeSection: (sectionIndex: number) => void;
    saveAsSubtest: (sectionIndex: number) => void;
    numberFormat: string;
    setSections: (sections: any[]) => void;
    moveQuestion: (sectionIndex: number, questionIndex: number, direction: "up" | "down") => void;
    setSelectedQuestion: (question: Question | null) => void;
    setIsDialogOpen: (isOpen: boolean) => void;
    removeQuestion: (sectionIndex: number, questionIndex: number) => void;
}) => {
    return (
        <div
            className={`border-2 rounded-md mb-4 ${activeSectionIndex === sectionIndex ? "border-2 border-black" : ""}`}
            onClick={() => setActiveSection(sectionIndex)}
        >
            <div className="flex justify-between items-center p-4">
                <div>
                    Section {numberFormat === "normal" ? sectionIndex + 1 : convertToRoman(sectionIndex + 1)}: &nbsp;
                    <span className="font-bold">{section.title}</span>
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

            <div className="flex justify-between items-center pb-4 px-4">
                <RadioGroup
                    value={String(activeSectionIndex)}
                    onValueChange={(value) => setActiveSection(Number(value))}
                    className="flex items-center flex-1"
                >
                    <RadioGroupItem value={String(sectionIndex)} className="mr-2" />
                </RadioGroup>
                <Input
                    placeholder={`Enter Section Title`}
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
                        removeQuestion={(qIdx) => removeQuestion(sectionIndex, qIdx)}
                    />
                ))}
            </ul>
        </div>
    );
};
