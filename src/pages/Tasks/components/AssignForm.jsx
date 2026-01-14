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
import { Route } from "lucide-react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

import AssignTaskModal from "./AssignTaskModal";
import AssignSuccessModal from "./AssignSuccessModal";

const TASK_TYPES = [
  { value: "delivery", label: "توصيل" },
  { value: "return", label: "استرجاع" },
];

const AssignForm = ({
  onOptimizeRoute,
  onAreaChange,
  onConfirmTask,
  customersInsideArea,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  // المناطق
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);

  // المندوبين
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // المخزون
  const [inventory, setInventory] = useState([]);

  // 👇 المصدر الوحيد للحقيقة
  const [customerTasks, setCustomerTasks] = useState({});

  /* تحميل المناطق */
  useEffect(() => {
    fetch("/areas.json")
      .then((res) => res.json())
      .then((data) => setAreas(data.features || []))
      .catch(console.error);
  }, []);

  /* تحميل المندوبين */
  useEffect(() => {
    const fetchAgents = async () => {
      const snap = await getDocs(collection(db, "representative"));
      setAgents(
        snap.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().nameAr || doc.data().nameEn,
          phone: doc.data().phone,
        }))
      );
    };
    fetchAgents();
  }, []);

  /* تحميل المخزون */
  useEffect(() => {
    const fetchInventory = async () => {
      const snap = await getDocs(collection(db, "inventory"));
      setInventory(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };
    fetchInventory();
  }, []);

  const selectedAreaObject = areas.find(
    (area) => String(area.id) === selectedArea
  );

  /* ===== Helpers ===== */

  const toggleCustomerProduct = (customerId, product) => {
    setCustomerTasks((prev) => {
      const customer = prev[customerId] || {};
      const products = customer.products || [];

      const exists = products.find((p) => p.id === product.id);

      return {
        ...prev,
        [customerId]: {
          ...customer,
          products: exists
            ? products.filter((p) => p.id !== product.id)
            : [...products, { ...product, quantity: 1 }],
        },
      };
    });
  };

  const changeQuantity = (customerId, productId, delta) => {
    setCustomerTasks((prev) => ({
      ...prev,
      [customerId]: {
        ...prev[customerId],
        products: prev[customerId].products.map((p) =>
          p.id === productId
            ? { ...p, quantity: Math.max(1, p.quantity + delta) }
            : p
        ),
      },
    }));
  };

  /* ===== Render ===== */

  return (
    <>
      <Card className="h-full" dir="rtl">
        <CardHeader>
          <CardTitle className="text-base">توزيع مهمة</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* المندوب */}
          <div>
            <label className="text-sm text-muted-foreground">
              اختر المندوب
            </label>
            <Select
              onValueChange={(value) =>
                setSelectedAgent(agents.find((a) => a.id === value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر المندوب" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* المنطقة */}
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
                  <SelectItem key={feature.id} value={String(feature.id)}>
                    {feature.properties?.SHYK_ANA_1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* إعدادات كل عميل */}
          {customersInsideArea?.length > 0 && (
            <div className="space-y-4 max-h-96 overflow-y-auto border rounded-md p-3">
              <p className="text-sm font-medium">إعدادات كل عميل</p>

              {customersInsideArea.map((customer) => {
                const task = customerTasks[customer.id] || {};
                const products = task.products || [];

                return (
                  <Card key={customer.id} className="p-3 space-y-3">
                    <div className="font-medium">{customer.name}</div>

                    {/* نوع المهمة */}
                    <Select
                      onValueChange={(value) =>
                        setCustomerTasks((prev) => ({
                          ...prev,
                          [customer.id]: {
                            ...prev[customer.id],
                            taskType: value,
                          },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="نوع المهمة" />
                      </SelectTrigger>
                      <SelectContent>
                        {TASK_TYPES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* المنتجات */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          {products.length
                            ? `تم اختيار ${products.length} منتج`
                            : "اختر المنتجات"}
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-72 max-h-64 overflow-y-auto">
                        {inventory.map((product) => {
                          const selected = products.find(
                            (p) => p.id === product.id
                          );

                          return (
                            <DropdownMenuCheckboxItem
                              key={product.id}
                              checked={!!selected}
                              onCheckedChange={() =>
                                toggleCustomerProduct(customer.id, product)
                              }
                              className="flex justify-between gap-2"
                            >
                              <span>{product.nameAr || product.nameEn}</span>

                              {selected && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-2"
                                >
                                  <button
                                    onClick={() =>
                                      changeQuantity(customer.id, product.id, -1)
                                    }
                                  >
                                    −
                                  </button>
                                  <span>{selected.quantity}</span>
                                  <button
                                    onClick={() =>
                                      changeQuantity(customer.id, product.id, 1)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Card>
                );
              })}
            </div>
          )}

          {/* أفضل مسار */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => onOptimizeRoute?.(selectedAreaObject)}
          >
            <Route className="w-4 h-4" />
            تحديد أفضل مسار للمندوب
          </Button>

          {/* تأكيد */}
          <Button
            className="w-full"
            disabled={!selectedAgent || !selectedArea}
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
            representativeId: selectedAgent.id,
            area: selectedAreaObject,
            customerTasks,
          });
          setOpenConfirm(false);
          setOpenSuccess(true);
        }}
        agent={selectedAgent}
        area={selectedAreaObject}
      />

      <AssignSuccessModal
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
      />
    </>
  );
};

export default AssignForm;
