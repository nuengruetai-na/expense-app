"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "expense-tracker-entries";

// Hook นี้เป็นที่เดียวที่เก็บ state ของรายการทั้งหมด และเป็นที่เดียวที่คุยกับ localStorage
export function useEntries() {
  const [entries, setEntries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // โหลดข้อมูลเดิมจาก localStorage ตอนเปิดหน้าครั้งแรก (ทำได้แค่ฝั่ง browser เท่านั้น)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setEntries(JSON.parse(saved));
    } catch {
      // ข้อมูลเสียหรืออ่านไม่ได้ ให้เริ่มจากรายการเปล่า
    }
    setIsLoaded(true);
  }, []);

  // บันทึกลง localStorage ทุกครั้งที่ entries เปลี่ยน แต่ต้องรอให้โหลดเสร็จก่อน
  // (ไม่งั้น effect นี้จะรันตอน mount ด้วยค่า entries=[] แล้วไปเขียนทับข้อมูลเดิมที่ยังโหลดไม่ทัน)
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries, isLoaded]);

  function addEntry({ date, description, amount, type, category = "" }) {
    const newEntry = {
      id: crypto.randomUUID(),
      date,
      description,
      amount,
      type,
      category,
    };
    setEntries((prev) => [newEntry, ...prev]);
  }

  function updateEntry(id, updates) {
    setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry)));
  }

  function deleteEntry(id) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }

  // รวมหมวดหมู่ที่เคยพิมพ์ไว้แล้ว แยกตามประเภท เพื่อเอาไปเป็นตัวเลือกแนะนำใน <datalist>
  const categoriesByType = useMemo(() => {
    const income = new Set();
    const expense = new Set();
    for (const entry of entries) {
      if (!entry.category) continue;
      (entry.type === "income" ? income : expense).add(entry.category);
    }
    return { income: Array.from(income), expense: Array.from(expense) };
  }, [entries]);

  // เรียงใหม่สุดไว้บนสุด เทียบ string วันที่ YYYY-MM-DD ตรงๆได้เลยเพราะเรียงตามตัวอักษร = เรียงตามเวลา
  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)),
    [entries]
  );

  const totals = useMemo(() => {
    const income = entries
      .filter((entry) => entry.type === "income")
      .reduce((sum, entry) => sum + entry.amount, 0);
    const expense = entries
      .filter((entry) => entry.type === "expense")
      .reduce((sum, entry) => sum + entry.amount, 0);
    return { income, expense, balance: income - expense };
  }, [entries]);

  return { entries: sortedEntries, totals, addEntry, updateEntry, deleteEntry, categoriesByType, isLoaded };
}
