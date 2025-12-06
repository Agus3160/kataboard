import { ChromeStorage } from "@/constants/chrome";

export const idCounter = async (type: "task" | "column") => {
  const key = type === "task" ? ChromeStorage.TasksId : ChromeStorage.ClosId;
  const result = await chrome.storage.local.get([key]);
  const id = ((result[key] as number) ?? 0) + 1;
  chrome.storage.local.set({ [key]: id });
  return id;
};

export const resetIdCounter = async (type: "task" | "column", val = 0) => {
  const key = type === "task" ? ChromeStorage.TasksId : ChromeStorage.ClosId;
  chrome.storage.local.set({ [key]: val });
};
