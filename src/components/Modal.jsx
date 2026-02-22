import { useEffect, useRef } from 'react';

export default function Modal({ id, title, onClose, onConfirm, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') onConfirm?.();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, onConfirm]);

  return (
    <div
      id={id}
      className="modal-overlay open"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="modal" role="dialog" aria-modal="true">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
