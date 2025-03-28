module.exports = function renderColumnDefs(meta, pascalName) {
  const formMap = new Map();
  (meta.form || []).forEach(field => {
    formMap.set(field.name, field.type);
  });

  const columnDefs = (meta.columns || []).map(col => {
    const fieldType = formMap.get(col.name) || "text";
    const tsType = fieldType === "number" ? "number" : "string";

    if (col.cell?.type === "badge") {
      const map = col.cell.map || {};
      const colorMap = Object.entries(map).map(([key, color]) => {
        return `      "${key}": "bg-${color}-100 text-${color}-800"`;
      }).join(',\n');

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

    if (col.cell?.type === "buttons" || col.cell?.type === "button") {
      const actions = col.cell.actions || [{
        label: col.cell.label || "수정",
        onClick: col.cell.onClick || "editItem",
        variant: col.cell.variant || "primary"
      }];

      const buttonsJsx = actions.map(btn => {
        const label = btn.label || "Button";
        const color = btn.variant === "destructive" ? "bg-red-500" : "bg-primary";
        const handler = btn.onClick || "() => {}";
        return `
          <button
            onClick={() => ${handler}(row.original)}
            className="text-white text-xs rounded px-2 py-1 ${color}"
          >
            ${label}
          </button>`;
      }).join('');

      return `
  {
    id: "${col.name}",
    header: "${col.label}",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          ${buttonsJsx}
        </div>
      );
    }
  }`;
    }

    return `
  {
    accessorKey: "${col.name}",
    header: "${col.label}"
  }`;
  }).join(',\n');

  const inferredTypes = (meta.columns || []).map(col => {
    const fieldType = formMap.get(col.name) || "text";
    const tsType = fieldType === "number" ? "number" : "string";
    return `  ${col.name}: ${tsType};`;
  }).join('\n');

  return `
import { ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

export type ${pascalName} = {
${inferredTypes}
}

export const columns = (
  editItem: (row: ${pascalName}) => void,
  deleteItem: (row: ${pascalName}) => void
): ColumnDef<${pascalName}>[] => [
${columnDefs}
]
`;
};