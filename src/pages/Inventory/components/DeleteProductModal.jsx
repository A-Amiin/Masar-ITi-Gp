import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const DeleteProductModal = ({
  open,
  onClose,
  onConfirm,
  productName,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="z-[999]" />

      <DialogContent
        dir="rtl"
        className="sm:max-w-sm z-[1000] [&>button]:hidden"
      >

        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>


     <DialogHeader className="space-y-1 text-right items-start">

          <DialogTitle className="text-base font-semibold">
            حذف منتج
          </DialogTitle>
        </DialogHeader>

 
     <p className="text-sm text-muted-foreground mt-2">
  هل أنت متأكد من حذف المنتج
</p>

<p className="text-sm font-medium text-foreground mt-1">
  {productName}؟
</p>


        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            حذف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductModal;
