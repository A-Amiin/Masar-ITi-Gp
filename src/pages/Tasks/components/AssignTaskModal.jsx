import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { User, MapPin, CheckCircle } from "lucide-react";

const AssignTaskModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>

      <DialogOverlay className="z-[999]" />

      <DialogContent
        className="sm:max-w-md z-[1000]"
        dir="rtl"
      >

        <DialogHeader>
          <DialogTitle className="text-base">
            تأكيد توزيع مهمة
          </DialogTitle>
        </DialogHeader>

   
        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            يرجى مراجعة تفاصيل المهمة قبل التأكيد
          </p>


          <div className="flex items-center gap-3 bg-muted p-3 rounded-md">
            <User className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium">المندوب</p>
              <p className="text-muted-foreground">محمد حسن</p>
              <p className="text-xs text-muted-foreground">
                +20 100 123 4567
              </p>
            </div>
          </div>


          <div className="flex items-center gap-3 bg-muted p-3 rounded-md">
            <CheckCircle className="w-5 h-5 text-teal-500" />
            <div>
              <p className="font-medium">نوع المهمة</p>
              <p className="text-muted-foreground">توصيل</p>
            </div>
          </div>


          <div className="flex items-center gap-3 bg-muted p-3 rounded-md">
            <MapPin className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="font-medium">الموقع</p>
              <p className="text-muted-foreground">
                28.1244 , 31.8893
              </p>
              <p className="text-xs text-muted-foreground">
                المنطقة 3
              </p>
            </div>
          </div>
        </div>


        <DialogFooter className="flex gap-2 sm:justify-start">
          <Button onClick={onConfirm}>
            تأكيد
          </Button>

          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTaskModal;
