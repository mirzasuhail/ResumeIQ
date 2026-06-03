import React, { useState } from 'react';
import { Search, Tag, Cpu, BookOpen } from 'lucide-react';

export default function SkillsPanel({ skills }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Group skills by their category
  const getGroupedSkills = () => {
    const grouped = {};
    skills.forEach(skill => {
      const cat = skill.category || 'Other';
      if (!grouped[cat]) {
        grouped[cat] = [];
      }
      grouped[cat].push(skill.name);
    });
    return grouped;
  };

  const groupedSkills = getGroupedSkills();

  // Filter skills based on search term
  const filteredCategories = Object.keys(groupedSkills).reduce((acc, category) => {
    const matched = groupedSkills[category].filter(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matched.length > 0) {
      acc[category] = matched;
    }
    return acc;
  }, {});

  const totalFilteredCount = Object.values(filteredCategories).reduce((sum, list) => sum + list.length, 0);

  return (
    <div className="glass-panel p-6 w-full flex flex-col space-y-5">
      
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-3">
        <h3 className="font-semibold text-lg text-white font-sans flex items-center space-x-2">
          <Cpu className="h-5 w-5 text-accent-cyan" />
          <span>Extracted Skills Profile ({skills.length})</span>
        </h3>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-500" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-accent-cyan focus:outline-none rounded-xl py-1.5 pl-9 pr-4 text-xs text-white placeholder-dark-500 transition-all focus:bg-white/[0.04]"
          />
        </div>
      </div>

      {/* Grid of Categorised Skill Buckets */}
      {Object.keys(filteredCategories).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(filteredCategories).map(([category, list], catIdx) => (
            <div 
              key={category} 
              className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] transition-all flex flex-col space-y-3"
            >
              <h4 className="text-xs font-bold text-accent-cyan tracking-wider uppercase flex items-center space-x-1.5 border-b border-white/[0.04] pb-2">
                <Tag className="h-3 w-3 text-accent-blue" />
                <span>{category}</span>
                <span className="text-[10px] text-dark-500 font-normal normal-case ml-auto">({list.length})</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {list.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg border border-white/[0.06] bg-white/[0.03] text-gray-200 text-xs font-medium hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
          <BookOpen className="h-10 w-10 text-dark-500" />
          <h4 className="font-semibold text-white">No Matching Skills</h4>
          <p className="text-xs text-dark-500 max-w-xs">
            {searchTerm ? `Could not find any skills matching "${searchTerm}".` : 'No technical skills could be extracted from this resume.'}
          </p>
        </div>
      )}

    </div>
  );
}
