import { useEffect, useRef, useState } from "react";

/**
 * Counts down to `expiresAt` (ms timestamp) while `active` is true.
 * Calls `onExpire` once when the time runs out. Returns the remaining ms.
 */
export function useCountdown(expiresAt: number, active: boolean, onExpire: () => void) {
  const [now, setNow] = useState(() => Date.now());
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [active, expiresAt]);

  const remainingMs = Math.max(0, expiresAt - now);

  useEffect(() => {
    if (active && expiresAt > 0 && remainingMs === 0) onExpireRef.current();
  }, [active, expiresAt, remainingMs]);

  return remainingMs;
}