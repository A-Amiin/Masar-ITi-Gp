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

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { inventorySchema } from "@/schemas/inventory.schema";
import { buildInventoryProduct } from "@/models/inventory.model";
import { updateInventoryProduct } from "@/services/inventory.service";

const EditProductModal = ({ open, onClose, product }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inventorySchema),
  });


  useEffect(() => {
    if (product) {
      reset({
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        price: product.price,
        quantity: product.quantity,
        discountPercent: product.discountPercent,
        expireDate: product.expireDate
          ? product.expireDate.toDate().toISOString().split("T")[0]
          : "",
      });
    }
  }, [product, reset]);


  const price = Number(watch("price") || 0);
  const discount = Number(watch("discountPercent") || 0);

  const priceAfterDiscount =
    discount > 0 ? price - (price * discount) / 100 : price;

  const onSubmit = async (data) => {
    try {
      const updatedProduct = buildInventoryProduct(data);

      await updateInventoryProduct(product.id, {
        ...updatedProduct,
        updatedAt: new Date(),
      });

      onClose();
    } catch (err) {
      console.error("Update product error:", err);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="z-[999]" />

      <DialogContent
        className="sm:max-w-lg z-[1000] [&>button]:hidden"
        dir="rtl"
      >

        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>


<DialogHeader className="space-y-1 text-right items-start">

          <DialogTitle className="text-base font-semibold">
            تعديل منتج
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            تعديل معلومات المنتج
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
              <p className="text-xs text-red-500">
                {errors.nameAr.message}
              </p>
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

          {/* Discount Result */}
          <div className="col-span-2 mt-2 bg-yellow-50 border border-yellow-200 rounded-md p-3 flex justify-between items-center">
            <span className="text-sm font-medium">
              السعر بعد الخصم
            </span>
            <div className="text-left">
              <p className="text-blue-600 font-semibold">
                {priceAfterDiscount.toFixed(2)} جنيه
              </p>
              {discount > 0 && (
                <span className="text-xs bg-yellow-400 px-2 py-0.5 rounded">
                  خصم %{discount}
                </span>
              )}
            </div>
          </div>


          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit">حفظ التعديلات</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
