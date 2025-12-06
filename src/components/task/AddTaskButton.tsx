import { PlusIcon } from "lucide-react";
import Button from "../shared/Button";
import Textarea from "../shared/Textarea";
import { useAddTask } from "@/services/task/useAddTask";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import type { IColumn } from "@/types/definition";
import { cn } from "@/lib/cn";

type AddTaskButtonProps = {
  col: IColumn;
};

const AddTaskButton = ({ col }: AddTaskButtonProps) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("top");

  const { addTask } = useAddTask();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    if (content.trim().length === 0) return;
    await addTask(content, col.id);
    setContent("");
    setIsLoading(false);
  }, [addTask, col.id, content]);

  const onOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceAbove < spaceBelow) setPosition("bottom");
      else setPosition("top");
    }
    setOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (content.trim().length > 0) await onSubmit();
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [content, onSubmit]);

  return (
    <div className="relative flex gap-2 items-center">
      <Button
        ref={buttonRef}
        onClick={onOpen}
        variant="default"
        icon={PlusIcon}
      />

      {(open || isLoading) && (
        <div
          ref={containerRef}
          className={cn(
            "absolute w-64 shadow-lg left-1/2 -translate-x-1/2",
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          <Textarea
            withBorder
            variant="p"
            value={content}
            onChange={onChange}
            className="w-full h-32"
            placeholder="Please enter your task's content and add it..."
          />
        </div>
      )}
    </div>
  );
};

export default AddTaskButton;
