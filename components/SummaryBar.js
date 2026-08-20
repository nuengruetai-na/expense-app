import { formatCurrency } from "@/lib/format";

export default function SummaryBar({ totals }) {
  const balanceColor = totals.balance >= 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-50 rounded-lg shadow p-4">
        <p className="text-sm text-gray-600">รายรับรวม</p>
        <p className="text-xl font-semibold text-green-600">{formatCurrency(totals.income)}</p>
      </div>
      <div className="bg-red-50 rounded-lg shadow p-4">
        <p className="text-sm text-gray-600">รายจ่ายรวม</p>
        <p className="text-xl font-semibold text-red-600">{formatCurrency(totals.expense)}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-sm text-gray-600">คงเหลือ</p>
        <p className={`text-xl font-semibold ${balanceColor}`}>{formatCurrency(totals.balance)}</p>
      </div>
    </div>
  );
}
