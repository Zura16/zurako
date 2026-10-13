"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** The Learn tab moved to the home page; old links land there. */
export default function LearnRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
