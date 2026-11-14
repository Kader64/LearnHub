import { useEffect, useRef, useState } from "react";
import { useBlocker } from "react-router-dom";

/**
 * Watches the page while an exam is running:
 *  - counts how many times the student leaves it (switching tab or window),
 *  - asks before in-app navigation (links, back button). Leaving is allowed,
 *    but the attempt then counts as failed,
 *  - calls `onLimitReached` when `limit` warnings are reached,
 *  - asks for confirmation before the tab is closed or reloaded.
 *
 * A tab or window switch is counted once, until the student comes back.
 * The browser can only detect this, not prevent it, so the server must enforce
 * the limit too (report each leave to the API and cancel the attempt there).
 *
 * Needs a data router (createBrowserRouter) because of useBlocker.
 */
export function useExamGuard(active: boolean, limit: number, onLimitReached: () => void) {
  const [warnings, setWarnings] = useState(0);
  const [warningOpen, setWarningOpen] = useState(false);
  const onLimitRef = useRef(onLimitReached);
  const allowLeave = useRef(false);

  useEffect(() => {
    onLimitRef.current = onLimitReached;
  });

  // Block navigation to another page while the exam is running
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      active && !allowLeave.current && currentLocation.pathname !== nextLocation.pathname,
  );

  // Switching tab or window
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

  /** Student chose to stay on the exam. */
  function stay() {
    if (blocker.state === "blocked") blocker.reset();
  }

  /** Student chose to leave. The attempt is failed, and they are not forced to stay. */
  function leaveAnyway() {
    // TODO API: POST /api/attempts/{id}/abandon (status Cancelled, Passed = false)
    allowLeave.current = true;
    if (blocker.state === "blocked") blocker.proceed();
  }

  /** Call right before a navigation the exam does itself (submit). */
  function allowLeaving() {
    allowLeave.current = true;
  }

  return {
    warnings,
    warningOpen: warningOpen && warnings < limit,
    dismissWarning: () => setWarningOpen(false),
    leaveDialogOpen: blocker.state === "blocked",
    stay,
    leaveAnyway,
    allowLeaving,
  };
}