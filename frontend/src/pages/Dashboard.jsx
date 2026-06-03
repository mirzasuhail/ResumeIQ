import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, ShieldCheck, Cpu, Target, FileUp, ArrowLeft } from 'lucide-react';
import CandidateInfo from '../components/CandidateInfo';
import ATSScore from '../components/ATSScore';
import SkillsPanel from '../components/SkillsPanel';
import CareerMatch from '../components/CareerMatch';

export default function Dashboard({ data, onReset }) {
  const [activeTab, setActiveTab] = useState('ats');
  
  if (!data) return null;
  const { candidate, ats, career } = data;

  const tabs = [
    { id: 'ats', label: 'ATS Analysis', mobileLabel: 'ATS', icon: ShieldCheck },
    { id: 'skills', label: 'Extracted Skills', mobileLabel: 'Skills', icon: Cpu },
    { id: 'career', label: 'Career Alignment', mobileLabel: 'Career', icon: Target },
  ];

  return (
    <div className="w-full flex flex-col space-y-6 max-w-6xl mx-auto py-6 px-4">
      
      {/* Dashboard Top Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div className="flex items-center space-x-3">
          <button
            onClick={onReset}
            className="p-2 hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-gray-400 hover:text-white rounded-xl transition-all"
            title="Go back to Upload"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <LayoutDashboard className="h-6 w-6 text-accent-copper" />
              <span>Career Intelligence Dashboard</span>
            </h1>
            <p className="text-xs text-dark-500 mt-1">Processed profile data for {candidate.name}</p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center space-x-1.5 px-4 py-2 border border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.05] text-gray-300 hover:text-white font-semibold text-xs rounded-xl transition-all shadow-md"
        >
          <FileUp className="h-3.5 w-3.5" />
          <span>Upload Another</span>
        </button>
      </div>

      {/* Candidate Basic Profile Card */}
      <CandidateInfo candidate={candidate} />

      {/* Tab Switcher Grid */}
      <div className="flex border-b border-white/[0.04] space-x-1 p-1 bg-white/[0.01] border border-white/[0.06] rounded-xl max-w-md">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-1 sm:px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-accent-copper/15 to-accent-orange/15 border border-accent-copper/20 text-accent-copper shadow-sm font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Icon className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="inline sm:hidden">{tab.mobileLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Body Render */}
      <div className="pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {activeTab === 'ats' && (
              <ATSScore ats={ats} />
            )}
            
            {activeTab === 'skills' && (
              <SkillsPanel skills={candidate.skills} />
            )}
            
            {activeTab === 'career' && (
              <CareerMatch career={career} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
