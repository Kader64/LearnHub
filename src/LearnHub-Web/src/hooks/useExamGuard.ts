import { useEffect, useRef, useState } from "react";

/**
 * Watches the page while an exam is running:
 *  - counts how many times the student leaves it (switching tab or window),
 *  - calls `onLimitReached` when `limit` is hit,
 *  - asks for confirmation before the tab is closed or reloaded.
 *
 * A leave is counted once, until the student comes back.
 * The browser can only detect this, not prevent it, so the server must enforce
 * the limit too (report each leave to the API and cancel the attempt there).
 */
export function useExamGuard(active: boolean, limit: number, onLimitReached: () => void) {
  const [warnings, setWarnings] = useState(0);
  const [warningOpen, setWarningOpen] = useState(false);
  const onLimitRef = useRef(onLimitReached);

  useEffect(() => {
    onLimitRef.current = onLimitReached;
  });

  // Leaving the page
  useEffect(() => {
    if (!active) return;
    let away = false;

    const leave = () => {
      if (away) return;
      away = true;
      setWarnings((n) => n + 1);
      setWarningOpen(true);
      // TODO API: POST /api/attempts/{id}/focus-loss
    };
    const back = () => {
      away = false;
    };
    const onVisibility = () => (document.hidden ? leave() : back());

    window.addEventListener("blur", leave);
    window.addEventListener("focus", back);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("blur", leave);
      window.removeEventListener("focus", back);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active]);

  // Limit reached
  useEffect(() => {
    if (active && warnings >= limit) {
      setWarningOpen(false);
      onLimitRef.current();
    }
  }, [active, warnings, limit]);

  // Closing or reloading the tab
  useEffect(() => {
    if (!active) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [active]);

  return {
    warnings,
    warningOpen: warningOpen && warnings < limit,
    dismissWarning: () => setWarningOpen(false),
  };
}