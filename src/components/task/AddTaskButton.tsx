import { PlusIcon } from "lucide-react";
import Button from "../shared/Button";
import Textarea from "../shared/Textarea";
import { useAddTask } from "@/services/task/useAddTask";
import { useCallback, useState, type ChangeEvent } from "react";
import type { IColumn } from "@/types/definition";
import Popover from "../shared/Popover";
import { isEnter } from "@/lib/keyboard";
import type { KeyboardEvent } from "react";

type AddTaskButtonProps = {
  col: IColumn;
};

const AddTaskButton = ({ col }: AddTaskButtonProps) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { addTask } = useAddTask();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isEnter(e)) {
      onSubmit();
      setOpen(false);
    }
  };

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      if (content.trim().length === 0) return;
      await addTask(content, col.id);
      setContent("");
    } finally {
      setIsLoading(false);
    }
  }, [addTask, col.id, content]);

  return (
    <Popover
      trigger={
        <Button
          className="w-full justify-center"
          variant="ghost"
          icon={PlusIcon}
        />
      }
      open={open || isLoading}
      afterClose={onSubmit}
      setOpen={setOpen}
      closeOnClickOutside
      autoPosition
    >
      <div className="w-64">
        <Textarea
          withBorder
          variant="p"
          value={content}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="w-full h-32"
          placeholder="Please enter your task's content and add it..."
        />
      </div>
    </Popover>
  );
};

export default AddTaskButton;
