import { Button } from "@/components/ui/button";
import { Trash, MoreVertical } from "lucide-react";
import { Question, Section, SectionOptions } from "./assembly-types";
import { Input } from "@/components/ui/input";
import { QuestionDisplayItem } from "./question-display-item/question-display-item";
import { NestedSection } from "./assembled-section-nested";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export const AssembledSection = ({
    section,
    sectionIndex,
    activeSectionIndex,
    setActiveSection,
    removeSection,
    numberFormat,
    sections,
    setSections,
    moveQuestion,
    setSelectedQuestion,
    setIsDialogOpen,
    removeQuestion,
    setActiveParentIndex,
    activeParentIndex,
}: {
    section: Section;
    sections: Section[];
    sectionIndex: number;
    activeSectionIndex: number | null;
    setActiveSection: (sectionIndex: number | null) => void;
    removeSection: (sectionIndex: number) => void;
    numberFormat: string;
    setSections: (sections: Section[]) => void;
    moveQuestion: (sectionIndex: number, questionIndex: number, direction: "up" | "down") => void;
    setSelectedQuestion: (question: Question | null) => void;
    setIsDialogOpen: (isOpen: boolean) => void;
    removeQuestion: (sectionIndex: number, questionIndex: number) => void;
    activeParentIndex: number | null;
    setActiveParentIndex: (index: number | null) => void;
}) => {
    const [isOptionsDialogOpen, setIsOptionsDialogOpen] = useState(false);
    const [sectionOptions, setSectionOptions] = useState<SectionOptions>({
        isTimed: false,
        timeLimit: 30,
        isOptional: false,
        passingScore: 70,
    });

    const handleOptionsChange = (options: Partial<SectionOptions>) => {
        setSectionOptions({ ...sectionOptions, ...options });
        // Here you would typically update the sections array with the new options
        const updatedSections = sections.map((s, i) =>
            i === sectionIndex ? { ...s, options: { ...sectionOptions, ...options } } : s
        );
        setSections(updatedSections);
    };

    return (
        <div className={`border-2 rounded-md mb-4 ${activeSectionIndex === sectionIndex ? "border-2 border-black" : ""}`}>
            {/* Parent Section Header */}
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="section" className="border-none">
                    <AccordionTrigger className="px-4 hover:no-underline">
                        <div className="flex w-full items-center justify-between">
                            <Input
                                placeholder={`Enter Section Title`}
                                value={section.title || ""}
                                onChange={(e) => {
                                    const newSections = sections.map((s, i) =>
                                        i === sectionIndex ? { ...s, title: e.target.value } : s
                                    );
                                    setSections(newSections);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="max-w-[300px]"
                            />
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOptionsDialogOpen(true);
                                    }}
                                >
                                    <MoreVertical className="h-5 w-5" />
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
                    </AccordionTrigger>

                    <AccordionContent className="px-4">
                        {/* Questions List */}
                        <ul className="border-t pt-4">
                            {section.questions.map((question: Question, questionIndex: number) => (
                                <QuestionDisplayItem
                                    key={questionIndex}
                                    question={question}
                                    questionIndex={questionIndex}
                                    sectionIndex={sectionIndex}
                                    numberFormat={numberFormat}
                                    onQuestionClick={() => {
                                        setSelectedQuestion(question);
                                        setIsDialogOpen(true);
                                    }}
                                    moveQuestion={moveQuestion}
                                    removeQuestion={(qIdx) => removeQuestion(sectionIndex, qIdx)}
                                />
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* Nested Sections - Outside parent's AccordionContent */}
            {section.nestedSections && section.nestedSections.length > 0 && (
                <div className="pl-8"> {/* Indentation for nested sections */}
                    {section.nestedSections.map((nestedSection: Section, index: number) => (
                        <Accordion type="single" collapsible className="w-full" key={index}>
                            <NestedSection
                                section={nestedSection}
                                sectionIndex={index}
                                parentSectionIndex={sectionIndex}
                                sections={sections}
                                setSections={setSections}
                                numberFormat={numberFormat}
                                removeQuestion={removeQuestion}
                                moveQuestion={moveQuestion}
                                setSelectedQuestion={setSelectedQuestion}
                                setIsDialogOpen={setIsDialogOpen}
                                setActiveParentIndex={setActiveParentIndex}
                                activeParentIndex={activeParentIndex}
                            />
                        </Accordion>
                    ))}
                </div>
            )}

            <div className="p-4">
                <Button
                    onClick={() => {
                        const newNestedSection = { title: "", questions: [] };
                        const updatedSections = sections.map((s, i) =>
                            i === sectionIndex ? {
                                ...s,
                                nestedSections: [...(s.nestedSections || []), newNestedSection]
                            } : s
                        );
                        setSections(updatedSections);
                    }}
                >
                    Add Subsection
                </Button>
            </div>

            {/* Section Options Dialog */}
            <Dialog open={isOptionsDialogOpen} onOpenChange={setIsOptionsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Section Options</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="timed"
                                checked={sectionOptions.isTimed}
                                onCheckedChange={(checked) =>
                                    handleOptionsChange({ isTimed: checked as boolean })
                                }
                            />
                            <Label htmlFor="timed">Timed Section</Label>
                        </div>

                        {sectionOptions.isTimed && (
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                                <Input
                                    id="timeLimit"
                                    type="number"
                                    value={sectionOptions.timeLimit}
                                    onChange={(e) =>
                                        handleOptionsChange({ timeLimit: parseInt(e.target.value) })
                                    }
                                />
                            </div>
                        )}

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="optional"
                                checked={sectionOptions.isOptional}
                                onCheckedChange={(checked) =>
                                    handleOptionsChange({ isOptional: checked as boolean })
                                }
                            />
                            <Label htmlFor="optional">Optional Section</Label>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="passingScore">Passing Score (%)</Label>
                            <Input
                                id="passingScore"
                                type="number"
                                value={sectionOptions.passingScore}
                                onChange={(e) =>
                                    handleOptionsChange({ passingScore: parseInt(e.target.value) })
                                }
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
