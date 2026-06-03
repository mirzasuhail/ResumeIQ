import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function UploadForm({ onUploadSuccess, onError, label = "resume" }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
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
      onError('Only PDF files are supported.');
      setFile(null);
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      onError('File size exceeds the 5MB limit.');
      setFile(null);
      return;
    }
    setFile(selectedFile);
    onError(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    onError(null);

    try {
      await onUploadSuccess(file);
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to analyze the resume. Please verify the PDF format and try again.';
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    onError(null);
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        disabled={loading}
      />

      <motion.div
        className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 p-4 sm:p-8 flex flex-col items-center justify-center cursor-pointer min-h-[220px] ${
          dragActive
            ? 'border-accent-copper bg-accent-copper/5 glow-copper'
            : file
            ? 'border-accent-emerald bg-accent-emerald/5 glow-emerald'
            : 'border-white/[0.1] bg-dark-900/40 hover:border-white/[0.2] hover:bg-dark-900/60'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={file ? undefined : triggerFileInput}
        whileHover={file ? {} : { scale: 1.01 }}
        whileTap={file ? {} : { scale: 0.99 }}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <Loader2 className="h-12 w-12 text-accent-copper animate-spin" />
              <div>
                <h3 className="font-semibold text-lg text-white">Analyzing Intelligence Profile...</h3>
                <p className="text-sm text-dark-500 mt-1">Parsing resume text, calculating ATS suitability, and generating role eligibility diagnostics.</p>
              </div>
              <div className="w-48 bg-dark-800 h-1.5 rounded-full overflow-hidden relative">
                <motion.div 
                  className="bg-gradient-to-r from-accent-copper to-accent-orange h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "95%" }}
                  transition={{ duration: 4, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ) : file ? (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center text-center space-y-4 w-full"
            >
              <div className="p-4 bg-accent-emerald/10 rounded-full text-accent-emerald">
                <FileText className="h-10 w-10" />
              </div>
              <div className="max-w-[80%]">
                <h3 className="font-semibold text-white truncate text-base">{file.name}</h3>
                <p className="text-xs text-dark-500 mt-0.5">{(file.size / (1024 * 1024)).toFixed(2)} MB • PDF Format</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-xs justify-center pt-2">
                <button
                  onClick={clearFile}
                  className="px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white border border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.05] rounded-xl transition-all w-full sm:w-1/2"
                >
                  Change File
                </button>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-accent-copper to-accent-orange hover:from-accent-copper/90 hover:to-accent-orange/90 rounded-xl transition-all shadow-lg shadow-cyan-950/40 hover:scale-[1.02] w-full sm:w-1/2 flex items-center justify-center space-x-1.5"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Analyze {label === "resume" ? "Resume" : "Match"}</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/[0.04] text-dark-500 group-hover:text-gray-300 transition-colors">
                <UploadCloud className="h-10 w-10 text-accent-copper/80" />
              </div>
              <div>
                <p className="font-medium text-white text-base">
                  Drag and drop your resume PDF here, or <span className="text-accent-copper hover:underline">browse</span>
                </p>
                <p className="text-xs text-dark-500 mt-1">Supports PDF resumes up to 5MB</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
