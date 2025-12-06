import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type PopoverProps = {
  children: ReactNode;
  trigger: ReactNode;
  className?: string;
  open: boolean;
  position?: "top" | "bottom";
  setOpen: (open: boolean) => void;
  closeOnClickOutside?: boolean;
};

const Popover = ({
  children,
  trigger,
  className,
  open,
  setOpen,
  position,
  closeOnClickOutside = false,
}: PopoverProps) => {
  const [internalPosition, setInternalPosition] = useState<"top" | "bottom">(
    "top"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const onOpen = () => {
    if (triggerRef.current && open === true && !position) {
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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickOutside, setOpen]);

  return (
    <div className="relative flex items-center">
      <div ref={triggerRef} onClick={onOpen}>
        {trigger}
      </div>
      {open && (
        <div
          ref={containerRef}
          className={cn(
            "absolute shadow-lg left-1/2 -translate-x-1/2",
            (position || internalPosition) === "top"
              ? "bottom-full mb-2"
              : "top-full mt-2",
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
