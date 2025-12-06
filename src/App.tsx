import { useProjectContext } from "./context/useProjectContext";
import Board from "./components/Board";
import EditableTypography from "./components/shared/EditableTypography";
import Button from "./components/shared/Button";
import { TagIcon, Trash2 } from "lucide-react";

function App() {
  const { title, setTitle } = useProjectContext();
  return (
    <div className="p-8 flex flex-col gap-6 h-screen custom-scroll">
      <div className="space-y-2">
        <EditableTypography
          onChange={setTitle}
          className="w-full"
          value={title}
          variant="h1"
          type="text"
          withBorder
        />
        <div className="flex justify-end gap-2">
          <Button variant="default" icon={TagIcon}>
            Tags
          </Button>
          <Button variant="danger" icon={Trash2}>
            Clear All
          </Button>
        </div>
      </div>
      <Board />
    </div>
  );
}

export default App;
