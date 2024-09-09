// questionGroupsData.ts
export interface Question {
  question_instruction: string;
  question_instruction_voiceover: string;
  question_stem: string;
  question_stem_voiceover: string;
  explanation: string;
  explanation_voiceover: string;
  question_testing_objective: string;
  max_score: number;
  question_type: string;
  subject_no: number;
  class: number;
}

export interface QuestionGroup {
  id: number;
  name: string;
  questions: Question[];
}

// Updated dummy data with multiple questions in some groups
export const questionGroups: QuestionGroup[] = [
  {
    id: 1,
    name: "Literacy Group 1",
    questions: [
      {
        question_instruction: "Listen carefully.",
        question_instruction_voiceover: "voiceover1.mp3",
        question_stem: "What is the capital of France?",
        question_stem_voiceover: "stemVoiceover1.mp3",
        explanation: "The capital of France is Paris.",
        explanation_voiceover: "explanationVoiceover1.mp3",
        question_testing_objective: "Geography knowledge",
        max_score: 1,
        question_type: "MCQ",
        subject_no: 101,
        class: 5,
      },
      {
        question_instruction: "Identify the correct option.",
        question_instruction_voiceover: "voiceover2.mp3",
        question_stem: "What is the capital of Germany?",
        question_stem_voiceover: "stemVoiceover2.mp3",
        explanation: "The capital of Germany is Berlin.",
        explanation_voiceover: "explanationVoiceover2.mp3",
        question_testing_objective: "Geography knowledge",
        max_score: 1,
        question_type: "MCQ",
        subject_no: 101,
        class: 5,
      },
    ],
  },
  {
    id: 2,
    name: "Numeracy Group 1",
    questions: [
      {
        question_instruction: "Solve the following.",
        question_instruction_voiceover: "voiceover3.mp3",
        question_stem: "What is 5 + 3?",
        question_stem_voiceover: "stemVoiceover3.mp3",
        explanation: "5 + 3 equals 8.",
        explanation_voiceover: "explanationVoiceover3.mp3",
        question_testing_objective: "Basic arithmetic",
        max_score: 1,
        question_type: "Short Answer",
        subject_no: 102,
        class: 1,
      },
    ],
  },
  {
    id: 3,
    name: "Literacy Group 2",
    questions: [
      {
        question_instruction: "Read the passage.",
        question_instruction_voiceover: "voiceover4.mp3",
        question_stem: "What is the main idea of the passage?",
        question_stem_voiceover: "stemVoiceover4.mp3",
        explanation: "The main idea of the passage is...",
        explanation_voiceover: "explanationVoiceover4.mp3",
        question_testing_objective: "Reading comprehension",
        max_score: 2,
        question_type: "Short Answer",
        subject_no: 101,
        class: 4,
      },
      {
        question_instruction: "Which sentence best describes the author's tone?",
        question_instruction_voiceover: "voiceover5.mp3",
        question_stem: "Describe the tone of the passage.",
        question_stem_voiceover: "stemVoiceover5.mp3",
        explanation: "The tone is formal and informative.",
        explanation_voiceover: "explanationVoiceover5.mp3",
        question_testing_objective: "Comprehension and interpretation",
        max_score: 2,
        question_type: "Short Answer",
        subject_no: 101,
        class: 4,
      },
    ],
  },
  {
    id: 4,
    name: "Numeracy Group 2",
    questions: [
      {
        question_instruction: "Solve the problem.",
        question_instruction_voiceover: "voiceover6.mp3",
        question_stem: "If a train travels 60 km/h, how far does it travel in 3 hours?",
        question_stem_voiceover: "stemVoiceover6.mp3",
        explanation: "Distance = Speed x Time, so 60 x 3 = 180 km.",
        explanation_voiceover: "explanationVoiceover6.mp3",
        question_testing_objective: "Speed, distance, and time",
        max_score: 2,
        question_type: "MCQ",
        subject_no: 102,
        class: 3,
      },
      {
        question_instruction: "What is the speed of a car covering 120 km in 2 hours?",
        question_instruction_voiceover: "voiceover7.mp3",
        question_stem: "Calculate the speed.",
        question_stem_voiceover: "stemVoiceover7.mp3",
        explanation: "Speed = Distance / Time, so 120 / 2 = 60 km/h.",
        explanation_voiceover: "explanationVoiceover7.mp3",
        question_testing_objective: "Speed, distance, and time",
        max_score: 2,
        question_type: "Short Answer",
        subject_no: 102,
        class: 3,
      },
    ],
  },
  {
    id: 5,
    name: "Literacy Group 3",
    questions: [
      {
        question_instruction: "Fill in the blank.",
        question_instruction_voiceover: "voiceover8.mp3",
        question_stem: "The quick _____ fox jumped over the lazy dog.",
        question_stem_voiceover: "stemVoiceover8.mp3",
        explanation: "The word 'brown' fits in the blank.",
        explanation_voiceover: "explanationVoiceover8.mp3",
        question_testing_objective: "Grammar",
        max_score: 1,
        question_type: "Fill in the Blank",
        subject_no: 101,
        class: 2,
      },
      {
        question_instruction: "Choose the correct word to complete the sentence.",
        question_instruction_voiceover: "voiceover9.mp3",
        question_stem: "She _____ to the store to buy milk.",
        question_stem_voiceover: "stemVoiceover9.mp3",
        explanation: "The correct word is 'went'.",
        explanation_voiceover: "explanationVoiceover9.mp3",
        question_testing_objective: "Verb usage",
        max_score: 1,
        question_type: "Fill in the Blank",
        subject_no: 101,
        class: 2,
      },
    ],
  },
  {
    id: 6,
    name: "Numeracy Group 3",
    questions: [
      {
        question_instruction: "What is the answer?",
        question_instruction_voiceover: "voiceover10.mp3",
        question_stem: "What is the square root of 16?",
        question_stem_voiceover: "stemVoiceover10.mp3",
        explanation: "The square root of 16 is 4.",
        explanation_voiceover: "explanationVoiceover10.mp3",
        question_testing_objective: "Basic math operations",
        max_score: 1,
        question_type: "MCQ",
        subject_no: 102,
        class: 4,
      },
      {
        question_instruction: "Solve the equation.",
        question_instruction_voiceover: "voiceover11.mp3",
        question_stem: "What is the value of x if 2x + 4 = 10?",
        question_stem_voiceover: "stemVoiceover11.mp3",
        explanation: "x = 3 after solving the equation.",
        explanation_voiceover: "explanationVoiceover11.mp3",
        question_testing_objective: "Algebra",
        max_score: 2,
        question_type: "Short Answer",
        subject_no: 102,
        class: 4,
      },
    ],
  },
]


