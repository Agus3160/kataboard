import type { IPomodoroSession } from "@/types/definition";
import { createContext } from "react";

export type PomodoroContextType = {
  session: IPomodoroSession;
  setSession: (session: IPomodoroSession) => void;
  setup: (focusTimeMin: number, breakTimeMin: number) => void;
  reset: () => void;
  start: () => void;
  pause: () => void;
};

export const PomodoroContext = createContext<PomodoroContextType | null>(null);
