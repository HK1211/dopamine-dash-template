
"use client"

import * as React from "react"
import LayoutShell from "@/shared/components/layout/LayoutShell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ProductsForm from "@/generated/components/Products/Form"
import ProductsFilterBar from "@/generated/components/Products/FilterBar"
import { DataTable } from "@/shared/components/ui/DataTable"
import { columns } from "@/generated/components/Products/columns"
import type { Products } from "@/generated/components/Products/columns"

import { useProductsFilterStore } from "@/src/features/products/stores/filterStore"
import { useGetProducts } from "@/src/features/products/apis/useGetProducts"

export default function ProductsPreviewPage() {
  const { filters, setFilter } = useProductsFilterStore();
  const { data = [], isLoading } = useGetProducts(filters);

  
  function editItem(item: Products) {
    console.log("수정:", item);
  }

  function deleteItem(item: Products) {
    console.log("삭제:", item);
  }


  
  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFilter(name, value);
  }


  return (
    <LayoutShell>
      <h1 className="text-2xl font-bold mb-4">상품 관리 Preview</h1>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">목록</TabsTrigger>
          <TabsTrigger value="form">등록</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>상품 관리</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProductsFilterBar onChange={handleFilterChange} />
              <DataTable<Products> columns={columns(editItem, deleteItem)} data={data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>신규 등록</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductsForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </LayoutShell>
  );
}
