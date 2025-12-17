import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginUser } from "@/services/auth.service";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";


const loginSchema = z.object({
    email: z
    .string()
    .email("البريد الإلكتروني غير صحيح"),
    password: z
    .string()
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
})


export default function LoginForm() {
    const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

const onSubmit = async (values) => {
  try {
    const data = await loginUser(values.email, values.password);

    useAuthStore.getState().login({
      token: data.token,
      user: data.user,
    });

    console.log("Logged in:", data);
    navigate("/dashboard");
  } catch (error) {
    console.error(error.message);
    alert("بيانات الدخول غير صحيحة");
  }
};


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        dir="rtl"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input
                  placeholder="البريد الإلكتروني"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="كلمة المرور"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-11 text-base bg-[#0D47A1] hover:opacity-90"
        >
          تسجيل الدخول
        </Button>
      </form>
    </Form>
  )
}