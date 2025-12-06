import ClearAllButton from "./ClearAllButton";
import EditableTypography from "../shared/EditableTypography";
import { useProjectContext } from "@/context/project/useProjectContext";
import PomodoroPopover from "../pomodoro/PomodoroPopover";

const Navbar = () => {
  const { title, setTitle } = useProjectContext();
  return (
    <div className="flex flex-col  gap-2 px-8 pt-8">
      <EditableTypography
        onChange={setTitle}
        textClassName="line-clamp-1"
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
