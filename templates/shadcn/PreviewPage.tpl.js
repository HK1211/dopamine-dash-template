module.exports = function renderShadcnPreview(meta, pascalName) {
  const pageName = meta.name;
  const title = meta.title || pascalName;
  const columns = meta.columns || [];

  const mockFieldValue = (col) => {
    const name = col.name.toLowerCase();
    const label = col.label || name;
    if (name.includes("id")) return `"${label.toUpperCase()}-001"`;
    if (name.includes("name")) return `"샘플 ${label}"`;
    if (name.includes("price") || name.includes("amount")) return "9900";
    if (name.includes("date")) return `"2024-01-01"`;
    return `"${label} 값"`;
  };

  const mockItem = columns.map(col => `    ${col.name}: ${mockFieldValue(col)}`).join(',\n');
  const mockData = `[
  {
${mockItem}
  },
  {
${mockItem}
  }
]`;

  return `
"use client"

import ${pascalName}Form from "@/generated/components/${pascalName}/Form"
import ${pascalName}DataTable from "@/generated/components/${pascalName}/DataTable"
import ${pascalName}FilterBar from "@/generated/components/${pascalName}/FilterBar"

export default function ${pascalName}PreviewPage() {
  const mockData = ${mockData};

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">${title} Preview</h1>
      <${pascalName}FilterBar onChange={() => {}} />
      <${pascalName}Form />
      <${pascalName}DataTable data={mockData} />
    </div>
  );
}
`;
};