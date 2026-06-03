import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Cpu, Target, Eye, Sparkles, Check, Bookmark, Briefcase, Award } from 'lucide-react';
import UploadForm from '../components/UploadForm';
import { analyzeResume } from '../api/resumeApi';

export default function Home({ onAnalysisComplete }) {
  const [error, setError] = useState(null);
  const [visitorCount, setVisitorCount] = useState(12480);
  const [analysisCount, setAnalysisCount] = useState(4890);

  // 1. Load and Increment Local Storage counters on Mount
  useEffect(() => {
    // Visitor tracking
    const cachedVisitors = localStorage.getItem('resumeiq_visitors');
    let currentVisitors = 1000;
    if (cachedVisitors) {
      currentVisitors = parseInt(cachedVisitors, 10) + 1;
    } else {
      currentVisitors = 1000 + Math.floor(Math.random() * 50);
    }
    localStorage.setItem('resumeiq_visitors', currentVisitors);
    setVisitorCount(currentVisitors);

    // Resumes analyzed tracking
    const cachedAnalysis = localStorage.getItem('resumeiq_analysis');
    let currentAnalysis = 489;
    if (cachedAnalysis) {
      currentAnalysis = parseInt(cachedAnalysis, 10);
    } else {
      currentAnalysis = 489 + Math.floor(Math.random() * 20);
      localStorage.setItem('resumeiq_analysis', currentAnalysis);
    }
    setAnalysisCount(currentAnalysis);
  }, []);

  const handleUploadSuccess = async (file) => {
    try {
      const data = await analyzeResume(file);
      
      // Increment analysis counter on success
      const nextAnalysisCount = analysisCount + 1;
      localStorage.setItem('resumeiq_analysis', nextAnalysisCount);
      setAnalysisCount(nextAnalysisCount);
      
      onAnalysisComplete(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleUploadError = (msg) => {
    setError(msg);
  };

  // Generate background particles
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${(i * 9) + 4}%`,
      top: `${Math.random() * 70 + 15}%`,
      size: Math.random() * 2 + 1.5,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 8 + 10}s`
    }));
  }, []);

  return (
    <div className="w-full relative overflow-visible max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 min-[1920px]:py-16">
      
      {/* Background Floaters */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-accent-copper animate-bg-particle"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-accent-copper/5 rounded-full blur-[110px] animate-orb-1 -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-2/3 w-[250px] h-[250px] bg-accent-orange/5 rounded-full blur-[90px] animate-orb-2 -z-10 pointer-events-none" />

      {/* Main Split Layout: Left (Form & Copy) vs Right (Showpiece Mockup) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* ==================== LEFT COLUMN (55%) ==================== */}
        <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8">
          
          {/* Headline and pill */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-3 py-1 bg-white/[0.02] border border-white/[0.06] rounded-full text-[10px] font-bold tracking-wider uppercase text-accent-copper"
            >
              <Star className="h-3 w-3 fill-accent-copper text-accent-copper animate-pulse-slow" />
              <span>Resume Intelligence Index</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl sm:text-5xl min-[1366px]:text-5xl min-[1920px]:text-6xl font-normal tracking-tight font-serif text-accent-gold leading-[1.1]"
            >
              Audit your resume with the <br />
              <span className="text-accent-copper italic font-serif relative">
                intelligence
              </span> already <br />
              on your <span className="underline decoration-accent-copper/40 decoration-2 underline-offset-8">laptop.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-dark-500 text-xs sm:text-sm font-sans tracking-wide leading-relaxed max-w-xl pt-2"
            >
              ResumeIQ is the privacy-first alternative to third-party scrapers. Your documents are parsed and cross-referenced locally in under 10 seconds. No external databases, no logins, no data tracking.
            </motion.p>
          </div>

          {/* Form and Counters Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="w-full max-w-xl"
          >
            <div className="glass-panel p-5 sm:p-6 shadow-2xl bg-dark-900/60 relative border-white/[0.04] glow-copper">
              <UploadForm
                onUploadSuccess={handleUploadSuccess}
                onError={handleUploadError}
                label="resume"
              />

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 p-3 bg-accent-rose/10 border border-accent-rose/25 text-accent-rose text-xs rounded-xl flex items-start space-x-2"
                >
                  <div className="h-1.5 w-1.5 bg-accent-rose rounded-full mt-1.5 flex-shrink-0" />
                  <p className="font-semibold">{error}</p>
                </motion.div>
              )}
            </div>

            {/* Analytics Counters Row (Just below upload box) */}
            <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/[0.05] pt-5">
              <div className="flex flex-col space-y-1 pl-1">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                  {visitorCount.toLocaleString()}
                </span>
                <span className="text-[9px] uppercase font-bold text-dark-500 tracking-wider">
                  System Visitors
                </span>
              </div>
              <div className="flex flex-col space-y-1 pl-1 border-l border-white/[0.05]">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                  {analysisCount.toLocaleString()}
                </span>
                <span className="text-[9px] uppercase font-bold text-dark-500 tracking-wider">
                  Resumes Audited
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ==================== RIGHT COLUMN (45% - Premium Mockup Showpiece) ==================== */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-10 lg:mt-0">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="w-full max-w-sm sm:max-w-md relative flex items-center justify-center"
            whileHover={{ y: -4 }}
          >
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-accent-copper/5 rounded-3xl blur-2xl -z-10" />

            {/* Resume Page Showpiece Card */}
            <div className="w-full glass-panel border-white/[0.06] p-5 sm:p-6 shadow-2xl relative bg-dark-900/80 backdrop-blur-xl flex flex-col space-y-5">
              
              {/* Fake PDF Header */}
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-accent-copper/10 border border-accent-copper/20 flex items-center justify-center text-accent-copper text-xs font-black">
                    PDF
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">mirza_suhail_resume.pdf</h3>
                    <p className="text-[10px] text-dark-500 mt-0.5">Machine Learning Architect • 148 KB</p>
                  </div>
                </div>
                <span className="h-2 w-2 rounded-full bg-accent-emerald animate-pulse-slow" />
              </div>

              {/* Fake Resume Details */}
              <div className="space-y-4 text-left">
                {/* Profile detail */}
                <div className="space-y-1.5">
                  <div className="h-3 w-28 bg-white/20 rounded" />
                  <div className="h-2.5 w-40 bg-white/10 rounded" />
                  <div className="flex space-x-2 pt-1">
                    <div className="h-2 w-12 bg-accent-copper/20 rounded" />
                    <div className="h-2 w-16 bg-white/5 rounded" />
                    <div className="h-2 w-10 bg-white/5 rounded" />
                  </div>
                </div>

                {/* Experience Blocks */}
                <div className="space-y-3 pt-2">
                  <span className="text-[8px] uppercase tracking-widest font-bold text-dark-500 block">Experience</span>
                  
                  {/* Job 1 */}
                  <div className="p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.01] space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="h-2.5 w-32 bg-white/15 rounded" />
                      <div className="h-2 w-10 bg-accent-copper/30 rounded" />
                    </div>
                    <div className="h-2 w-20 bg-white/5 rounded" />
                  </div>

                  {/* Job 2 */}
                  <div className="p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.01] space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="h-2.5 w-24 bg-white/15 rounded" />
                      <div className="h-2 w-10 bg-white/5 rounded" />
                    </div>
                    <div className="h-2 w-20 bg-white/5 rounded" />
                  </div>
                </div>

                {/* Technical Skills Badges list */}
                <div className="space-y-2 pt-2">
                  <span className="text-[8px] uppercase tracking-widest font-bold text-dark-500 block">Identified Skill Matrix</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'NLP', 'Git', 'Docker', 'Kubernetes', 'SQL'].map((s, i) => (
                      <span 
                        key={s} 
                        className={`text-[8px] font-bold px-2 py-0.5 rounded border ${
                          i < 5 
                            ? 'bg-accent-copper/10 border-accent-copper/20 text-accent-copper' 
                            : 'bg-white/[0.02] border-white/[0.06] text-gray-400'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Glowing ATS Score Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-dark-900/90 backdrop-blur-md border border-accent-copper/30 shadow-xl flex flex-col items-center justify-center p-2 glow-copper"
                whileHover={{ scale: 1.05 }}
              >
                {/* Visual Circle progress border */}
                <div className="absolute inset-1 rounded-full border border-dashed border-accent-copper/20 animate-spin" style={{ animationDuration: '20s' }} />
                <span className="text-2xl font-black text-white leading-none">88%</span>
                <span className="text-[7px] uppercase font-extrabold tracking-wider text-accent-copper mt-1 leading-none">ATS Rating</span>
                <div className="flex items-center space-x-0.5 mt-1">
                  <Award className="h-2 w-2 text-accent-copper" />
                  <span className="text-[6px] font-bold text-dark-500 uppercase">Strong Match</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

      </div>

      {/* Grid Features under layout (optimized for full breakpoints) */}
      <div className="border-t border-white/[0.04] mt-24 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white/[0.01] border border-white/[0.04] rounded-2xl flex flex-col space-y-3 hover:border-white/[0.08] transition-all">
            <div className="h-8 w-8 bg-accent-copper/10 rounded-lg flex items-center justify-center text-accent-copper">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-white text-sm tracking-tight">Format Suitability</h3>
            <p className="text-xs text-dark-500 leading-relaxed">
              Verifies education headers, links, and layout sections to comply with parsing templates.
            </p>
          </div>

          <div className="p-5 bg-white/[0.01] border border-white/[0.04] rounded-2xl flex flex-col space-y-3 hover:border-white/[0.08] transition-all">
            <div className="h-8 w-8 bg-accent-copper/10 rounded-lg flex items-center justify-center text-accent-copper">
              <Cpu className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-white text-sm tracking-tight">Heuristic Skill Matching</h3>
            <p className="text-xs text-dark-500 leading-relaxed">
              Maps programming languages, frame resources, tools, and methodologies case-insensitively.
            </p>
          </div>

          <div className="p-5 bg-white/[0.01] border border-white/[0.04] rounded-2xl flex flex-col space-y-3 hover:border-white/[0.08] transition-all">
            <div className="h-8 w-8 bg-accent-copper/10 rounded-lg flex items-center justify-center text-accent-copper">
              <Target className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-white text-sm tracking-tight">Job Description Fit</h3>
            <p className="text-xs text-dark-500 leading-relaxed">
              Recruiter-side overlay checking missing requirements and providing hiring recommendations.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
