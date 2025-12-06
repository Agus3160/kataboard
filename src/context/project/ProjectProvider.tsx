import { useState, useEffect, type ReactNode } from "react";
import { ProjectContext } from "./ProjectContex";
import type { IColumn, IProject } from "@/types/definition";
import {
  InitColsIndex,
  InitTaskIndex,
  ProjectTitle,
  SampleColumns,
} from "@/constants/sample-board";
import { ChromeStorage } from "@/constants/chrome";

export type ProjectProviderType = {
  children: ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("Project");
  const [cols, setCols] = useState<IColumn[]>([]);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const result = await chrome.storage.local.get([ChromeStorage.Project]);
      const project = result[ChromeStorage.Project];

      if (project) {
        const { title, cols } = project as IProject;
        setTitle(title);
        setCols(cols);
      } else {
        setTitle(ProjectTitle);
        setCols(SampleColumns);
        chrome.storage.local.set({
          [ChromeStorage.Project]: { title: ProjectTitle, cols: SampleColumns },
        });
        chrome.storage.local.set({ [ChromeStorage.TasksId]: InitTaskIndex });
        chrome.storage.local.set({ [ChromeStorage.ClosId]: InitColsIndex });
      }

      setIsLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ project: { title, cols } });
  }, [title, cols]);

  return (
    <ProjectContext.Provider
      value={{ title, setTitle, cols, setCols, isLoading }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
