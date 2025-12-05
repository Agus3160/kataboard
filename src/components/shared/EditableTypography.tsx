import { useEditableTyporaphy } from "@/hooks/useEditableTypography";
import type { TypographyProps } from "./Typography";
import Typography from "./Typography";
import Textarea from "./Textarea";
import Input from "./Input";

export type EditableTypographyProps = {
  isEditing?: boolean;
  onEditingChange?: (isEditing: boolean) => void;
  value?: string;
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
  onChange,
  isEditing,
  onEditingChange,
  ...props
}: EditableTypographyProps) => {
  const { isOpen, isEmpty, onOpenEdit, onBlur, onChangeHandler, textareaRef } =
    useEditableTyporaphy({
      value,
      isEditing,
      onChange,
      onEditingChange,
      type,
    });

  if (!isOpen && !isEmpty)
    return (
      <span onDoubleClick={onOpenEdit}>
        <Typography className="p-1" variant={variant} {...props}>
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
      className={className}
      withBorder={withBorder}
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  );
};

export default EditableTypography;
