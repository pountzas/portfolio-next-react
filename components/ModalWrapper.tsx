import React, { useEffect, useRef, ReactNode, useState } from 'react';

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  unmountDelayMs?: number;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  onClose,
  isOpen,
  unmountDelayMs = 300
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(isOpen);

  // Handle mounting/unmounting with delay for exit animations
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      // Delay unmounting to allow exit animations to complete
      const timeout = setTimeout(() => {
        setMounted(false);
      }, unmountDelayMs);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, unmountDelayMs]);
  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open and manage focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the modal for keyboard events
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Don't render anything if not mounted
  if (!mounted) return null;

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      style={{ outline: 'none' }}
      aria-hidden={!isOpen}
      className={!isOpen ? 'sr-only' : undefined}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
