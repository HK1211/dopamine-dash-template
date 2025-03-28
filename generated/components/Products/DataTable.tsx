
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"

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

export default function ProductsDataTable({ data }: { data: Products[] }) {
  return <DataTable columns={columns} data={data} />
}
