module.exports = function renderColumnDefs(meta, pascalName) {
  const columnDefs = (meta.columns || [])
    .map((col) => {
      return `
  {
    accessorKey: "${col.name}",
    header: "${col.label}"
  }`;
    })
    .join(",\n");

  return `
import { ColumnDef } from "@tanstack/react-table"

export type ${pascalName} = {
${meta.columns.map((col) => `  ${col.name}: string;`).join("\n")}
}

export const columns: ColumnDef<${pascalName}>[] = [
${columnDefs}
]
`;
};
