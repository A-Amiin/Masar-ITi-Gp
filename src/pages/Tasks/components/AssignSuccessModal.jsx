import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";

const AssignSuccessModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="z-[999]" />

      <DialogContent
        className="sm:max-w-sm z-[1000] text-center"
        dir="rtl"
      >
  
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>

        <DialogHeader className="items-center space-y-3">
          <CheckCircle className="w-10 h-10 text-green-500" />
          <DialogTitle className="text-base">
            تم توزيع المهمة بنجاح
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground mt-2">
          تم توزيع مهمة جديدة على أحد المندوبين بنجاح
        </p>

        <DialogFooter className="mt-6 flex justify-center">
          <Button onClick={onClose} className="w-24">
            إغلاق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignSuccessModal;
