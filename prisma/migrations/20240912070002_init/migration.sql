/*
  Warnings:

  - You are about to drop the column `questionGroups` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `attributes` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `maxScore` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `questionInstruction` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `questionStem` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `questionType` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `subjectNo` on the `Question` table. All the data in the column will be lost.
  - Added the required column `explanation_voiceover` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_score` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_instruction` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_instruction_voiceover` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_stem` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_stem_voiceover` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_testing_objective` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_type` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_no` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assessmentId` to the `QuestionGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "questionGroups";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "attributes",
DROP COLUMN "maxScore",
DROP COLUMN "questionInstruction",
DROP COLUMN "questionStem",
DROP COLUMN "questionType",
DROP COLUMN "subjectNo",
ADD COLUMN     "explanation_voiceover" TEXT NOT NULL,
ADD COLUMN     "max_score" INTEGER NOT NULL,
ADD COLUMN     "question_instruction" TEXT NOT NULL,
ADD COLUMN     "question_instruction_voiceover" TEXT NOT NULL,
ADD COLUMN     "question_stem" TEXT NOT NULL,
ADD COLUMN     "question_stem_voiceover" TEXT NOT NULL,
ADD COLUMN     "question_testing_objective" TEXT NOT NULL,
ADD COLUMN     "question_type" TEXT NOT NULL,
ADD COLUMN     "subject_no" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "QuestionGroup" ADD COLUMN     "assessmentId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionGroup" ADD CONSTRAINT "QuestionGroup_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
