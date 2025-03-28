
"use client"

import ProductsForm from "@/generated/components/Products/Form"
import ProductsFilterBar from "@/generated/components/Products/FilterBar"
import { DataTable } from "@/shared/components/ui/DataTable"
import { columns } from "@/generated/components/Products/columns"

export default function ProductsPreviewPage() {
  const mockData = [
  {
    id: "${label.toUpperCase()}-001",
    name: "샘플 ${label}",
    price: 9900,
    category: "${label} 값",
    status: "${label} 값",
    actions: "${label} 값"
  },
  {
    id: "${label.toUpperCase()}-001",
    name: "샘플 ${label}",
    price: 9900,
    category: "${label} 값",
    status: "${label} 값",
    actions: "${label} 값"
  }
];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">상품 관리 Preview</h1>
      <ProductsFilterBar onChange={() => {}} />
      <ProductsForm />
      <DataTable columns={columns} data={mockData} />
    </div>
  );
}
