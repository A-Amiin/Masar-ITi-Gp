import { z } from "zod";

export const createUserSchema = z.object({
  nameAr: z.string().min(2, "الاسم العربي مطلوب"),
  nameEn: z.string().min(2, "الاسم الإنجليزي مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور 6 حروف على الأقل"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  role: z.enum(["admin", "representative"]),
});
