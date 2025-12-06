import { useEffect, useRef, useState, type ReactNode } from "react";
import { PomodoroContext, type PomodoroContextType } from "./PomodoroContext";
import { PomodoroMessage, SamplePomodoroSession } from "@/constants/pomodoro";
import { ChromeStorage } from "@/constants/chrome";
import type { IChromeMessage, IPomodoroSession } from "@/types/definition";

export type PomodoroProvider = {
  children: ReactNode;
};

export const PomodoroProvider = ({ children }: PomodoroProvider) => {
  const [session, setSession] = useState<IPomodoroSession>(
    SamplePomodoroSession
  );
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    chrome.storage.local.onChanged.addListener((changes) => {
      if (changes[ChromeStorage.Pomodoro]) {
        const pomodoro = changes[ChromeStorage.Pomodoro].newValue;
        setSession(pomodoro as IPomodoroSession);
      }
    });
  }, []);

  useEffect(() => {
    if (!session || !session.isRunning) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      return;
    }

    if (timerIntervalRef.current || !session) return;

    timerIntervalRef.current = window.setInterval(() => {
      setSession((prev) => ({
        ...prev,
        remainingSec: prev.remainingSec - 1,
      }));
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [session]);

  const start = async () => {
    const message: IChromeMessage = { type: PomodoroMessage.Start };
    await chrome.runtime.sendMessage(message);
  };

  const pause = async () => {
    const message: IChromeMessage = { type: PomodoroMessage.Pause };
    await chrome.runtime.sendMessage(message);
  };

  const reset = async () => {
    const message: IChromeMessage = { type: PomodoroMessage.Reset };
    await chrome.runtime.sendMessage(message);
  };

  const setup = async (focusTimeMin: number, breakTimeMin: number) => {
    const message: IChromeMessage<
      Pick<IPomodoroSession, "focusTimeMin" | "breakTimeMin">
    > = {
      type: PomodoroMessage.Setup,
      payload: { focusTimeMin, breakTimeMin },
    };
    await chrome.runtime.sendMessage(message);
  };

  const value: PomodoroContextType = {
    session,
    setSession,
    reset,
    start,
    pause,
    setup,
  };

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
};
