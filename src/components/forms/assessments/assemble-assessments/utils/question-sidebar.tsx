import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // ShadCN Accordion
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import QuestionDetailsDialog from "@/components/ui/QuestionDetailsDialog";
import { Skeleton } from '@/components/ui/skeleton';
import { useQuestions } from "@/data/hooks/useQuestions";
import { useSubtests } from '@/data/hooks/useSubtests';
import { ArrowRightCircle, ChevronLeft, ChevronRight, PlusCircle } from "lucide-react"; // Lucide filter icon
import { useState } from "react";
import { Question, Subtest } from "./assembly-types";

export const QuestionSidebar = ({
  formData,
  sections,
  addQuestionToSection,
  addSubtestToSection,
  activeSectionIndex,
}: {
  formData: any;
  sections: any[];
  addQuestionToSection: (question: Question, sectionIndex: number | null) => void;
  addSubtestToSection: (subtest: Subtest) => void;
  activeSectionIndex: number;
}) => {
  const [filters, setFilters] = useState({
    grade: formData.grade || "",
    medium: formData.medium ? formData.medium.name : "",
    subject: formData.subject ? formData.subject.name : "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const { data: questionData, isLoading: isQuestionsLoading, isError: isQuestionsError, error: questionsError } = useQuestions(formData.subject?._id, filters.medium, currentPage);
  const { data: subtestData, isLoading: isSubtestsLoading, isError: isSubtestsError, error: subtestsError } = useSubtests(currentPage, formData.subject?._id);

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const openQuestionDialog = (question: Question) => {
    setSelectedQuestion(question);
    setIsDialogOpen(true);
  };

  const handleAddQuestion = (question: Question) => {
    console.log("Adding question to section:", question, "Active Section Index:", activeSectionIndex);
    addQuestionToSection(question, activeSectionIndex);
  };

  const handleAddSubtest = (subtest: any) => {
    console.log("Adding subtest to section:", subtest);
    addSubtestToSection(subtest);
  };

  return (
    <aside className={`transition-all duration-300 h-full ${isSidebarExpanded ? 'w-1/2' : 'w-16'}`}>
      <div className={`w-full border-b px-4 py-4 flex justify-between`}>
        <div className={`font-bold px-2 ${isSidebarExpanded ? 'block' : 'hidden'}`}>
          Question Bank
        </div>
        <div className="border-2 w-6 h-6 flex items-center justify-center rounded-full border-black" onClick={toggleSidebar}>
          {isSidebarExpanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </div>
      </div>

      <div
        className={`transition-opacity delay-[1000ms] duration-[1000ms] ease-in-out transform ${isSidebarExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
        style={{ display: isSidebarExpanded ? 'block' : 'none' }}
      >

        <Accordion type="single" collapsible className="px-6 border-b">
          <AccordionItem value="subtests">
            <AccordionTrigger>
              <h3 className={`transition-opacity duration-300 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>
                Available Subtests
              </h3>
            </AccordionTrigger>
            <AccordionContent className="">
              {isSubtestsError && (
                <Alert variant="destructive" className="max-w-4xl mx-auto">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{subtestsError?.message}</AlertDescription>
                </Alert>
              )}
              {isSubtestsLoading && <Skeleton className="w-full h-[300px]" />}
              {subtestData && subtestData.subtests && subtestData.subtests.length > 0 && (
                <Accordion type="multiple">
                  {subtestData.subtests.map((subtest) => (
                    <AccordionItem className="w-full " key={subtest._id} value={`subtest-${subtest._id}`}>
                      <AccordionTrigger className="flex w- justify-between items-center">
                        {subtest.name}
                      </AccordionTrigger>
                      <div
                        className="m-0 p-0 cursor-pointer"
                        onClick={() => handleAddSubtest(subtest)}
                      >
                        <ArrowRightCircle />
                      </div>


                      <AccordionContent className="px-4">
                        <ul>
                          {subtest.questions.map((question: any) => (
                            <li key={question._id} className="flex cursor-pointer justify-between items-center mt-2">
                              <span className="cursor-pointer w-full" onClick={() => openQuestionDialog(question)}>{question.question.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2"
                                onClick={() => handleAddQuestion(question)}
                              >
                                <PlusCircle className="h-5 w-5" />
                              </Button>
                            </li>
                          ))}

                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>


        <Accordion type="single" collapsible className="px-6 border-b">
          <AccordionItem value="questions">
            <AccordionTrigger>
              <h3 className={`transition-opacity duration-300 ${isSidebarExpanded ? 'opacity-100' : 'opacity-0'}`}>
                Available Questions
              </h3>
            </AccordionTrigger>
            <AccordionContent className="">
              {isQuestionsError && (
                <Alert variant="destructive" className="max-w-4xl mx-auto">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{questionsError?.message}</AlertDescription>
                </Alert>
              )}
              {isQuestionsLoading && <Skeleton className="w-full h-[300px]" />}
              {questionData && questionData.questions && questionData.questions.length > 0 && (
                <ul>
                  {questionData.questions.map((question: Question) => (
                    <li key={question._id} className="flex justify-between items-center mt-2">
                      <span className="cursor-pointer w-full" onClick={() => openQuestionDialog(question)}>{question.question.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={() => handleAddQuestion(question)}
                      >
                        <PlusCircle className="h-5 w-5" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <QuestionDetailsDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          question={selectedQuestion}
        />
      </div>
    </aside>
  );
};

