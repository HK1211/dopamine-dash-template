module.exports = function renderShadcnFilter(meta, pascalName) {
  const filters = (meta.filters || [])
    .map((field) => {
      const isDynamic = field.options?.source === "api";
      const varName = field.name + "Options";
      const valueKey = field.options?.valueKey || "id";
      const labelKey = field.options?.labelKey || "name";

      if (field.type === "select") {
        if (isDynamic) {
          return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <select name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
          {${varName}.map((opt) => (
            <option key={opt["${valueKey}"]} value={opt["${valueKey}"]}>
              {opt["${labelKey}"]}
            </option>
          ))}
        </select>
      </div>`;
        } else {
          const staticOptions = (field.options?.data || [])
            .map((opt) => `          <option value="${opt}">${opt}</option>`)
            .join("\n");
          return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <select name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
${staticOptions}
        </select>
      </div>`;
        }
      } else {
        return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <input type="text" name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md" />
      </div>`;
      }
    })
    .join("\n");

  const dynamicHooks = (meta.filters || [])
    .filter((f) => f.type === "select" && f.options?.source === "api")
    .map((f) => {
      const varName = f.name + "Options";
      const setFn = "set" + f.name.charAt(0).toUpperCase() + f.name.slice(1) + "Options";
      const valueKey = f.options?.valueKey || "id";
      const labelKey = f.options?.labelKey || "name";
      return `const [${varName}, ${setFn}] = React.useState<Array<Record<string, any>>>([]);

  React.useEffect(() => {
    fetch("${f.options.url}?ui=true")
      .then(res => res.json())
      .then(data => {
        // 배열인지 확인하고 설정
        if (Array.isArray(data)) {
          ${setFn}(data);
        } else {
          console.error("데이터가 배열이 아닙니다:", data);
          ${setFn}([]);
        }
      })
      .catch(err => {
        console.error("데이터를 불러오는데 실패했습니다:", err);
        ${setFn}([]);
      });
  }, []);`;
    })
    .join("\n\n");

  return `
"use client"

import * as React from "react"

export default function ${pascalName}FilterBar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  ${dynamicHooks}

  return (
    <div className="flex flex-wrap gap-4">
      ${filters}
    </div>
  );
}
`;
};
