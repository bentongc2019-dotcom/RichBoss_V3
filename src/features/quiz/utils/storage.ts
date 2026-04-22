import { FinalReport, Profile } from '../types';
import { supabase } from '../../../utils/supabase';

export interface QuizSubmission {
  id: string;
  timestamp: number;
  profile: Profile;
  report: FinalReport;
  user_id?: string;
}

export async function saveSubmission(report: FinalReport, userId?: string): Promise<void> {
  try {
    const newSubmission: QuizSubmission = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      profile: report.profile,
      report,
      user_id: userId
    };
    
    // Save locally first
    const submissions = getSubmissions();
    submissions.push(newSubmission);
    localStorage.setItem('quiz_submissions', JSON.stringify(submissions));

    // Save to Supabase if user is logged in
    if (userId) {
      const { error } = await supabase
        .from('test_results')
        .insert({
          id: newSubmission.id,
          user_id: userId,
          profile: newSubmission.profile,
          report: newSubmission.report
        });
        
      if (error) {
        console.error('Failed to save to Supabase', error);
      }
    }
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
