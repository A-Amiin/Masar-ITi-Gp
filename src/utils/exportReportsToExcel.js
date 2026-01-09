import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportReportsToExcel = ({
  stats,
  salesSummary,
}) => {
  // Sheet 1: الإحصائيات العامة
  const statsSheetData = [
    ["العنوان", "القيمة"],
    ["الطلبات الموصلة", stats.deliveredOrders],
    ["المندوبين النشطين", stats.activeAgents],
    ["المهام المكتملة اليوم", stats.completedToday],
    ["إجمالي مبيعات اليوم", stats.totalSalesToday],
  ];

  // Sheet 2: ملخص المبيعات
  const salesSummaryData = [
    ["الفترة", "المبيعات"],
    ["اليوم", salesSummary.today],
    ["الأسبوع", salesSummary.week],
    ["الشهر", salesSummary.month],
    ["السنة", salesSummary.year],
  ];

  const workbook = XLSX.utils.book_new();

  const statsSheet = XLSX.utils.aoa_to_sheet(statsSheetData);
  const salesSheet = XLSX.utils.aoa_to_sheet(salesSummaryData);

  XLSX.utils.book_append_sheet(workbook, statsSheet, "الإحصائيات");
  XLSX.utils.book_append_sheet(workbook, salesSheet, "ملخص المبيعات");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, `reports-${new Date().toISOString().slice(0, 10)}.xlsx`);
};
