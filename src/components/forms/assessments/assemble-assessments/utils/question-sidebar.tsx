import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // ShadCN Accordion
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, PlusCircle } from "lucide-react"; // Lucide filter icon
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { questionGroups } from "@/types/question-groups"; // Import questionGroups data

export const QuestionSidebar = ({
  sections,
  addQuestionToSection,
}: {
  sections: any[];
  addQuestionToSection: (question: { id: number; text: string }, sectionIndex: number) => void;
}) => {
  const [filters, setFilters] = useState({
    grade: "",
    medium: "",
    subject: "",
  });

  const [expandedGroups, setExpandedGroups] = useState<number[]>([]); // State to manage expanded groups

  // Function to apply filters (you can add real filtering logic here)
  const applyFilters = () => {
    // Example: You can filter the questionGroups based on the selected filters
    console.log("Applying filters:", filters);
  };

  return (
    <aside className="w-1/2 space-y-6">
      {/* Header: Filters text and filter icon */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Filters</h3>

        {/* Filter Button to Open Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <Filter className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Questions</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Filter for Grade */}
              <div className="space-y-2">
                <label>Grade</label>
                <Select
                  onValueChange={(value) => setFilters({ ...filters, grade: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Grade 1</SelectItem>
                    <SelectItem value="2">Grade 2</SelectItem>
                    <SelectItem value="3">Grade 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filter for Medium */}
              <div className="space-y-2">
                <label>Medium</label>
                <Select
                  onValueChange={(value) => setFilters({ ...filters, medium: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Medium" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filter for Subject */}
              <div className="space-y-2">
                <label>Subject</label>
                <Select
                  onValueChange={(value) => setFilters({ ...filters, subject: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Math">Math</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Apply Filter Button */}
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main section: List of question groups using ShadCN Accordions */}
      <div>
        <h3 className="font-bold mb-2">Available Question Groups</h3>
        <Accordion type="multiple">
          {questionGroups.map((group) => (
            <AccordionItem key={group.id} value={`group-${group.id}`}>
              <AccordionTrigger>{group.name}</AccordionTrigger>
              <AccordionContent>
                <ul>
                  {group.questions.map((question, index) => (
                    <li key={index} className="flex justify-between items-center mt-2">
                      <span>{question.question_stem}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={() =>
                          addQuestionToSection(
                            {
                              id: question.attributes[0].id, // Updated to use question.attributes[0].id
                              text: question.question_stem, // Passing question text
                            },
                            0 // Specify section index here for demo
                          )
                        }
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
      </div>
    </aside>
  );
};
