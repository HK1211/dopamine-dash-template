
"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const schema = z.object({
  name: z.string().nonempty().min(2).max(50).regex(/^[가-힣a-zA-Z0-9\s]+$/, "상품명은 2~50자, 한글/영문/숫자만 입력하세요."),
  price: z.number().min(0).max(10000000),
  category: z.string().nonempty(),
  description: z.string().nonempty()
});

export default function ProductsForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {}
  });

  function onSubmit(values) {
    console.log(values);
  }

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>상품명</FormLabel>
            <FormControl>
              <Input type="text" placeholder="상품명" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>가격</FormLabel>
            <FormControl>
              <Input type="number" placeholder="가격" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>카테고리</FormLabel>
            <FormControl>
              <select {...field} className="border px-3 py-2 rounded-md">
        <option value="전자">전자</option>
        <option value="의류">의류</option>
        <option value="식품">식품</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>설명</FormLabel>
            <FormControl>
              <Input type="text" placeholder="설명" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <Button type="submit">저장</Button>
      </form>
    </Form>
  );
}
