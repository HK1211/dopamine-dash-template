
"use client"

import * as React from "react";
import LayoutShell from "@/shared/components/layout/LayoutShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import ProductsForm from "@/generated/components/Products/Form";
import ProductsFilterBar from "@/generated/components/Products/FilterBar";
import { columns } from "@/generated/components/Products/columns";
import type { Products } from "@/generated/components/Products/columns";

import { useProductsStore } from "@/src/features/products/stores/store";
import { useGetProducts } from "@/src/features/products/apis/useGetProducts";
import { useDeleteProducts } from "@/src/features/products/apis/useDeleteProducts";
import { DataTable } from "@/shared/components/ui/DataTable";
import { Pagination } from "@/shared/components/ui/Pagination";
import { SkeletonRow } from "@/shared/components/ui/SkeletonRow";

export default function ProductsPreviewPage() {
  const {
    queryParams,
    setFilter,
    setSelectedItem,
    resetSelectedItem,
    selectedItem,
    applyFilters
  } = useProductsStore();

  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [isQueried, setIsQueried] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useGetProducts({ ...queryParams, page }, {
    enabled: isQueried
  });

  function handleSearch() {
    applyFilters();
    setIsQueried(true);
  }

  function editItem(item: Products) {
    setSelectedItem(item);
    setDialogOpen(true);
  }

  function deleteItem(item: Products) {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    useDeleteProducts().mutate(item.id, {
      onSuccess: () => {
        toast.success("삭제가 완료되었습니다.");
      }
    });
  }

  function handleRowClick(item: Products) {
    setSelectedItem(item);
    setDrawerOpen(true);
  }

  return (
    <LayoutShell>
      <h1 className="text-2xl font-bold mb-4">상품 관리</h1>

      <ProductsFilterBar onSearch={handleSearch} />

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
          <CardTitle>상품 관리 목록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <SkeletonRow />
          ) : data?.items?.length === 0 ? (
            <div className="text-sm text-muted-foreground">데이터가 없습니다.</div>
          ) : (
            <>
              <DataTable<Products>
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
          <ProductsForm onSuccess={() => setDialogOpen(false)} />
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
