
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
import { toast } from "sonner"
import { useCreateBrands } from "@/src/features/brands/apis/useCreateBrands"
import { useUpdateBrands } from "@/src/features/brands/apis/useUpdateBrands"
import { useBrandsStore } from "@/src/features/brands/stores/store"

const schema = z.object({
  name: z.string().nonempty()
});

type FormSchema = z.infer<typeof schema>;

interface Props {
  onSuccess?: () => void;
}

export default function BrandsForm({ onSuccess }: Props) {
  const {
    selectedItem,
    isEditMode,
    resetSelectedItem
  } = useBrandsStore();

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: selectedItem ?? {
    name: ""
    }
  });

  const create = useCreateBrands();
  const update = useUpdateBrands();

  function handleSubmit(values: FormSchema) {
    const action = isEditMode ? update : create;
    action.mutate(values, {
      onSuccess: () => {
        toast.success(`${title} ${isEditMode ? "수정" : "등록"} 완료`);
        form.reset();
        resetSelectedItem();
        onSuccess?.();
      }
    });
  }

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>브랜드명</FormLabel>
            <FormControl>
              <Input type="text" placeholder="브랜드명" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <Button type="submit" disabled={create.isPending || update.isPending}>
          {isEditMode ? "수정" : "저장"}
        </Button>
      </form>
    </Form>
  );
}
