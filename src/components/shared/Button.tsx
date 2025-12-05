import { type ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  icon?: LucideIcon;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ icon: Icon, className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex gap-2 hover:cursor-pointer active:scale-95 bg-neutral-600 rounded hover:bg-neutral-700 duration-300",
        children ? "px-1 py-2 items-center" : "p-1.5",
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
