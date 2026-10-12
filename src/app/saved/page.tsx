import { Suspense } from "react";
import { SavedView } from "@/components/SavedView";

export const metadata = { title: "Saved · Nunchi" };

export default function SavedPage() {
  return (
    <Suspense>
      <SavedView />
    </Suspense>
  );
}
