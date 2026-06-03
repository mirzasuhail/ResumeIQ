import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, XCircle, FileWarning, ArrowUpRight, HelpCircle } from 'lucide-react';

export default function RecommendationPanel({ match }) {
  const { matchScore, matchingSkills = [], missingSkills = [], recommendation } = match;

  const getTierDetails = (score) => {
    if (score >= 80) return { text: 'text-accent-emerald', border: 'border-accent-emerald/20', bg: 'bg-accent-emerald/5', stroke: '#10b981', verdict: 'Strong Fit' };
    if (score >= 50) return { text: 'text-accent-amber', border: 'border-accent-amber/20', bg: 'bg-accent-amber/5', stroke: '#f59e0b', verdict: 'Moderate Fit' };
    return { text: 'text-accent-rose', border: 'border-accent-rose/20', bg: 'bg-accent-rose/5', stroke: '#f43f5e', verdict: 'Unsuitable Match' };
  };

  const tier = getTierDetails(matchScore);

  // SVG Circular metrics
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchScore / 100) * circumference;

  return (
    <div className="glass-panel p-6 w-full flex flex-col space-y-6">
      <h3 className="font-semibold text-lg text-white font-sans border-b border-white/[0.06] pb-3 flex items-center space-x-2">
        <Award className="h-5 w-5 text-accent-cyan" />
        <span>Job Fit Assessment</span>
      </h3>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-white/[0.04] pb-6">
        
        {/* Progress gauge */}
        <div className="relative flex items-center justify-center h-32 w-32 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-dark-800"
              strokeWidth="8"
              fill="transparent"
            />
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              stroke={tier.stroke}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-black text-white">{matchScore}%</span>
            <span className="text-[9px] uppercase font-bold text-dark-500 tracking-wider">Overlap</span>
          </div>
        </div>

        {/* Narrative recommendation */}
        <div className="flex flex-col space-y-3 justify-center text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${tier.border} ${tier.bg} ${tier.text}`}>
              {tier.verdict}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-200 leading-relaxed max-w-xl">
            {recommendation}
          </p>
        </div>
      </div>

      {/* Grid comparing requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* Overlapping matching skills */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-accent-emerald flex items-center space-x-1.5 border-b border-white/[0.04] pb-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Satisfied Requirements ({matchingSkills.length})</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {matchingSkills.map(skill => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg border border-accent-emerald/10 bg-accent-emerald/5 text-accent-emerald text-xs font-medium cursor-default"
              >
                {skill}
              </span>
            ))}
            {matchingSkills.length === 0 && (
              <span className="text-xs text-dark-500 italic">No overlap with requirements.</span>
            )}
          </div>
        </div>

        {/* Missing skills */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-accent-rose flex items-center space-x-1.5 border-b border-white/[0.04] pb-2">
            <XCircle className="h-4 w-4" />
            <span>Missing Requirements ({missingSkills.length})</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {missingSkills.map(skill => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg border border-accent-rose/10 bg-accent-rose/5 text-accent-rose text-xs font-medium cursor-default"
              >
                {skill}
              </span>
            ))}
            {missingSkills.length === 0 && (
              <span className="text-xs text-dark-500 italic">Excellent! Zero skill gaps identified.</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
