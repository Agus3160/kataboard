import type { PomodoroSession } from "@/context/pomodoro/PomodoroContext";

export const minToSecs = (minutes: number) => minutes * 60;

export const secToStr = (secs: number) => {
  const hour = Math.floor(secs / 3600);
  const min = Math.floor(secs / 60);
  const sec = secs % 60;
  return `${hour.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};

export const calcElapsed = (from: number) => Date.now() - from;

export const getSessionSecs = (
  session: PomodoroSession,
  type: PomodoroSession["sessionType"]
) =>
  type === "focus"
    ? minToSecs(session.focusTimeMin)
    : minToSecs(session.breakTimeMin);

export const calcCycleTime = (session: PomodoroSession) => {
  const focusTime = minToSecs(session.focusTimeMin);
  const breakTime = minToSecs(session.breakTimeMin);
  return focusTime + breakTime;
};
