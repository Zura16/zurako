"use client";

import { AppGate } from "@/components/AppGate";
import { AudioProvider } from "./AudioProvider";
import { LearnerProvider } from "./LearnerProvider";
import { SettingsProvider } from "./SettingsProvider";
import { SheetProvider } from "./SheetProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <LearnerProvider>
        <AudioProvider>
          <SheetProvider>
            <AppGate>{children}</AppGate>
          </SheetProvider>
        </AudioProvider>
      </LearnerProvider>
    </SettingsProvider>
  );
}
