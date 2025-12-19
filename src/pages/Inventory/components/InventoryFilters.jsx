import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const InventoryFilters = ({ filters, onChange }) => {
  return (
  <Card>
  <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">

    <div className="relative w-full">
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        placeholder="بحث باسم المنتج"
        value={filters.search}
        onChange={(e) =>
          onChange({ ...filters, search: e.target.value })
        }
        className="pr-10 w-full"
      />
    </div>

    <Select
      value={filters.discount}
      onValueChange={(value) =>
        onChange({ ...filters, discount: value })
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="الخصومات" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">الكل</SelectItem>
        <SelectItem value="withDiscount">عليه خصم</SelectItem>
        <SelectItem value="noDiscount">بدون خصم</SelectItem>
      </SelectContent>
    </Select>


    <Select
      value={filters.stock}
      onValueChange={(value) =>
        onChange({ ...filters, stock: value })
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="المخزون" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">الكل</SelectItem>
        <SelectItem value="available">متوفر</SelectItem>
        <SelectItem value="low">على وشك النفاد</SelectItem>
        <SelectItem value="out">غير متوفر</SelectItem>
      </SelectContent>
    </Select>

  </CardContent>
</Card>

  );
};

export default InventoryFilters;
