import { z } from "zod"

export const customerSchema = z.object({
  nameAr: z.string().min(2, "اسم العميل العربي مطلوب"),
  name: z.string().min(2, "اسم العميل الإنجليزي مطلوب"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  locationAr: z.string().min(2, "الموقع العربي مطلوب"),
  locationEn: z.string().min(2, "الموقع الإنجليزي مطلوب"),
  type: z.string().min(1, "نوع العميل مطلوب"),
  activity: z.string().min(1, "نوع النشاط مطلوب"),
  classification: z.enum(["A", "B", "C"]),
  lastVisit: z.string(),
  visitsCount: z.coerce.number().min(0),
  totalSpent: z.coerce.number().min(0),
  address: z.object({
    lat: z.coerce.number(),
    lng: z.coerce.number(),
  }),
})
