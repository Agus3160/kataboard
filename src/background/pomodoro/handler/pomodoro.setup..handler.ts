import { PomodoroAlarm } from "@/background/pomodoro/pomodoro.alarm";
import { getPomodoro, savePomodoro } from "../pomodoro.storage";
import type { IPomodoroSession } from "@/types/definition";

export const handleSetup = async (
  payload: Pick<IPomodoroSession, "breakTimeMin" | "focusTimeMin">
) => {
  const pomodoro = await getPomodoro();
  const newRemainingSec =
    pomodoro.sessionType === "focus"
      ? payload.focusTimeMin * 60
      : payload.breakTimeMin * 60;

  const newPomodoro = {
    ...pomodoro,
    ...payload,
    remainingSec: newRemainingSec,
    isRunning: false,
    startTimestamp: null,
  };
  await chrome.alarms.clear(PomodoroAlarm);
  await savePomodoro(newPomodoro);
  return newPomodoro;
};
