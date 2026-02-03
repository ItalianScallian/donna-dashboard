'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  onUseSample: () => void;
  onBack: () => void;
  error?: string | null;
  hideBack?: boolean;
}

/* ================================================
   ANIMATED DASHED BORDER (marching ants via SVG)
   ================================================ */
function MarchingBorder({ active }: { active: boolean }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
      <rect
        x="1" y="1"
        width="calc(100% - 2px)" height="calc(100% - 2px)"
        rx="0" ry="0"
        fill="none"
        stroke={active ? 'var(--accent)' : 'var(--border)'}
        strokeWidth="2"
        strokeDasharray="10 6"
        strokeDashoffset="0"
        className={active ? 'marching-ants' : ''}
        style={{
          width: 'calc(100% - 2px)',
          height: 'calc(100% - 2px)',
          transition: 'stroke 0.3s ease',
        }}
      />
    </svg>
  );
}

/* ================================================
   UPLOAD SUCCESS CHECKMARK (draws itself)
   ================================================ */
function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className="w-10 h-10 bg-accent flex items-center justify-center"
    >
      <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
        <motion.path
          d="M5 13l4 4L19 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
      </svg>
    </motion.div>
  );
}

/* ================================================
   FLOATING PARTICLES inside dropzone
   ================================================ */
function DropzoneParticles({ active }: { active: boolean }) {
  if (!active) return null;
  
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    delay: Math.random() * 0.5,
  }));

  return (
    <>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-accent"
          style={{ left: `${p.x}%`, bottom: '10%' }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -120, opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.5, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

/* ================================================
   MAIN FILE UPLOAD COMPONENT
   ================================================ */
export default function FileUpload({ onUpload, onUseSample, onBack, error, hideBack }: FileUploadProps) {
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
        <p className="text-text-secondary text-lg">Upload your credit card CSV and we&apos;ll analyze every transaction.</p>
      </motion.div>

      {/* Drop zone with marching ants border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-14 md:p-20 text-center cursor-pointer transition-all duration-300 ${
          isDragging ? 'bg-accent/5' : 'bg-surface/30 hover:bg-surface/60'
        }`}
      >
        <MarchingBorder active={isDragging} />
        <DropzoneParticles active={isDragging} />

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.pdf"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Animated upload icon */}
        <motion.div
          animate={isDragging ? { y: -12, scale: 1.15 } : { y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="mb-6 relative inline-block"
        >
          <svg className={`w-16 h-16 mx-auto transition-colors duration-300 ${isDragging ? 'text-accent' : 'text-text-tertiary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          {/* Upward arrow pulse */}
          {isDragging && (
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-t from-accent to-transparent"
              animate={{ y: [-8, -20], opacity: [0.8, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </motion.div>

        <p className="text-text-primary font-semibold text-lg mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          {isDragging ? 'Drop it here' : 'Drag & drop your CSV'}
        </p>
        <p className="text-text-tertiary text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
          or click to browse · .csv supported
        </p>

        {/* Corner accent brackets when dragging */}
        <AnimatePresence>
          {isDragging && (
            <>
              {[
                'top-2 left-2 border-t-2 border-l-2',
                'top-2 right-2 border-t-2 border-r-2',
                'bottom-2 left-2 border-b-2 border-l-2',
                'bottom-2 right-2 border-b-2 border-r-2',
              ].map((classes, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-5 h-5 border-accent ${classes}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* File list with success animations */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-1 overflow-hidden"
          >
            {files.map((file, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.1 }}
                className="flex items-center justify-between px-4 py-3 bg-surface border border-ps-border group hover:border-accent/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <SuccessCheck />
                  <div>
                    <p className="text-text-primary text-sm font-medium">{file.name}</p>
                    <p className="text-text-tertiary text-xs" style={{ fontFamily: 'var(--font-mono)' }}>{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => removeFile(i)}
                  className="text-text-tertiary hover:text-ps-red transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="p-4 bg-red-dim border border-ps-red/20 text-ps-red text-sm flex items-start gap-3">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚠
              </motion.span>
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSV Instructions — collapsible with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <motion.button
          onClick={() => setShowInstructions(!showInstructions)}
          className="flex items-center gap-2.5 text-text-secondary text-sm hover:text-text-primary transition-colors group"
          whileHover={{ x: 2 }}
        >
          <motion.span
            animate={{ rotate: showInstructions ? 90 : 0 }}
            className="text-accent text-xs"
            transition={{ type: 'spring', stiffness: 400 }}
          >
            →
          </motion.span>
          <span style={{ fontFamily: 'var(--font-mono)' }} className="group-hover:text-accent transition-colors">
            How to export CSV from your bank
          </span>
        </motion.button>
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-0">
                {[
                  { bank: 'Chase', path: 'Account → Statements → Download → CSV' },
                  { bank: 'Amex', path: 'Statements & Activity → Download → CSV' },
                  { bank: 'Citi', path: 'View Transactions → Download → CSV' },
                  { bank: 'Capital One', path: 'Transactions → Download Transactions → CSV' },
                ].map((item, i) => (
                  <motion.div
                    key={item.bank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 p-3.5 border border-ps-border bg-surface hover:bg-surface-2 transition-colors group"
                  >
                    <span
                      className="text-accent text-xs font-bold shrink-0 w-20 group-hover:text-accent-dim transition-colors"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {item.bank}
                    </span>
                    <span className="text-text-tertiary text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                      {item.path}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {!hideBack && (
          <motion.button
            onClick={onBack}
            className="px-6 py-3 font-medium text-text-secondary hover:text-text-primary border border-ps-border hover:border-border-hover bg-surface transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Back
          </motion.button>
        )}
        {files.length > 0 ? (
          <motion.button
            onClick={() => onUpload(files)}
            className="relative px-12 py-3 font-bold text-lg bg-accent text-black overflow-hidden transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Analyze {files.length} file{files.length !== 1 ? 's' : ''} →
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)' }}
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            />
          </motion.button>
        ) : (
          <motion.button
            onClick={onUseSample}
            className="relative px-12 py-3 font-bold text-lg bg-accent text-black overflow-hidden transition-all"
            style={{ fontFamily: 'var(--font-display)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Try with Sample Data →
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)' }}
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
