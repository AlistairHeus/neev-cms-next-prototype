interface QuestionOption {
    value1?: string;
    value2?: string;
    value3?: string;
    value4?: string;
    answer?: string;
    image?: string;
    description?: string;
    answer_audio?: string;
    answer_option?: string;
    audio1?: string;
    audio2?: string;
    audio3?: string;
    description1?: string;
    description2?: string;
    description3?: string;
}
  interface QuestionDetails {
    name: string;
  }
  
  interface QuestionExplanation {
    answer: string;
  }
  
  interface Subject {
    _id: string;
    enabled: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface Qtype {
    _id: string;
    enabled: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface Language {
    _id: string;
    enabled: number;
    code: string;
    language: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface Question {
    _id: string;
    options: QuestionOption[];
    enabled: number;
    subject: Subject;
    qtype: Qtype;
    question: QuestionDetails;
    explanation: QuestionExplanation;
    language: Language;
    __v: number;
    createdAt: string;
    updatedAt: string;
  }

  


  interface Subtest {
    _id: string;
    questions: Question[];
    rules: string[];
    ruleQtypes: string[];
    enabled: number;
    name: string;
    title: string;
    subject: string;
    language: string;
    qtype: string;
    subtest_audio: string;
    qtype_audio: string;
    type: string;
    nature: string;
    evaluation_notes: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    grade_skip: string;
    skip_duration: number | null;
    skipped: string;
    subtest_video: string;
  }
  
  // Define the Section interface
  interface Section {
    title: string;
    questions: Question[]; // Assuming questions can be of type Question or Subtest
    nestedSections?: Section[]; // Allow for multiple nested sections
    options?: SectionOptions;
  }
  


  interface SectionOptions {
    isTimed: boolean;
    timeLimit?: number; // in minutes
    isOptional: boolean;
    passingScore?: number;
  }

  export type {
    Question,
    QuestionOption,
    QuestionDetails,
    QuestionExplanation,
    Subject,
    Qtype,
    Language,
    Section,
    Subtest,
    SectionOptions
  }
