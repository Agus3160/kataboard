import { TypographyVariants } from "@/constants/typography.variant";
import { cn } from "@/lib/cn";
import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = {
  variant?: keyof typeof TypographyVariants;
  withBorder?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, withBorder = false, className, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      className={cn(
        "p-1 rounded",
        TypographyVariants[variant || "p"],
        withBorder
          ? "outline-neutral-400/50 bg-neutral-900 outline-2"
          : "outline-none",
        className
      )}
    />
  )
);

export default Input;
