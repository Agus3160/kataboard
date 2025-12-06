import { PomodoroAlarm } from "@/background/pomodoro/pomodoro.alarm";
import type { IPomodoroSession } from "@/types/definition";
import { getPomodoro, savePomodoro } from "../pomodoro.storage";

export const handleReset = async () => {
  const session = await getPomodoro();
  const newSession: IPomodoroSession = {
    ...session,
    isRunning: false,
    startTimestamp: null,
    sessionType: "focus",
    remainingSec: session.focusTimeMin * 60,
  };

  await chrome.alarms.clear(PomodoroAlarm);
  await savePomodoro(newSession);

  return newSession;
};
