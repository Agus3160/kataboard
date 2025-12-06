import { useProjectContext } from "@/context/useProjectContext";
import { idCounter } from "../idCounter";

export const useAddColumn = () => {
  const { setCols } = useProjectContext();
  const addColumn = async () => {
    const id = await idCounter("column");
    setCols((prev) => [...prev, { id, title: "New Column", tasks: [] }]);
  };
  return { addColumn };
};
