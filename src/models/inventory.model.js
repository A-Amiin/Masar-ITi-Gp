import { Timestamp } from "firebase/firestore";

export const buildInventoryProduct = (data) => {
  const price = Number(data.price);
  const discountPercent = Number(data.discountPercent || 0);
  const quantity = Number(data.quantity);

  const priceAfterDiscount =
    discountPercent > 0
      ? price - (price * discountPercent) / 100
      : price;

  const status =
    quantity === 0
      ? "غير متوفر"
      : quantity < 20
      ? "نفد تقريبًا"
      : "متوفر";

  return {
    nameAr: data.nameAr,
    nameEn: data.nameEn,

    price,
    discountPercent,
    priceAfterDiscount,

    quantity,
    status,
    hasDiscount: discountPercent > 0,

    expireDate: data.expireDate
      ? Timestamp.fromDate(new Date(data.expireDate))
      : null,

    createdAt: Timestamp.now(),
    updatedAt: null,
  };
};
