import type { IPomodoroSession } from "@/types/definition";
import { PomodoroAlarm } from "../pomodoro.alarm";
import { getPomodoro, savePomodoro } from "../pomodoro.storage";

export const handleAlarm = async () => {
  const prev = await getPomodoro();

  const newCycle = prev.sessionType === "focus" ? "break" : "focus";
  const newRemainingSec =
    (newCycle === "focus" ? prev.focusTimeMin : prev.breakTimeMin) * 60;

  const now = Date.now();
  const newPomodoro: IPomodoroSession = {
    ...prev,
    sessionType: newCycle,
    remainingSec: newRemainingSec,
    isRunning: true,
    startTimestamp: now,
  };
  await savePomodoro(newPomodoro);

  const duration = newPomodoro.remainingSec;
  const when = now + duration * 1000;

  await sendNotification(prev);
  await chrome.alarms.create(PomodoroAlarm, { when });
  return newPomodoro;
};

const sendNotification = async (prev: IPomodoroSession) => {
  const message = `The ${prev.sessionType} session is over!`;
  const title = `KataBoard, ${
    prev.sessionType === "focus" ? "Time to break!" : "Time to work!"
  }`;
  await chrome.notifications.create({
    iconUrl: "icons/icon128.png",
    type: "basic",
    message,
    title,
  });
};
