import { Suspense } from "react";
import { PreviewView } from "@/components/PreviewView";

export const metadata = { title: "Content preview · Nunchi" };

export default function PreviewPage() {
  return (
    <Suspense>
      <PreviewView />
    </Suspense>
  );
}
