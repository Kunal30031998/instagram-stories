import { useEffect, useRef } from "react";

export function useAutoAdvance(callback: () => void, deps: any[]) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      callback();
    }, 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
