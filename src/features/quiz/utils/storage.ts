import { FinalReport, Profile } from '../types';

export interface QuizSubmission {
  id: string;
  timestamp: number;
  profile: Profile;
  report: FinalReport;
}

export function saveSubmission(report: FinalReport): void {
  try {
    const submissions = getSubmissions();
    const newSubmission: QuizSubmission = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      profile: report.profile,
      report,
    };
    submissions.push(newSubmission);
    localStorage.setItem('quiz_submissions', JSON.stringify(submissions));
  } catch (error) {
    console.error('Failed to save submission', error);
  }
}

export function getSubmissions(): QuizSubmission[] {
  try {
    const data = localStorage.getItem('quiz_submissions');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get submissions', error);
    return [];
  }
}

export function clearSubmissions(): void {
  try {
    localStorage.removeItem('quiz_submissions');
  } catch (error) {
    console.error('Failed to clear submissions', error);
  }
}
