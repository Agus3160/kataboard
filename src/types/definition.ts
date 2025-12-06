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

type MessageWithoutPayload = {
  type: string;
};

type MessageWithPayload<T> = {
  type: string;
  payload: T;
};

export type IChromeMessage<T = void> =
  | MessageWithoutPayload
  | MessageWithPayload<T>;

export interface IPomodoroSession {
  focusTimeMin: number;
  breakTimeMin: number;
  remainingSec: number;
  isRunning: boolean;
  sessionType: "focus" | "break";
  startTimestamp: number | null;
}
