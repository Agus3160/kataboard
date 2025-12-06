import type { IColumn } from "@/types/definition";

export const SampleColumns: IColumn[] = [
  {
    id: 1,
    title: "Column 1",
    tasks: [
      {
        id: 1,
        colId: 1,
        content:
          "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor",
      },
      { id: 2, colId: 1, content: "Task 2" },
    ],
  },
  {
    id: 2,
    title: "Column 2",
    tasks: [
      { id: 3, colId: 2, content: "Task 3" },
      { id: 4, colId: 2, content: "Task 4" },
    ],
  },
];
export const ProjectTitle = "Sample Project";
export const InitTaskIndex = 4;
export const InitColsIndex = 2;
