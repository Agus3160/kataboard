import { usePomodoro } from "@/context/pomodoro/usePomodoro";
import Input from "../shared/Input";
import Typography from "../shared/Typography";
import type { ChangeEvent } from "react";

const TimerSettings = () => {
  const { session, setSession } = usePomodoro();

  const onChangeFocus = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const value = parseInt(val);
    if (value < 1 || isNaN(value)) return;
    setSession({ ...session, focusTimeMin: value });
  };

  const onChangeBreak = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const value = parseInt(val);
    if (value < 1 || isNaN(value)) return;
    setSession({ ...session, breakTimeMin: value });
  };

  return (
    <div className="flex gap-4">
      <div className="space-y-1">
        <Typography variant="small">Focus Time (Min)</Typography>
        <Input
          min={1}
          withBorder
          type="number"
          className="w-full"
          onChange={onChangeFocus}
          placeholder="Focus Time..."
          value={session.focusTimeMin}
        />
      </div>
      <div className="space-y-1">
        <Typography variant="small">Break Time (Min)</Typography>
        <Input
          min={1}
          withBorder
          type="number"
          className="w-full"
          onChange={onChangeBreak}
          placeholder="Break Time..."
          value={session.breakTimeMin}
        />
      </div>
    </div>
  );
};

export default TimerSettings;
