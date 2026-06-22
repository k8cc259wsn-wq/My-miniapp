import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export function BottomSheet({ open, onClose, children, title }: BottomSheetProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 8, 6, 0.6)',
          animation: 'fadeIn 0.2s ease',
        }}
      />
      <div
        style={{
          position: 'relative',
          background: 'var(--color-bg-elevated)',
          borderTopLeftRadius: 'var(--radius-lg)',
          borderTopRightRadius: 'var(--radius-lg)',
          padding: '20px 16px',
          paddingBottom: 'calc(var(--safe-bottom) + 20px)',
          maxHeight: '85vh',
          overflowY: 'auto',
          animation: 'slideUp 0.28s cubic-bezier(0.32, 0.72, 0, 1)',
          boxShadow: '0 -8px 30px rgba(0,0,0,0.4)',
        }}
      >
        <div
          style={{
            width: 36,
            height: 4,
            background: 'var(--color-border)',
            borderRadius: 4,
            margin: '0 auto 16px',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            style={{
              background: 'var(--color-bg-card)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              color: 'var(--color-text-secondary)',
              fontSize: 16,
            }}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
