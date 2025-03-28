module.exports = function renderShadcnFilter(meta, pascalName) {
  const filters = (meta.filters || []).map(field => {
    if (field.type === 'select') {
      const options = field.options?.data || [];
      const selectOptions = options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
      return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <select name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
          ${selectOptions}
        </select>
      </div>`;
    } else {
      return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <input type="text" name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md" />
      </div>`;
    }
  }).join('\n');

  return `
"use client"

export default function ${pascalName}FilterBar({ onChange }: { onChange: (e: any) => void }) {
  return (
    <div className="flex flex-wrap gap-4">
      ${filters}
    </div>
  );
}
`;
};