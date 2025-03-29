module.exports = function renderShadcnPreview(meta, pascalName) {
  const title = meta.title || pascalName;
  const columns = meta.columns || [];
  const name = meta.name;
  const storeImport = `use${pascalName}Store`;
  const fetchDetail = meta.edit?.fetchDetail;
  const deleteConfirm = meta.delete?.confirm;
  const deleteMessage = meta.delete?.message || "정말 삭제하시겠습니까?";
  const deleteOnSuccess = meta.delete?.onSuccess || "";

  const hasActionCell = columns.some(col => col.cell?.type === "buttons" || col.cell?.type === "button");

  const handlers = hasActionCell ? `
  async function editItem(item: ${pascalName}) {
    ${fetchDetail
      ? `const res = await fetch("/api/${name}/" + item.id);
    const data = await res.json();
    setSelectedItem(data);`
      : `setSelectedItem(item);`}
    setDialogOpen(true);
  }

  function deleteItem(item: ${pascalName}) {
    ${deleteConfirm ? `if (!confirm("${deleteMessage}")) return;` : ""}
    deleteMutation.mutate(item.id, {
      onSuccess: () => {
        ${deleteOnSuccess}
      }
    });
  }

  function handleRowClick(item: ${pascalName}) {
    setSelectedItem(item);
    setDrawerOpen(true);
  }
` : "";

  const filterHandler = `
  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFilter(name, value);
  }
`;

  const columnCall = hasActionCell
    ? "columns(editItem, deleteItem)"
    : "columns";

  return `
"use client"

import * as React from "react"
import LayoutShell from "@/shared/components/layout/LayoutShell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import ${pascalName}Form from "@/generated/components/${pascalName}/Form"
import ${pascalName}FilterBar from "@/generated/components/${pascalName}/FilterBar"
import { columns } from "@/generated/components/${pascalName}/columns"
import type { ${pascalName} } from "@/generated/components/${pascalName}/columns"

import { ${storeImport} } from "@/src/features/${name}/stores/store"
import { useGet${pascalName} } from "@/src/features/${name}/apis/useGet${pascalName}"
import { useDelete${pascalName} } from "@/src/features/${name}/apis/useDelete${pascalName}"
import { DataTable } from "@/shared/components/ui/DataTable"

export default function ${pascalName}PreviewPage() {
  const {
    filters, setFilter,
    setSelectedItem, resetSelectedItem,
    selectedItem
  } = ${storeImport}();
  const { data = [], isLoading } = useGet${pascalName}(filters);
  const deleteMutation = useDelete${pascalName}();
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  ${handlers}
  ${filterHandler}

  return (
    <LayoutShell>
      <h1 className="text-2xl font-bold mb-4">${title} 관리</h1>

      <div className="flex justify-between items-center mb-4">
        <${pascalName}FilterBar onChange={handleFilterChange} />
        <Button onClick={() => {
          resetSelectedItem();
          setDialogOpen(true);
        }}>
          + 등록
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>${title} 목록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable<${pascalName}>
            columns={${columnCall}}
            data={data}
            onRowClick={handleRowClick}
            selectedId={selectedItem?.id}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{/* 등록 vs 수정 */}</DialogTitle>
          </DialogHeader>
          <${pascalName}Form onSuccess={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>상세 정보</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
              {JSON.stringify(selectedItem, null, 2)}
            </pre>
          </div>
        </DrawerContent>
      </Drawer>
    </LayoutShell>
  );
}
`;
};