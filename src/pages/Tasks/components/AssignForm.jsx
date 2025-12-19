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

import AssignTaskModal from "./AssignTaskModal";
import AssignSuccessModal from "./AssignSuccessModal";

const AssignForm = () => {
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
