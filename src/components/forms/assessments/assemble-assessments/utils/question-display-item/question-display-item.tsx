import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Trash } from "lucide-react";
import { Question } from '@/components/forms/assessments/assemble-assessments/utils/assembly-types';

interface QuestionDisplayItemProps {
    question: Question;
    questionIndex: number;
    sectionIndex: number;
    numberFormat: string;
    onQuestionClick: () => void;
    moveQuestion: (sectionIndex: number, questionIndex: number, direction: "up" | "down") => void;
    removeQuestion: (sectionIndex: number, questionIndex: number) => void;
}

export const QuestionDisplayItem: React.FC<QuestionDisplayItemProps> = ({
    question,
    questionIndex,
    sectionIndex,
    numberFormat,
    onQuestionClick,
    moveQuestion,
    removeQuestion,
}) => {
    return (
        <li className="px-4 border-b last:border-b-0">
            <div className="flex items-center gap-2 pt-2">

                <span className="flex-1 cursor-pointer text-sm font-bold" onClick={onQuestionClick}>
                    {`Question ${numberFormat === "normal" ? questionIndex + 1 : convertToRoman(questionIndex + 1)}`}
                </span>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        moveQuestion(sectionIndex, questionIndex, "up");
                    }}
                >
                    <ArrowUp className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        moveQuestion(sectionIndex, questionIndex, "down");
                    }}
                >
                    <ArrowDown className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        removeQuestion(sectionIndex, questionIndex);
                    }}
                >
                    <Trash className="h-4 w-4" />
                </Button>


            </div>

            <div className="flex items-center gap-2 text-lg pb-4">
                {question.question.name}
            </div>
        </li>
    );
};

// Helper function to convert numbers to Roman numerals
const convertToRoman = (num: number) => {
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return romanNumerals[num - 1] || num;
};