import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight, Compass, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export default function CareerMatch({ career }) {
  const { rolesMatch = [], eligibilitySuggestions = [] } = career;

  return (
    <div className="flex flex-col space-y-8 w-full">

      {/* 1. Custom Eligibility Advisor Panel */}
      <div className="glass-panel p-6 border-accent-cyan/10">
        <h3 className="font-semibold text-lg text-white font-sans border-b border-white/[0.06] pb-3 flex items-center space-x-2 mb-4">
          <Sparkles className="h-5 w-5 text-accent-cyan" />
          <span>Role Eligibility Diagnosis</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eligibilitySuggestions.map((sug, idx) => {
            const isLowAts = sug.level === 'Critical Action Needed';
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                  isLowAts 
                    ? 'bg-accent-rose/5 border-accent-rose/25 text-accent-rose' 
                    : 'bg-accent-cyan/5 border-accent-cyan/20 text-accent-cyan'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      isLowAts ? 'bg-accent-rose/10' : 'bg-accent-cyan/10'
                    }`}>
                      {sug.level}
                    </span>
                    <h4 className="font-bold text-white text-base mt-2">{sug.role}</h4>
                  </div>
                  {isLowAts ? (
                    <ShieldAlert className="h-5 w-5 text-accent-rose flex-shrink-0" />
                  ) : (
                    <Compass className="h-5 w-5 text-accent-cyan flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {sug.reason}
                </p>
              </motion.div>
            );
          })}
          {eligibilitySuggestions.length === 0 && (
            <div className="col-span-2 text-center py-6 text-dark-500 text-xs italic">
              No eligibility criteria met yet. List more core skills on your resume to unlock diagnostics.
            </div>
          )}
        </div>
      </div>

      {/* 2. Structured Career Fit Suggestions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-white font-sans flex items-center space-x-2">
          <Briefcase className="h-5 w-5 text-accent-cyan" />
          <span>Role Alignment Scores</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rolesMatch.map((matchItem, idx) => {
            const { role, matchPercentage, matchingSkills = [], missingSkills = [], description } = matchItem;

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={role}
                className="glass-panel p-5 glass-panel-hover flex flex-col justify-between space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-base tracking-tight">{role}</h4>
                    <p className="text-[11px] text-dark-500 mt-1 leading-snug">{description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-black text-white">{matchPercentage}%</span>
                    <span className="text-[9px] uppercase font-bold text-dark-500 tracking-wider">Match</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-dark-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-accent-cyan to-accent-blue h-full"
                    style={{ width: `${matchPercentage}%` }}
                  />
                </div>

                {/* Skills analysis */}
                <div className="space-y-2 pt-2">
                  {/* Matching */}
                  {matchingSkills.length > 0 && (
                    <div>
                      <span className="text-[9px] uppercase font-bold text-accent-emerald tracking-wider block mb-1">Acquired Skills</span>
                      <div className="flex flex-wrap gap-1">
                        {matchingSkills.map(skill => (
                          <span 
                            key={skill}
                            className="px-1.5 py-0.5 rounded bg-accent-emerald/5 border border-accent-emerald/10 text-accent-emerald text-[9px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing */}
                  {missingSkills.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[9px] uppercase font-bold text-accent-rose tracking-wider block mb-1 flex items-center space-x-1">
                        <BookOpen className="h-2.5 w-2.5" />
                        <span>Recommended Additions</span>
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {missingSkills.map(skill => (
                          <span 
                            key={skill}
                            className="px-1.5 py-0.5 rounded bg-accent-rose/5 border border-accent-rose/10 text-accent-rose text-[9px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
