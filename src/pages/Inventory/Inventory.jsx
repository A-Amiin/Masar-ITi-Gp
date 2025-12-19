import { useEffect, useState } from "react";

import InventoryTable from "./components/InventoryTable";
import InventoryFilters from "./components/InventoryFilters";
import AddProductModal from "./components/Modal/AddProductModal";
import InventorySummary from "./components/InventorySummary";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  subscribeToInventoryWithFilters,
} from "@/services/inventory.service";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);


  const [filters, setFilters] = useState({
    search: "",
    discount: "all", 
    stock: "all", 
  });


  useEffect(() => {
    const unsub = subscribeToInventoryWithFilters(
      filters,
      setProducts
    );
    return () => unsub();
  }, [filters]);

  return (
    <div className="space-y-6" dir="rtl">

      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">المخزون</h1>

        <Button onClick={() => setOpenAdd(true)}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة منتج
        </Button>
      </div>


      <InventoryFilters
        filters={filters}
        onChange={setFilters}
      />

    <InventorySummary products={products} />
      <InventoryTable products={products} />

      <AddProductModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      />
  
    </div>
  );
};

export default Inventory;
