import prisma from '@/lib/prisma.init';

interface CreateAssessmentInput {
  name: string;
  medium: string;
  createdBy: string;
  reviewers: string[];
  status: string;
  questionGroups?: {
    name: string;
    questions: {
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
      attributes: {
        type: string;
        value: string;
      }[];
    }[];
  }[];
}

// Create a new assessment, with or without question groups and questions
export const createAssessment = async (assessmentData: CreateAssessmentInput) => {
  const { name, medium, createdBy, reviewers, status, questionGroups } = assessmentData;

  return await prisma.assessment.create({
    data: {
      name,
      medium,
      createdBy,
      reviewers,
      status,
      questionGroups: {
        create: questionGroups?.map((group) => ({
          name: group.name,
          questions: {
            create: group.questions.map((question) => ({
              question_instruction: question.question_instruction,
              question_instruction_voiceover: question.question_instruction_voiceover,
              question_stem: question.question_stem,
              question_stem_voiceover: question.question_stem_voiceover,
              explanation: question.explanation,
              explanation_voiceover: question.explanation_voiceover,
              question_testing_objective: question.question_testing_objective,
              max_score: question.max_score,
              question_type: question.question_type,
              subject_no: question.subject_no,
              class: question.class,
              attributes: {
                create: question.attributes.map((attr) => ({
                  type: attr.type,
                  value: attr.value,
                })),
              },
            })),
          },
        })),
      },
    },
    include: {
      questionGroups: {
        include: {
          questions: {
            include: {
              attributes: true,
            },
          },
        },
      },
    },
  });
};

// Fetch all assessments
export const getAllAssessments = async () => {
  return await prisma.assessment.findMany({
    include: {
      questionGroups: {
        include: {
          questions: true,
        },
      },
    },
  });
};

// Fetch a specific assessment by ID
export const getAssessmentById = async (assessmentId: number) => {
  return await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: {
      questionGroups: {
        include: {
          questions: {
            include: {
              attributes: true, // Include question attributes (e.g., difficulty)
            },
          },
        },
      },
    },
  });
};

// Update an assessment
export const updateAssessment = async (assessmentId: number, assessmentData: Partial<CreateAssessmentInput>) => {
  const { questionGroups, ...assessmentDetails } = assessmentData;

  return await prisma.assessment.update({
    where: { id: assessmentId },
    data: {
      ...assessmentDetails,
      questionGroups: questionGroups ? {
        create: questionGroups.map((group) => ({
          name: group.name,
          questions: {
            create: group.questions.map((question) => ({
              question_instruction: question.question_instruction,
              question_instruction_voiceover: question.question_instruction_voiceover,
              question_stem: question.question_stem,
              question_stem_voiceover: question.question_stem_voiceover,
              explanation: question.explanation,
              explanation_voiceover: question.explanation_voiceover,
              question_testing_objective: question.question_testing_objective,
              max_score: question.max_score,
              question_type: question.question_type,
              subject_no: question.subject_no,
              class: question.class,
              attributes: {
                create: question.attributes.map((attr) => ({
                  type: attr.type,
                  value: attr.value,
                })),
              },
            })),
          },
        })),
      } : undefined,
    },
    include: {
      questionGroups: {
        include: {
          questions: {
            include: {
              attributes: true,
            },
          },
        },
      },
    },
  });
};

// Delete an assessment
export const deleteAssessment = async (assessmentId: number) => {
  return await prisma.assessment.delete({
    where: { id: assessmentId },
  });
};

// Add an existing question group to an assessment
export const addQuestionGroupToAssessment = async (assessmentId: number, questionGroupId: number) => {
  return await prisma.assessment.update({
    where: { id: assessmentId },
    data: {
      questionGroups: {
        connect: { id: questionGroupId },
      },
    },
    include: {
      questionGroups: true,
    },
  });
};

// Remove a question group from an assessment
export const removeQuestionGroupFromAssessment = async (assessmentId: number, questionGroupId: number) => {
  return await prisma.assessment.update({
    where: { id: assessmentId },
    data: {
      questionGroups: {
        disconnect: { id: questionGroupId },
      },
    },
    include: {
      questionGroups: true,
    },
  });
};
