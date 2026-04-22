
import React, { useState, useMemo, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { Profile, FinalReport } from './types';
import { calculateReport } from './utils/scoring';
import IntroView from './views/IntroView';
import QuizView from './views/QuizView';
import ProfileView from './views/ProfileView';
import ResultsView from './views/ResultsView';
import AdminDashboard from './views/AdminDashboard';

type ViewState = 'INTRO' | 'QUIZ' | 'PROFILE' | 'RESULTS' | 'ADMIN';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('INTRO');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<Profile>({ name: '', contact: '' });
  const [submissions, setSubmissions] = useState<FinalReport[]>([]);

  // Load submissions from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('by_submissions');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse submissions", e);
      }
    }
  }, []);

  const handleStart = () => setView('QUIZ');

  const handleFinishQuiz = (finalAnswers: Record<number, number>) => {
    setAnswers(finalAnswers);
    setView('PROFILE');
  };

  const handleProfileSubmit = (data: Profile) => {
    setProfile(data);
    const finalReport = calculateReport(data, answers);
    
    // Save to local state and storage
    const newSubmissions = [finalReport, ...submissions];
    setSubmissions(newSubmissions);
    localStorage.setItem('by_submissions', JSON.stringify(newSubmissions));
    
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
            submissions={submissions} 
            onBack={() => setView('INTRO')} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
