import { useEditableTyporaphy } from "@/hooks/useEditableTypography";
import type { TypographyProps } from "./Typography";
import Typography from "./Typography";
import Textarea from "./Textarea";
import Input from "./Input";
import { cn } from "@/lib/cn";

export type EditableTypographyProps = {
  isEditing?: boolean;
  onEditingChange?: (isEditing: boolean) => void;
  value?: string;
  textClassName?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  type?: "text" | "textarea";
  withBorder?: boolean;
} & Omit<TypographyProps, "children">;

const EditableTypography = ({
  className,
  placeholder,
  value,
  withBorder = false,
  type = "text",
  variant = "p",
  textClassName,
  onChange,
  isEditing,
  onEditingChange,
  ...props
}: EditableTypographyProps) => {
  const {
    isOpen,
    isEmpty,
    textareaRef,
    onBlur,
    onKeyDown,
    onOpenEdit,
    onChangeHandler,
  } = useEditableTyporaphy({
    type,
    value,
    isEditing,
    onChange,
    onEditingChange,
  });

  if (!isOpen && !isEmpty)
    return (
      <span onDoubleClick={onOpenEdit}>
        <Typography
          className={cn("p-1", textClassName)}
          variant={variant}
          {...props}
        >
          {value}
        </Typography>
      </span>
    );

  return type === "text" ? (
    <Input
      autoFocus
      value={value}
      onBlur={onBlur}
      variant={variant}
      className={className}
      onKeyDown={onKeyDown}
      withBorder={withBorder}
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  ) : (
    <Textarea
      autoFocus
      value={value}
      onBlur={onBlur}
      ref={textareaRef}
      variant={variant}
      onKeyDown={onKeyDown}
      className={className}
      withBorder={withBorder}
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  );
};

export default EditableTypography;
