import type { EditableTypographyProps } from "@/components/shared/EditableTypography";
import { useState, useRef, useEffect, type ChangeEvent } from "react";

export const useEditableTyporaphy = ({
  value,
  isEditing,
  onChange,
  onEditingChange,
  type = "text",
}: Pick<
  EditableTypographyProps,
  "value" | "isEditing" | "onEditingChange" | "type" | "onChange"
>) => {
  const isEmpty = value !== undefined && value.trim().length === 0;

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isEditing !== undefined ? isEditing : internalIsOpen;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onOpenEdit = () => {
    if (isEditing === undefined) setInternalIsOpen(true);
    onEditingChange?.(true);
  };

  const onBlur = () => {
    if (!isEmpty && isEditing === undefined) {
      setInternalIsOpen(false);
    }
    onEditingChange?.(false);
  };

  useEffect(() => {
    if (type === "textarea" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value, isOpen, type]);

  const onChangeHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChange?.(e.target.value);
  };

  return { isOpen, isEmpty, onOpenEdit, onBlur, textareaRef, onChangeHandler };
};
