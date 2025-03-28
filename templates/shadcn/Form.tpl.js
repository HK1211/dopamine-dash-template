module.exports = function renderShadcnForm(meta, pascalName) {
  const fields = meta.form || [];

  const zodFields = fields.map((field) => {
    const name = field.name;
    const v = field.validation || {};
    const isNumber = field.type === 'number';
    const type = isNumber ? 'z.number()' : 'z.string()';
    const rules = [];

    if (v.required !== false) {
      if (isNumber) {
        rules.push('.min(0)');
      } else {
        rules.push('.nonempty()');
      }
    }

    if (v.minLength) rules.push(`.min(${v.minLength})`);
    if (v.maxLength) rules.push(`.max(${v.maxLength})`);
    if (v.pattern) rules.push(`.regex(/${v.pattern}/, "${v.message || ''}")`);
    if (v.min) rules.push(`.min(${v.min})`);
    if (v.max) rules.push(`.max(${v.max})`);

    return `  ${name}: ${type}${rules.join('')}`;
  }).join(',\n');

  const inputs = fields.map((field) => {
    const inputType = field.type === 'number' ? 'number' : 'text';
    return `
      <FormField
        control={form.control}
        name="${field.name}"
        render={({ field }) => (
          <FormItem>
            <FormLabel>${field.label}</FormLabel>
            <FormControl>
              <Input type="${inputType}" placeholder="${field.label}" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />`;
  }).join('\n');

  return `
"use client"

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
${zodFields}
});

export default function ${pascalName}Form() {
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
        ${inputs}
        <Button type="submit">저장</Button>
      </form>
    </Form>
  );
}
`;
};