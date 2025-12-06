export interface ITask {
  id: number;
  colId: number;
  content: string;
}

export interface IColumn {
  id: number;
  title: string;
  tasks: ITask[];
}

export interface IProject {
  title: string;
  cols: IColumn[];
}
