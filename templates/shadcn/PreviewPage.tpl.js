module.exports = function renderShadcnPreview(meta, pascalName) {
  const title = meta.title || pascalName;
  const columns = meta.columns || [];
  const name = meta.name;
  const storeImport = `use${pascalName}FilterStore`;

  const hasActionCell = columns.some((col) => col.cell?.type === "buttons" || col.cell?.type === "button");
  const handlers = hasActionCell
    ? `
  function editItem(item: ${pascalName}) {
    console.log("수정:", item);
  }

  function deleteItem(item: ${pascalName}) {
    console.log("삭제:", item);
  }
`
    : "";

  const filterHandler = `function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFilter(name, value);
  }
`;

  const columnCall = hasActionCell ? "columns(editItem, deleteItem)" : "columns";

  return `
"use client"

import * as React from "react"
import LayoutShell from "@/shared/components/layout/LayoutShell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ${pascalName}Form from "@/generated/components/${pascalName}/Form"
import ${pascalName}FilterBar from "@/generated/components/${pascalName}/FilterBar"
import { DataTable } from "@/shared/components/ui/DataTable"
import { columns } from "@/generated/components/${pascalName}/columns"
import type { ${pascalName} } from "@/generated/components/${pascalName}/columns"

import { ${storeImport} } from "@/src/features/${name}/stores/filterStore"
import { useGet${pascalName} } from "@/src/features/${name}/apis/useGet${pascalName}"

export default function ${pascalName}PreviewPage() {
  const [tab, setTab] = React.useState("list");
  const { filters, setFilter } = ${storeImport}();
  const { data = [], isLoading } = useGet${pascalName}(filters);
  ${handlers}
  ${filterHandler}
  return (
    <LayoutShell>
      <h1 className="text-2xl font-bold mb-4">${title} Preview</h1>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList>
          <TabsTrigger value="list">목록</TabsTrigger>
          <TabsTrigger value="form">등록</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>${title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <${pascalName}FilterBar onChange={handleFilterChange} />
              <DataTable<${pascalName}> columns={${columnCall}} data={data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>신규 등록</CardTitle>
            </CardHeader>
            <CardContent>
              <${pascalName}Form onSuccess={() => setTab("list")} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </LayoutShell>
  );
}
`;
};
