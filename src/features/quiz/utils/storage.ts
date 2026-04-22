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

/**
 * 管理员专用：从 Supabase 云端拉取所有客户的测验提交记录
 * 需要当前登录用户拥有 admin 查看权限（RLS 策略）
 */
export async function getCloudSubmissions(): Promise<QuizSubmission[]> {
  try {
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('从云端拉取数据失败:', error);
      return [];
    }

    // 将 Supabase 返回的数据格式转换为前端 QuizSubmission 格式
    return (data || []).map((row: any) => ({
      id: row.id,
      timestamp: new Date(row.created_at).getTime(),
      profile: row.profile,
      report: row.report,
      user_id: row.user_id,
    }));
  } catch (error) {
    console.error('云端数据查询异常:', error);
    return [];
  }
}
