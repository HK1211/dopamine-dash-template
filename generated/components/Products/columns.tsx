
import { ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

export type Products = {
  id: string;
  name: string;
  price: number;
  category: string;
  status: string;
  actions: string;
}

export const columns = (
  editItem: (row: Products) => void,
  deleteItem: (row: Products) => void
): ColumnDef<Products>[] => [

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
    id: "actions",
    header: "관리",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          
          <button
            onClick={() => editItem(row.original)}
            className="text-white text-xs rounded px-2 py-1 bg-primary"
          >
            수정
          </button>
          <button
            onClick={() => deleteItem(row.original)}
            className="text-white text-xs rounded px-2 py-1 bg-red-500"
          >
            삭제
          </button>
        </div>
      );
    }
  }
]
