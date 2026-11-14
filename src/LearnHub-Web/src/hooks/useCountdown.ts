import { useEffect, useRef, useState } from "react";

export function useCountdown(expiresAt: number, active: boolean, onExpire: () => void) {
  const [now, setNow] = useState(() => Date.now());
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!active || expiresAt <= 0) return;

    const current = Date.now();
    setNow(current);

    const msLeft = expiresAt - current;
    if (msLeft <= 0) {
      onExpireRef.current();
      return;
    }

    const expireTimeout = setTimeout(() => {
      setNow(Date.now());
      onExpireRef.current();
    }, msLeft);

    const tickInterval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearTimeout(expireTimeout);
      clearInterval(tickInterval);
    };
  }, [active, expiresAt]);

  return active ? Math.max(0, expiresAt - now) : 0;
}