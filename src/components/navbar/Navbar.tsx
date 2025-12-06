import { TagIcon } from "lucide-react";
import ClearAllButton from "./ClearAllButton";
import Button from "../shared/Button";
import EditableTypography from "../shared/EditableTypography";
import { useProjectContext } from "@/context/project/useProjectContext";
import PomodoroPopover from "../pomodoro/PomodoroPopover";

const Navbar = () => {
  const { title, setTitle } = useProjectContext();
  return (
    <div className="flex flex-col gap-2 px-8 pt-4">
      <EditableTypography
        onChange={setTitle}
        value={title}
        variant="h1"
        type="text"
        withBorder
      />
      <div className="flex justify-end gap-2">
        <PomodoroPopover />
        <Button variant="default" icon={TagIcon}>
          Tags
        </Button>
        <ClearAllButton />
      </div>
    </div>
  );
};

export default Navbar;
