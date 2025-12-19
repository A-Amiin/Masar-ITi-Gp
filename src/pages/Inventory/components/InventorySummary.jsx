import { Card } from "@/components/ui/card";

const InventorySummary = ({ products }) => {
  const totalProducts = products.length;

  const totalQuantity = products.reduce(
    (sum, p) => sum + (p.quantity || 0),
    0
  );

  const discountedProducts = products.filter(
    (p) => p.hasDiscount
  ).length;

  const lowStockProducts = products.filter(
    (p) => p.quantity > 0 && p.quantity < 20
  ).length;

  const items = [
    {
      label: "إجمالي المنتجات",
      value: totalProducts,
    },
    {
      label: "إجمالي الكمية",
      value: totalQuantity,
    },
    {
      label: "منتجات بخصم",
      value: discountedProducts,
    },
    {
      label: "مخزون منخفض",
      value: lowStockProducts,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <Card
          key={i}
          className="p-4 text-center"
        >
          <p className="text-sm text-muted-foreground">
            {item.label}
          </p>
          <p className="text-xl font-semibold mt-1">
            {item.value}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default InventorySummary;
