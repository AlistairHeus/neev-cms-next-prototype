import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Question, QuestionOption } from "../forms/assessments/assemble-assessments/utils/assembly-types";

interface QuestionDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    question: Question | null;
}

const QuestionDetailsDialog: React.FC<QuestionDetailsDialogProps> = ({ isOpen, onClose, question }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Question Details</DialogTitle>
                </DialogHeader>
                {question && (
                    <div>
                        <p><strong>Name:</strong> {question.question.name}</p>
                        <p><strong>Type:</strong> {question.qtype.name}</p>
                        {question.options.map((option: QuestionOption, index) => (
                            <div key={index}>
                                {option.value1 && <p><strong>Option 1:</strong> {option.value1}</p>}
                                {option.value2 && <p><strong>Option 2:</strong> {option.value2}</p>}
                                {option.value3 && <p><strong>Option 3:</strong> {option.value3}</p>}
                                {option.value4 && <p><strong>Option 4:</strong> {option.value4}</p>}
                                {option.answer && <p><strong>Answer:</strong> {option.answer}</p>}
                                {option.answer_audio && (
                                    <audio controls>
                                        <source src={`https://ei-sol.s3.ap-south-1.amazonaws.com/media/audio/${option.answer_audio}`} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}
                                {option.answer_option && <p><strong>Answer Option:</strong> {option.answer_option}</p>}
                                {option.audio1 && (
                                    <audio controls>
                                        <source src={`https://ei-sol.s3.ap-south-1.amazonaws.com/media/audio/${option.audio1}`} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}
                                {option.audio2 && (
                                    <audio controls>
                                        <source src={`https://ei-sol.s3.ap-south-1.amazonaws.com/media/audio/${option.audio2}`} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}
                                {option.audio3 && (
                                    <audio controls>
                                        <source src={`https://ei-sol.s3.ap-south-1.amazonaws.com/media/audio/${option.audio3}`} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}
                                {option.description1 && <p><strong>Description 1:</strong> {option.description1}</p>}
                                {option.description2 && <p><strong>Description 2:</strong> {option.description2}</p>}
                                {option.description3 && <p><strong>Description 3:</strong> {option.description3}</p>}
                                {option.image && <img
                                    src={`https://ei-sol.s3.ap-south-1.amazonaws.com/media/images/${option.image}`}
                                    alt={option.description || 'Option image'}
                                    className="w-1/4 h-auto"
                                />}
                                {option.description && <p><strong>Description:</strong> {option.description}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default QuestionDetailsDialog; 