import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type ProgressCircleProps = {
  value: number;
  total: number;
  size?: number;
  color?: "green" | "blue";
  className?: string;
  children?: ReactNode;
};

const ProgressCircle = ({
  size = 120,
  value,
  total,
  color = "blue",
  children,
  className,
}: ProgressCircleProps) => {
  const angle = (value / total) * 360;

  const ColorValues: Record<string, string> = {
    green: "oklch(62.7% 0.194 149.214/0.8)",
    blue: "oklch(54.6% 0.245 262.881/0.8)",
  };

  const neutral = "oklch(20.5% 0 0)";

  return (
    <div
      className={cn("rounded-full flex justify-center items-center", className)}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${ColorValues[color]} ${angle}deg, ${neutral} ${angle}deg)`,
      }}
    >
      {children}
    </div>
  );
};

export default ProgressCircle;
