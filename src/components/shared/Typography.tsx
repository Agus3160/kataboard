import { TypographyVariants } from "@/constants/typography.variant";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TypographyProps = {
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
