'use client';

import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  maxWidth?: string;
}

export default function Modal({ children, onClose, maxWidth = '600px' }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative bg-bg-secondary border border-border rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
        style={{ maxWidth, width: '90%' }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