export type Assessment = {
  id: string;
  name: string; // Added field for assessment name
  medium: string; // Added field for vernacular medium
  createdBy: string;
  reviewers: string[];
  status: string;
  questionGroups: { questions: string[] }[];
};

export const dummyAssessments: Assessment[] = [
  {
    id: '1',
    name: 'Math Assessment', // Name of the assessment
    medium: 'English', // Vernacular medium
    createdBy: 'John Doe',
    reviewers: ['Alice', 'Bob'],
    status: 'Pending',
    questionGroups: [{ questions: ['Q1', 'Q2', 'Q3'] }]
  },
  {
    id: '2',
    name: 'Science Assessment',
    medium: 'Hindi',
    createdBy: 'Jane Smith',
    reviewers: ['Charlie', 'David'],
    status: 'Completed',
    questionGroups: [{ questions: ['Q1', 'Q2'] }]
  },
  {
    id: '3',
    name: 'History Assessment',
    medium: 'French',
    createdBy: 'Samuel Green',
    reviewers: ['Eve', 'Frank'],
    status: 'In Progress',
    questionGroups: [{ questions: ['Q1', 'Q2', 'Q3', 'Q4'] }]
  },
  {
    id: '4',
    name: 'Geography Assessment',
    medium: 'Spanish',
    createdBy: 'Diana Prince',
    reviewers: ['Grace', 'Henry'],
    status: 'Pending',
    questionGroups: [{ questions: ['Q1'] }]
  },
  {
    id: '5',
    name: 'Physics Assessment',
    medium: 'English',
    createdBy: 'Bruce Wayne',
    reviewers: ['Ivy', 'Jack'],
    status: 'Completed',
    questionGroups: [{ questions: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'] }]
  }
];
