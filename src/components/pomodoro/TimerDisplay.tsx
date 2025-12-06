import { usePomodoro } from "@/context/pomodoro/usePomodoro";
import { secToStr, getSessionSecs } from "@/lib/pomodoro";
import ProgressCircle from "../shared/ProgressCircle";
import Typography from "../shared/Typography";
import { cn } from "@/lib/cn";

const TimerDisplay = ({ size = 240 }: { size?: number }) => {
  const { session } = usePomodoro();
  const timeStr = secToStr(session.remainingSec);
  const total = getSessionSecs(session, session.sessionType);

  return (
    <ProgressCircle
      color={session.sessionType === "focus" ? "blue" : "green"}
      size={size}
      total={total}
      value={session.remainingSec}
    >
      <div className="p-1 w-3/4 h-3/4 flex flex-col items-center justify-center gap-1 bg-neutral-800 rounded-full">
        <Typography variant="h4">{timeStr}</Typography>
        <Typography
          variant="h5"
          className={cn(
            !session.isRunning
              ? "text-neutral-400"
              : session.sessionType === "focus"
              ? "text-blue-500"
              : "text-green-500"
          )}
        >
          {!session.isRunning
            ? "Paused"
            : session.sessionType === "focus"
            ? "Focus"
            : "Break"}
        </Typography>
      </div>
    </ProgressCircle>
  );
};

export default TimerDisplay;
