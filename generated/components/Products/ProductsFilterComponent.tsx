
export default function ProductsFilterComponent({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}) {
  return (
    <div>
      
        <label>카테고리
          <select name="category" onChange={onChange}>
            <option value="">전체</option>
            <option value="전자">전자</option><option value="의류">의류</option><option value="식품">식품</option>
          </select>
        </label>\n
        <label>브랜드
          <select name="brand" onChange={onChange}>
            <option value="">전체</option>
            {/* TODO: API로 /api/brands에서 옵션 가져오기 */}
          </select>
        </label>\n
      <label>상품명
        <input name="name" type="text" onChange={onChange} />
      </label>
    </div>
  );
}
