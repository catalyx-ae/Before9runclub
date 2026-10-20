"use client";
import { useEffect, useRef, type ReactNode, type KeyboardEvent } from "react";
export function Modal({ open, onClose, label, children, className = "", onKeyDown }: {
  open: boolean; onClose: () => void; label: string; children: ReactNode; className?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal(); document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }); };
  }, [open]);
  function keys(event: KeyboardEvent<HTMLDialogElement>) {
    onKeyDown?.(event);
    if (event.key !== "Tab") return;
    const nodes = ref.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex="0"],video[controls]');
    if (!nodes?.length) return;
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  return <dialog ref={ref} className={`b9-modal ${className}`} aria-label={label} onKeyDown={keys} onCancel={event => { event.preventDefault(); onClose(); }}>{children}</dialog>;
}
