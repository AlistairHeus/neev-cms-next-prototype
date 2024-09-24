import { QUESTION_TYPES_LANGUAGE, QUESTION_TYPES_MATH, QuestionType } from "./question-types"

export type Subject = {
    name: string,
    questionTypes: QuestionType[]
}


export const SUBJECTS: Subject[] = [
    {
        name: "Numeracy",
        questionTypes: QUESTION_TYPES_MATH,
    },
    {
        name: "Literacy",
        questionTypes: QUESTION_TYPES_LANGUAGE,  // Add question types for Language later
    },
]