import prisma from '@/lib/prisma.init';

interface CreateQuestionGroupInput {
  name: string;
  assessmentId?: number; // Optional for linking to an assessment
}

// Create a new question group (with optional assessment link)
export const createQuestionGroup = async (groupData: CreateQuestionGroupInput) => {
  const { name, assessmentId } = groupData;

  return await prisma.questionGroup.create({
    data: {
      name,
      assessment: assessmentId ? { connect: { id: assessmentId } } : undefined, // Link to assessment if provided
    },
  });
};

// Fetch all question groups (optionally include questions)
export const getAllQuestionGroups = async (includeQuestions = false) => {
  return await prisma.questionGroup.findMany({
    include: includeQuestions ? { questions: true } : undefined,
  });
};

// Fetch a specific question group by ID
export const getQuestionGroupById = async (groupId: number) => {
  return await prisma.questionGroup.findUnique({
    where: { id: groupId },
    include: {
      questions: true, // Include associated questions
    },
  });
};

// Update a question group by ID
export const updateQuestionGroup = async (groupId: number, groupData: Partial<CreateQuestionGroupInput>) => {
  return await prisma.questionGroup.update({
    where: { id: groupId },
    data: {
      ...groupData,
    },
  });
};

// Delete a question group by ID
export const deleteQuestionGroup = async (groupId: number) => {
  return await prisma.questionGroup.delete({
    where: { id: groupId },
  });
};

// Add a question group to an assessment (link existing question group)
export const addQuestionGroupToAssessment = async (assessmentId: number, groupId: number) => {
  return await prisma.assessment.update({
    where: { id: assessmentId },
    data: {
      questionGroups: {
        connect: { id: groupId },
      },
    },
  });
};
