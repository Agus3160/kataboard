import { forwardRef, type ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { ButtonVariants } from "@/constants/button.variant";

type ButtonProps = {
  icon?: LucideIcon;
  variant?: keyof typeof ButtonVariants;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon: Icon, variant = "default", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex gap-1.5 hover:cursor-pointer active:scale-90 duration-300",
        children ? "px-3 py-2 items-center text-base" : "p-2",
        ButtonVariants[variant],
        className
      )}
      {...props}
    >
      {Icon && <Icon className={"size-5"} />}
      {children}
    </button>
  )
);
export default Button;
