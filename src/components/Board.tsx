import Column from "./Column";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Task from "./Task";
import { useBoard } from "@/hooks/useBoard";

const Board = () => {
  const { cols, colIds, activeTask, onDragEnd, onDragOver, onDragStart } =
    useBoard();

  return (
    <DndContext
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
    >
      <SortableContext strategy={horizontalListSortingStrategy} items={colIds}>
        <div className="flex flex-1 gap-4">
          {cols.map((col) => (
            <Column key={col.id} col={col} />
          ))}
        </div>
        {activeTask && (
          <DragOverlay>
            <Task task={activeTask} />
          </DragOverlay>
        )}
      </SortableContext>
    </DndContext>
  );
};

export default Board;
