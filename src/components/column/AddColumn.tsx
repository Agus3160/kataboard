import { PlusIcon } from "lucide-react";
import Typography from "../shared/Typography";
import { useAddColumn } from "@/services/column/useAddColumn";

const AddColumn = () => {
  const { addColumn } = useAddColumn();
  const onSubmit = async () => await addColumn();

  return (
    <button
      onClick={onSubmit}
      title={"Add a new Column"}
      className="line-clamp-1 w-80 shrink-0 border-2 duration-300 hover:cursor-pointer hover:border-neutral-400/80 text-neutral-400/50 hover:text-neutral-400/80 border-dashed border-neutral-400/50 items-center justify-center flex gap-1 rounded p-3 h-min"
    >
      <PlusIcon className="size-5" />
      <Typography className="w-full" variant="h5">
        Add a new Column
      </Typography>
    </button>
  );
};

export default AddColumn;
