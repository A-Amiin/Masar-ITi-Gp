import { useEffect, useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Route } from "lucide-react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

import AssignTaskModal from "./AssignTaskModal";
import AssignSuccessModal from "./AssignSuccessModal";
const TASK_TYPES = [
  { value: "delivery", label: "توصيل" },
  { value: "collection", label: "تحصيل" },
  { value: "return", label: "استرجاع" },
  { value: "pickup", label: "استلام" },
];

const AssignForm = ({
  onOptimizeRoute,
  onAreaChange,
  onConfirmTask,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  // المناطق من GeoJSON
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);

  // منتجات المخزون
  const [inventory, setInventory] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
const [agents, setAgents] = useState([]);
const [selectedAgent, setSelectedAgent] = useState(null);

  // نوع المهمة
  const [taskType, setTaskType] = useState(null);

  /* =======================
     تحميل المناطق
  ======================= */
  useEffect(() => {
    fetch("/areas.json")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data.features || []);
      })
      .catch(console.error);
  }, []);
useEffect(() => {
  const fetchAgents = async () => {
    const snap = await getDocs(collection(db, "representative"));

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().nameAr || doc.data().nameEn,
      phone: doc.data().phone,
      governorateAr: doc.data().governorateAr,
      governorateEn: doc.data().governorateEn,
      userId: doc.data().userId,
    }));

    setAgents(data);
  };

  fetchAgents();
}, []);

  /* =======================
     تحميل المخزون من Firebase
  ======================= */
  useEffect(() => {
    const fetchInventory = async () => {
      const snap = await getDocs(collection(db, "inventory"));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventory(data);
    };

    fetchInventory();
  }, []);

  /* =======================
     Helpers
  ======================= */
  const selectedAreaObject = areas.find(
    (area) => String(area.id) === selectedArea
  );

  const toggleProduct = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];
    });
  };

  /* =======================
     Render
  ======================= */
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

  <Select
    onValueChange={(value) => {
      const agent = agents.find((a) => a.id === value);
      setSelectedAgent(agent);
    }}
  >
    <SelectTrigger>
      <SelectValue placeholder="اختر المندوب" />
    </SelectTrigger>

    <SelectContent>
      {agents.length ? (
        agents.map((agent) => (
          <SelectItem key={agent.id} value={agent.id}>
            {agent.name}
          </SelectItem>
        ))
      ) : (
        <div className="px-3 py-2 text-sm text-muted-foreground">
          لا يوجد مندوبين
        </div>
      )}
    </SelectContent>
  </Select>
</div>

          {/* اختيار المنطقة */}
          <div>
            <label className="text-sm text-muted-foreground">
              اختر المنطقة
            </label>
            <Select
              onValueChange={(value) => {
                setSelectedArea(value);
                onAreaChange?.(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر المنطقة" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((feature) => (
                  <SelectItem
                    key={feature.id}
                    value={String(feature.id)}
                  >
                    {feature.properties?.SHYK_ANA_1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* اختيار منتجات من المخزون (Multi Select حقيقي) */}
          <div>
            <label className="text-sm text-muted-foreground">
              اختر المنتجات
            </label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  {selectedProducts.length
                    ? `تم اختيار ${selectedProducts.length} منتج`
                    : "اختر المنتجات"}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-72 max-h-64 overflow-y-auto">
                {inventory.map((product) => {
                  const checked = selectedProducts.some(
                    (p) => p.id === product.id
                  );

                  return (
                    <DropdownMenuCheckboxItem
                      key={product.id}
                      checked={checked}
                      onCheckedChange={() => toggleProduct(product)}
                    >
                      <div className="flex flex-col">
                        <span>
                          {product.nameAr || product.nameEn}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          السعر: {product.priceAfterDiscount ?? product.price}
                        </span>
                      </div>
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
<div>
  <label className="text-sm text-muted-foreground">
    نوع المهمة
  </label>

  <Select onValueChange={setTaskType}>
    <SelectTrigger>
      <SelectValue placeholder="نوع المهمة" />
    </SelectTrigger>

    <SelectContent>
      {TASK_TYPES.map((type) => (
        <SelectItem key={type.value} value={type.value}>
          {type.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

          {/* تحديد أفضل مسار */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => onOptimizeRoute?.(selectedAreaObject)}
          >
            <Route className="w-4 h-4" />
            تحديد أفضل مسار للمندوب
          </Button>

          {/* توزيع مهمة */}
          <Button
            className="w-full"
            disabled={!selectedArea || !selectedProducts.length}
            onClick={() => setOpenConfirm(true)}
          >
            توزيع مهمة
          </Button>
        </CardContent>
      </Card>
<AssignTaskModal
  open={openConfirm}
  onClose={() => setOpenConfirm(false)}
  onConfirm={() => {
    onConfirmTask({
      agent: selectedAgent,
      taskType,
      area: selectedAreaObject,
      products: selectedProducts,
    });

    setOpenConfirm(false);
    setOpenSuccess(true);
  }}
  agent={selectedAgent}
  taskType={taskType}
  area={selectedAreaObject}
  products={selectedProducts}
/>


 <AssignSuccessModal
  open={openSuccess}
  onClose={() => setOpenSuccess(false)}
/>


    </>
  );
};

export default AssignForm;
