"use client";

import { useState } from "react";

export function useCopyToClipboard() {
  const [result, setResult] = useState<
    null | { state: "success" } | { state: "error"; message: any }
  >(null);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setResult({ state: "success" });
    } catch (e: any) {
      setResult({ state: "error", message: e });
    } finally {
      // 👇 Show the result feedback for 2 seconds
      setTimeout(() => {
        setResult(null);
      }, 2000);
    }
  };

  // 👇 We want the result as a tuple
  return [copy, result] as const;
}
