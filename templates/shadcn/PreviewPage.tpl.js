module.exports = function renderPreviewPage(meta, pascalName) {
  const name = meta.name;
  const title = meta.title;

  return `
"use client"

import * as React from "react";
import LayoutShell from "@/shared/components/layout/LayoutShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import ${pascalName}Form from "@/generated/components/${pascalName}/Form";
import ${pascalName}FilterBar from "@/generated/components/${pascalName}/FilterBar";
import { columns } from "@/generated/components/${pascalName}/columns";
import type { ${pascalName} } from "@/generated/components/${pascalName}/columns";

import { use${pascalName}Store } from "@/src/features/${name}/stores/store";
import { useGet${pascalName} } from "@/src/features/${name}/apis/useGet${pascalName}";
import { useDelete${pascalName} } from "@/src/features/${name}/apis/useDelete${pascalName}";
import { DataTable } from "@/shared/components/ui/DataTable";
import { Pagination } from "@/shared/components/ui/Pagination";
import { SkeletonRow } from "@/shared/components/ui/SkeletonRow";

export default function ${pascalName}PreviewPage() {
  const {
    queryParams,
    setFilter,
    setSelectedItem,
    resetSelectedItem,
    selectedItem,
    applyFilters
  } = use${pascalName}Store();

  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [isQueried, setIsQueried] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useGet${pascalName}({ ...queryParams, page }, {
    enabled: isQueried
  });

  function handleSearch() {
    applyFilters();
    setIsQueried(true);
  }

  function editItem(item: ${pascalName}) {
    setSelectedItem(item);
    setDialogOpen(true);
  }

  function deleteItem(item: ${pascalName}) {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    useDelete${pascalName}().mutate(item.id, {
      onSuccess: () => {
        toast.success("삭제가 완료되었습니다.");
      }
    });
  }

  function handleRowClick(item: ${pascalName}) {
    setSelectedItem(item);
    setDrawerOpen(true);
  }

  return (
    <LayoutShell>
      <h1 className="text-2xl font-bold mb-4">${title}</h1>

      <${pascalName}FilterBar onSearch={handleSearch} />

      <div className="flex justify-end mb-4">
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
          {isLoading ? (
            <SkeletonRow />
          ) : data?.items?.length === 0 ? (
            <div className="text-sm text-muted-foreground">데이터가 없습니다.</div>
          ) : (
            <>
              <DataTable<${pascalName}>
                columns={columns(editItem, deleteItem)}
                data={data?.items ?? []}
                onRowClick={handleRowClick}
                selectedId={selectedItem?.id}
              />
              {data?.totalPages > 1 && (
                <Pagination
                  page={data.page}
                  totalPages={data.totalPages}
                  onPageChange={(p) => setPage(p)}
                />
              )}
            </>
          )}
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