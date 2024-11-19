import { useQuery } from '@tanstack/react-query';

interface Language {
    _id: string;
    language: string;
}

interface Subject {
    _id: string;
    name: string;
}

interface Qtype {
    _id: string;
    name: string;
}

interface Subtest {
    _id: string;
    questions: string[];
    rules: string[];
    ruleQtypes: string[];
    enabled: number;
    name: string;
    title: string;
    subject: Subject;
    language: Language;
    qtype: Qtype;
    subtest_audio: string;
    qtype_audio: string;
    type: string;
    nature: string;
    evaluation_notes: string;
    duration: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
    grade_skip: string;
    skip_duration: number | null;
    skipped: string;
    subtest_video: string;
}

interface FetchSubtestsResponse {
    subtests: Subtest[];
    currentPage: number;
    totalPages: number;
}

const fetchSubtests = async (page: number, subject: string): Promise<FetchSubtestsResponse> => {
    const response = await fetch(`http://10.0.5.212:8181/api/subtests/subtests-with-questions?page=${page}&subject=${subject}`);
    if (!response.ok) {
        throw new Error('Failed to fetch subtests');
    }
    return response.json();
};

export function useSubtests(page: number, subject: string) {
    return useQuery<FetchSubtestsResponse, Error>({
        queryKey: ['subtests', page, subject],
        queryFn: () => fetchSubtests(page, subject),
    });
}
