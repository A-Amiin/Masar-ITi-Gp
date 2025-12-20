import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Settings = () => {
  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* ===== Top Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================= اللغة (يمين) ================= */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">اللغة</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <Label>اللغة</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="العربية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-muted-foreground">
              اختر لغة التطبيق (مع دعم RTL للعربية)
            </p>
          </CardContent>
        </Card>

        {/* ================= المظهر (شمال) ================= */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">المظهر</CardTitle>
            <Switch />
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              تفعيل المظهر الداكن
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3 flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-full h-20 bg-slate-900 rounded-md" />
                <span className="text-sm">داكن</span>
              </div>

              <div className="border-2 border-primary rounded-lg p-3 flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-full h-20 bg-slate-100 rounded-md" />
                <span className="text-sm">فاتح</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= حجم الخط (يمين) ================= */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">حجم الخط</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <Label>حجم الخط</Label>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="متوسط (16px)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="14">صغير (14px)</SelectItem>
                <SelectItem value="16">متوسط (16px)</SelectItem>
                <SelectItem value="18">كبير (18px)</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>حجم صغير (14px)</p>
              <p>حجم متوسط (16px)</p>
              <p>حجم كبير (18px)</p>
            </div>
          </CardContent>
        </Card>

        {/* ================= معلومات التطبيق (شمال) ================= */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">معلومات التطبيق</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {[
              { label: "إصدار التطبيق", value: "v1.0.0" },
              { label: "اسم التطبيق", value: "Masar | مسار" },
              { label: "نوع المستخدم", value: "مسؤول" },
              { label: "آخر تحديث", value: "December 2024" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-muted px-4 py-2 rounded-md text-sm"
              >
                <span>{item.label}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ================= ألوان العلامة التجارية ================= */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            ألوان العلامة التجارية
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { color: "#212121", label: "الرمادي الداكن" },
            { color: "#616161", label: "الرمادي" },
            { color: "#EEEEEE", label: "الرمادي الفاتح" },
            { color: "#FFC107", label: "الذهبي" },
            { color: "#00ACC1", label: "السماوي" },
            { color: "#0D47A1", label: "الأزرق الأساسي" },
          ].map((item) => (
            <div key={item.color} className="text-center">
              <div
                className="w-full h-12 rounded-md mb-1"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">
                {item.label}
              </span>
              <div className="text-[10px] text-muted-foreground">
                {item.color}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
