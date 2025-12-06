import { createContext } from "react";

export type PomodoroSession = {
  focusTimeMin: number;
  breakTimeMin: number;
  remainingSec: number;
  isRunning: boolean;
  sessionType: "focus" | "break";
  startTimestamp: number | null;
};

export type PomodoroContextType = {
  session: PomodoroSession;
  setSession: (session: PomodoroSession) => void;
  reset: () => void;
  start: () => void;
  pause: () => void;
  isLoading: boolean;
};

export const PomodoroContext = createContext<PomodoroContextType | null>(null);
