import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { User, MapPin, CheckCircle, Package } from "lucide-react";

const AssignTaskModal = ({
  open,
  onClose,
  onConfirm,
  agent,
  taskType,
  area,
  products,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="z-[999]" />

      <DialogContent className="sm:max-w-md z-[1000]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-base">
            تأكيد توزيع مهمة
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            يرجى مراجعة تفاصيل المهمة قبل التأكيد
          </p>

          {/* المندوب */}
          <div className="flex items-center gap-3 bg-muted p-3 rounded-md">
            <User className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium">المندوب</p>
              <p className="text-muted-foreground">
                {agent?.name || "—"}
              </p>
              {agent?.phone && (
                <p className="text-xs text-muted-foreground">
                  {agent.phone}
                </p>
              )}
            </div>
          </div>

          {/* نوع المهمة */}
          <div className="flex items-center gap-3 bg-muted p-3 rounded-md">
            <CheckCircle className="w-5 h-5 text-teal-500" />
            <div>
              <p className="font-medium">نوع المهمة</p>
            <p className="text-muted-foreground">
  {taskType
    ? {
        delivery: "توصيل",
        collection: "تحصيل",
        return: "استرجاع",
        pickup: "استلام",
      }[taskType]
    : "—"}
</p>

            </div>
          </div>

          {/* المنطقة */}
          <div className="flex items-center gap-3 bg-muted p-3 rounded-md">
            <MapPin className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="font-medium">المنطقة</p>
              <p className="text-muted-foreground">
                {area?.properties?.SHYK_ANA_1 || "—"}
              </p>
            </div>
          </div>

          {/* المنتجات */}
          <div className="flex items-start gap-3 bg-muted p-3 rounded-md">
            <Package className="w-5 h-5 text-purple-500 mt-1" />
            <div className="w-full">
              <p className="font-medium mb-1">المنتجات</p>

              {products?.length ? (
                <ul className="space-y-1 text-muted-foreground">
                  {products.map((p) => (
                    <li key={p.id}>
                      • {p.nameAr || p.nameEn}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">لا يوجد منتجات</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-start">
          <Button onClick={onConfirm}>تأكيد</Button>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTaskModal;
