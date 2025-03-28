
"use client"

import ProductsForm from "@/generated/components/Products/Form"
import ProductsDataTable from "@/generated/components/Products/DataTable"
import ProductsFilterBar from "@/generated/components/Products/FilterBar"

export default function ProductsPreviewPage() {
  const mockData = [
  {
    id: "ID-001",
    name: "샘플 상품명",
    price: 9900,
    category: "카테고리 값"
  },
  {
    id: "ID-001",
    name: "샘플 상품명",
    price: 9900,
    category: "카테고리 값"
  }
];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">상품 관리 Preview</h1>
      <ProductsFilterBar onChange={() => {}} />
      <ProductsForm />
      <ProductsDataTable data={mockData} />
    </div>
  );
}
