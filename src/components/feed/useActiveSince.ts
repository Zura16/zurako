"use client";

import { useEffect, useRef } from "react";

/** Returns a function giving ms since the card last became active (for response times). */
export function useActiveSince(active: boolean): () => number {
  const since = useRef(0);
  useEffect(() => {
    if (active) since.current = Date.now();
  }, [active]);
  return () => (since.current ? Date.now() - since.current : 0);
}
