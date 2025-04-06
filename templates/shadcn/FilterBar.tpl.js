module.exports = function renderFilterBar(meta, pascalName) {
  const fields = meta.filters || [];
  const inputs = fields.map((field) => {
    if (field.type === "select") {
      const isStatic = field.options?.source === "static";
      if (isStatic) {
        const options = field.options.data
          .map((opt) => `<option value=\"${opt}\">${opt}</option>`)
          .join("\n");
        return `
        <div className="grid gap-1">
          <label className="text-sm font-medium">${field.label}</label>
          <select name="${field.name}" value={filters.${field.name}} onChange={handleChange} className="border px-3 py-2 rounded-md">
            <option value="">전체</option>
            ${options}
          </select>
        </div>`;
      } else {
        return `
        <div className="grid gap-1">
          <label className="text-sm font-medium">${field.label}</label>
          <select name="${field.name}" value={filters.${field.name}} onChange={handleChange} className="border px-3 py-2 rounded-md">
            <option value="">전체</option>
            {/* TODO: API에서 옵션 로딩 필요 */}
          </select>
        </div>`;
      }
    } else {
      return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <input type="text" name="${field.name}" value={filters.${field.name}} onChange={handleChange} className="border px-3 py-2 rounded-md" />
      </div>`;
    }
  }).join("\n");

  return `
"use client"

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { use${pascalName}Store } from "@/src/features/${meta.name}/stores/store";

export default function ${pascalName}FilterBar({ onSearch }: { onSearch?: () => void }) {
  const { filters, setFilter, applyFilters, resetFilters } = use${pascalName}Store();

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
          ${inputs}
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
`;
};