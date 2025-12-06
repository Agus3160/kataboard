import Column from "./column/Column";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Task from "./task/Task";
import { useBoard } from "@/hooks/useBoard";
import AddColumn from "./column/AddColumn";

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
        <div className="flex px-8 flex-1 gap-4 h-full overflow-y-visible overflow-x-auto">
          {cols.map((col) => (
            <Column key={col.id} col={col} />
          ))}
          <AddColumn />
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
