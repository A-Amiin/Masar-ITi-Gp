import { z } from "zod"

export const customerSchema = z.object({
  nameAr: z.string().min(2, "اسم العميل العربي مطلوب"),
  name: z.string().min(2, "اسم العميل الإنجليزي مطلوب"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  type: z.enum(["عميل جديد", "عميل محتمل", "عميل دائم"]),
  activity: z.string().min(1, "نوع النشاط مطلوب"),
  area: z.string().min(1, "المنطقة مطلوبة"),
  activityType: z.enum(["جملة الجملة", "جملة", "قطاعي"]),
  classification: z.enum(["A", "B", "C"]),
  lastVisit: z.string(),
  visitsCount: z.coerce.number().min(0),
  totalSpent: z.coerce.number().min(0),
})
