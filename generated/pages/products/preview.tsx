
"use client"

import * as React from "react"
import LayoutShell from "@/shared/components/layout/LayoutShell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import ProductsForm from "@/generated/components/Products/Form"
import ProductsFilterBar from "@/generated/components/Products/FilterBar"
import { DataTable } from "@/shared/components/ui/DataTable"
import { columns } from "@/generated/components/Products/columns"
import type { Products } from "@/generated/components/Products/columns"

import { useProductsStore } from "@/src/features/products/stores/store"
import { useGetProducts } from "@/src/features/products/apis/useGetProducts"
import { useDeleteProducts } from "@/src/features/products/apis/useDeleteProducts"

export default function ProductsPreviewPage() {
  const { filters, setFilter, setSelectedItem, resetSelectedItem } = useProductsStore();
  const { data = [], isLoading } = useGetProducts(filters);
  const deleteMutation = useDeleteProducts();
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  
  async function editItem(item: Products) {
    setSelectedItem(item);
    setDialogOpen(true);
  }

  function deleteItem(item: Products) {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    deleteMutation.mutate(item.id, {
      onSuccess: () => {
        toast.success('삭제가 완료되었습니다.')
      }
    });
  }

  
  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFilter(name, value);
  }


  return (
    <LayoutShell>
      <h1 className="text-2xl font-bold mb-4">상품 관리 관리</h1>

      <div className="flex justify-between items-center mb-4">
        <ProductsFilterBar onChange={handleFilterChange} />
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
          <DataTable<Products> columns={columns(editItem, deleteItem)} data={data} />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{/* 수정 vs 등록 */}</DialogTitle>
          </DialogHeader>
          <ProductsForm onSuccess={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </LayoutShell>
  );
}
