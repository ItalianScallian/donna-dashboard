'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  onUseSample: () => void;
  onBack: () => void;
  error?: string | null;
}

export default function FileUpload({ onUpload, onUseSample, onBack, error }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      f => f.name.endsWith('.csv') || f.name.endsWith('.pdf')
    );
    if (droppedFiles.length > 0) {
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h2
          className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tighter mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Drop your statement
        </h2>
        <p className="text-text-secondary">Upload your credit card CSV and we&apos;ll analyze every transaction.</p>
      </motion.div>

      {/* Drop zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed p-12 md:p-16 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-accent bg-accent/5'
            : 'border-ps-border hover:border-border-hover bg-surface/50 hover:bg-surface'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.pdf"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Icon */}
        <motion.div
          animate={isDragging ? { y: -8, scale: 1.1 } : { y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="mb-6"
        >
          <svg className={`w-14 h-14 mx-auto transition-colors duration-300 ${isDragging ? 'text-accent' : 'text-text-tertiary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </motion.div>

        <p className="text-text-primary font-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          {isDragging ? 'Drop it' : 'Drag & drop your CSV here'}
        </p>
        <p className="text-text-tertiary text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
          or click to browse · .csv supported
        </p>

        {/* Corner accents when dragging */}
        {isDragging && (
          <>
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent" />
          </>
        )}
      </motion.div>

      {/* File list */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-1"
          >
            {files.map((file, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between px-4 py-3 bg-surface border border-ps-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="text-accent text-xs font-bold" style={{ fontFamily: 'var(--font-mono)' }}>CSV</span>
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">{file.name}</p>
                    <p className="text-text-tertiary text-xs" style={{ fontFamily: 'var(--font-mono)' }}>{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button onClick={() => removeFile(i)} className="text-text-tertiary hover:text-ps-red transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 bg-red-dim border border-ps-red/20 text-ps-red text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSV Instructions - Collapsible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="flex items-center gap-2 text-text-secondary text-sm hover:text-text-primary transition-colors"
        >
          <motion.span
            animate={{ rotate: showInstructions ? 90 : 0 }}
            className="text-accent"
          >
            →
          </motion.span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>How to export CSV from your bank</span>
        </button>
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-1">
                {[
                  { bank: 'Chase', path: 'Account → Statements → Download → CSV' },
                  { bank: 'Amex', path: 'Statements & Activity → Download → CSV' },
                  { bank: 'Citi', path: 'View Transactions → Download → CSV' },
                  { bank: 'Capital One', path: 'Transactions → Download → CSV' },
                ].map((item) => (
                  <div key={item.bank} className="flex items-start gap-3 p-3 border border-ps-border bg-surface">
                    <span className="text-accent text-xs font-bold shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                      {item.bank}
                    </span>
                    <span className="text-text-tertiary text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                      {item.path}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Actions */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 font-medium text-text-secondary hover:text-text-primary border border-ps-border hover:border-border-hover bg-surface transition-all"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ← Back
        </button>
        {files.length > 0 ? (
          <button
            onClick={() => onUpload(files)}
            className="px-10 py-3 font-bold text-lg bg-accent text-black hover:bg-accent-dim transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Analyze {files.length} file{files.length !== 1 ? 's' : ''} →
          </button>
        ) : (
          <button
            onClick={onUseSample}
            className="px-10 py-3 font-bold text-lg bg-accent text-black hover:bg-accent-dim transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Try with Sample Data →
          </button>
        )}
      </div>
    </div>
  );
}
