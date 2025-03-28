
import { ColumnDef } from "@tanstack/react-table"

export type Products = {
  id: string;
  name: string;
  price: string;
  category: string;
}

export const columns: ColumnDef<Products>[] = [

  {
    accessorKey: "id",
    header: "ID"
  },

  {
    accessorKey: "name",
    header: "상품명"
  },

  {
    accessorKey: "price",
    header: "가격"
  },

  {
    accessorKey: "category",
    header: "카테고리"
  }
]
