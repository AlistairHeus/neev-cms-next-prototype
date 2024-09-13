-- DropForeignKey
ALTER TABLE "QuestionGroup" DROP CONSTRAINT "QuestionGroup_assessmentId_fkey";

-- AlterTable
ALTER TABLE "QuestionGroup" ALTER COLUMN "assessmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionGroup" ADD CONSTRAINT "QuestionGroup_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
