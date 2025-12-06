import ClearAllButton from "./ClearAllButton";
import EditableTypography from "../shared/EditableTypography";
import { useProjectContext } from "@/context/project/useProjectContext";
import PomodoroPopover from "../pomodoro/PomodoroPopover";

const Navbar = () => {
  const { title, setTitle } = useProjectContext();
  return (
    <div className="flex justify-between items-center gap-4 p-6">
      <EditableTypography
        onChange={setTitle}
        textClassName="line-clamp-1"
        className="w-full"
        value={title}
        variant="h1"
        type="text"
        withBorder
      />
      <div className="flex justify-end gap-2">
        <PomodoroPopover />
        <ClearAllButton />
      </div>
    </div>
  );
};

export default Navbar;
