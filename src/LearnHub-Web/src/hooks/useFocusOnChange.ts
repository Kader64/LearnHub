import { useEffect, useRef } from "react";

/**
 * When `key` changes: scroll to the top and move focus to the returned element,
 * so screen reader users hear that the content changed. Does nothing on first render.
 * The element needs tabIndex={-1}.
 */
export function useFocusOnChange<T extends HTMLElement>(key: string) {
  const ref = useRef<T>(null);
  const previousKey = useRef(key);

  useEffect(() => {
    if (previousKey.current === key) return;
    previousKey.current = key;
    window.scrollTo({ top: 0 });
    ref.current?.focus();
  }, [key]);

  return ref;
}
