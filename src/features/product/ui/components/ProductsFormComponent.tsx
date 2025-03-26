
export default function ProductsFormComponent() {
  return (
    <form>
      <label>상품명<input name="name" type="text" /></label>
  <label>가격<input name="price" type="number" /></label>
  <label>카테고리<input name="category" type="text" /></label>
  <label>설명<textarea name="description" /></label>
    </form>
  );
}
