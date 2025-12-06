import { type ReactNode } from "react";
import Typography from "./Typography";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative bg-neutral-800 rounded p-6 shadow space-y-4 z-10">
        {title && <Typography variant="h3">{title}</Typography>}
        {children}
        <X
          onClick={onClose}
          className="absolute size-4 top-4 right-4 text-neutral-500 hover:text-red-400 hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Modal;
