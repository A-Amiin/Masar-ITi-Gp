import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Route } from "lucide-react";

import AssignTaskModal from "./AssignTaskModal";
import AssignSuccessModal from "./AssignSuccessModal";

const AssignForm = ({ onOptimizeRoute }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);


  return (
    <>
      <Card className="h-full" dir="rtl">
        <CardHeader>
          <CardTitle className="text-base">توزيع مهمة</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
         
          <div>
            <label className="text-sm text-muted-foreground">
              اختر المندوب
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="اختر المندوب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">محمد حسن</SelectItem>
                <SelectItem value="2">أحمد علي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          
          <div>
            <label className="text-sm text-muted-foreground">
              اختر المنطقة
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="اختر المنطقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nasr">مدينة نصر</SelectItem>
                <SelectItem value="heliopolis">مصر الجديدة</SelectItem>
                <SelectItem value="maadi">المعادي</SelectItem>
                <SelectItem value="tagamoa">التجمع الخامس</SelectItem>
                <SelectItem value="dokki">الدقي</SelectItem>
                <SelectItem value="mohandeseen">المهندسين</SelectItem>
                <SelectItem value="shubra">شبرا</SelectItem>
                <SelectItem value="helwan">حلوان</SelectItem>
              </SelectContent>
            </Select>
          </div>

          
          <div>
            <label className="text-sm text-muted-foreground">
              نوع المهمة
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="نوع المهمة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delivery">توصيل</SelectItem>
                <SelectItem value="pickup">استلام</SelectItem>
              </SelectContent>
            </Select>
          </div>

      <Button
  type="button"
  variant="outline"
  className="w-full flex items-center gap-2"
  onClick={onOptimizeRoute}
>
  <Route className="w-4 h-4" />
  تحديد أفضل مسار للمندوب
</Button>


   
          <Button className="w-full" onClick={() => setOpenConfirm(true)}>
            توزيع مهمة
          </Button>
        </CardContent>
      </Card>


      <AssignTaskModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={() => {
          setOpenConfirm(false);
          setOpenSuccess(true);
        }}
      />


      <AssignSuccessModal
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
      />
    </>
  );
};

export default AssignForm;
