import React, { useState } from 'react';
import { Target, Cpu, ShieldCheck, Briefcase } from 'lucide-react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Recruiter from './pages/Recruiter';

export default function App() {
  const [view, setView] = useState('home'); // 'home', 'dashboard', 'recruiter'
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setView('dashboard');
  };

  const handleResetAnalysis = () => {
    setAnalysisData(null);
    setView('home');
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-dark-950">
      
      {/* 1. Global Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-20" />
      
      {/* 2. Global Premium Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-dark-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo brand */}
          <div 
            onClick={handleResetAnalysis}
            className="flex items-center space-x-2 cursor-pointer group flex-shrink-0"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent-copper via-accent-orange to-accent-gold flex items-center justify-center text-white shadow-md shadow-accent-copper/20 group-hover:scale-105 transition-all">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-white text-lg tracking-tight font-sans hidden min-[1000px]:inline">
              Resume<span className="text-accent-copper">IQ</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-0.5 sm:space-x-1 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
            <button
              onClick={() => {
                if (analysisData) {
                  setView('dashboard');
                } else {
                  setView('home');
                }
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center space-x-1.5 ${
                view === 'home' || view === 'dashboard'
                  ? 'bg-accent-copper/15 text-accent-copper border border-accent-copper/20 font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">Candidate Workspace</span>
            </button>
            
            <button
              onClick={() => setView('recruiter')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center space-x-1.5 ${
                view === 'recruiter'
                  ? 'bg-accent-copper/15 text-accent-copper border border-accent-copper/20 font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Target className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">Recruiter Portal</span>
            </button>
          </nav>
        </div>
      </header>

      {/* 3. Core Page Content Switch */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        {view === 'home' && (
          <Home onAnalysisComplete={handleAnalysisComplete} />
        )}
        
        {view === 'dashboard' && (
          <Dashboard data={analysisData} onReset={handleResetAnalysis} />
        )}

        {view === 'recruiter' && (
          <Recruiter />
        )}
      </main>

      {/* 4. Global Footer */}
      <footer className="w-full border-t border-white/[0.04] py-6 bg-dark-950/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-dark-500 font-medium tracking-wide uppercase">
          <p>© 2026 ResumeIQ • Developed by MIRZA SUHAIL</p>
          <div className="flex space-x-4">
            <span className="hover:text-accent-cyan cursor-pointer transition-colors">Stateless Engine</span>
            <span>•</span>
            <span className="hover:text-accent-cyan cursor-pointer transition-colors">Local Sandbox</span>
            <span>•</span>
            <span className="hover:text-accent-cyan cursor-pointer transition-colors">Privacy Compliant</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
