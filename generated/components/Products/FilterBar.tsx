
"use client"

import * as React from "react"

export default function ProductsFilterBar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const [brandOptions, setBrandOptions] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/brands")
      .then(res => res.json())
      .then(data => setBrandOptions(data));
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      
      <div className="grid gap-1">
        <label className="text-sm font-medium">카테고리</label>
        <select name="category" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
          <option value="전자">전자</option>
          <option value="의류">의류</option>
          <option value="식품">식품</option>
        </select>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">브랜드</label>
        <select name="brand" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
          {brandOptions.map((opt: { id: string; name: string }) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">상품명</label>
        <input type="text" name="name" onChange={onChange} className="border px-3 py-2 rounded-md" />
      </div>
    </div>
  );
}
