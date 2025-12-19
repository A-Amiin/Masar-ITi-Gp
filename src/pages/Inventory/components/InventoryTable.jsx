import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash, Pencil } from "lucide-react";

import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

import { deleteInventoryProduct } from "@/services/inventory.service";

const InventoryTable = ({ products }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


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


  const formatDate = (timestamp) => {
    if (!timestamp) return "--";
    return timestamp.toDate().toLocaleDateString("ar-EG");
  };

  return (
    <>
      <Card>
        <CardContent className="p-0">

          <div className="p-4 flex items-center justify-between">
            <h3 className="font-medium text-base">قائمة المنتجات</h3>
            <span className="text-sm text-muted-foreground">
              إجمالي: {products.length} منتج
            </span>
          </div>


          <div className="mx-4 mb-4 overflow-hidden rounded-lg border">
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
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b last:border-b-0"
                  >
                    <td className="p-3">{p.nameAr}</td>

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


                    <td className="p-3">
                      <Badge>{p.quantity}</Badge>
                    </td>

                    <td className="p-3">
                      {formatDate(p.expireDate)}
                    </td>

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
        </CardContent>
      </Card>

 
      <EditProductModal
        open={openEdit}
        product={selectedProduct}
        onClose={() => setOpenEdit(false)}
      />


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
