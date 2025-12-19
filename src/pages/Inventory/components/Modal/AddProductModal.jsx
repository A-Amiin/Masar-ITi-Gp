import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { inventorySchema } from "@/schemas/inventory.schema";
import { buildInventoryProduct } from "@/models/inventory.model";
import { addInventoryProduct } from "@/services/inventory.service";

const AddProductModal = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(inventorySchema),
  });

  const onSubmit = async (data) => {
    try {
      const product = buildInventoryProduct(data);
      await addInventoryProduct(product);
      reset();
      onClose();
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="z-[999]" />

      <DialogContent
        dir="rtl"
        className="sm:max-w-lg z-[1000] [&>button]:hidden"
      >

        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>


    <DialogHeader className="space-y-1 text-right items-start">

          <DialogTitle className="text-base font-semibold">
            إضافة منتج
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            أدخل معلومات المنتج الجديد
          </p>
        </DialogHeader>

   
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 mt-4"
        >
          <div>
            <Label className="mb-1 block">اسم المنتج (عربي)</Label>
            <Input {...register("nameAr")} />
            {errors.nameAr && (
              <p className="text-xs text-red-500">{errors.nameAr.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-1 block">اسم المنتج (إنجليزي)</Label>
            <Input {...register("nameEn")} />
          </div>

          <div>
            <Label className="mb-1 block">السعر</Label>
            <Input type="number" {...register("price")} />
          </div>

          <div>
            <Label className="mb-1 block">الكمية</Label>
            <Input type="number" {...register("quantity")} />
          </div>

          <div>
            <Label className="mb-1 block">نسبة الخصم (%)</Label>
            <Input type="number" {...register("discountPercent")} />
          </div>

          <div>
            <Label className="mb-1 block">تاريخ انتهاء العرض</Label>
            <Input type="date" {...register("expireDate")} />
          </div>

          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit">حفظ</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
