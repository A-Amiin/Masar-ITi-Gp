 import { Button } from "@/components/ui/button";

const InventoryPagination = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        عرض 1 إلى 10 من 20 منتج
      </p>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">الأولى</Button>
        <Button variant="outline" size="sm">السابق</Button>
        <Button size="sm">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">التالي</Button>
        <Button variant="outline" size="sm">الأخيرة</Button>
      </div>
    </div>
  );
};

export default InventoryPagination;
