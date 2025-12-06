import type { PomodoroSession } from "@/context/pomodoro/PomodoroContext";
import type { ChormeMessage } from "@/types/definition";

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

export const POMODORO_MESSAGE_TYPES = {
  NotifyChangeCycle: "pomodoro:change-cycle",
};

export const sendNotificationMsg = (session: PomodoroSession) => {
  const { sessionType, breakTimeMin, focusTimeMin } = session;
  const message: ChormeMessage<chrome.notifications.NotificationCreateOptions> =
    {
      type: POMODORO_MESSAGE_TYPES.NotifyChangeCycle,
      payload: {
        type: "basic",
        iconUrl: chrome.runtime.getURL("icons/icon128.png"),
        title: sessionType === "focus" ? "Let's Focus!" : "Take a Break!",
        message:
          sessionType === "focus"
            ? `Time to focus for ${focusTimeMin} min.`
            : `Time for a break of ${breakTimeMin} min.`,
        priority: 2,
      },
    };
  chrome.runtime.sendMessage(message);
};
