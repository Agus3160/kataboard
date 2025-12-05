import Task from "./Task";
import Typography from "./shared/Typography";
import { CSS } from "@dnd-kit/utilities";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { IColumn } from "@/types/definition";
import { toDndId } from "@/lib/dnd";
import { useDroppable } from "@dnd-kit/core";
import Button from "./shared/Button";
import { GripIcon, PlusIcon } from "lucide-react";

type ColumnProps = {
  col: IColumn;
};

const Column = ({ col }: ColumnProps) => {
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: toDndId(col.id, "taskContainer"),
  });
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: toDndId(col.id, "col") });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-76 rounded bg-background shadow"
    >
      <div
        title={col.title}
        className="line-clamp-1 bg-neutral-700 flex gap-1 rounded-t p-3"
      >
        <button
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-neutral-600"
        >
          <GripIcon className="size-4" />
        </button>
        <Typography variant="h5">{col.title}</Typography>
      </div>
      <div
        ref={setDroppableRef}
        className={"space-y-4 bg-neutral-900 p-4 min-h-24 dutation-300"}
      >
        <SortableContext
          items={col.tasks}
          strategy={verticalListSortingStrategy}
        >
          {col.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
      <div className="p-2 flex justify-center bg-neutral-900 rounded-b">
        <Button icon={PlusIcon} />
      </div>
    </div>
  );
};

export default Column;
