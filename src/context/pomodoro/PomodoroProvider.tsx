import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  PomodoroContext,
  type PomodoroContextType,
  type PomodoroSession,
} from "./PomodoroContext";
import { SamplePomodoroSession } from "@/constants/pomodoro";
import { ChromeStorage } from "@/constants/chrome";
import { calcElapsed, getSessionSecs } from "@/lib/pomodoro";

export type PomodoroProvider = {
  children: ReactNode;
};

export const PomodoroProvider = ({ children }: PomodoroProvider) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<PomodoroSession>(
    SamplePomodoroSession
  );

  const sessionRef = useRef<PomodoroSession>(session);
  const saveTimeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const updateTimer = () => {
    setSession((session) => {
      const newRemain = session.remainingSec - 1;
      const currentType = session.sessionType;
      if (newRemain <= 0) {
        const sessionType = currentType === "focus" ? "break" : "focus";
        const remainingSec = getSessionSecs(session, sessionType);
        return {
          ...session,
          sessionType,
          remainingSec,
          startTimestamp: Date.now(),
        };
      }
      return { ...session, remainingSec: newRemain };
    });
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const result = await chrome.storage.local.get(ChromeStorage.Pomodoro);
        const pomodoro = result[ChromeStorage.Pomodoro] as PomodoroSession;

        if (!pomodoro) {
          setSession(SamplePomodoroSession);
          return;
        }

        if (pomodoro.isRunning && pomodoro.startTimestamp) {
          const elapsedMs = calcElapsed(pomodoro.startTimestamp);
          const elapsed = Math.floor(elapsedMs / 1000);
          const remainingSec = pomodoro.remainingSec - elapsed;

          if (remainingSec <= 0) {
            let rest = -remainingSec;
            let currentType: PomodoroSession["sessionType"] =
              pomodoro.sessionType === "focus" ? "break" : "focus";

            while (rest >= getSessionSecs(pomodoro, currentType)) {
              rest -= getSessionSecs(pomodoro, currentType);
              currentType = currentType === "focus" ? "break" : "focus";
            }

            const secsOfCurrent = getSessionSecs(pomodoro, currentType);
            const newRemaining = secsOfCurrent - rest;
            const newStartTimestamp = Date.now() - rest * 1000;

            setSession({
              ...pomodoro,
              sessionType: currentType,
              remainingSec: newRemaining,
              startTimestamp: newStartTimestamp,
            });
          } else {
            setSession({ ...pomodoro, remainingSec });
          }
        } else {
          setSession({ ...pomodoro });
        }
      } catch {
        console.error("Failed to load pomodoro session");
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (saveTimeoutRef.current) return;
    saveTimeoutRef.current = window.setTimeout(() => {
      chrome.storage.local
        .set({ [ChromeStorage.Pomodoro]: session })
        .catch(() => {
          console.error("Failed to save pomodoro session");
        });
    }, 500);
    return () => {
      if (!saveTimeoutRef.current) return;
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    };
  }, [session]);

  useEffect(() => {
    if (intervalRef.current) return;
    intervalRef.current = window.setInterval(() => {
      const session = sessionRef.current;
      if (!session.isRunning) return;
      updateTimer();
    }, 1000);
    return () => {
      if (!intervalRef.current) return;
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    };
  }, []);

  const reset = () =>
    setSession((prev) => ({
      ...prev,
      isRunning: false,
      sessionType: "focus",
      startTimestamp: null,
      remainingSec: prev.focusTimeMin * 60,
    }));

  const start = () =>
    setSession((session) => ({
      ...session,
      isRunning: true,
      startTimestamp: Date.now(),
    }));

  const pause = () =>
    setSession((session) => ({
      ...session,
      isRunning: false,
      startTimestamp: null,
    }));

  const setSessionSafe = (session: PomodoroSession) => {
    try {
      setSession({
        ...session,
        isRunning: false,
        startTimestamp: null,
        sessionType: "focus",
        remainingSec: session.focusTimeMin * 60,
      });
    } catch {
      console.error("Failed to set pomodoro session");
    }
  };

  const value: PomodoroContextType = {
    session,
    setSession: setSessionSafe,
    reset,
    start,
    pause,
    isLoading,
  };

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
};
