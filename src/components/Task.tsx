import Typography from "./shared/Typography";
import { toDndId } from "@/lib/dnd";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { cn } from "@/lib/cn";
import { GripIcon } from "lucide-react";
import type { ITask } from "@/types/definition";

type TaskProps = {
  task: ITask;
};

const Task = ({ task }: TaskProps) => {
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
        "p-2 shadow hover:shadow-md border-2 bg-neutral-800 border-neutral-600/50 rounded",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex gap-4">
        <button className="hover:cursor-grab" {...listeners}>
          <GripIcon className="size-3" />
        </button>
        <div className="flex-1">
          <Typography variant="p">{task.content}</Typography>
          <Typography variant="small" className="font-bold text-end">
            #{task.id}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Task;
