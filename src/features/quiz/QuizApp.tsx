
import React, { useState, useMemo, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { Profile, FinalReport } from './types';
import { calculateReport } from './utils/scoring';
import IntroView from './views/IntroView';
import QuizView from './views/QuizView';
import ProfileView from './views/ProfileView';
import ResultsView from './views/ResultsView';
import AdminDashboard from './views/AdminDashboard';
import { saveSubmission, getSubmissions, QuizSubmission } from './utils/storage';
import { getCurrentUser, User } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

type ViewState = 'INTRO' | 'QUIZ' | 'PROFILE' | 'RESULTS' | 'ADMIN';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('INTRO');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<Profile>({ name: '', contact: '' });
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Load submissions and check auth on init
  useEffect(() => {
    setSubmissions(getSubmissions());
    
    // Check if user is logged in
    getCurrentUser().then(user => {
      setCurrentUser(user);
      
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
    setSubmissions(getSubmissions());
    
    setView('RESULTS');
  };

  const report = useMemo(() => {
    if (view === 'RESULTS') {
      return calculateReport(profile, answers);
    }
    return null;
  }, [view, profile, answers]);

  const handleGoAdmin = () => setView('ADMIN');

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hidden button for admin access */}
      <button 
        className="fixed bottom-0 right-0 w-10 h-10 opacity-0 cursor-default no-print" 
        onClick={handleGoAdmin}
        title="Admin Access"
      />

      <main className="flex-1 w-full max-w-6xl px-4 py-6 md:py-10">
        {view === 'INTRO' && <IntroView onStart={handleStart} />}
        
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
