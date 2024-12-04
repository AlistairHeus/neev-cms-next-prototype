import { useQuery } from '@tanstack/react-query';

interface QuestionsResponse {
  questions: any[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

const fetchQuestions = async (
  subject: string,
  language: string,
  currentPage: number
): Promise<QuestionsResponse> => {
  const params = new URLSearchParams({
    subject,
    language,
    enabled: '1',
    limit: '10',
    page: currentPage.toString()
  });

  const response = await fetch(`http://10.0.5.212:8181/api/questions?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }

  return response.json();
};

export function useQuestions(subject: string, language: string, currentPage: number) {

  return useQuery<QuestionsResponse, Error>({
    queryKey: ['questions', subject, language, currentPage],
    queryFn: () => fetchQuestions(subject, language, currentPage),
    enabled: true
  });
}
