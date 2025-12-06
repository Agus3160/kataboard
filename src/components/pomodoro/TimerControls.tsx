import { PauseIcon, PlayIcon, TimerResetIcon } from "lucide-react";
import { usePomodoro } from "@/context/pomodoro/usePomodoro";
import Button from "../shared/Button";

const TimerControls = () => {
  const { session, start, pause, reset } = usePomodoro();
  return (
    <div className="flex gap-4">
      {session.isRunning ? (
        <Button
          onClick={pause}
          title="Pause Timer"
          variant="default"
          icon={PauseIcon}
        />
      ) : (
        <Button
          onClick={start}
          title="Start Timer"
          variant="default"
          icon={PlayIcon}
        />
      )}
      <Button
        title="Reset Timer"
        onClick={reset}
        variant="secondary"
        icon={TimerResetIcon}
      />
    </div>
  );
};

export default TimerControls;
