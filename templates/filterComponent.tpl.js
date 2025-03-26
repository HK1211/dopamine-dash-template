module.exports = function renderFilterComponent(meta, pascalName) {
  const filters = (meta.filters || []).map((field) => {
    if (field.type === 'select') {
      const isStatic = field.options?.source === 'static';
      if (isStatic) {
        const options = field.options.data
          .map((opt) => `<option value="${opt}">${opt}</option>`)
          .join('');
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            ${options}
          </select>
        </label>`;
      } else {
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            {/* TODO: API로 ${field.options.url} 에서 옵션 가져오기 */}
          </select>
        </label>`;
      }
    } else {
      return `
      <label>${field.label}
        <input name="${field.name}" type="text" onChange={onChange} />
      </label>`;
    }
  }).join('\n');

  return `
export default function ${pascalName}FilterComponent({ onChange }) {
  return (
    <div>
      ${filters}
    </div>
  );
}`;
}