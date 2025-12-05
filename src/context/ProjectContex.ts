import type { IColumn } from "@/types/definition";
import { createContext, type Dispatch, type SetStateAction } from "react";

export type ProjectContextType = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;

  cols: IColumn[];
  setCols: Dispatch<SetStateAction<IColumn[]>>;
};

export const ProjectContext = createContext<ProjectContextType | null>(null);
