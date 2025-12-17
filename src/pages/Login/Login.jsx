import LoginForm from "./components/LoginForm"

const Login = () => {
  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-[linear-gradient(180deg,#0D47A1_0%,#00ACC1_50%,#0D47A1_100%)]
      "
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 dark:bg-background">
        
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <img src="/masar-logo.png" alt="Masar Logo" className="h-20 w-auto" />
          <h1 className="text-xl font-semibold">مرحبًا بك</h1>
          <p className="text-sm text-muted-foreground">
            بوابة الإدارة
          </p>
        </div>

        {/* Form */}
        <LoginForm />

        <p className="text-center text-sm text-muted-foreground">
          العودة إلى الصفحة الرئيسية:{" "}
          <a href="/" className="text-blue-600 underline">
            انقر هنا
          </a>
        </p>
      </div>
    </div>
  )
}
export default Login