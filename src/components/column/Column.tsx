import Task from "../task/Task";
import { CSS } from "@dnd-kit/utilities";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { IColumn } from "@/types/definition";
import { toDndId } from "@/lib/dnd";
import { useDroppable } from "@dnd-kit/core";
import { GripIcon, Trash2Icon } from "lucide-react";
import EditableTypography from "../shared/EditableTypography";
import AddTaskButton from "../task/AddTaskButton";
import { useEditColumn } from "@/services/column/useEditColumn";
import { useDeleteColumn } from "@/services/column/useDeleteColumn";

type ColumnProps = {
  col: IColumn;
};

const Column = ({ col }: ColumnProps) => {
  const { editColumn } = useEditColumn();
  const onEditColumn = (title: string) => editColumn(col.id, title);

  const { deleteColumn } = useDeleteColumn();
  const onDeleteColumn = () => deleteColumn(col.id);

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
      className="w-80 rounded shrink-0 shadow"
    >
      <div
        title={col.title}
        className="p-3 rounded-t line-clamp-1 items-center bg-neutral-700 flex justify-between"
      >
        <div className="flex gap-1 items-center">
          <button
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-neutral-600"
          >
            <GripIcon className="size-4" />
          </button>
          <EditableTypography
            placeholder="Column Title..."
            onChange={onEditColumn}
            className="w-full"
            value={col.title}
            variant="h5"
            type="text"
            withBorder
          />
        </div>
        <Trash2Icon
          onClick={onDeleteColumn}
          className="size-4 hover:cursor-pointer text-neutral-500 hover:text-red-400"
        />
      </div>
      <div
        ref={setDroppableRef}
        className={
          "space-y-4 overflow-y-auto rounded-lg bg-neutral-900 p-3 min-h-24 dutation-300 max-h-[calc(100vh-280px)]"
        }
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
