import Typography from "./shared/Typography";
import { toDndId } from "@/lib/dnd";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "@/lib/cn";
import { GripIcon } from "lucide-react";
import type { ITask } from "@/types/definition";
import { useProjectContext } from "@/context/useProjectContext";
import EditableTypography from "./shared/EditableTypography";
import { useState } from "react";

type TaskProps = {
  task: ITask;
};

const Task = ({ task }: TaskProps) => {
  const { setCols } = useProjectContext();
  const [isEdit, setIsEdit] = useState(false);
  const onChangeTaskContent = (val: string) => {
    setCols((prev) => {
      const copy = structuredClone(prev);
      const col = copy.find((c) => c.id === task.colId)!;
      const taskIndex = col.tasks.findIndex((t) => t.id === task.id)!;
      col.tasks[taskIndex].content = val;
      return copy;
    });
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: toDndId(task.id, "task"),
    data: task,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "p-2 shadow hover:shadow-md border-2 bg-neutral-800 hover:cursor-pointer hover:border-blue-500/50 border-neutral-600/50 rounded",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex gap-4">
        {!isEdit && (
          <button className="hover:cursor-grab" {...listeners}>
            <GripIcon className="size-3" />
          </button>
        )}
        <div className="flex-1">
          <EditableTypography
            onChange={onChangeTaskContent}
            onEditingChange={setIsEdit}
            isEditing={isEdit}
            value={task.content}
            className="w-full"
            type="textarea"
            variant="p"
          />
          <Typography variant="small" className="font-bold text-end">
            #{task.id}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Task;
