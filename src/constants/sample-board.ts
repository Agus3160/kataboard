import type { IColumn } from "@/types/definition";

export const SampleColumns: IColumn[] = [
  {
    id: 1,
    title: "😿 Todo",
    tasks: [
      {
        id: 1,
        colId: 1,
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sem ipsum, tempus id nisi eu, mattis dignissim lectus. Praesent volutpat nisl vitae pellentesque dictum. Cras id pretium eros.",
      },
      {
        id: 2,
        colId: 1,
        content:
          "Praesent vulputate malesuada nulla, vel pulvinar ante dapibus et. Vivamus sed lorem libero. Nulla elit felis, maximus vitae consequat vitae, placerat vel orci. Quisque tincidunt, lectus a faucibus sodales, ante est maximus urna, commodo accumsan ipsum lectus eu turpis",
      },
    ],
  },
  {
    id: 2,
    title: "😼 In Progress",
    tasks: [
      { id: 3, colId: 2, content: "Pellentesque lacinia dictum dolor, at venenatis odio accumsan sit amet. Nulla fermentum, enim aliquam vehicula interdum, ex tellus luctus ex, posuere vulputate odio quam ut elit. Integer elementum fringilla magna, sed varius metus interdum quis." },
      { id: 4, colId: 2, content: "Vestibulum purus nunc, sagittis sed sodales ac, gravida vel libero" },
    ],
  },
    {
    id: 3,
    title: "😸 Done",
    tasks: [
      { id: 5, colId: 3, content: "Posuere vulputate odio quam ut elit. Integer elementum fringilla magna, sed varius metus interdum quis." },
    ],
  },
];
export const ProjectTitle = "🐱✨ KataBoard";
export const InitTaskIndex = 5;
export const InitColsIndex = 3;
