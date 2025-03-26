
import ProductsFormComponent from '../../components/Products/ProductsFormComponent_v1';
import ProductsTableComponent from '../../components/Products/ProductsTableComponent';

export default function Page() {
  return (
    <div>
      <h1>상품 관리</h1>
      <ProductsFormComponent />
      <ProductsTableComponent />
    </div>
  );
}
