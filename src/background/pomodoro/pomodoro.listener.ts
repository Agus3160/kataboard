import { PomodoroMessage } from "@/constants/pomodoro";
import { handlePause } from "./handler/pomodoro-pause.handler";
import { handleReset } from "./handler/pomodoro-reset.handler";
import { handleStart } from "./handler/pomodoro-start.handler";
import { handleSetup } from "./handler/pomodoro.setup..handler";
import { PomodoroAlarm } from "./pomodoro.alarm";
import { handleAlarm } from "./handler/pomodoro-alarm.handler";

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.type === PomodoroMessage.Start) handleStart().then(sendResponse);
  if (msg.type === PomodoroMessage.Pause) handlePause().then(sendResponse);
  if (msg.type === PomodoroMessage.Reset) handleReset().then(sendResponse);
  if (msg.type === PomodoroMessage.Setup)
    handleSetup(msg.payload).then(sendResponse);
  return true;
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === PomodoroAlarm) handleAlarm().then();
});
