import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "lucide-react";

import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

import { deleteInventoryProduct } from "@/services/inventory.service";

/* =====================
   Pagination config
===================== */
const ITEMS_PER_PAGE = 5;

const InventoryTable = ({ products }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  /* =====================
     Pagination logic
  ===================== */
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = currentPage * ITEMS_PER_PAGE;
    return products.slice(start, end);
  }, [products, currentPage]);

  /* =====================
     Delete
  ===================== */
  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await deleteInventoryProduct(selectedProduct.id);
      setOpenDelete(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Delete product error:", err);
    }
  };

  /* =====================
     Helpers
  ===================== */
  const formatDate = (timestamp) => {
    if (!timestamp) return "--";
    return timestamp.toDate().toLocaleDateString("ar-EG");
  };

  return (
    <>
      <Card>
        <CardContent className="p-0">
          {/* ===== Header ===== */}
          <div className="p-4 flex items-center justify-between">
            <h3 className="font-medium text-base">قائمة المنتجات</h3>
            <span className="text-sm text-muted-foreground">
              إجمالي: {products.length} منتج
            </span>
          </div>

          {/* ===== Table ===== */}
          <div className="mx-4 mb-2 overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-3 text-right">اسم المنتج</th>
                  <th className="p-3 text-right">السعر</th>
                  <th className="p-3 text-right">السعر بعد الخصم</th>
                  <th className="p-3 text-right">الكمية</th>
                  <th className="p-3 text-right">تاريخ انتهاء العرض</th>
                  <th className="p-3 text-right">المخزون</th>
                  <th className="p-3 text-right">الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {paginatedProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b last:border-b-0"
                  >
                    {/* Name */}
                    <td className="p-3">{p.nameAr}</td>

                    {/* Price */}
                    <td className="p-3">
                      <span
                        className={
                          p.hasDiscount
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }
                      >
                        {p.price} جنيه
                      </span>
                    </td>

                    {/* Discount */}
                    <td className="p-3 space-y-1">
                      {p.hasDiscount ? (
                        <>
                          <p className="text-blue-600 font-medium">
                            {p.priceAfterDiscount} جنيه
                          </p>
                          <Badge variant="warning">
                            خصم %{p.discountPercent}
                          </Badge>
                        </>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>

                    {/* Quantity */}
                    <td className="p-3">
                      <Badge>{p.quantity}</Badge>
                    </td>

                    {/* Expire */}
                    <td className="p-3">
                      {formatDate(p.expireDate)}
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      <Badge
                        variant={
                          p.status === "متوفر"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {p.status}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedProduct(p);
                          setOpenEdit(true);
                        }}
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedProduct(p);
                          setOpenDelete(true);
                        }}
                        className="text-muted-foreground hover:text-red-600"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-6 text-center text-muted-foreground"
                    >
                      لا توجد منتجات
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ===== Pagination ===== */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 pb-4">
              <span className="text-sm text-muted-foreground">
                صفحة {currentPage} من {totalPages}
              </span>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((p) => p - 1)
                  }
                >
                  السابق
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => p + 1)
                  }
                >
                  التالي
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ===== Edit Modal ===== */}
      <EditProductModal
        open={openEdit}
        product={selectedProduct}
        onClose={() => setOpenEdit(false)}
      />

      {/* ===== Delete Modal ===== */}
      <DeleteProductModal
        open={openDelete}
        productName={selectedProduct?.nameAr}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default InventoryTable;
