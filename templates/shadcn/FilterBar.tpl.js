module.exports = function renderShadcnFilter(meta, pascalName) {
  const filters = (meta.filters || [])
    .map((field) => {
      const isDynamic = field.options?.source === "api";
      const varName = field.name + "Options";

      if (field.type === "select") {
        if (isDynamic) {
          return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <select name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
          {${varName}.map((opt: { id: string; name: string }) => (
            <option key={opt.${field.options?.valueKey}} value={opt.${field.options?.valueKey}}>
              {opt.${field.options?.labelKey}}
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
      return `const [${varName}, ${setFn}] = React.useState([]);

  React.useEffect(() => {
    fetch("${f.options.url}")
      .then(res => res.json())
      .then(data => ${setFn}(data));
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
