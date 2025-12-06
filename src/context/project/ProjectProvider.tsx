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
  const [title, setTitle] = useState<string>(ProjectTitle);
  const [cols, setCols] = useState<IColumn[]>(SampleColumns);

  // Inicialización desde storage
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);

      try {
        const result = await chrome.storage.local.get([
          ChromeStorage.Project,
          ChromeStorage.TasksId,
          ChromeStorage.ColsId,
        ]);

        const project = result[ChromeStorage.Project] as IProject | undefined;

        if (project) {
          setTitle(project.title || ProjectTitle);
          setCols(project.cols || SampleColumns);
        } else {
          await chrome.storage.local.set({
            [ChromeStorage.Project]: { title: ProjectTitle, cols: SampleColumns },
            [ChromeStorage.TasksId]: InitTaskIndex,
            [ChromeStorage.ColsId]: InitColsIndex,
          });
          setTitle(ProjectTitle);
          setCols(SampleColumns);
        }
      } catch (error) {
        console.error("Failed to initialize project from storage:", error);
        setTitle(ProjectTitle);
        setCols(SampleColumns);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await chrome.storage.local.set({
          [ChromeStorage.Project]: { title, cols },
        });
      } catch (error) {
        console.error("Failed to save project to storage:", error);
      }
    };

    save();
  }, [title, cols]);

  return (
    <ProjectContext.Provider value={{ title, setTitle, cols, setCols, isLoading }}>
      {children}
    </ProjectContext.Provider>
  );
};
