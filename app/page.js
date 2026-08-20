"use client";

import { useState } from "react";
import SummaryBar from "@/components/SummaryBar";
import EntryForm from "@/components/EntryForm";
import EntryList from "@/components/EntryList";
import SummaryChart from "@/components/SummaryChart";
import { useEntries } from "@/hooks/useEntries";

export default function Home() {
  const { entries, totals, addEntry, updateEntry, deleteEntry, categoriesByType, isLoaded } = useEntries();
  const [editingEntry, setEditingEntry] = useState(null);

  function handleSubmit(payload) {
    if (editingEntry) {
      updateEntry(editingEntry.id, payload);
      setEditingEntry(null);
    } else {
      addEntry(payload);
    }
  }

  function handleDelete(id) {
    deleteEntry(id);
    if (editingEntry?.id === id) setEditingEntry(null);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">ExpenseApp-Ying</h1>

        <SummaryBar totals={totals} />
        <EntryForm
          onSubmit={handleSubmit}
          editingEntry={editingEntry}
          onCancelEdit={() => setEditingEntry(null)}
          categoriesByType={categoriesByType}
        />
        <EntryList entries={entries} onDelete={handleDelete} onEdit={setEditingEntry} isLoaded={isLoaded} />
        <SummaryChart totals={totals} />
      </div>
    </main>
  );
}
