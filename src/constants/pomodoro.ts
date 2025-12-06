import type { IPomodoroSession } from "@/types/definition";

export const SamplePomodoroSession: IPomodoroSession = {
  focusTimeMin: 25,
  breakTimeMin: 5,
  remainingSec: 1500,
  isRunning: false,
  sessionType: "focus",
  startTimestamp: null,
};

export const PomodoroMessage = {
  Start: "pomodoro:start",
  Pause: "pomodoro:pause",
  Reset: "pomodoro:reset",
  Setup: "pomodoro:setup",
} as const;
