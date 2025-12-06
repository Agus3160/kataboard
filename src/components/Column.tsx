import Task from "./task/Task";
import { CSS } from "@dnd-kit/utilities";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { IColumn } from "@/types/definition";
import { toDndId } from "@/lib/dnd";
import { useDroppable } from "@dnd-kit/core";
import { GripIcon } from "lucide-react";
import EditableTypography from "./shared/EditableTypography";
import { useProjectContext } from "@/context/useProjectContext";
import AddTaskButton from "./task/AddTaskButton";

type ColumnProps = {
  col: IColumn;
};

const Column = ({ col }: ColumnProps) => {
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: toDndId(col.id, "taskContainer"),
  });

  const { setCols } = useProjectContext();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: toDndId(col.id, "col") });

  const onChange = (val: string) => {
    setCols((prev) =>
      prev.map((c) => (c.id === col.id ? { ...c, title: val } : c))
    );
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-85 rounded bg-background shadow"
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
        <EditableTypography
          placeholder="Column Title..."
          className="w-full"
          onChange={onChange}
          value={col.title}
          variant="h5"
          type="text"
          withBorder
        />
      </div>
      <div
        ref={setDroppableRef}
        className={"space-y-4 overflow-y-auto bg-neutral-900 p-3 min-h-24 dutation-300 max-h-[calc(100vh-280px)]"}
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
        <AddTaskButton col={col} />
      </div>
    </div>
  );
};

export default Column;
