import { PomodoroAlarm } from "@/background/pomodoro/pomodoro.alarm";
import { getPomodoro, savePomodoro } from "../pomodoro.storage";

export const handleStart = async () => {
  const pomodoro = await getPomodoro();
  const newPomodoro = {
    ...pomodoro,
    isRunning: true,
    startTimestamp: Date.now(),
  };
  await savePomodoro(newPomodoro);

  const duration = newPomodoro.remainingSec;
  const when = Date.now() + duration * 1000;

  await chrome.alarms.create(PomodoroAlarm, { when });
  return newPomodoro;
};
