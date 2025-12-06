import { Trash2Icon } from "lucide-react";
import Button from "../shared/Button";
import { useDelAllTasks } from "@/services/task/useDelAllTasks";
import Modal from "../shared/Modal";
import { useState } from "react";
import Typography from "../shared/Typography";

const ClearAllButton = () => {
  const [open, setOpen] = useState(false);
  const { delAllTasks } = useDelAllTasks();

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);
  const onSubmit = () => {
    delAllTasks();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} variant="danger" icon={Trash2Icon} />
      <Modal isOpen={open} onClose={onClose} title="Clear All Tasks?">
        <div className="flex flex-col max-w-[420px] gap-6">
          <Typography>
            Are you sure you want to clear all tasks from all columns? This
            action cannot be undone and the counter will be reset.
          </Typography>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onSubmit}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ClearAllButton;
