import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Award, HelpCircle, ArrowUpRight } from 'lucide-react';

export default function ATSScore({ ats }) {
  const { score, strengths = [], weaknesses = [], missing = [] } = ats;

  // Calculate SVG circular metrics
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Visual markers based on score tier
  const getTierColors = (val) => {
    if (val >= 80) return { text: 'text-accent-emerald', border: 'border-accent-emerald/20', bg: 'bg-accent-emerald/5', stroke: '#10b981', label: 'Strong Profile' };
    if (val >= 55) return { text: 'text-accent-amber', border: 'border-accent-amber/20', bg: 'bg-accent-amber/5', stroke: '#f59e0b', label: 'Requires Polish' };
    return { text: 'text-accent-rose', border: 'border-accent-rose/20', bg: 'bg-accent-rose/5', stroke: '#f43f5e', label: 'Needs Improvement' };
  };

  const tier = getTierColors(score);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 1. Score Summary Panel */}
      <div className="glass-panel p-6 flex flex-col items-center justify-center text-center space-y-4">
        <h3 className="font-semibold text-lg text-white font-sans w-full text-left border-b border-white/[0.06] pb-3">ATS Compatibility</h3>
        
        <div className="relative flex items-center justify-center h-40 w-40 mt-4">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-dark-800"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated Score Progress Circle */}
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              stroke={tier.stroke}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          {/* Inner Text display */}
          <div className="absolute flex flex-col items-center justify-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-extrabold text-white"
            >
              {score}
            </motion.span>
            <span className="text-[10px] uppercase font-bold text-dark-500 tracking-wider">Score</span>
          </div>
        </div>

        <div className={`px-4 py-1.5 rounded-full border ${tier.border} ${tier.bg} ${tier.text} text-xs font-semibold tracking-wide mt-2`}>
          {tier.label}
        </div>

        <p className="text-xs text-dark-500 max-w-[220px]">
          Based on contact channels, industry certifications, section integrity, and project verification index.
        </p>
      </div>

      {/* 2. Analysis Details (Strengths & Critiques) */}
      <div className="glass-panel p-6 lg:col-span-2 flex flex-col space-y-6">
        <h3 className="font-semibold text-lg text-white font-sans border-b border-white/[0.06] pb-3 flex items-center space-x-2">
          <Award className="h-5 w-5 text-accent-cyan" />
          <span>Resume Diagnostic Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Strengths Column */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-emerald flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>Strengths ({strengths.length})</span>
            </h4>
            <ul className="space-y-2.5">
              {strengths.map((str, idx) => (
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                  className="flex items-start space-x-2 text-xs text-gray-300 bg-white/[0.01] border border-white/[0.03] p-2.5 rounded-xl"
                >
                  <span className="h-1.5 w-1.5 bg-accent-emerald rounded-full mt-1.5 flex-shrink-0" />
                  <span>{str}</span>
                </motion.li>
              ))}
              {strengths.length === 0 && (
                <li className="text-xs text-dark-500 italic">No specific strengths detected.</li>
              )}
            </ul>
          </div>

          {/* Weaknesses / Suggestions Column */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-amber flex items-center space-x-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>Areas to Improve ({weaknesses.length})</span>
            </h4>
            <ul className="space-y-2.5">
              {weaknesses.map((weak, idx) => (
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                  className="flex items-start space-x-2 text-xs text-gray-300 bg-white/[0.01] border border-white/[0.03] p-2.5 rounded-xl"
                >
                  <span className="h-1.5 w-1.5 bg-accent-amber rounded-full mt-1.5 flex-shrink-0" />
                  <span>{weak}</span>
                </motion.li>
              ))}
              {weaknesses.length === 0 && (
                <li className="text-xs text-dark-500 italic">No improvement items required! Great job.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Missing Sections Banner */}
        {missing.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-accent-rose flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">Critical Missing Fields</h5>
                <p className="text-[10px] text-dark-500">Identified formatting voids that confuse standard ATS indexers.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {missing.map((miss, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg border border-accent-rose/20 bg-accent-rose/5 text-accent-rose text-[10px] font-semibold"
                >
                  {miss}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
