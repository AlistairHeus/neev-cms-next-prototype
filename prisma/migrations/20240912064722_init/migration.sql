-- CreateTable
CREATE TABLE "QuestionGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "QuestionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "questionInstruction" TEXT NOT NULL,
    "questionStem" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "questionType" TEXT NOT NULL,
    "subjectNo" INTEGER NOT NULL,
    "class" INTEGER NOT NULL,
    "attributes" JSONB NOT NULL,
    "questionGroupId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reviewers" TEXT[],
    "questionGroups" INTEGER[],

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionGroupId_fkey" FOREIGN KEY ("questionGroupId") REFERENCES "QuestionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
