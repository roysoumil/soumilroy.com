"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const EMAIL = "soumilroy@pm.me";

// Copies the address and reports "copied" for a moment, so a button can swap
// its label and swap it back.
export default function useCopyEmail(): [copied: boolean, copy: () => void] {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(EMAIL)?.then(
      () => {
        setCopied(true);
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setCopied(false), 1800);
      },
      () => {},
    );
  }, []);

  return [copied, copy];
}
