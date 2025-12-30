import { z } from "zod"

// Regex
const arabicOnly = /^[\u0600-\u06FF\s]+$/
const englishOnly = /^[A-Za-z\s]+$/
const phoneOnly = /^[0-9]+$/
const alphanumericEnglish = /^[A-Za-z0-9]+$/

export const agentSchema = z.object({
  // الاسم عربي
  nameAr: z
    .string()
    .min(2, "الاسم باللغة العربية مطلوب")
    .regex(arabicOnly, "يسمح بحروف عربية فقط"),

  // الاسم إنجليزي
  nameEn: z
    .string()
    .min(2, "الاسم باللغة الإنجليزية مطلوب")
    .regex(englishOnly, "يسمح بحروف إنجليزية فقط"),

  // رقم الهاتف
  phone: z
    .string()
    .min(10, "رقم الهاتف غير صحيح")
    .regex(phoneOnly, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),

  // رقم الشركة (حروف + أرقام إنجليزي)
  companyId: z
    .string()
    .min(1, "رقم الشركة مطلوب")
    .regex(
      alphanumericEnglish,
      "رقم الشركة يجب أن يحتوي على حروف وأرقام إنجليزية فقط"
    ),

  // البريد الإلكتروني (اختياري)
  email: z
    .string()
    .email("البريد الإلكتروني غير صحيح")
    .optional()
    .or(z.literal("")),

  // المحافظة عربي
  governorateAr: z
    .string()
    .min(2, "المحافظة بالعربي مطلوبة")
    .regex(arabicOnly, "يسمح بحروف عربية فقط"),

  // المحافظة إنجليزي
  governorateEn: z
    .string()
    .min(2, "المحافظة بالإنجليزي مطلوبة")
    .regex(englishOnly, "يسمح بحروف إنجليزية فقط"),

  // عدد العملاء
  customersCount: z.coerce.number().min(0),

  // عدد الطلبات
  ordersCount: z.coerce.number().min(0),
})

export const agentDefaultValues = {
  nameAr: "",
  nameEn: "",
  phone: "",
  companyId: "",
  email: "",
  governorateAr: "",
  governorateEn: "",
  customersCount: 0,
  ordersCount: 0,
}

