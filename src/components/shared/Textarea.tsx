import { TypographyVariants } from "@/constants/typography.variant";
import { cn } from "@/lib/cn";
import { forwardRef, type TextareaHTMLAttributes } from "react";

type TextareaProps = {
  variant?: keyof typeof TypographyVariants;
  withBorder?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant, withBorder = false, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={cn(
          "w-full p-1 rounded resize-none",
          withBorder
            ? "outline-neutral-200 bg-neutral-900 outline-2"
            : "outline-none",
          TypographyVariants[variant || "p"],
          className
        )}
      />
    );
  }
);

export default Textarea;
