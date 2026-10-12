import { useEffect, useRef, useState, type ReactNode } from "react";

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  labelledBy: string;
  unmountDelayMs?: number;
}

export default function ModalWrapper({
  children,
  onClose,
  isOpen,
  labelledBy,
  unmountDelayMs = 300,
}: ModalWrapperProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
    } else {
      const timeout = setTimeout(() => {
        setMounted(false);
      }, unmountDelayMs);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, unmountDelayMs]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      tabIndex={-1}
      style={{ outline: "none" }}
      className={!isOpen ? "sr-only" : undefined}
    >
      {children}
    </div>
  );
}
