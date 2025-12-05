import { type ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { ButtonVariants } from "@/constants/button.variant";

type ButtonProps = {
  icon?: LucideIcon;
  variant?: keyof typeof ButtonVariants;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  icon: Icon,
  className,
  children,
  variant = "default",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex gap-1.5 hover:cursor-pointer active:scale-90 duration-300",
        children ? "px-2 py-1 items-center" : "p-1.5",
        ButtonVariants[variant],
        className
      )}
      {...props}
    >
      {Icon && <Icon className={"size-4"} />}
      {children}
    </button>
  );
};

export default Button;
