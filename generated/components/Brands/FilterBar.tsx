
"use client"

import * as React from "react"

export default function BrandsFilterBar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  

  return (
    <div className="flex flex-wrap gap-4">
      
      <div className="grid gap-1">
        <label className="text-sm font-medium">브랜드명</label>
        <input type="text" name="name" onChange={onChange} className="border px-3 py-2 rounded-md" />
      </div>
    </div>
  );
}
