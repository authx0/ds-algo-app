"use client";

import React, { useEffect, useRef } from 'react';

interface PseudocodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  codeContent: string;
}

const PseudocodeModal: React.FC<PseudocodeModalProps> = ({ isOpen, onClose, title, codeContent }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus the modal or a focusable element inside when it opens
      modalRef.current?.focus();
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    // Cleanup listener on unmount or when isOpen changes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Close modal on backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1} // Make the modal focusable
    >
      <div className="bg-white/30 dark:bg-black/30 border border-white/20 dark:border-black/20 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 text-white">
        {/* Use text-white assuming the backdrop makes it readable, adjust if needed */}
        <div className="flex justify-between items-start mb-4">
          <h2 id="modal-title" className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            {/* Simple X icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <pre className="text-sm font-mono whitespace-pre-wrap bg-black/20 dark:bg-white/10 p-4 rounded">
          {codeContent}
        </pre>
      </div>
    </div>
  );
};

export default PseudocodeModal; 