
import React, { useState, useMemo, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { Profile, FinalReport } from './types';
import { calculateReport } from './utils/scoring';
import IntroView from './views/IntroView';
import QuizView from './views/QuizView';
import ProfileView from './views/ProfileView';
import ResultsView from './views/ResultsView';
import AdminDashboard from './views/AdminDashboard';
import { saveSubmission, getSubmissions, getCloudSubmissions, QuizSubmission } from './utils/storage';
import { getCurrentUser, User } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

type ViewState = 'INTRO' | 'QUIZ' | 'PROFILE' | 'RESULTS' | 'ADMIN' | 'MY_RESULTS';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('INTRO');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<Profile>({ name: '', contact: '' });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [myLatestReport, setMyLatestReport] = useState<FinalReport | null>(null);
  const [hasHistory, setHasHistory] = useState(false);
  const navigate = useNavigate();

  // 检查用户是否有历史报告（优先云端，其次本地）
  const checkMyHistory = async (user: User) => {
    try {
      // 优先从云端查（RLS 策略会只返回自己的数据）
      const cloudData = await getCloudSubmissions();
      if (cloudData.length > 0 && cloudData[0].report) {
        setHasHistory(true);
        setMyLatestReport(cloudData[0].report);
        console.log('✅ 从云端找到历史报告', cloudData.length, '份');
        return;
      }
    } catch (err) {
      console.warn('云端查询失败，回退本地', err);
    }

    // 回退到本地存储
    const allLocal = getSubmissions();
    // 先尝试按 user_id 匹配
    const myLocal = allLocal.filter(s => s.user_id === user.id);
    if (myLocal.length > 0) {
      setHasHistory(true);
      setMyLatestReport(myLocal[myLocal.length - 1].report);
      console.log('✅ 从本地找到历史报告（user_id 匹配）');
      return;
    }
    // 最后兜底：如果本地有任何数据（可能是未绑定 user_id 的旧数据）
    if (allLocal.length > 0) {
      setHasHistory(true);
      setMyLatestReport(allLocal[allLocal.length - 1].report);
      console.log('✅ 从本地找到历史报告（兜底）');
    }
  };

  // Load submissions and check auth on init
  useEffect(() => {
    getSubmissions();
    
    // Check if user is logged in
    getCurrentUser().then(user => {
      setCurrentUser(user);
      
      // 检查是否有历史报告
      if (user) {
        checkMyHistory(user);
      }
      
      // Check if there is a pending quiz draft
      const draft = localStorage.getItem('quiz_draft_answers');
      if (draft && user) {
        setAnswers(JSON.parse(draft));
        setView('PROFILE');
        localStorage.removeItem('quiz_draft_answers');
      } else if (draft && !user) {
        // Still not logged in? keep them in intro or redirect
        setView('INTRO');
      }
    });
  }, []);

  const handleStart = () => setView('QUIZ');

  const handleFinishQuiz = (finalAnswers: Record<number, number>) => {
    setAnswers(finalAnswers);
    if (!currentUser) {
      // Save draft and go to login
      localStorage.setItem('quiz_draft_answers', JSON.stringify(finalAnswers));
      navigate('/auth');
    } else {
      setView('PROFILE');
    }
  };

  const handleProfileSubmit = async (data: Profile) => {
    setProfile(data);
    const finalReport = calculateReport(data, answers);
    
    // Save to local storage and Supabase
    await saveSubmission(finalReport, currentUser?.id);

    
    // 同时更新历史报告状态
    setMyLatestReport(finalReport);
    setHasHistory(true);
    
    setView('RESULTS');
  };

  const report = useMemo(() => {
    if (view === 'RESULTS') {
      return calculateReport(profile, answers);
    }
    return null;
  }, [view, profile, answers]);

  const handleGoAdmin = () => setView('ADMIN');

  // 查看我的历史报告
  const handleViewHistory = () => {
    if (myLatestReport) {
      setView('MY_RESULTS');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <main className="flex-1 w-full max-w-6xl px-4 py-6 md:py-10">
        {view === 'INTRO' && (
          <IntroView 
            onStart={handleStart} 
            onAdmin={handleGoAdmin}
            onViewHistory={handleViewHistory}
            isLoggedIn={!!currentUser}
            hasHistory={hasHistory}
            userName={myLatestReport?.profile?.name}
          />
        )}
        
        {view === 'QUIZ' && (
          <QuizView 
            questions={QUESTIONS} 
            onComplete={handleFinishQuiz} 
          />
        )}

        {view === 'PROFILE' && (
          <ProfileView 
            onSubmit={handleProfileSubmit} 
          />
        )}

        {view === 'RESULTS' && report && (
          <ResultsView report={report} onReset={() => setView('INTRO')} />
        )}

        {/* 查看我的历史报告 */}
        {view === 'MY_RESULTS' && myLatestReport && (
          <ResultsView report={myLatestReport} onReset={() => setView('INTRO')} />
        )}

        {view === 'ADMIN' && (
          <AdminDashboard 
            onBack={() => setView('INTRO')} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
