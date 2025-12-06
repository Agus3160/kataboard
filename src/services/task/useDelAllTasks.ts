import { useProjectContext } from "@/context/useProjectContext";
import { resetIdCounter } from "../idCounter";

export const useDelAllTasks = () => {
  const { setCols } = useProjectContext();
  const delAllTasks = async () => {
    setCols((prev) => prev.map((c) => ({ ...c, tasks: [] })));
    await resetIdCounter("task");
  };
  return { delAllTasks };
};
