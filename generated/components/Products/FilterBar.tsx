
"use client"

import * as React from "react"

export default function ProductsFilterBar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const [brandOptions, setBrandOptions] = React.useState<Array<Record<string, any>>>([]);

  React.useEffect(() => {
    fetch("/api/brands?ui=true")
      .then(res => res.json())
      .then(data => {
        // 배열인지 확인하고 설정
        if (Array.isArray(data)) {
          setBrandOptions(data);
        } else {
          console.error("데이터가 배열이 아닙니다:", data);
          setBrandOptions([]);
        }
      })
      .catch(err => {
        console.error("데이터를 불러오는데 실패했습니다:", err);
        setBrandOptions([]);
      });
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
          {brandOptions.map((opt) => (
            <option key={opt["id"]} value={opt["id"]}>
              {opt["name"]}
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
