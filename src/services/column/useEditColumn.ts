import { useProjectContext } from "@/context/project/useProjectContext";

export const useEditColumn = () => {
  const { setCols } = useProjectContext();
  const editColumn = (colId: number, title: string) => {
    setCols((prev) => prev.map((c) => (c.id === colId ? { ...c, title } : c)));
  };
  return { editColumn };
};
