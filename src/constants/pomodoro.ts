import type { PomodoroSession } from "@/context/pomodoro/PomodoroContext";

export const SamplePomodoroSession: PomodoroSession = {
  focusTimeMin: 25,
  breakTimeMin: 5,
  remainingSec: 1500,
  isRunning: false,
  sessionType: "focus",
  startTimestamp: null,
};
