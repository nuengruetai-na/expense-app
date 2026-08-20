"use client";

import { useEffect, useState } from "react";

function todayAsInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export default function EntryForm({ onSubmit, editingEntry, onCancelEdit, categoriesByType }) {
  const [date, setDate] = useState(todayAsInputValue());
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");

  // เมื่อ editingEntry เปลี่ยน (เริ่มแก้ไข/ยกเลิก/บันทึกเสร็จ) ให้เติมค่าฟอร์มหรือล้างกลับเป็นค่าเริ่มต้น
  useEffect(() => {
    if (editingEntry) {
      setDate(editingEntry.date);
      setDescription(editingEntry.description);
      setAmount(String(editingEntry.amount));
      setType(editingEntry.type);
      setCategory(editingEntry.category || "");
    } else {
      setDate(todayAsInputValue());
      setDescription("");
      setAmount("");
      setType("expense");
      setCategory("");
    }
  }, [editingEntry]);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedDescription = description.trim();
    const numericAmount = Number(amount);
    if (!date || !trimmedDescription || !numericAmount || numericAmount <= 0) return;

    onSubmit({
      date,
      description: trimmedDescription,
      amount: numericAmount,
      type,
      category: category.trim(),
    });

    if (!editingEntry) {
      setDescription("");
      setAmount("");
      setCategory("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">วันที่</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="flex flex-col gap-1 sm:flex-1">
        <label className="text-sm text-gray-600">รายการ</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="เช่น ค่ากาแฟ, เงินเดือน"
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">จำนวนเงิน</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          placeholder="0.00"
          required
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">ประเภท</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="expense">รายจ่าย</option>
          <option value="income">รายรับ</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 sm:flex-1">
        <label className="text-sm text-gray-600">หมวดหมู่ (ไม่บังคับ)</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          list="category-suggestions"
          placeholder="เช่น อาหาร, เดินทาง"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <datalist id="category-suggestions">
          {(categoriesByType?.[type] || []).map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded px-4 py-2"
        >
          {editingEntry ? "Save" : "Add"}
        </button>
        {editingEntry && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded px-4 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
