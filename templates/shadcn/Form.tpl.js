module.exports = function renderShadcnForm(meta, pascalName) {
  const fields = meta.form || [];

  const zodFields = fields
    .map((field) => {
      const name = field.name;
      const v = field.validation || {};
      const isNumber = field.type === "number";
      const type = isNumber ? "z.number()" : "z.string()";
      const rules = [];

      if (v.required !== false) {
        if (isNumber) {
          rules.push(".min(0)");
        } else {
          rules.push(".nonempty()");
        }
      }

      if (v.minLength) rules.push(`.min(${v.minLength})`);
      if (v.maxLength) rules.push(`.max(${v.maxLength})`);
      if (v.pattern) rules.push(`.regex(/${v.pattern}/, "${v.message || ""}")`);
      if (v.min) rules.push(`.min(${v.min})`);
      if (v.max) rules.push(`.max(${v.max})`);

      return `  ${name}: ${type}${rules.join("")}`;
    })
    .join(",\n");

  const defaultValues = fields
    .map((field) => {
      const defaultValue =
        field.type === "number" ? "0" : field.type === "select" ? '""' : field.type === "textarea" ? '""' : '""';
      return `    ${field.name}: ${defaultValue}`;
    })
    .join(",\n  ");

  const inputs = fields
    .map((field) => {
      if (field.type === "select") {
        const isDynamic = field.options?.source === "api";
        const optionsVar = field.name + "Options";
        const optionMap = isDynamic
          ? `        {${optionsVar}.map(opt => <option key={opt.${field.options?.valueKey}} value={opt.${field.options?.valueKey}}>{opt.${field.options?.labelKey}}</option>)}`
          : (field.options?.data || []).map((opt) => `        <option value="${opt}">${opt}</option>`).join("\n");

        return `
      <FormField
        control={form.control}
        name="${field.name}"
        render={({ field }) => (
          <FormItem>
            <FormLabel>${field.label}</FormLabel>
            <FormControl>
              <select {...field} className="border px-3 py-2 rounded-md">
${optionMap}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />`;
      }

      const inputType = field.type === "number" ? "number" : "text";
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
    })
    .join("\n");

  const dynamicFetches = fields
    .filter((f) => f.type === "select" && f.options?.source === "api")
    .map((f) => {
      const varName = f.name + "Options";
      const setFn = "set" + f.name.charAt(0).toUpperCase() + f.name.slice(1) + "Options";
      return `const [${varName}, ${setFn}] = React.useState([]);
  React.useEffect(() => {
    fetch("${f.options.url}")
      .then(res => res.json())
      .then(data => ${setFn}(data));
  }, []);`;
    })
    .join("\n\n");

  return `
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
${zodFields}
});

type FormSchema = z.infer<typeof schema>;

export default function ${pascalName}Form() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
  ${defaultValues}
    }
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
  }

  ${dynamicFetches}

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
