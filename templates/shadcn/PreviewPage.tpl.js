module.exports = function renderShadcnPreview(meta, pascalName) {
  const pageName = meta.name;
  const title = meta.title || pascalName;
  const columns = meta.columns || [];

  const mockFieldValue = (col) => {
    const name = col.name.toLowerCase();
    const label = col.label || col.name;
    if (name.includes("id")) return `"${col.name.toUpperCase()}-001"`;
    if (name.includes("name")) return `"샘플 ${label}"`;
    if (name.includes("price") || name.includes("amount")) return "9900";
    if (name.includes("date")) return `"2024-01-01"`;
    return `"${label} 값"`;
  };

  const mockItem = columns.map((col) => `    ${col.name}: ${mockFieldValue(col)}`).join(",\n");
  const mockData = `[
  {
${mockItem}
  },
  {
${mockItem}
  }
]`;

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

export default function ${pascalName}PreviewPage() {
  const mockData = ${mockData};

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
              <DataTable columns={columns} data={mockData} />
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