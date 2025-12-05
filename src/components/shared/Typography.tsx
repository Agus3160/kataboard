import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

const TypographyVariants = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  h4: "text-xl",
  h5: "text-lg",
  p: "text-base",
  small: "text-sm",
};

type TypographyProps = {
  variant?: keyof typeof TypographyVariants;
  className?: string;
  children?: ReactNode;
};

const Typography = ({
  className,
  children,
  variant = "p",
}: TypographyProps) => {
  const Tag = variant?.startsWith("h") ? variant : "p";

  return (
    <Tag className={cn(TypographyVariants[variant], className)}>{children}</Tag>
  );
};

export default Typography;
