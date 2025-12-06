import { useProjectContext } from "@/context/project/useProjectContext";

export const useEditTaskContent = () => {
  const { setCols } = useProjectContext();
  const editTaskConent = (val: string, taskId: number) => {
    setCols((prev) => {
      const copy = structuredClone(prev);
      const col = copy.find((c) => c.tasks.some((t) => t.id === taskId))!;
      const taskIndex = col.tasks.findIndex((t) => t.id === taskId)!;
      col.tasks[taskIndex].content = val;
      return copy;
    });
  };
  return { editTaskConent };
};
