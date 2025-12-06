import { PomodoroAlarm } from "@/background/pomodoro/pomodoro.alarm";
import { getPomodoro, savePomodoro } from "../pomodoro.storage";

export const handlePause = async () => {
  const pomodoro = await getPomodoro();
  if (!pomodoro.startTimestamp || !pomodoro.isRunning) return pomodoro;

  const elapsed = Math.floor((Date.now() - pomodoro.startTimestamp) / 1000);
  const newPomodoro = {
    ...pomodoro,
    isRunning: false,
    startTimestamp: null,
    remainingSec: Math.max(pomodoro.remainingSec - elapsed, 0),
  };

  chrome.alarms.clear(PomodoroAlarm);
  await savePomodoro(newPomodoro);

  return newPomodoro;
};
