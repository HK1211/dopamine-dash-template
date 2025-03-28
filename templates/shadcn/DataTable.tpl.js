module.exports = function renderShadcnTable(meta, pascalName) {
  const columns = (meta.columns || []).map(col => {
    return `
  {
    accessorKey: "${col.name}",
    header: "${col.label}"
  }`;
  }).join(',\n');

  return `
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"

export type ${pascalName} = {
${meta.columns.map(col => `  ${col.name}: string;`).join('\n')}
}

export const columns: ColumnDef<${pascalName}>[] = [
${columns}
]

export default function ${pascalName}DataTable({ data }: { data: ${pascalName}[] }) {
  return <DataTable columns={columns} data={data} />
}
`;
};