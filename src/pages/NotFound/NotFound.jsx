import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-4">
      <div className="w-full max-w-md rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-lg">
        
        <h1 className="text-7xl font-bold text-[var(--primary)] mb-2">
          404
        </h1>

        <h2 className="text-xl font-medium mb-3">
          الصفحة غير موجودة
        </h2>

        <p className="text-sm text-[var(--muted-foreground)] mb-6">
          الصفحة التي تحاول الوصول إليها غير متوفرة أو تم حذفها.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-6 py-2 text-sm font-medium text-[var(--primary-foreground)] transition hover:opacity-90"
        >
          الرجوع للرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;