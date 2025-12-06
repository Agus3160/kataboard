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
        <div className="flex w-72 flex-col gap-4">
          <Typography variant="small" className="text-neutral-500">
            Are you sure you want to clear all tasks from all columns? This
            action cannot be undone and the counter will be reset.
          </Typography>
          <div className="flex justify-end">
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
