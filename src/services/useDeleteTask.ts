import { useProjectContext } from "@/context/useProjectContext";

export const useDeleteTask = () => {
  const { setCols } = useProjectContext();
  const deleteTask = (taskId: number) => {
    setCols((prev) => {
      const copy = structuredClone(prev);
      const col = copy.find((c) => c.tasks.some((t) => t.id === taskId))!;
      const taskIndex = col.tasks.findIndex((t) => t.id === taskId)!;
      col.tasks.splice(taskIndex, 1);
      return copy;
    });
  };
  return { deleteTask };
};
