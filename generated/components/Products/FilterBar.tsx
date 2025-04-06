
"use client"

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProductsStore } from "@/src/features/products/stores/store";

export default function ProductsFilterBar({ onSearch }: { onSearch?: () => void }) {
  const { filters, setFilter, applyFilters, resetFilters } = useProductsStore();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFilter(name, value);
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>검색 조건</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          
        <div className="grid gap-1">
          <label className="text-sm font-medium">카테고리</label>
          <select name="category" value={filters.category} onChange={handleChange} className="border px-3 py-2 rounded-md">
            <option value="">전체</option>
            <option value="전자">전자</option>
<option value="의류">의류</option>
<option value="식품">식품</option>
          </select>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium">브랜드</label>
          <select name="brand" value={filters.brand} onChange={handleChange} className="border px-3 py-2 rounded-md">
            <option value="">전체</option>
            {/* TODO: API에서 옵션 로딩 필요 */}
          </select>
        </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">상품명</label>
        <input type="text" name="name" value={filters.name} onChange={handleChange} className="border px-3 py-2 rounded-md" />
      </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" onClick={resetFilters}>초기화</Button>
        <Button onClick={() => {
          applyFilters();
          onSearch?.(); // ✅ 외부 콜백 호출
        }}>조회</Button>
      </CardFooter>
    </Card>
  );
}
