import { DataTable } from "./data-table";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export default function ProductsTableComponent() {
  const data: Product[] = []; // TODO: API 연동 필요

  const columns = [
    { header: "ID", accessor: "id" as const },
    { header: "상품명", accessor: "name" as const },
    { header: "가격", accessor: "price" as const },
    { header: "카테고리", accessor: "category" as const },
  ];

  return <DataTable data={data} columns={columns} />;
}
