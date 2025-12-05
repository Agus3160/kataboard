import { useProjectContext } from "@/context/useProjectContext";
import { parseDndId, toDndId } from "@/lib/dnd";
import type { ITask } from "@/types/definition";
import type { DragStartEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";

export const useBoard = () => {
  const { cols, setCols } = useProjectContext();
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const colIds = useMemo(() => cols.map((c) => toDndId(c.id, "col")), [cols]);

  const onDragStart = (event: DragStartEvent) => {
    const [_, type] = parseDndId(event.active.id);
    if (type !== "task") return;
    const task = event.active.data.current! as ITask;
    setActiveTask(task);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { over, active } = event;
    if (!over) return;

    const [activeId, activeType] = parseDndId(active.id);
    const [overId, overType] = parseDndId(over.id);

    if (activeType === "col" && overType === "col") {
      const activeColIndex = cols.findIndex((c) => c.id === activeId);
      const overColIndex = cols.findIndex((c) => c.id === overId);
      setCols((prev) => arrayMove(prev, activeColIndex, overColIndex));
    } else if (activeType === "task") {
      if (!activeTask) return;

      setCols((prev) => {
        const newCols = structuredClone(prev);
        const fromCol = newCols.find((c) =>
          c.tasks.some((t) => t.id === activeTask.id)
        );

        if (!fromCol) return prev;
        const fromIndex = fromCol.tasks.findIndex(
          (t) => t.id === activeTask.id
        );
        const task = fromCol.tasks[fromIndex];

        if (overType === "task") {
          const toTask = over.data.current as ITask;
          const toCol = newCols.find((c) => c.id === toTask.colId)!;
          const toIndex = toCol.tasks.findIndex((t) => t.id === toTask.id);

          if (toCol.id === fromCol.id) {
            fromCol.tasks.splice(fromIndex, 1);
            fromCol.tasks.splice(toIndex, 0, task);
            return newCols;
          }

          fromCol.tasks.splice(fromIndex, 1);
          toCol.tasks.splice(toIndex, 0, task);
          task.colId = toCol.id;
          return newCols;
        }

        if (overType === "taskContainer") {
          const toCol = newCols.find((c) => c.id === overId);
          if (!toCol) return prev;
          if (toCol.id === fromCol.id) return prev;
          fromCol.tasks.splice(fromIndex, 1);
          toCol.tasks.push(task);
          task.colId = toCol.id;
          return newCols;
        }

        return prev;
      });
    }
  };

  const onDragEnd = () => {
    if (!activeTask) return;
    else setActiveTask(null);
  };

  return {
    onDragStart,
    onDragOver,
    onDragEnd,
    activeTask,
    cols,
    colIds,
  };
};
