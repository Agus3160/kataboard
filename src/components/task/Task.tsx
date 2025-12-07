import Typography from "../shared/Typography";
import { toDndId } from "@/lib/dnd";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "@/lib/cn";
import { GripIcon, Trash2Icon } from "lucide-react";
import type { ITask } from "@/types/definition";
import EditableTypography from "../shared/EditableTypography";
import { useState } from "react";
import { useEditTaskContent } from "@/services/task/useEditTaskContent";
import { useDeleteTask } from "@/services/task/useDeleteTask";

type TaskProps = {
  task: ITask;
};

const Task = ({ task }: TaskProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const { editTaskConent } = useEditTaskContent();
  const { deleteTask } = useDeleteTask();
  const onEditTaskContent = (val: string) => editTaskConent(val, task.id);
  const onDeleteTask = () => deleteTask(task.id);

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
        "p-2 shadow hover:shadow-md border-2 bg-neutral-800 hover:cursor-pointer hover:border-blue-500/50 rounded",
        isEdit ? "border-blue-500/50" : "border-neutral-600/50",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between text-neutral-500 items-center">
          <button className="hover:cursor-grab" {...listeners}>
            <GripIcon className="size-4" />
          </button>
          <Trash2Icon
            onClick={onDeleteTask}
            className="size-4 hover:cursor-pointer hover:text-red-400"
          />
        </div>
        <div className="flex-1">
          <EditableTypography
            onChange={onEditTaskContent}
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
