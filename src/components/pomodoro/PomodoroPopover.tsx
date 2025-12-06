import { TimerIcon, X } from "lucide-react";
import Button from "../shared/Button";
import TimerDisplay from "./TimerDisplay";
import TimerSettings from "./TimerSettings";
import TimerControls from "./TimerControls";
import Popover from "../shared/Popover";
import { useState } from "react";

const PomodoroPopover = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  return (
    <Popover
      open={open}
      setOpen={setOpen}
      className="top-full left-1/2 -translate-x-3/4"
      trigger={<Button variant="secondary" icon={TimerIcon} />}
    >
      <div className="flex relative p-6 bg-neutral-800 rounded w-72 flex-col gap-4 justify-center items-center">
        <TimerDisplay size={200} />
        <TimerControls />
        <TimerSettings />
        <X
          onClick={onClose}
          className="absolute size-4 top-4 right-4 text-neutral-500 hover:text-red-400 hover:cursor-pointer"
        />
      </div>
    </Popover>
  );
};

export default PomodoroPopover;
