module.exports = function renderTableComponent(meta, pascalName) {
  const headers = meta.columns.map(col => `<th>${col.label}</th>`).join('');
  const cells = meta.columns.map(col => `<td>{item.${col.name}}</td>`).join('');

  return `
export default function ${pascalName}TableComponent() {
  const data = []; // TODO: API 연동 필요
  return (
    <table>
      <thead><tr>${headers}</tr></thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            ${cells}
          </tr>
        ))}
      </tbody>
    </table>
  );
}`;
}