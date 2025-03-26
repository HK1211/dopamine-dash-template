
import ProductsFormComponent from '../../features/product/ui/components/ProductsFormComponent';
import ProductsTableComponent from '../../features/product/ui/components/ProductsTableComponent';

export default function Page() {
  return (
    <div>
      <h1>상품 관리</h1>
      <ProductsFormComponent />
      <ProductsTableComponent />
    </div>
  );
}
