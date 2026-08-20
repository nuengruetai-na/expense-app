import { formatCurrency } from "@/lib/format";

export default function SummaryChart({ totals }) {
  const total = totals.income + totals.expense;
  const hasData = total > 0;
  const incomePercent = hasData ? (totals.income / total) * 100 : 0;
  const expensePercent = hasData ? 100 - incomePercent : 0;

  // conic-gradient รับแค่ % แบบไดนามิกผ่าน inline style เท่านั้น ทำเป็น Tailwind class ไม่ได้
  const pieStyle = hasData
    ? { background: `conic-gradient(#16a34a 0% ${incomePercent}%, #dc2626 ${incomePercent}% 100%)` }
    : { background: "#e5e7eb" };

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6 flex flex-col sm:flex-row items-center gap-6">
      <div className="w-40 h-40 rounded-full shrink-0" style={pieStyle} />
      <div className="flex flex-col gap-2">
        {!hasData && <p className="text-gray-500">ยังไม่มีข้อมูล</p>}
        {hasData && (
          <>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-600" />
              <span className="text-gray-700">
                รายรับ {formatCurrency(totals.income)} ({incomePercent.toFixed(0)}%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600" />
              <span className="text-gray-700">
                รายจ่าย {formatCurrency(totals.expense)} ({expensePercent.toFixed(0)}%)
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
