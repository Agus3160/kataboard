import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type PopoverProps = {
  children: ReactNode;
  trigger: ReactNode;
  className?: string;
  open: boolean;
  afterClose?: () => void;
  setOpen: (open: boolean) => void;
  closeOnClickOutside?: boolean;
  autoPosition?: boolean;
};

const Popover = ({
  children,
  trigger,
  className,
  open,
  setOpen,
  afterClose,
  closeOnClickOutside = false,
  autoPosition = false,
}: PopoverProps) => {
  const [internalPosition, setInternalPosition] = useState<"top" | "bottom">(
    "top"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const onOpen = () => {
    if (triggerRef.current && autoPosition) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;

      setInternalPosition(spaceAbove > spaceBelow ? "top" : "bottom");
    }

    setOpen(!open);
  };

  useEffect(() => {
    if (!closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        afterClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [afterClose, closeOnClickOutside, setOpen]);

  return (
    <div className="relative flex items-center">
      <span className="w-full" ref={triggerRef} onClick={onOpen}>
        {trigger}
      </span>

      {open && (
        <div
          ref={containerRef}
          className={cn(
            "absolute shadow-lg z-9999",
            autoPosition && internalPosition === "top"
              ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
              : "top-full mt-2 left-1/2 -translate-x-1/2",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
