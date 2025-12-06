import { useProjectContext } from "@/context/useProjectContext";

export const useDeleteColumn = () => {
  const { setCols } = useProjectContext();
  const deleteColumn = async (colId: number) => {
    setCols((prev) => prev.filter((c) => c.id !== colId));
  };
  return { deleteColumn };
};
