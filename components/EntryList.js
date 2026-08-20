import { formatCurrency, formatDateForDisplay } from "@/lib/format";
import { getCategoryIcon } from "@/lib/categoryIcon";

export default function EntryList({ entries, onDelete, onEdit, isLoaded }) {
  if (isLoaded && entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        ยังไม่มีรายการ — เริ่มเพิ่มรายการแรกของคุณด้านบนได้เลย
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {entries.map((entry) => {
        const isIncome = entry.type === "income";
        return (
          <div
            key={entry.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 border-b border-gray-200 last:border-b-0 py-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <span className="text-sm text-gray-500">{formatDateForDisplay(entry.date)}</span>
              <span className="text-gray-800">{entry.description}</span>
              {entry.category && (
                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 w-fit">
                  {getCategoryIcon(entry.category)} {entry.category}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className={`font-semibold ${isIncome ? "text-green-600" : "text-red-600"}`}>
                {isIncome ? "+" : "-"}
                {formatCurrency(entry.amount)}
              </span>
              <button
                onClick={() => onEdit(entry)}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(entry.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
