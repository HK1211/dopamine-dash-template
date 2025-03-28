
import { ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

export type Products = {
  id: string;
  name: string;
  price: string;
  category: string;
  status: string;
  actions: string;
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
  },

  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const value = row.getValue("status") as string;
      const colorMap: Record<string, string> = {
      "active": "bg-green-100 text-green-800",
      "inactive": "bg-gray-100 text-gray-800",
      "soldout": "bg-red-100 text-red-800"
      };
      return (
        <span className={cn("px-2 py-1 text-xs rounded-full", colorMap[value] || "bg-muted")}>
          {value}
        </span>
      );
    }
  },

  {
    accessorKey: "actions",
    header: "관리"
  }
]
