module.exports = function renderShadcnPreview(meta, pascalName) {
  const pageName = meta.name;
  const title = meta.title || pascalName;
  const columns = meta.columns || [];

  const mockFieldValue = (col, index) => {
    const name = col.name.toLowerCase();
    const label = col.label || col.name;

    if (col.cell?.type === "badge") return `"active"`; // 기본값
    if (col.cell?.type === "buttons" || col.cell?.type === "button") return `"N/A"`; // placeholder

    if (name === "id") return `"${col.name.toUpperCase()}-00${index + 1}"`;
    if (name.includes("name")) return `"샘플 ${label} ${index + 1}"`;
    if (name.includes("price") || name.includes("amount")) return String(10000 + index * 1000);
    if (name.includes("date")) return `"2024-01-0${index + 1}"`;

    return `"${label} ${index + 1}"`;
  };

  const mockItems = [0, 1].map(i => {
    const row = columns.map(col => `    ${col.name}: ${mockFieldValue(col, i)}`).join(",\n");
    return `  {
${row}
  }`;
  }).join(",\n");

  const mockData = `[
${mockItems}
]`;

  const hasActionCell = columns.some(col => col.cell?.type === "buttons" || col.cell?.type === "button");
  const handlers = hasActionCell ? `
  function editItem(item: ${pascalName}) {
    console.log("수정:", item);
  }

  function deleteItem(item: ${pascalName}) {
    console.log("삭제:", item);
  }
` : "";

  const columnCall = hasActionCell
    ? "columns(editItem, deleteItem)"
    : "columns";

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

export default function ${pascalName}PreviewPage() {
  const mockData = ${mockData};

  ${handlers}

  return (
    <LayoutShell>
      <h1 className="text-2xl font-bold mb-4">${title} Preview</h1>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">목록</TabsTrigger>
          <TabsTrigger value="form">등록</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>상품 목록</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <${pascalName}FilterBar onChange={() => {}} />
              <DataTable<${pascalName}> columns={${columnCall}} data={mockData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>신규 등록</CardTitle>
            </CardHeader>
            <CardContent>
              <${pascalName}Form />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </LayoutShell>
  );
}
`;
};