module.exports = function renderColumnDefs(meta, pascalName) {
  const columnDefs = (meta.columns || [])
    .map((col) => {
      if (col.cell?.type === "badge") {
        const map = col.cell.map || {};
        const colorMap = Object.entries(map)
          .map(([key, color]) => {
            return `      "${key}": "bg-${color}-100 text-${color}-800"`;
          })
          .join(",\n");

        return `
  {
    accessorKey: "${col.name}",
    header: "${col.label}",
    cell: ({ row }) => {
      const value = row.getValue("${col.name}") as string;
      const colorMap: Record<string, string> = {
${colorMap}
      };
      return (
        <span className={cn("px-2 py-1 text-xs rounded-full", colorMap[value] || "bg-muted")}>
          {value}
        </span>
      );
    }
  }`;
      }

      return `
  {
    accessorKey: "${col.name}",
    header: "${col.label}"
  }`;
    })
    .join(",\n");

  return `
import { ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

export type ${pascalName} = {
${meta.columns.map((col) => `  ${col.name}: string;`).join("\n")}
}

export const columns: ColumnDef<${pascalName}>[] = [
${columnDefs}
]
`;
};
