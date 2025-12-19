import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddProductModal from "./Modal/AddProductModal";

const InventoryHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">المخزون</h1>

        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة منتج
        </Button>
      </div>

      <AddProductModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default InventoryHeader;
