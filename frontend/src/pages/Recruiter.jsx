import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, FileText, ArrowRight, UploadCloud, X, RefreshCw, Loader2, Sparkles } from 'lucide-react';
import { matchJobDescription } from '../api/resumeApi';
import RecommendationPanel from '../components/RecommendationPanel';

export default function Recruiter() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF resumes are supported.');
      setFile(null);
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setError(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleClearFile = (e) => {
    e.stopPropagation();
    setFile(null);
  };

  const handleMatch = async () => {
    if (!file) {
      setError('Please upload a candidate resume PDF first.');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please paste a job description to compare against.');
      return;
    }

    setLoading(true);
    setError(null);
    setMatchResult(null);

    try {
      const results = await matchJobDescription(file, jobDescription);
      setMatchResult(results);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || 'An error occurred while comparing the resume to the job description.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription('');
    setMatchResult(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 flex flex-col space-y-6">
      
      {/* Page Title */}
      <div className="border-b border-white/[0.06] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Target className="h-6 w-6 text-accent-copper" />
            <span>Recruiter Job Alignment Portal</span>
          </h1>
          <p className="text-xs text-dark-500 mt-1">Directly match resume skillsets against any specific job description.</p>
        </div>
        
        {matchResult && (
          <button
            onClick={handleReset}
            className="inline-flex items-center space-x-1.5 px-4 py-2 border border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.05] text-gray-300 hover:text-white font-semibold text-xs rounded-xl transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Matching Form</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Form Fields */}
        <div className="flex flex-col space-y-5">
          
          {/* Card 1: Resume Upload Area */}
          <div className="glass-panel p-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent-copper flex items-center space-x-1.5">
              <FileText className="h-4 w-4" />
              <span>1. Upload Candidate Resume</span>
            </h3>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              disabled={loading}
            />

            <div
              className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer min-h-[140px] transition-all duration-300 ${
                dragActive
                  ? 'border-accent-copper bg-accent-copper/5'
                  : file
                  ? 'border-accent-emerald bg-accent-emerald/5'
                  : 'border-white/[0.08] bg-white/[0.01] hover:border-white/[0.15] hover:bg-white/[0.02]'
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={file ? undefined : triggerFileInput}
            >
              {file ? (
                <div className="flex items-center justify-between w-full p-2 bg-dark-900/50 border border-white/[0.06] rounded-lg">
                  <div className="flex items-center space-x-3 min-w-0">
                    <FileText className="h-8 w-8 text-accent-emerald flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate max-w-[220px]">{file.name}</p>
                      <p className="text-[10px] text-dark-500 mt-0.5">{(file.size / (1024 * 1024)).toFixed(2)} MB • PDF</p>
                    </div>
                  </div>
                  {!loading && (
                    <button
                      onClick={handleClearFile}
                      className="p-1.5 hover:bg-white/[0.06] rounded-md text-gray-400 hover:text-white transition-colors"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center flex flex-col items-center space-y-2">
                  <UploadCloud className="h-8 w-8 text-accent-copper/80" />
                  <p className="text-xs font-semibold text-white">Drag and drop resume PDF, or browse</p>
                  <p className="text-[10px] text-dark-500">PDF standard document format up to 5MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Job Description Box */}
          <div className="glass-panel p-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent-copper flex items-center space-x-1.5">
              <Target className="h-4 w-4 text-accent-orange" />
              <span>2. Paste Job Description (JD)</span>
            </h3>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job details here... e.g. We are seeking a Senior React Developer with Node.js, Express.js, TypeScript, PostgreSQL, and AWS experience. You will build user-facing components, design scalable REST APIs, and manage deployment..."
              rows={8}
              className="w-full bg-white/[0.01] border border-white/[0.08] focus:border-accent-copper focus:outline-none focus:bg-white/[0.03] rounded-xl p-4 text-xs text-white placeholder-dark-500 resize-y transition-all"
              disabled={loading}
            />
          </div>

          {/* Action and Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3.5 bg-accent-rose/10 border border-accent-rose/25 text-accent-rose text-xs rounded-xl flex items-start space-x-2"
            >
              <div className="h-1.5 w-1.5 bg-accent-rose rounded-full mt-1.5 flex-shrink-0" />
              <p className="font-semibold">{error}</p>
            </motion.div>
          )}

          <button
            onClick={handleMatch}
            disabled={loading || !file || !jobDescription.trim()}
            className="w-full py-3 bg-gradient-to-r from-accent-copper to-accent-orange hover:from-accent-copper/90 hover:to-accent-orange/90 disabled:from-dark-800 disabled:to-dark-800 disabled:text-dark-500 disabled:cursor-not-allowed font-semibold text-sm rounded-xl transition-all shadow-lg shadow-accent-copper/10 flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-[0.99] text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Running Compatibility Indexer...</span>
              </>
            ) : (
              <>
                <span>Compare Candidate Profile</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Right Column: Output / Recommendation Results */}
        <div className="w-full h-full min-h-[300px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel p-10 flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[400px]"
              >
                <Loader2 className="h-10 w-10 text-accent-copper animate-spin" />
                <div>
                  <h4 className="font-bold text-white text-base">Aligning Technology Vectors</h4>
                  <p className="text-xs text-dark-500 mt-1 max-w-xs mx-auto text-center">
                    Scanning job description keywords, cross-referencing candidate skills, and computing percentage overlap.
                  </p>
                </div>
              </motion.div>
            ) : matchResult ? (
              <motion.div
                key="results-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full"
              >
                <RecommendationPanel match={matchResult} />
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel p-10 flex flex-col items-center justify-center text-center space-y-4 h-full border-dashed min-h-[400px] bg-white/[0.01]"
              >
                <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl text-dark-500">
                  <Sparkles className="h-8 w-8 text-accent-copper/40" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Awaiting Match Input</h4>
                  <p className="text-xs text-dark-500 max-w-xs mx-auto mt-1 leading-relaxed text-center">
                    Upload a candidate PDF resume and paste the job description text on the left to trigger the comparison check.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
