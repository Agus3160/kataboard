import { useProjectContext } from "@/context/project/useProjectContext";

import { idCounter } from "../idCounter";

export const useAddTask = () => {
  const { setCols } = useProjectContext();
  const addTask = async (content: string, colId: number) => {
    const id = await idCounter("task");
    setCols((prev) => {
      const copy = structuredClone(prev);
      const col = copy.find((c) => c.id === colId)!;
      col.tasks.push({ id, colId, content });
      return copy;
    });
  };
  return { addTask };
};
