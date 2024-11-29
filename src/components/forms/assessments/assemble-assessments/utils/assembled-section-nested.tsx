import { Question, Section, SectionOptions } from "./assembly-types";
import { QuestionDisplayItem } from "./question-display-item/question-display-item";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";


export const NestedSection = ({
    section,
    sectionIndex,
    numberFormat,
    removeQuestion,
    moveQuestion,
    setSelectedQuestion,
    setIsDialogOpen,
    setActiveParentIndex,
    activeParentIndex,
    sections,
    setSections,
    parentSectionIndex,
}: {
    section: Section;
    sectionIndex: number;
    numberFormat: string;
    removeQuestion: (sectionIndex: number, questionIndex: number) => void;
    moveQuestion: (sectionIndex: number, questionIndex: number, direction: "up" | "down") => void;
    setSelectedQuestion: (question: Question | null) => void;
    setIsDialogOpen: (isOpen: boolean) => void;
    setActiveParentIndex: (index: number | null) => void;
    activeParentIndex: number | null;
    sections: Section[];
    setSections: (sections: Section[]) => void;
    parentSectionIndex: number;
}) => {
    const [isOptionsDialogOpen, setIsOptionsDialogOpen] = useState(false);
    const [sectionOptions, setSectionOptions] = useState<SectionOptions>({
        isTimed: section.options?.isTimed || false,
        timeLimit: section.options?.timeLimit || 30,
        isOptional: section.options?.isOptional || false,
        passingScore: section.options?.passingScore || 70,
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        const updatedSections = [...sections];
        if (updatedSections[parentSectionIndex]?.nestedSections) {
            updatedSections[parentSectionIndex].nestedSections[sectionIndex].title = newTitle;
            setSections(updatedSections);
        }
    };

    const handleOptionsChange = (options: Partial<SectionOptions>) => {
        const newOptions = { ...sectionOptions, ...options };
        setSectionOptions(newOptions);

        // Update the nested section options in the main sections array
        const updatedSections = [...sections];
        if (updatedSections[parentSectionIndex]?.nestedSections) {
            updatedSections[parentSectionIndex].nestedSections[sectionIndex].options = newOptions;
            setSections(updatedSections);
        }
    };

    return (
        <AccordionItem value={`nested-${sectionIndex}`} className="border rounded-md mb-2">
            <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex w-full items-center justify-between">

                    <Checkbox
                        className="mr-4"
                        checked={activeParentIndex === sectionIndex}
                        onCheckedChange={() => setActiveParentIndex(activeParentIndex === sectionIndex ? null : sectionIndex)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <Input
                        type="text"
                        placeholder="Enter Nested Section Title"
                        value={section.title || ""}
                        onChange={handleTitleChange}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-grow"
                    />
                    <div className="flex items-center gap-2">
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

                    </div>
                </div>
            </AccordionTrigger>

            <AccordionContent className="px-4">
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

            {/* Section Options Dialog */}
            <Dialog open={isOptionsDialogOpen} onOpenChange={setIsOptionsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nested Section Options</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id={`timed-${sectionIndex}`}
                                checked={sectionOptions.isTimed}
                                onCheckedChange={(checked) =>
                                    handleOptionsChange({ isTimed: checked as boolean })
                                }
                            />
                            <Label htmlFor={`timed-${sectionIndex}`}>Timed Section</Label>
                        </div>

                        {sectionOptions.isTimed && (
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor={`timeLimit-${sectionIndex}`}>Time Limit (minutes)</Label>
                                <Input
                                    id={`timeLimit-${sectionIndex}`}
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
                                id={`optional-${sectionIndex}`}
                                checked={sectionOptions.isOptional}
                                onCheckedChange={(checked) =>
                                    handleOptionsChange({ isOptional: checked as boolean })
                                }
                            />
                            <Label htmlFor={`optional-${sectionIndex}`}>Optional Section</Label>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <Label htmlFor={`passingScore-${sectionIndex}`}>Passing Score (%)</Label>
                            <Input
                                id={`passingScore-${sectionIndex}`}
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
        </AccordionItem>
    );
};
