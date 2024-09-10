'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast"
import { questionGroups as importedQuestionGroups, Question, QuestionGroup } from '@/types/question-groups'
import { ChevronDown, Plus, X } from "lucide-react"
import { useState } from "react"

type Section = {
  id: number;
  name: string;
  questionGroups: QuestionGroup[];
}

export default function Component() {
  const [questionGroups, setQuestionGroups] = useState<QuestionGroup[]>(importedQuestionGroups)
  const [selectedQuestionGroups, setSelectedQuestionGroups] = useState<QuestionGroup[]>([])
  const [subject, setSubject] = useState("English")
  const [searchTerm, setSearchTerm] = useState('')
  const [isToastVisible, setIsToastVisible] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [sections, setSections] = useState<Section[]>([]) // Manage sections here
  const [newSectionName, setNewSectionName] = useState('')
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null) // Keep track of active section

  // Handle adding a question group, ensuring no duplicates
  const handleAddQuestionGroup = (questionGroup: QuestionGroup) => {
    if (
      selectedQuestionGroups.some(group => group.id === questionGroup.id) ||
      sections.some(section => section.questionGroups.some(group => group.id === questionGroup.id))
    ) {
      alert("This question group has already been added.")
      return
    }

    // If an active section exists, add to that section
    if (activeSectionId !== null) {
      setSections(prevSections => prevSections.map(section =>
        section.id === activeSectionId
          ? { ...section, questionGroups: [...section.questionGroups, questionGroup] }
          : section
      ))
    } else {
      setSelectedQuestionGroups((prevGroups) => [...prevGroups, questionGroup])
    }

    // Remove from the available question groups list
    setQuestionGroups((prevGroups) => prevGroups.filter(group => group.id !== questionGroup.id))
  }

  // Handle removing a question group from selected groups or sections
  const handleRemoveQuestionGroup = (groupId: number, sectionId?: number) => {
    if (sectionId !== undefined) {
      const removedGroup = sections
        .find(section => section.id === sectionId)?.questionGroups
        .find(group => group.id === groupId)
      if (removedGroup) {
        setSections(prevSections => prevSections.map(section =>
          section.id === sectionId
            ? { ...section, questionGroups: section.questionGroups.filter(group => group.id !== groupId) }
            : section
        ))
        setQuestionGroups((prevGroups) => [...prevGroups, removedGroup])
      }
    } else {
      const removedGroup = selectedQuestionGroups.find(group => group.id === groupId)
      if (removedGroup) {
        setSelectedQuestionGroups((prevGroups) => prevGroups.filter(group => group.id !== groupId))
        setQuestionGroups((prevGroups) => [...prevGroups, removedGroup])
      }
    }
  }

  // Handle creating a new section
  const handleCreateSection = () => {
    if (newSectionName.trim() === '') {
      alert("Section name cannot be empty.")
      return
    }

    const newSection: Section = {
      id: sections.length + 1,
      name: newSectionName,
      questionGroups: []
    }

    setSections([...sections, newSection])
    setNewSectionName('')
    setActiveSectionId(newSection.id) // Set the newly created section as active
  }

  // Handle removing a section
  const handleRemoveSection = (sectionId: number) => {
    const removedSection = sections.find(section => section.id === sectionId)
    if (removedSection) {
      // Remove the section and return its question groups back to the available list
      setQuestionGroups(prevGroups => [...prevGroups, ...removedSection.questionGroups])
      setSections(prevSections => prevSections.filter(section => section.id !== sectionId))

      // Reset active section if the active section was removed
      if (activeSectionId === sectionId) {
        setActiveSectionId(null)
      }
    }
  }

  // Show the toast for saving functionality
  const handleSave = () => {
    setIsToastVisible(true)

    // Hide the toast after 5 seconds
    setTimeout(() => {
      setIsToastVisible(false)
    }, 5000)
  }

  // Handle opening the question dialog when a question is clicked
  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question)
  }

  // Filter the question groups based on the search term
  const filteredQuestionGroups = questionGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <ToastProvider>
      <div className="flex flex-col h-full w-full">
        <header className="sticky top-0 bg-primary text-primary-foreground py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Assemble Test</h1>

          <div className="flex gap-5">
            {selectedQuestionGroups.length > 0 && (
              <Button variant='default' onClick={handleSave}>
                Save
              </Button>
            )}
          </div>
        </header>

        <div className="flex flex-1">
          {/* Left side (Available Question Groups with Accordion) */}
          <div className="bg-background text-foreground p-6 border-r w-1/2">
            <div className="flex items-center gap-4 mb-4">
              <Input
                type="search"
                placeholder="Search question groups"
                className="flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ChevronDown className="w-4 h-4 mr-2" />
                    {subject}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSubject("English")}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSubject("Tamil")}>Tamil</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSubject("Odia")}>Odia</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Accordion type="single" collapsible>
              {filteredQuestionGroups.map((questionGroup) => (
                <AccordionItem key={questionGroup.id} value={String(questionGroup.id)}>
                  <div className="flex items-center w-full relative">
                    <div className="w-11/12 ">
                      <AccordionTrigger className=" w-full">{questionGroup.name}</AccordionTrigger>
                    </div>
                    <Button
                      variant="ghost"
                      className=" absolute right-0 w-6 h-6 flex items-center justify-center p-1"
                      onClick={() => handleAddQuestionGroup(questionGroup)}
                    >
                      <Plus className="w-full h-full" />
                    </Button>
                  </div>

                  <AccordionContent>
                    <div className="space-y-2 mt-2">
                      {questionGroup.questions.map((question, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-[1fr_auto] items-center gap-4 bg-muted p-4 rounded-md cursor-pointer"
                          onClick={() => handleQuestionClick(question)}
                        >
                          <div>
                            <div className="text-sm font-medium">{question.question_stem}</div>
                            <div className="text-xs text-muted-foreground">
                              {question.question_type} | Max Score: {question.max_score}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right side (Selected Question Groups and Sections) */}
          <div className="bg-background text-foreground p-6 flex-1">
            <div className="text-lg font-medium"><span className="text-muted-foreground">Medium:</span> {subject}</div>

            {/* Section creation */}
            <div className="mt-4 mb-6">
              <div className="flex gap-2">
                <Input
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  placeholder="Section name"
                />
                <Button onClick={handleCreateSection}>Create Section</Button>
              </div>
            </div>

            {/* Display sections */}
            {sections.length === 0 && (
              <div>
                <p className="text-sm text-muted-foreground">No sections created yet.</p>
                {selectedQuestionGroups.length === 0 && <p className="text-sm text-muted-foreground">No question groups selected yet.</p>}
                <div className="space-y-4">
                  {selectedQuestionGroups.map((group) => (
                    <div key={group.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{group.name}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveQuestionGroup(group.id)}
                        >
                          <X className="w-4 h-4" />
                          <span className="sr-only">Remove group</span>
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {group.questions.map((question: Question, index: number) => (
                          <div
                            key={index}
                            className="grid grid-cols-[1fr_auto] items-center gap-4 bg-muted p-4 rounded-md cursor-pointer"
                          >
                            <div onClick={() => handleQuestionClick(question)}>
                              <div className="text-sm font-medium">{question.question_stem}</div>
                              <div className="text-xs text-muted-foreground">
                                {question.question_type} | Max Score: {question.max_score}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveQuestionGroup(group.id, index)}
                            >
                              <X className="w-4 h-4" />
                              <span className="sr-only">Remove question</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sections.length > 0 && sections.map((section) => (
              <div key={section.id} className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="text-md font-bold mb-2">{section.name}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSection(section.id)}
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove section</span>
                  </Button>
                </div>
                
                {section.questionGroups.length === 0 && <p className="text-sm text-muted-foreground">No question groups in this section.</p>}
                <div className="space-y-2">
                  {section.questionGroups.map((group) => (
                    <div key={group.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{group.name}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveQuestionGroup(group.id, section.id)}
                        >
                          <X className="w-4 h-4" />
                          <span className="sr-only">Remove group</span>
                        </Button>
                      </div>

                      {/* Display questions inside this question group */}
                      <div className="space-y-2">
                        {group.questions.map((question, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-[1fr_auto] items-center gap-4 bg-muted p-4 rounded-md cursor-pointer"
                          >
                            <div onClick={() => handleQuestionClick(question)}>
                              <div className="text-sm font-medium">{question.question_stem}</div>
                              <div className="text-xs text-muted-foreground">
                                {question.question_type} | Max Score: {question.max_score}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveQuestionGroup(group.id, index)}
                            >
                              <X className="w-4 h-4" />
                              <span className="sr-only">Remove question</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Details Dialog */}
        {selectedQuestion && (
          <Dialog open={selectedQuestion !== null} onOpenChange={() => setSelectedQuestion(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Question Details</DialogTitle>
                <DialogDescription>
                  <p><strong>Instruction:</strong> {selectedQuestion.question_instruction}</p>
                  <p><strong>Stem:</strong> {selectedQuestion.question_stem}</p>
                  <p><strong>Explanation:</strong> {selectedQuestion.explanation}</p>
                  <p><strong>Objective:</strong> {selectedQuestion.question_testing_objective}</p>
                  <p><strong>Max Score:</strong> {selectedQuestion.max_score}</p>
                  <p><strong>Type:</strong> {selectedQuestion.question_type}</p>
                </DialogDescription>
              </DialogHeader>
              <Button variant="secondary" onClick={() => setSelectedQuestion(null)}>Close</Button>
            </DialogContent>
          </Dialog>
        )}

        {/* Toast UI */}
        {isToastVisible && (
          <Toast className="bg-green-500 text-white">
            <div className="flex items-center gap-5">
              <div className="flex items-center">
                <div className="text-sm font-medium">Success</div>
              </div>
              <div className="ml-auto text-xs">
                Test has been saved successfully
              </div>
            </div>
          </Toast>
        )}

        <ToastViewport className="fixed bottom-0 right-0 m-8" />
      </div>
    </ToastProvider>
  )
}
