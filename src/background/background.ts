import { POMODORO_MESSAGE_TYPES } from "@/lib/pomodoro";
import type { ChormeMessage } from "@/types/definition";

chrome.action.onClicked.addListener(() => {
  const url = chrome.runtime.getURL("index.html");
  chrome.tabs.create({ url });
});

chrome.runtime.onMessage.addListener((message: ChormeMessage<unknown>) => {
  if (message.type === POMODORO_MESSAGE_TYPES.NotifyChangeCycle) {
    chrome.notifications.create(
      message.payload as chrome.notifications.NotificationCreateOptions
    );
  }
});
