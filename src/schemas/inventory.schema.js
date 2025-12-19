import { z } from "zod";

export const inventorySchema = z.object({
  nameAr: z.string().min(1, "اسم المنتج بالعربي مطلوب"),
  nameEn: z.string().min(1, "اسم المنتج بالإنجليزي مطلوب"),
  price: z.coerce.number().positive("السعر لازم يكون أكبر من صفر"),
  quantity: z.coerce.number().int().min(0, "الكمية لا تقل عن صفر"),
  discountPercent: z.coerce.number().min(0).max(100).optional(),
  expireDate: z.string().optional(),
});
