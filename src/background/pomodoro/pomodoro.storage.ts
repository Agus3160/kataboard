import { ChromeStorage } from "@/constants/chrome";
import { SamplePomodoroSession } from "@/constants/pomodoro";
import type { IPomodoroSession } from "@/types/definition";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    [ChromeStorage.Pomodoro]: SamplePomodoroSession,
  });
});

export const getPomodoro = async (): Promise<IPomodoroSession> => {
  const data = await chrome.storage.local.get([ChromeStorage.Pomodoro]);
  return (
    (data[ChromeStorage.Pomodoro] as IPomodoroSession) || SamplePomodoroSession
  );
};

export const savePomodoro = async (session: IPomodoroSession): Promise<void> =>
  await chrome.storage.local.set({ [ChromeStorage.Pomodoro]: session });
