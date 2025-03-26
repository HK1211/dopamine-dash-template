
export default function ProductsTableComponent() {
  const data = []; // TODO: API 연동 필요
  return (
    <table>
      <thead><tr><th>ID</th><th>상품명</th><th>가격</th><th>카테고리</th></tr></thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td>{item.id}</td><td>{item.name}</td><td>{item.price}</td><td>{item.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
