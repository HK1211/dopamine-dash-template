# 프로젝트 파일 구조 (파트 1)

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\ai\agent.js

```
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateComponent(aiPrompt, name) {
  const promptTemplate = fs.readFileSync("ai/promptTemplates/component.prompt.txt", "utf-8");
  const fullPrompt = promptTemplate.replace("{{aiPrompt}}", aiPrompt);

  const chat = await openai.chat.completions.create({
    model: process.env.MODEL || "gpt-4",
    messages: [
      { role: "system", content: "당신은 React 전문가입니다." },
      { role: "user", content: fullPrompt },
    ],
    temperature: 0.2,
  });

  const code = chat.choices[0]?.message?.content;
  const filePath = path.join("generated", "ai", `${name}GeneratedComponent.tsx`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, code);
  console.log(`✅ AI 컴포넌트 생성 완료: ${filePath}`);
}

module.exports = { generateComponent };

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\ai\promptTemplates\component.prompt.txt

```
다음은 화면 구성 설명입니다:

{{aiPrompt}}

이 내용을 기반으로, React 컴포넌트 (함수형, TypeScript, Tailwind 포함) 코드를 작성해주세요.
컴포넌트는 export default로 내보내고, 필요한 상태 관리나 기본 UI 스타일도 포함해주세요.
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\button.tsx

```
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\card.tsx

```
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\dialog.tsx

```
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\drawer.tsx

```
"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\form.tsx

```
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\input.tsx

```
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\label.tsx

```
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\README.md

```
# 컴포넌트 추가 예시

```bash
npx shadcn@latest init
npx shadcn@latest add input button form
```

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\select.tsx

```
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\table.tsx

```
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\tabs.tsx

```
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\textarea.tsx

```
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\docs\dopamine-dash-template-docs-notion.md

```
# 🧠 dopamine-dash-template 프로젝트 소개

---

## 🎯 프로젝트 목적

**dopamine-dash-template**는 `meta.json` 하나만 작성하면  
Next.js + Tailwind 기반의 실전용 CRUD 대시보드 UI를  
자동으로 생성해주는 프론트엔드 자동화 프레임워크입니다.

- Form, Filter, Table, Preview, Dialog, Drawer 등 UI 전 구성 자동 생성
- Zustand, react-query 기반 상태 관리/데이터 요청 자동 구성
- meta 기반으로 API 및 mock 데이터까지 자동 생성
- 사용자 정의 가능한 템플릿 확장 구조

---

## 💡 개발 철학

| 원칙              | 설명                                       |
| ----------------- | ------------------------------------------ |
| **Meta-first**    | 프론트 UI의 설계와 흐름을 선언형으로 설계  |
| **자동화 중심**   | 코드 작성이 아닌 DSL 기반 코드 생성        |
| **사용자 친화적** | 디자이너, 기획자, 개발자 누구나 참여 가능  |
| **UX/DX 우선**    | 실무에서 자주 쓰는 흐름과 피드백 자동 반영 |

---

## 🧩 프로젝트 구성요소

| 경로                      | 설명                                           |
| ------------------------- | ---------------------------------------------- |
| `meta/products.meta.json` | 이 화면의 모든 정의서 (UI/UX 흐름 포함)        |
| `templates/shadcn/`       | 컴포넌트/페이지 생성용 템플릿                  |
| `scripts/`                | meta를 읽어 실제 파일을 생성하는 코드          |
| `src/features/[name]/...` | 생성된 코드들이 도메인 기준으로 정리됨         |
| `src/app/api/...`         | API 자동 생성 결과물                           |
| `src/lib/mock/`           | faker 기반 mock 서비스 (UI 및 API 양방향 대응) |

---

## 📘 meta.json 구조 및 필드 설명

모든 자동화는 이 meta.json에서 시작합니다.  
아래는 각 필드의 의미와 사용 가능한 value에 대한 상세 설명입니다.

👉 다음 메시지에서 meta.json 필드 설명 이어집니다.

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\docs\expansion.md

```
# ✨ 다음에 고려할 수 있는 확장

Form의 defaultValues 자동 생성

shadcn preview 레이아웃 자동 적용

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\docs\meta-json-advanced-select-validation.md

```
# 📌 meta.json의 select 필드 고급 validation 및 확장 기능

---

## 🔐 select 타입 유효성 검사 정리

`form[].type === "select"` 또는 `filters[].type === "select"`인 경우,  
다음과 같은 고급 유효성 검사 및 사용자 제어 기능이 가능합니다.

---

### ✅ allowedValues

> 사용자가 선택 가능한 **값을 제한**합니다.  
> API에서 불안정한 데이터를 받아오는 경우,  
> or DB enum과 정합성을 맞추고 싶은 경우 매우 유용합니다.

```json
{
  "name": "status",
  "label": "상태",
  "type": "select",
  "options": {
    "source": "api",
    "url": "/api/statuses",
    "labelKey": "label",
    "valueKey": "code"
  },
  "validation": {
    "allowedValues": ["active", "inactive", "soldout"],
    "message": "유효하지 않은 상태입니다."
  }
}
```

- 값이 allowedValues 배열에 없으면 유효성 실패
- 추후 DB enum 대응 시에도 일관된 값 유지 가능

---

### ✅ defaultValue

> 최초 렌더링 시 선택되어 있어야 할 기본값을 지정합니다.  
> 예를 들어 `"전체"`나 `"active"` 등의 초기값이 필요한 경우 사용합니다.

```json
{
  "name": "category",
  "label": "카테고리",
  "type": "select",
  "defaultValue": "전체",
  "options": {
    "source": "static",
    "data": ["전체", "전자", "의류"]
  }
}
```

---

### ✅ readonlyOptions

> 관리자에 의해 고정된 옵션 목록을 UI에 표시합니다.  
> 사용자 선택은 허용하지 않고 값만 보여주고 싶을 때 사용합니다.

```json
{
  "name": "systemCode",
  "label": "시스템 코드",
  "type": "select",
  "readonlyOptions": true,
  "options": {
    "source": "static",
    "data": ["ADMIN", "USER", "GUEST"]
  }
}
```

- UI에서는 `<select disabled>` 혹은 `<input readonly value="ADMIN" />` 형식으로 출력

---

## ✅ 기대 효과

| 기능 | 효과 |
|------|------|
| `allowedValues` | 서버에서 보내준 옵션 외 유효성 강화 가능 |
| `defaultValue` | 사용자 경험 향상, 초기 필터링 UX 강화 |
| `readonlyOptions` | 권한에 따른 고정 출력, 관리 설정 대응 가능 |

---

이 확장들을 통해 `meta.json`은  
단순한 UI 구조를 넘어서, **입력 유효성 + 정책 표현 + UX 설정까지 모두 커버하는 DSL**이 됩니다.
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\docs\meta-json-field-spec-detailed.md

```
# 📘 meta.json 필드 상세 설명서 (실용적인 예시 중심)

---

## 🧱 기본 구조

```json
{
  "type": "crud",
  "name": "products",
  "title": "상품 관리",
  ...
}
```

---

## 🔹 `filters[]` 필드

사용자 조회 조건을 구성하는 영역.  
필드는 상단에 렌더링되며, 입력한 값이 자동으로 API query로 연결됩니다.

### ✅ 공통 속성

| 필드 | 필수 | 설명 |
|------|------|------|
| `name` | ✅ | 상태/쿼리 키 이름 (state, querystring 등에 사용됨) |
| `label` | ✅ | 필터 영역에 표시할 라벨 |
| `type` | ✅ | `"text"` 또는 `"select"` |
| `options` | ⛔ (`type === 'select'`일 때만 필수) | select 옵션 구성 |

### ✅ `type` 값과 동적 필드 구성

| type | 설명 | 필수 하위 필드 |
|------|------|----------------|
| `"text"` | 일반 텍스트 입력 필터 | 없음 |
| `"select"` | 드롭다운 필터 | `options.source` 및 `options.data` 또는 `options.url` |

---

### 🔸 예시 1: 정적 select

```json
{
  "name": "category",
  "label": "카테고리",
  "type": "select",
  "options": {
    "source": "static",
    "data": ["전자", "의류", "식품"]
  }
}
```

---

### 🔸 예시 2: API 기반 select

```json
{
  "name": "brand",
  "label": "브랜드",
  "type": "select",
  "options": {
    "source": "api",
    "url": "/api/brands",
    "labelKey": "name",
    "valueKey": "id"
  }
}
```

> source가 `"api"`일 경우 반드시 `url`이 필요하고,  
> 응답 객체는 배열이며, 각각의 label/value는 지정된 키에서 가져옵니다.

---

## 🔹 `form[]` 필드

Form 입력 필드 정의 영역.  
타입에 따라 동적으로 컴포넌트가 렌더링되며, yup/zod 기반 validation이 자동 적용됩니다.

### ✅ 공통 속성

| 필드 | 필수 | 설명 |
|------|------|------|
| `name` | ✅ | 상태/전송 키 이름 |
| `label` | ✅ | 폼에 표시할 제목 |
| `type` | ✅ | `"text"`, `"number"`, `"textarea"`, `"select"` 등 |
| `required` | ⛔ | 필수 여부 (기본값: true) |
| `validation` | ⛔ | 필드 타입에 따라 동적 validation 설정 |
| `options` | ⛔ (`type === 'select'`일 때만 필수) | select 구성 옵션

### ✅ type별 지원 값 및 조건

| type | 컴포넌트 | 필수 하위 필드 |
|------|----------|----------------|
| `"text"` | `<input type="text" />` | 없음 |
| `"number"` | `<input type="number" />` | 없음 |
| `"textarea"` | `<textarea />` | 없음 |
| `"select"` | `<select>` | `options.source`, `options.data` or `options.url` |

---

### 🔸 예시 3: Validation 포함 number 필드

```json
{
  "name": "price",
  "label": "가격",
  "type": "number",
  "validation": {
    "min": 0,
    "max": 1000000
  }
}
```

---

### 🔸 예시 4: select 필드 (API 기반)

```json
{
  "name": "status",
  "label": "상태",
  "type": "select",
  "options": {
    "source": "api",
    "url": "/api/statuses",
    "labelKey": "label",
    "valueKey": "code"
  }
}
```

---

## ✅ 동적 필드 구성 원칙

1. `type` 필드가 `select`일 경우 → `options`가 반드시 존재해야 함
2. `options.source === 'api'`일 경우 → 반드시 `url` 지정
3. `options.source === 'static'`일 경우 → `data: []` 배열 필수
4. `validation`은 타입에 따라 동적 분기 적용됨

---

📌 이 구조를 기반으로 dopamine-dash는 **UI 구성, 상태 생성, validation, API, mock**까지 모두 자동화됩니다.
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\docs\meta-json-field-spec-notion.md

```
# 📘 meta.json 필드 상세 설명서

---

## 🧱 기본 구조

```json
{
  "type": "crud",
  "name": "products",
  "title": "상품 관리",
  "path": "/products",
  "description": "...",
  "api": { ... },
  "filters": [ ... ],
  "columns": [ ... ],
  "form": [ ... ],
  "buttons": { "top": [...], "bottom": [...] },
  "edit": { "fetchDetail": true },
  "delete": { "confirm": true, ... },
  "mock": { "enabled": true, "rows": 5, ... },
  "aiPrompt": "..."
}
```

---

## 🔹 공통 메타 정보

| 필드 | 설명 |
|------|------|
| `type` | 화면 유형. 보통 `"crud"` |
| `name` | 이 화면의 키. 디렉토리, 함수명 등에 사용됨 |
| `title` | 페이지 제목 및 헤더에 표시될 이름 |
| `path` | Next.js 라우트 경로 |
| `description` | 이 화면에 대한 설명 (문서/Agent용) |

---

## 🔹 api

```json
"api": {
  "baseUrl": "/api/products",
  "methods": {
    "get": "GET",
    "post": "POST",
    "put": "PUT",
    "delete": "DELETE"
  }
}
```

- CRUD API가 자동 생성됨
- `baseUrl` 기준으로 `/route.ts` 파일 생성됨

---

## 🔹 filters

```json
"filters": [
  {
    "name": "category",
    "label": "카테고리",
    "type": "select",
    "options": {
      "source": "static", // or "api"
      "data": ["전자", "의류"]
    }
  }
]
```

| 필드 | 설명 |
|------|------|
| `type` | `"text"` / `"select"` 등 |
| `options.source` | `"static"` 또는 `"api"` |
| `options.url` | `"api/brands"` (source가 api일 경우 필수) |
| `label` | UI에 표시할 이름 |

---

## 🔹 form

```json
"form": [
  {
    "name": "price",
    "type": "number",
    "label": "가격",
    "required": true,
    "validation": {
      "min": 0,
      "max": 100000
    }
  }
]
```

| 필드 | 설명 |
|------|------|
| `type` | `"text"`, `"number"`, `"select"`, `"textarea"` |
| `required` | 필수 여부 (true/false) |
| `validation.min`, `.max` | 숫자형일 경우 허용 범위 |
| `validation.minLength`, `.pattern` | 문자열일 경우 검증 규칙 |
| `options.source` | selectbox의 옵션을 API에서 받아오는 경우 `"api"` 지정 |

---

## 🔹 columns

```json
"columns": [
  { "name": "name", "label": "상품명" },
  {
    "name": "status",
    "label": "상태",
    "cell": {
      "type": "badge",
      "map": {
        "active": "green",
        "inactive": "gray"
      }
    }
  }
]
```

- 테이블에 표시할 컬럼 목록
- `cell.type`을 통해 badge, 버튼 등 custom 렌더링 가능

---

## 🔹 buttons

```json
"buttons": {
  "top": ["add", "delete"],
  "bottom": ["save", "cancel"]
}
```

- 각 위치에 버튼 정의 가능
- 자동으로 상단/하단에 버튼 그룹 렌더링됨

---

## 🔹 edit

```json
"edit": {
  "fetchDetail": true
}
```

- 수정 버튼 클릭 시 상세 조회 API 호출 여부
- `false`인 경우 row.original만으로 수정 가능

---

## 🔹 delete

```json
"delete": {
  "confirm": true,
  "message": "정말 삭제하시겠습니까?",
  "onSuccess": "toast.success('삭제 완료')"
}
```

- 삭제 전 confirm 여부
- toast 메시지도 제어 가능

---

## 🔹 mock

```json
"mock": {
  "enabled": true,
  "rows": 10,
  "delay": 500,
  "source": "faker"
}
```

- mock 데이터 생성 여부
- rows: 개수
- delay: 응답 지연 시간
- source: "faker" 또는 "static"

---

## 🔹 aiPrompt

```json
"aiPrompt": "이 화면은 상품을 관리하는 CRUD 대시보드입니다..."
```

- AI Agent에게 이 페이지의 목적을 설명하기 위한 문맥 정보
- 문서 생성, 자동 설명, 테스트, i18n 키 추출 등에 활용 가능

---

✅ 이 구조를 기반으로 dopamine-dash는 전체 UI + 상태 + API + 문서 + 테스트까지 자동화됩니다.
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\docs\meta-json-spec-full.md

```
# 🧠 dopamine-dash-template 프로젝트 소개

---

## 🎯 프로젝트 목적

**dopamine-dash-template**는 `meta.json` 하나만 작성하면  
Next.js + Tailwind 기반의 실전용 CRUD 대시보드 UI를  
자동으로 생성해주는 프론트엔드 자동화 프레임워크입니다.

- Form, Filter, Table, Preview, Dialog, Drawer 등 UI 전 구성 자동 생성
- Zustand, react-query 기반 상태 관리/데이터 요청 자동 구성
- meta 기반으로 API 및 mock 데이터까지 자동 생성
- 사용자 정의 가능한 템플릿 확장 구조

---

## 💡 개발 철학

| 원칙              | 설명                                       |
| ----------------- | ------------------------------------------ |
| **Meta-first**    | 프론트 UI의 설계와 흐름을 선언형으로 설계  |
| **자동화 중심**   | 코드 작성이 아닌 DSL 기반 코드 생성        |
| **사용자 친화적** | 디자이너, 기획자, 개발자 누구나 참여 가능  |
| **UX/DX 우선**    | 실무에서 자주 쓰는 흐름과 피드백 자동 반영 |

---

## 🧩 프로젝트 구성요소

| 경로                      | 설명                                           |
| ------------------------- | ---------------------------------------------- |
| `meta/products.meta.json` | 이 화면의 모든 정의서 (UI/UX 흐름 포함)        |
| `templates/shadcn/`       | 컴포넌트/페이지 생성용 템플릿                  |
| `scripts/`                | meta를 읽어 실제 파일을 생성하는 코드          |
| `src/features/[name]/...` | 생성된 코드들이 도메인 기준으로 정리됨         |
| `src/app/api/...`         | API 자동 생성 결과물                           |
| `src/lib/mock/`           | faker 기반 mock 서비스 (UI 및 API 양방향 대응) |

---

## 📘 meta.json 구조 및 필드 설명

모든 자동화는 이 meta.json에서 시작합니다.  
아래는 각 필드의 의미와 사용 가능한 value에 대한 상세 설명입니다.

👉 다음 메시지에서 meta.json 필드 설명 이어집니다.

---

## 🧩 meta.json 전체 필드 설명서

## 📘 meta.json 필드 상세 설명서 (실용적인 예시 중심)

---

## 🧱 기본 구조

```json
{
  "type": "crud",
  "name": "products",
  "title": "상품 관리",
  ...
}
```

---

## 🔹 `filters[]` 필드

사용자 조회 조건을 구성하는 영역.  
필드는 상단에 렌더링되며, 입력한 값이 자동으로 API query로 연결됩니다.

### ✅ 공통 속성

| 필드      | 필수                                 | 설명                                               |
| --------- | ------------------------------------ | -------------------------------------------------- |
| `name`    | ✅                                   | 상태/쿼리 키 이름 (state, querystring 등에 사용됨) |
| `label`   | ✅                                   | 필터 영역에 표시할 라벨                            |
| `type`    | ✅                                   | `"text"` 또는 `"select"`                           |
| `options` | ⛔ (`type === 'select'`일 때만 필수) | select 옵션 구성                                   |

### ✅ `type` 값과 동적 필드 구성

| type       | 설명                  | 필수 하위 필드                                        |
| ---------- | --------------------- | ----------------------------------------------------- |
| `"text"`   | 일반 텍스트 입력 필터 | 없음                                                  |
| `"select"` | 드롭다운 필터         | `options.source` 및 `options.data` 또는 `options.url` |

---

### 🔸 예시 1: 정적 select

```json
{
  "name": "category",
  "label": "카테고리",
  "type": "select",
  "options": {
    "source": "static",
    "data": ["전자", "의류", "식품"]
  }
}
```

---

### 🔸 예시 2: API 기반 select

```json
{
  "name": "brand",
  "label": "브랜드",
  "type": "select",
  "options": {
    "source": "api",
    "url": "/api/brands",
    "labelKey": "name",
    "valueKey": "id"
  }
}
```

> source가 `"api"`일 경우 반드시 `url`이 필요하고,  
> 응답 객체는 배열이며, 각각의 label/value는 지정된 키에서 가져옵니다.

---

## 🔹 `form[]` 필드

Form 입력 필드 정의 영역.  
타입에 따라 동적으로 컴포넌트가 렌더링되며, yup/zod 기반 validation이 자동 적용됩니다.

### ✅ form 필드 공통 속성

| 필드         | 필수                                 | 설명                                              |
| ------------ | ------------------------------------ | ------------------------------------------------- |
| `name`       | ✅                                   | 상태/전송 키 이름                                 |
| `label`      | ✅                                   | 폼에 표시할 제목                                  |
| `type`       | ✅                                   | `"text"`, `"number"`, `"textarea"`, `"select"` 등 |
| `required`   | ⛔                                   | 필수 여부 (기본값: true)                          |
| `validation` | ⛔                                   | 필드 타입에 따라 동적 validation 설정             |
| `options`    | ⛔ (`type === 'select'`일 때만 필수) | select 구성 옵션                                  |

### ✅ type별 지원 값 및 조건

| type         | 컴포넌트                  | 필수 하위 필드                                    |
| ------------ | ------------------------- | ------------------------------------------------- |
| `"text"`     | `<input type="text" />`   | 없음                                              |
| `"number"`   | `<input type="number" />` | 없음                                              |
| `"textarea"` | `<textarea />`            | 없음                                              |
| `"select"`   | `<select>`                | `options.source`, `options.data` or `options.url` |

---

### 🔸 예시 3: Validation 포함 number 필드

```json
{
  "name": "price",
  "label": "가격",
  "type": "number",
  "validation": {
    "min": 0,
    "max": 1000000
  }
}
```

---

### 🔸 예시 4: select 필드 (API 기반)

```json
{
  "name": "status",
  "label": "상태",
  "type": "select",
  "options": {
    "source": "api",
    "url": "/api/statuses",
    "labelKey": "label",
    "valueKey": "code"
  }
}
```

---

## ✅ 동적 필드 구성 원칙

1. `type` 필드가 `select`일 경우 → `options`가 반드시 존재해야 함
2. `options.source === 'api'`일 경우 → 반드시 `url` 지정
3. `options.source === 'static'`일 경우 → `data: []` 배열 필수
4. `validation`은 타입에 따라 동적 분기 적용됨

---

📌 이 구조를 기반으로 dopamine-dash는 **UI 구성, 상태 생성, validation, API, mock**까지 모두 자동화됩니다.

---

## 🔧 select 필드 고급 validation 및 확장 기능

## 📌 meta.json의 select 필드 고급 validation 및 확장 기능

---

## 🔐 select 타입 유효성 검사 정리

`form[].type === "select"` 또는 `filters[].type === "select"`인 경우,  
다음과 같은 고급 유효성 검사 및 사용자 제어 기능이 가능합니다.

---

### ✅ allowedValues

> 사용자가 선택 가능한 **값을 제한**합니다.  
> API에서 불안정한 데이터를 받아오는 경우,  
> or DB enum과 정합성을 맞추고 싶은 경우 매우 유용합니다.

```json
{
  "name": "status",
  "label": "상태",
  "type": "select",
  "options": {
    "source": "api",
    "url": "/api/statuses",
    "labelKey": "label",
    "valueKey": "code"
  },
  "validation": {
    "allowedValues": ["active", "inactive", "soldout"],
    "message": "유효하지 않은 상태입니다."
  }
}
```

- 값이 allowedValues 배열에 없으면 유효성 실패
- 추후 DB enum 대응 시에도 일관된 값 유지 가능

---

### ✅ defaultValue

> 최초 렌더링 시 선택되어 있어야 할 기본값을 지정합니다.  
> 예를 들어 `"전체"`나 `"active"` 등의 초기값이 필요한 경우 사용합니다.

```json
{
  "name": "category",
  "label": "카테고리",
  "type": "select",
  "defaultValue": "전체",
  "options": {
    "source": "static",
    "data": ["전체", "전자", "의류"]
  }
}
```

---

### ✅ readonlyOptions

> 관리자에 의해 고정된 옵션 목록을 UI에 표시합니다.  
> 사용자 선택은 허용하지 않고 값만 보여주고 싶을 때 사용합니다.

```json
{
  "name": "systemCode",
  "label": "시스템 코드",
  "type": "select",
  "readonlyOptions": true,
  "options": {
    "source": "static",
    "data": ["ADMIN", "USER", "GUEST"]
  }
}
```

- UI에서는 `<select disabled>` 혹은 `<input readonly value="ADMIN" />` 형식으로 출력

---

## ✅ 기대 효과

| 기능              | 효과                                       |
| ----------------- | ------------------------------------------ |
| `allowedValues`   | 서버에서 보내준 옵션 외 유효성 강화 가능   |
| `defaultValue`    | 사용자 경험 향상, 초기 필터링 UX 강화      |
| `readonlyOptions` | 권한에 따른 고정 출력, 관리 설정 대응 가능 |

---

이 확장들을 통해 `meta.json`은  
단순한 UI 구조를 넘어서, **입력 유효성 + 정책 표현 + UX 설정까지 모두 커버하는 DSL**이 됩니다.

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\generated\components\Brands\FilterBar.tsx

```

"use client"

import * as React from "react"

export default function BrandsFilterBar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  

  return (
    <div className="flex flex-wrap gap-4">
      
      <div className="grid gap-1">
        <label className="text-sm font-medium">브랜드명</label>
        <input type="text" name="name" onChange={onChange} className="border px-3 py-2 rounded-md" />
      </div>
    </div>
  );
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\generated\components\Brands\Form.tsx

```

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

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\generated\components\Products\columns.tsx

```

import { ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

export type Products = {
  id: string;
  name: string;
  price: number;
  category: string;
  status: string;
  actions: string;
}

export const columns = (
  editItem: (row: Products) => void,
  deleteItem: (row: Products) => void
): ColumnDef<Products>[] => [

  {
    accessorKey: "id",
    header: "ID"
  },

  {
    accessorKey: "name",
    header: "상품명"
  },

  {
    accessorKey: "price",
    header: "가격"
  },

  {
    accessorKey: "category",
    header: "카테고리"
  },

  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const value = row.getValue("status") as string;
      const colorMap: Record<string, string> = {
      "active": "bg-green-100 text-green-800",
      "inactive": "bg-gray-100 text-gray-800",
      "soldout": "bg-red-100 text-red-800"
      };
      return (
        <span className={cn("px-2 py-1 text-xs rounded-full", colorMap[value] || "bg-muted")}>
          {value}
        </span>
      );
    }
  },

  {
    id: "actions",
    header: "관리",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          
          <button
            onClick={() => editItem(row.original)}
            className="text-white text-xs rounded px-2 py-1 bg-primary"
          >
            수정
          </button>
          <button
            onClick={() => deleteItem(row.original)}
            className="text-white text-xs rounded px-2 py-1 bg-red-500"
          >
            삭제
          </button>
        </div>
      );
    }
  }
]

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\generated\components\Products\FilterBar.tsx

```

"use client"

import * as React from "react"

export default function ProductsFilterBar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const [brandOptions, setBrandOptions] = React.useState<Array<Record<string, any>>>([]);

  React.useEffect(() => {
    fetch("/api/brands?ui=true")
      .then(res => res.json())
      .then(data => {
        // 배열인지 확인하고 설정
        if (Array.isArray(data)) {
          setBrandOptions(data);
        } else {
          console.error("데이터가 배열이 아닙니다:", data);
          setBrandOptions([]);
        }
      })
      .catch(err => {
        console.error("데이터를 불러오는데 실패했습니다:", err);
        setBrandOptions([]);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      
      <div className="grid gap-1">
        <label className="text-sm font-medium">카테고리</label>
        <select name="category" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
          <option value="전자">전자</option>
          <option value="의류">의류</option>
          <option value="식품">식품</option>
        </select>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">브랜드</label>
        <select name="brand" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
          {brandOptions.map((opt) => (
            <option key={opt["id"]} value={opt["id"]}>
              {opt["name"]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">상품명</label>
        <input type="text" name="name" onChange={onChange} className="border px-3 py-2 rounded-md" />
      </div>
    </div>
  );
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\generated\components\Products\Form.tsx

```

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
import { useCreateProducts } from "@/src/features/products/apis/useCreateProducts"
import { useUpdateProducts } from "@/src/features/products/apis/useUpdateProducts"
import { useProductsStore } from "@/src/features/products/stores/store"

const schema = z.object({
  name: z.string().nonempty().min(2).max(50).regex(/^[가-힣a-zA-Z0-9\s]+$/, "상품명은 2~50자, 한글/영문/숫자만 입력하세요."),
  price: z.number().min(0).max(10000000),
  category: z.string().nonempty(),
  description: z.string().nonempty()
});

type FormSchema = z.infer<typeof schema>;

interface Props {
  onSuccess?: () => void;
}

export default function ProductsForm({ onSuccess }: Props) {
  const {
    selectedItem,
    isEditMode,
    resetSelectedItem
  } = useProductsStore();

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: selectedItem ?? {
    name: "",
    price: 0,
    category: "",
    description: ""
    }
  });

  const create = useCreateProducts();
  const update = useUpdateProducts();

  function handleSubmit(values: FormSchema) {
    const action = isEditMode ? update : create;
    action.mutate(values, {
      onSuccess: () => {
        toast.success(`${values.name} ${isEditMode ? "수정" : "등록"} 완료`);
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
        <Button type="submit" disabled={create.isPending || update.isPending}>
          {isEditMode ? "수정" : "저장"}
        </Button>
      </form>
    </Form>
  );
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\generated\pages\brands\preview.tsx

```

"use client"

import * as React from "react"
import LayoutShell from "@/shared/components/layout/LayoutShell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import BrandsForm from "@/generated/components/Brands/Form"
import BrandsFilterBar from "@/generated/components/Brands/FilterBar"
import { columns } from "@/generated/components/Brands/columns"
import type { Brands } from "@/generated/components/Brands/columns"

import { useBrandsStore } from "@/src/features/brands/stores/store"
import { useGetBrands } from "@/src/features/brands/apis/useGetBrands"
import { useDeleteBrands } from "@/src/features/brands/apis/useDeleteBrands"
import { DataTable } from "@/shared/components/ui/DataTable"

export default function BrandsPreviewPage() {
  const {
    filters, setFilter,
    setSelectedItem, resetSelectedItem,
    selectedItem
  } = useBrandsStore();
  const { data = [], isLoading } = useGetBrands(filters);
  const deleteMutation = useDeleteBrands();
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  
  async function editItem(item: Brands) {
    setSelectedItem(item);
    setDialogOpen(true);
  }

  function deleteItem(item: Brands) {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    deleteMutation.mutate(item.id, {
      onSuccess: () => {
        toast.success('삭제가 완료되었습니다.')
      }
    });
  }

  function handleRowClick(item: Brands) {
    setSelectedItem(item);
    setDrawerOpen(true);
  }

  
  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFilter(name, value);
  }


  return (
    <LayoutShell>
      <h1 className="text-2xl font-bold mb-4">브랜드 관리 관리</h1>

      <div className="flex justify-between items-center mb-4">
        <BrandsFilterBar onChange={handleFilterChange} />
        <Button onClick={() => {
          resetSelectedItem();
          setDialogOpen(true);
        }}>
          + 등록
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>브랜드 관리 목록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable<Brands>
            columns={columns(editItem, deleteItem)}
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
          <BrandsForm onSuccess={() => setDialogOpen(false)} />
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

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\generated\pages\products\preview.tsx

```

"use client"

import * as React from "react"
import LayoutShell from "@/shared/components/layout/LayoutShell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import ProductsForm from "@/generated/components/Products/Form"
import ProductsFilterBar from "@/generated/components/Products/FilterBar"
import { columns } from "@/generated/components/Products/columns"
import type { Products } from "@/generated/components/Products/columns"

import { useProductsStore } from "@/src/features/products/stores/store"
import { useGetProducts } from "@/src/features/products/apis/useGetProducts"
import { useDeleteProducts } from "@/src/features/products/apis/useDeleteProducts"
import { DataTable } from "@/shared/components/ui/DataTable"

export default function ProductsPreviewPage() {
  const {
    filters, setFilter,
    setSelectedItem, resetSelectedItem,
    selectedItem
  } = useProductsStore();
  const { data = [], isLoading } = useGetProducts(filters);
  const deleteMutation = useDeleteProducts();
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  
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

  function handleRowClick(item: Products) {
    setSelectedItem(item);
    setDrawerOpen(true);
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
          <DataTable<Products>
            columns={columns(editItem, deleteItem)}
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

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\lib\utils.ts

```
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\meta\brands.meta.json

```
{
  "type": "crud",
  "name": "brands",
  "title": "브랜드 관리",
  "path": "/brands",
  "description": "브랜드 정보를 관리할 수 있는 화면입니다.",
  "api": {
    "baseUrl": "/api/brands",
    "methods": {
      "get": "GET",
      "post": "POST",
      "put": "PUT",
      "delete": "DELETE"
    }
  },
  "filters": [
    {
      "name": "name",
      "label": "브랜드명",
      "type": "text"
    }
  ],
  "columns": [
    {
      "name": "id",
      "label": "ID"
    },
    {
      "name": "name",
      "label": "브랜드명"
    },
    {
      "name": "actions",
      "label": "관리",
      "cell": {
        "type": "buttons",
        "actions": [
          {
            "label": "수정",
            "onClick": "editItem"
          },
          {
            "label": "삭제",
            "onClick": "deleteItem",
            "variant": "destructive"
          }
        ]
      }
    }
  ],
  "form": [
    {
      "name": "name",
      "label": "브랜드명",
      "type": "text",
      "required": true
    }
  ],
  "buttons": {
    "top": ["add", "delete"],
    "bottom": ["save", "cancel"]
  },
  "edit": {
    "fetchDetail": false
  },
  "delete": {
    "confirm": true,
    "message": "정말로 삭제하시겠습니까?",
    "onSuccess": "toast.success('삭제가 완료되었습니다.')"
  },
  "mock": {
    "enabled": true,
    "rows": 10,
    "delay": 300,
    "source": "faker",
    "settings": {
      "pagination": {
        "defaultSize": 10,
        "maxSize": 20
      },
      "seed": 789
    }
  }
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\meta\customers.meta.json

```
{
  "type": "crud",
  "name": "customers",
  "title": "고객 관리",
  "path": "/customers",
  "description": "고객 정보를 추가, 수정, 삭제할 수 있는 화면입니다.",
  "api": {
    "baseUrl": "/api/customers",
    "methods": {
      "get": "GET",
      "post": "POST",
      "put": "PUT",
      "delete": "DELETE"
    }
  },
  "filters": [
    {
      "name": "customerType",
      "label": "고객 유형",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["개인", "기업", "공공기관"]
      }
    },
    {
      "name": "grade",
      "label": "등급",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["VIP", "Gold", "Silver", "Bronze"]
      }
    },
    {
      "name": "name",
      "label": "고객명",
      "type": "text"
    }
  ],
  "columns": [
    {
      "name": "id",
      "label": "고객 ID"
    },
    {
      "name": "name",
      "label": "고객명"
    },
    {
      "name": "phone",
      "label": "연락처"
    },
    {
      "name": "email",
      "label": "이메일"
    },
    {
      "name": "customerType",
      "label": "고객 유형"
    },
    {
      "name": "grade",
      "label": "등급",
      "cell": {
        "type": "badge",
        "map": {
          "VIP": "purple",
          "Gold": "amber",
          "Silver": "gray",
          "Bronze": "brown"
        }
      }
    },
    {
      "name": "actions",
      "label": "관리",
      "cell": {
        "type": "buttons",
        "actions": [
          {
            "label": "상세",
            "onClick": "viewItem"
          },
          {
            "label": "수정",
            "onClick": "editItem"
          },
          {
            "label": "삭제",
            "onClick": "deleteItem",
            "variant": "destructive"
          }
        ]
      }
    }
  ],
  "form": [
    {
      "name": "name",
      "label": "고객명",
      "type": "text",
      "required": true
    },
    {
      "name": "phone",
      "label": "연락처",
      "type": "tel",
      "validation": {
        "pattern": "^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$",
        "message": "올바른 전화번호 형식을 입력하세요 (예: 010-1234-5678)"
      }
    },
    {
      "name": "email",
      "label": "이메일",
      "type": "email"
    },
    {
      "name": "customerType",
      "label": "고객 유형",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["개인", "기업", "공공기관"]
      }
    },
    {
      "name": "grade",
      "label": "등급",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["VIP", "Gold", "Silver", "Bronze"]
      }
    },
    {
      "name": "address",
      "label": "주소",
      "type": "textarea"
    },
    {
      "name": "memo",
      "label": "메모",
      "type": "textarea"
    }
  ],
  "buttons": {
    "top": ["add", "delete"],
    "bottom": ["save", "cancel"]
  },
  "edit": {
    "fetchDetail": true
  },
  "delete": {
    "confirm": true,
    "message": "정말로 고객 정보를 삭제하시겠습니까?",
    "onSuccess": "toast.success('고객 정보가 삭제되었습니다.')"
  },
  "mock": {
    "enabled": true,
    "rows": 12,
    "delay": 400,
    "source": "faker",
    "settings": {
      "customerTypes": ["개인", "기업", "공공기관"],
      "grades": ["VIP", "Gold", "Silver", "Bronze"],
      "gradeProbability": {
        "VIP": 0.1,
        "Gold": 0.2,
        "Silver": 0.3,
        "Bronze": 0.4
      },
      "pagination": {
        "defaultSize": 8,
        "maxSize": 30
      },
      "seed": 789
    }
  }
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\meta\META-JSON-DESING-PRINCIPLES.md

```
# 🧠 meta.json 설계 철학 및 확장 전략

---

## 🎯 문서 목적

이 문서는 `meta.json`이 dopamine-dash-template 프로젝트에서 어떤 역할을 하고,  
어떤 철학을 기반으로 설계되었으며,  
다른 개발자 또는 AI와 협업 시 어떻게 확장성과 일관성을 유지할 수 있는지를 공유하기 위한 가이드입니다.

---

## 💡 meta.json의 존재 이유

- 단순한 JSON 설정이 아니라, UI/UX/DX/API 흐름 전체를 설계하는 DSL
- 팀 간의 커뮤니케이션 단위 → 기획/디자인/개발자 간 공유 가능한 **정의서**
- 코드 중심 사고가 아닌, 구조 중심의 선언형 설계

---

## 📐 설계 철학

| 원칙                       | 설명                                               |
| -------------------------- | -------------------------------------------------- |
| **Declarative DSL**        | 상태를 선언하면 구현은 자동으로 따라온다           |
| **UX-Driven**              | 기획/디자인 요구사항을 코드보다 먼저 반영          |
| **Extensible**             | 새로운 요구사항을 쉽게 수용할 수 있어야 한다       |
| **Meta-First, Code-Later** | meta가 우선, 생성된 코드는 파생물                  |
| **AI-Friendly**            | AI가 이해할 수 있는 문맥 구조 → prompt 구성 최적화 |

---

## 📦 설계 시 고려한 핵심 포인트

- 필드마다 `type`에 따라 필요한 속성이 다르다 → 동적 구조 지원
- `select`는 `source`가 `api`일 수도 있고, `static`일 수도 있다 → 공통 인터페이스 필요
- `validation`, `defaultValue`, `readonlyOptions`는 유형별로 의미가 달라진다 → 타입 기반 분기
- `aiPrompt`는 meta에 의미 부여 → Agent 또는 LLM 활용 기반

---

## 🔧 앞으로의 확장 가능성

| 기능                | 설계 방향                                |
| ------------------- | ---------------------------------------- |
| `grouping`, `tabs`  | Form layout 제어                         |
| `conditionalFields` | 조건부 필드 표시 (`if: field === value`) |
| `api.queryParamMap` | 상태 값을 API 파라미터에 매핑            |
| `i18nKeys`          | 각 label을 다국어 키로 연결              |
| `agent.note`        | 각 필드/화면에 대한 추가 AI context 설정 |

---

## 🧠 협업 또는 AI 적용 시 가이드

| 대상            | 적용 방식                                                              |
| --------------- | ---------------------------------------------------------------------- |
| 개발자          | meta를 기준으로 생성되는 코드를 이해하고 유지보수                      |
| 기획자/디자이너 | meta 일부만 수정해서 요구사항 반영 가능                                |
| AI Agent (LLM)  | `aiPrompt`, `form`, `columns` 등을 기반으로 요약/문서/테스트 생성 가능 |

---

## 🤝 팀 공유 시 추천 방식

- 이 문서를 팀 Notion이나 GitHub README에 포함
- `meta.json` 작성 시 항목 설명 툴팁 또는 문서 링크 삽입
- Slack 또는 Discord에서 meta 변경시 알림 + 리뷰 룰 지정

---

meta.json은 코드보다 먼저 제품의 구조를 설계하는 기준이며,  
앞으로 자동화 시스템이 발전할수록 이 구조의 역할은 더욱 중요해질 것입니다.

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\meta\products.meta.json

```
{
  "type": "crud",
  "name": "products",
  "title": "상품 관리",
  "path": "/products",
  "description": "상품 정보를 추가, 수정, 삭제할 수 있는 화면입니다.",
  "api": {
    "baseUrl": "/api/products",
    "methods": {
      "get": "GET",
      "post": "POST",
      "options": "OPTIONS"
    }
  },
  "filters": [
    {
      "name": "category",
      "label": "카테고리",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["전자", "의류", "식품"]
      }
    },
    {
      "name": "brand",
      "label": "브랜드",
      "type": "select",
      "options": {
        "source": "api",
        "url": "/api/brands",
        "labelKey": "name",
        "valueKey": "id"
      }
    },
    {
      "name": "name",
      "label": "상품명",
      "type": "text"
    }
  ],
  "columns": [
    {
      "name": "id",
      "label": "ID"
    },
    {
      "name": "name",
      "label": "상품명"
    },
    {
      "name": "price",
      "label": "가격"
    },
    {
      "name": "category",
      "label": "카테고리"
    },
    {
      "name": "status",
      "label": "상태",
      "cell": {
        "type": "badge",
        "map": {
          "active": "green",
          "inactive": "gray",
          "soldout": "red"
        }
      }
    },
    {
      "name": "actions",
      "label": "관리",
      "cell": {
        "type": "buttons",
        "actions": [
          {
            "label": "수정",
            "onClick": "editItem"
          },
          {
            "label": "삭제",
            "onClick": "deleteItem",
            "variant": "destructive"
          }
        ]
      }
    }
  ],
  "form": [
    {
      "name": "name",
      "label": "상품명",
      "type": "text",
      "required": true,
      "validation": {
        "minLength": 2,
        "maxLength": 50,
        "pattern": "^[가-힣a-zA-Z0-9\\s]+$",
        "message": "상품명은 2~50자, 한글/영문/숫자만 입력하세요."
      }
    },
    {
      "name": "price",
      "label": "가격",
      "type": "number",
      "validation": {
        "min": 0,
        "max": 10000000
      }
    },
    {
      "name": "category",
      "label": "카테고리",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["전자", "의류", "식품"]
      }
    },
    {
      "name": "description",
      "label": "설명",
      "type": "textarea"
    }
  ],
  "buttons": {
    "top": ["add", "delete"],
    "bottom": ["save", "cancel"]
  },
  "edit": {
    "fetchDetail": false
  },
  "delete": {
    "confirm": true,
    "message": "정말로 삭제하시겠습니까?",
    "onSuccess": "toast.success('삭제가 완료되었습니다.')"
  },
  "mock": {
    "enabled": true,
    "rows": 10,
    "delay": 500,
    "source": "faker",
    "settings": {
      "categories": ["전자", "의류", "식품", "가구", "도서"],
      "statusProbability": {
        "active": 0.7,
        "inactive": 0.2,
        "soldout": 0.1
      },
      "priceRange": {
        "min": 1000,
        "max": 100000
      },
      "pagination": {
        "defaultSize": 5,
        "maxSize": 20
      },
      "seed": 123
    }
  },
  "aiPrompt": "이 화면은 상품을 관리하는 CRUD 대시보드입니다. 필터, 리스트, 폼이 포함됩니다. 상태 컬럼은 뱃지로, 관리 컬럼은 수정 및 삭제 버튼으로 렌더링됩니다."
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\meta\users.meta.json

```
{
  "type": "crud",
  "name": "users",
  "title": "사용자 관리",
  "path": "/users",
  "description": "사용자 정보를 추가, 수정, 삭제할 수 있는 화면입니다.",
  "api": {
    "baseUrl": "/api/users",
    "methods": {
      "get": "GET",
      "post": "POST",
      "put": "PUT",
      "patch": "PATCH",
      "delete": "DELETE"
    }
  },
  "filters": [
    {
      "name": "role",
      "label": "역할",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["admin", "user", "guest"]
      }
    },
    {
      "name": "status",
      "label": "상태",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["active", "inactive", "pending"]
      }
    },
    {
      "name": "name",
      "label": "이름",
      "type": "text"
    }
  ],
  "columns": [
    {
      "name": "id",
      "label": "ID"
    },
    {
      "name": "name",
      "label": "이름"
    },
    {
      "name": "email",
      "label": "이메일"
    },
    {
      "name": "role",
      "label": "역할"
    },
    {
      "name": "status",
      "label": "상태",
      "cell": {
        "type": "badge",
        "map": {
          "active": "green",
          "inactive": "gray",
          "pending": "yellow"
        }
      }
    },
    {
      "name": "actions",
      "label": "관리",
      "cell": {
        "type": "buttons",
        "actions": [
          {
            "label": "수정",
            "onClick": "editItem"
          },
          {
            "label": "삭제",
            "onClick": "deleteItem",
            "variant": "destructive"
          }
        ]
      }
    }
  ],
  "form": [
    {
      "name": "name",
      "label": "이름",
      "type": "text",
      "required": true,
      "validation": {
        "minLength": 2,
        "maxLength": 50,
        "pattern": "^[가-힣a-zA-Z\\s]+$",
        "message": "이름은 2~50자, 한글/영문만 입력하세요."
      }
    },
    {
      "name": "email",
      "label": "이메일",
      "type": "email",
      "required": true,
      "validation": {
        "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        "message": "유효한 이메일 주소를 입력하세요."
      }
    },
    {
      "name": "role",
      "label": "역할",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["admin", "user", "guest"]
      }
    },
    {
      "name": "status",
      "label": "상태",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["active", "inactive", "pending"]
      }
    },
    {
      "name": "password",
      "label": "비밀번호",
      "type": "password",
      "validation": {
        "minLength": 8,
        "message": "비밀번호는 최소 8자 이상이어야 합니다."
      }
    }
  ],
  "buttons": {
    "top": ["add", "delete"],
    "bottom": ["save", "cancel"]
  },
  "aiPrompt": "이 화면은 사용자를 관리하는 CRUD 대시보드입니다. 필터, 리스트, 폼이 포함됩니다. 상태 컬럼은 뱃지로, 관리 컬럼은 수정 및 삭제 버튼으로 렌더링됩니다.",
  "edit": {
    "fetchDetail": true
  },
  "delete": {
    "confirm": true,
    "message": "정말로 사용자를 삭제하시겠습니까?",
    "onSuccess": "toast.success('사용자 삭제가 완료되었습니다.')"
  },
  "mock": {
    "enabled": true,
    "rows": 15,
    "delay": 300,
    "source": "faker",
    "settings": {
      "roles": ["admin", "user", "guest"],
      "statusProbability": {
        "active": 0.6,
        "inactive": 0.3,
        "pending": 0.1
      },
      "pagination": {
        "defaultSize": 10,
        "maxSize": 50
      },
      "seed": 456
    }
  }
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-api-data-routes.js

```
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// 메타 유틸리티 파일을 가져옵니다
const metaUtils = require("../src/lib/mock/meta-utils");

// 도움말
function showHelp() {
  console.log(`\n사용법: node generate-api-data-routes.js [메타데이터 파일 경로]\n`);
  console.log("메타데이터 파일 경로: meta 디렉토리 내의 .meta.json 파일 경로");
  console.log("예시: node generate-api-data-routes.js meta/customers.meta.json\n");

  console.log("사용 가능한 옵션:");
  console.log("  --help, -h         도움말 출력");
  console.log("  --all              모든 메타데이터 파일 처리");
  process.exit(0);
}

// 인자 확인
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  showHelp();
}

// 경로 설정
const META_DIR = path.join(__dirname, "..", "meta");
const API_DIR = path.join(__dirname, "..", "src", "app", "api");
const MOCK_DIR = path.join(__dirname, "..", "src", "lib", "mock");

// 모든 메타데이터 파일 처리
if (args.includes("--all")) {
  const metaFiles = fs.readdirSync(META_DIR).filter((file) => file.endsWith(".meta.json"));

  if (metaFiles.length === 0) {
    console.log("메타데이터 파일이 없습니다. meta 디렉토리에 .meta.json 파일을 추가하세요.");
    process.exit(1);
  }

  metaFiles.forEach((file) => {
    const metaFilePath = path.join(META_DIR, file);
    processMetaFile(metaFilePath);
  });
} else if (args.length > 0) {
  // 특정 메타데이터 파일 처리
  const metaFilePath = args[0].startsWith("meta/") ? path.join(__dirname, "..", args[0]) : path.join(META_DIR, args[0]);

  if (!fs.existsSync(metaFilePath)) {
    console.log(`메타데이터 파일을 찾을 수 없습니다: ${metaFilePath}`);
    showHelp();
  }

  processMetaFile(metaFilePath);
} else {
  console.log("메타데이터 파일 경로를 입력하세요.");
  showHelp();
}

/**
 * 메타데이터 파일을 처리하여 API 라우트 생성
 * @param {string} metaFilePath 메타데이터 파일 경로
 */
function processMetaFile(metaFilePath) {
  try {
    console.log(`메타데이터 파일 처리 중: ${metaFilePath}`);

    // 메타데이터 파일 읽기
    const metaData = JSON.parse(fs.readFileSync(metaFilePath, "utf8"));
    const entityName = path.basename(metaFilePath).replace(".meta.json", "");

    // API 디렉토리 생성
    const apiEntityDir = path.join(API_DIR, entityName);
    if (!fs.existsSync(apiEntityDir)) {
      fs.mkdirSync(apiEntityDir, { recursive: true });
    }

    // 필드 추출
    const fields = extractFields(metaData);

    // TypeScript 인터페이스 생성
    const interfaceName = metaUtils.capitalize(entityName);
    const tsInterface = generateTypeScriptInterface(interfaceName, fields);

    // faker 함수 생성
    const mockFunction = generateMockFunction(entityName, fields, metaData);

    // API 라우트 파일 생성
    const routeFilePath = path.join(apiEntityDir, "route.ts");
    const routeContent = generateRouteFile(interfaceName, entityName, tsInterface, mockFunction);

    fs.writeFileSync(routeFilePath, routeContent);
    console.log(`API 라우트 파일 생성 완료: ${routeFilePath}`);

    // 메인 faker 서비스에 함수 등록
    updateFakerService(interfaceName, entityName, fields);
  } catch (error) {
    console.error(`처리 중 오류 발생: ${error.message}`);
  }
}

/**
 * 메타데이터에서 필드 추출
 * @param {object} metaData 메타데이터 객체
 * @returns {Array} 필드 목록
 */
function extractFields(metaData) {
  const fields = new Map();

  // 필수 ID 필드 추가
  fields.set("id", { name: "id", type: "string" });

  // 데이터 구조에 따라 필드 추출 방식 변경
  if (metaData.fields) {
    // fields 배열이 직접 있는 경우
    metaData.fields.forEach((field) => {
      if (field.name !== "id" && !fields.has(field.name)) {
        fields.set(field.name, field);
      }
    });
  }

  if (metaData.columns) {
    // 컬럼 정보가 있는 경우 (DataTable 형식)
    metaData.columns.forEach((col) => {
      // actions는 UI 전용 필드이므로 제외
      if (col.name === "actions" || col.field === "actions") {
        return;
      }

      // 필드명이 name 또는 field 속성에 있을 수 있음
      const fieldName = col.field || col.name || col.accessorKey || col.id;
      if (!fieldName) {
        console.warn(`필드명이 없는 컬럼 발견: ${JSON.stringify(col)}`);
        return;
      }

      // 컬럼 객체에서 필요한 정보만 추출
      if (!fields.has(fieldName)) {
        fields.set(fieldName, {
          name: fieldName,
          type: col.type || guessTypeFromName(fieldName),
          ...(col.cell && { cell: col.cell }),
        });
      }
    });
  }

  if (metaData.form) {
    // 폼 필드가 있는 경우 (더 상세한 정보를 포함할 가능성이 높음)
    metaData.form.forEach((field) => {
      if (field.name !== "id" && !fields.has(field.name)) {
        fields.set(field.name, {
          name: field.name,
          type: field.type || guessTypeFromName(field.name),
          ...(field.options && { options: field.options }),
        });
      }
    });
  }

  if (metaData.properties) {
    // JSON Schema 형식
    Object.entries(metaData.properties).forEach(([name, prop]) => {
      if (name !== "id" && !fields.has(name)) {
        fields.set(name, {
          name,
          type: prop.type || guessTypeFromName(name),
        });
      }
    });
  }

  // 엔티티별 특수 필드 처리
  const entityName = metaData.name || "";

  // 필터에서 필드 추가 (검색 필드로 사용될 수 있음)
  if (metaData.filters) {
    metaData.filters.forEach((filter) => {
      const fieldName = filter.name;
      if (fieldName !== "id" && !fields.has(fieldName)) {
        fields.set(fieldName, {
          name: fieldName,
          type: filter.type || guessTypeFromName(fieldName),
          ...(filter.options && { options: filter.options }),
        });
      }
    });
  }

  // mock.settings에서 추가 필드 정보 확인
  if (metaData.mock?.settings) {
    const settings = metaData.mock.settings;

    // 상품(products)의 경우 Brand 필드 추가
    if (entityName === "products" && !fields.has("brand")) {
      fields.set("brand", { name: "brand", type: "string", optional: true });
    }

    // 고객(customers)의 경우 grade, address 필드 확인
    if (entityName === "customers") {
      if (!fields.has("address")) {
        fields.set("address", { name: "address", type: "string" });
      }
      if (!fields.has("memo")) {
        fields.set("memo", { name: "memo", type: "string" });
      }
    }
  }

  // 기본 형식을 찾을 수 없는 경우 경고
  if (fields.size <= 1) {
    // id만 있는 경우
    console.warn("메타데이터에서 필드를 찾을 수 없습니다. 최소한의 필드만 생성합니다.");
  }

  return Array.from(fields.values());
}

/**
 * 필드 이름을 기반으로 타입 추론
 * @param {string} fieldName 필드 이름
 * @returns {string} 추론된 타입
 */
function guessTypeFromName(fieldName) {
  const lowerField = fieldName.toLowerCase();

  // 일반적인 타입 추론
  if (lowerField === "id") return "string";
  if (lowerField.includes("date") || lowerField === "createdat" || lowerField === "updatedat") return "date";
  if (lowerField === "email") return "email";
  if (lowerField === "phone" || lowerField.includes("phone") || lowerField.includes("tel")) return "phone";
  if (lowerField === "price" || lowerField.includes("price") || lowerField.includes("amount")) return "number";
  if (lowerField === "quantity" || lowerField === "qty" || lowerField.includes("count")) return "number";
  if (lowerField.startsWith("is") || lowerField.startsWith("has")) return "boolean";
  if (lowerField === "image" || lowerField.includes("image") || lowerField.includes("photo")) return "image";

  // 기본 타입
  return "string";
}

/**
 * TypeScript 인터페이스 생성
 * @param {string} interfaceName 인터페이스 이름
 * @param {Array} fields 필드 목록
 * @returns {string} TypeScript 인터페이스 문자열
 */
function generateTypeScriptInterface(interfaceName, fields) {
  const typeMap = {
    string: "string",
    number: "number",
    boolean: "boolean",
    date: "string", // ISO 문자열로 저장
    email: "string",
    phone: "string",
    image: "string",
    url: "string",
    select: "string",
    enum: "string",
    array: "string[]",
    object: "Record<string, any>",
  };

  // 필드 정의를 위한 배열
  const fieldDefinitions = [];

  // 이미 추가된 필드 이름을 추적하기 위한 Set
  const addedFields = new Set();

  // 모든 필드 추가 (중복 방지)
  fields.forEach((field) => {
    const fieldName = field.name;

    // 이미 추가된 필드는 중복 추가 방지
    if (addedFields.has(fieldName)) {
      return;
    }

    // 필드 추가 및 기록
    const tsType = typeMap[field.type] || "string";
    const optionalMark = field.optional ? "?" : "";
    fieldDefinitions.push(`  ${fieldName}${optionalMark}: ${tsType};`);
    addedFields.add(fieldName);
  });

  return `export interface ${interfaceName} {\n${fieldDefinitions.join("\n")}\n}`;
}

/**
 * faker를 사용한 모의 데이터 생성 함수 작성
 * @param {string} entityName 엔티티 이름
 * @param {Array} fields 필드 목록
 * @param {object} metaData 원본 메타데이터
 * @returns {string} 모의 데이터 생성 함수 문자열
 */
function generateMockFunction(entityName, fields, metaData) {
  // 메타데이터에서 설정 정보 추출
  const settings = metaData.mock?.settings || {};
  const fieldTypesMap = new Map();

  // 생성된 인터페이스에 맞게 필드 목록 생성
  const validFields = fields.filter((field) => field.name !== "id");

  // 각 필드에 대한 faker 코드 생성
  const fieldGenerators = validFields
    .map((field) => {
      const fieldName = field.name;

      // 메타 유틸리티 함수를 사용하여 faker 코드 생성
      const fakerCode = metaUtils.generateFakerCode(fieldName, entityName, settings, fieldTypesMap);
      return `    ${fieldName}: ${fakerCode},`;
    })
    .join("\n");

  return `function get${metaUtils.capitalize(entityName)}(count = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
${fieldGenerators}
  }));
}`;
}

/**
 * API 라우트 파일 생성
 * @param {string} interfaceName 인터페이스 이름
 * @param {string} entityName 엔티티 이름
 * @param {string} tsInterface TypeScript 인터페이스 문자열
 * @param {string} mockFunction 모의 데이터 생성 함수 문자열
 * @returns {string} API 라우트 파일 내용
 */
function generateRouteFile(interfaceName, entityName, tsInterface, mockFunction) {
  return `import { NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker/locale/ko';
import { MockApiHandler } from '../../../lib/mock/api-handler';

${tsInterface}

// 모의 데이터 생성 함수
${mockFunction}

// API 핸들러 인스턴스 생성
const apiHandler = new MockApiHandler<${interfaceName}>({
  entityName: '${entityName}',
  getMockData: get${metaUtils.capitalize(entityName)},
  searchFields: ['id', 'name'], // 검색 가능 필드 (필요에 따라 수정)
});

// GET 요청 처리
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  
  // UI 컴포넌트에서 사용하기 위한 처리
  // format 또는 ui 파라미터가 있으면 간단한 배열 형태로 반환
  // 브랜드 목록과 같은 참조 데이터에 유용함
  if (url.searchParams.has('format') || url.searchParams.has('ui')) {
    const count = parseInt(url.searchParams.get('count') || '20');
    const items = get${metaUtils.capitalize(entityName)}(count);
    return NextResponse.json(items);
  }
  
  // 기본 페이지네이션 형태 응답
  return apiHandler.handleGet(req);
}

// POST 요청 처리
export async function POST(req: NextRequest) {
  return apiHandler.handlePost(req);
}

// PUT 요청 처리
export async function PUT(req: NextRequest) {
  return apiHandler.handlePut(req);
}

// DELETE 요청 처리
export async function DELETE(req: NextRequest) {
  return apiHandler.handleDelete(req);
}
`;
}

/**
 * faker-service.ts 파일 업데이트
 * @param {string} interfaceName 인터페이스 이름
 * @param {string} entityName 엔티티 이름
 * @param {Array} fields 필드 목록
 */
function updateFakerService(interfaceName, entityName, fields) {
  const fakerServicePath = path.join(MOCK_DIR, "faker-service.ts");

  // 파일이 없으면 경고만 출력
  if (!fs.existsSync(fakerServicePath)) {
    console.warn(`faker-service.ts 파일이 없습니다: ${fakerServicePath}`);
    return;
  }

  console.log(`faker-service.ts 파일 업데이트 중...`);

  try {
    // 기존 파일 읽기
    let content = fs.readFileSync(fakerServicePath, "utf8");

    // 이미 함수가 있는지 확인
    const functionName = `get${metaUtils.capitalize(entityName)}`;
    if (content.includes(`export function ${functionName}`)) {
      console.log(`${functionName} 함수가 이미 존재합니다. 업데이트하지 않습니다.`);
      return;
    }

    // 인터페이스 추가
    if (!content.includes(`export interface ${interfaceName}`)) {
      const interfaceCode = generateTypeScriptInterface(interfaceName, fields);
      content = content.replace(
        /\/\/ 인터페이스 선언[\s\S]*?(export interface|\/\/ 유틸리티 함수)/m,
        (match) =>
          `// 인터페이스 선언\n${interfaceCode}\n\n${
            match.includes("// 유틸리티 함수") ? "// 유틸리티 함수" : "export interface"
          }`
      );
    }

    // faker 함수 추가
    const mockFunction = generateMockFunction(entityName, fields, {});
    content = content.replace(
      /export \{[\s\S]*?\};/m,
      (match) => `${mockFunction}\n\n${match.replace(/export \{/, `export {\n  ${functionName},`)}`
    );

    // 파일 저장
    fs.writeFileSync(fakerServicePath, content);
    console.log(`faker-service.ts 파일 업데이트 완료`);
  } catch (error) {
    console.error(`faker-service.ts 파일 업데이트 중 오류 발생: ${error.message}`);
  }
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-api-routes.js

```
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (!args.length) {
  console.error("❌ meta JSON 파일 경로를 입력해주세요.");
  process.exit(1);
}

const metaPath = path.resolve(args[0]);
if (!fs.existsSync(metaPath)) {
  console.error("❌ meta 파일이 존재하지 않습니다:", metaPath);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
const baseUrl = meta.api?.baseUrl || "";
const methods = meta.api?.methods || {};
if (!baseUrl || Object.keys(methods).length === 0) {
  console.error("❌ meta.api 정보가 부족합니다.");
  process.exit(1);
}

const routeDir = path.join("src", "app", "api", ...baseUrl.replace(/^\//, "").split("/"));
fs.mkdirSync(routeDir, { recursive: true });

const logicName = meta.name === "products" ? "getProducts" : `get${meta.name.charAt(0).toUpperCase() + meta.name.slice(1)}`;

const handlers = [];

if (methods.get?.toUpperCase() === "GET") {
  handlers.push(`
export async function GET(req: Request) {
  if (mockConfig.enabled) {
    const mockData = await mockDataWithDelay(() => mockService.${logicName}(mockConfig), mockConfig);
    return Response.json(mockData);
  }
  return Response.json([]);
}`);
}

if (methods.post?.toUpperCase() === "POST") {
  handlers.push(`
export async function POST(req: Request) {
  const body = await req.json();
  if (mockConfig.enabled) {
    await mockDataWithDelay(() => {}, mockConfig);
    return Response.json({ ok: true, data: { ...body, id: crypto.randomUUID() } });
  }
  return Response.json({ ok: true, data: body });
}`);
}

if (methods.options?.toUpperCase() === "OPTIONS") {
  handlers.push(`
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Allow": "GET, POST, OPTIONS"
    }
  });
}`);
}

const routeFile = path.join(routeDir, "route.ts");
const routeCode = `import { mockService, mockDataWithDelay } from "@/src/lib/mock";
import productsMetadata from "@/meta/products.meta.json";
import { getMockConfig } from "@/src/lib/mock";

const mockConfig = getMockConfig(productsMetadata);

${handlers.join("\n\n")}
`;

fs.writeFileSync(routeFile, routeCode.trim(), "utf-8");
console.log("✅ API 라우트 파일 생성 완료 →", routeFile);
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-crud.js

```
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ 메타 파일 경로를 입력하세요. 예: node generate-crud.js meta/products.meta?.json");
  process.exit(1);
}

const metaPath = path.resolve(args[0]);
const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));

const toPascalCase = (str) => str.replace(/(^\w|_\w)/g, (match) => match.replace("_", "").toUpperCase());

const writeFileSafe = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    console.log(`⚠️ 파일이 이미 존재합니다: ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, content);
  console.log(`✅ 파일 생성됨: ${filePath}`);
};

const baseName = meta?.name;
const pascalName = toPascalCase(baseName);
const outPageDir = path.join("generated", "pages", baseName);
const outCompDir = path.join("generated", "components", pascalName);
const outHookDir = path.join("generated", "hooks");

fs.mkdirSync(outPageDir, { recursive: true });
fs.mkdirSync(outCompDir, { recursive: true });
fs.mkdirSync(outHookDir, { recursive: true });

const pageContent = `
import ${pascalName}FormComponent from '../../components/${pascalName}/${pascalName}FormComponent';
import ${pascalName}TableComponent from '../../components/${pascalName}/${pascalName}TableComponent';

export default function Page() {
  return (
    <div>
      <h1>${meta?.title}</h1>
      <${pascalName}FormComponent />
      <${pascalName}TableComponent />
    </div>
  );
}
`;

writeFileSafe(path.join(outPageDir, "page.tsx"), pageContent);

const renderFormComponent = require("../templates/formComponent.tpl");
const formCode = renderFormComponent(meta, pascalName);
writeFileSafe(path.join(outCompDir, `${pascalName}FormComponent.tsx`), formCode);

const tableHeaders = meta?.columns.map((col) => `<th>${col.label}</th>`).join("");
const tableCells = meta?.columns.map((col) => `<td>{item.${col.name}}</td>`).join("");

const tableComponent = `
export default function ${pascalName}TableComponent() {
  const data = []; // TODO: API 연동 필요
  return (
    <table>
      <thead><tr>${tableHeaders}</tr></thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            ${tableCells}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
`;

writeFileSafe(path.join(outCompDir, `${pascalName}TableComponent.tsx`), tableComponent);

const apiHookContent = `
import axios from 'axios';

export const use${pascalName}Api = () => {
  const baseUrl = '${meta?.api.baseUrl}';

  const getList = () => axios.get(baseUrl);
  const create = (data) => axios.post(baseUrl, data);
  const update = (id, data) => axios.put(\`\${baseUrl}/\${id}\`, data);
  const remove = (id) => axios.delete(\`\${baseUrl}/\${id}\`);

  return { getList, create, update, remove };
};
`;

writeFileSafe(path.join(outHookDir, `use${pascalName}Api.js`), apiHookContent);

const filterFields = (meta?.filters || [])
  .map((field) => {
    if (field.type === "select") {
      const isStatic = field.options?.source === "static";
      if (isStatic) {
        const options = field.options.data.map((opt) => `<option value="${opt}">${opt}</option>`).join("");
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            ${options}
          </select>
        </label>`;
      } else {
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            {/* TODO: API로 ${field.options.url}에서 옵션 가져오기 */}
          </select>
        </label>`;
      }
    } else {
      return `
      <label>${field.label}
        <input name="${field.name}" type="text" onChange={onChange} />
      </label>`;
    }
  })
  .join("\\n");

const filterComponent = `
export default function ${pascalName}FilterComponent({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}) {
  return (
    <div>
      ${filterFields}
    </div>
  );
}
`;

writeFileSafe(path.join(outCompDir, `${pascalName}FilterComponent.tsx`), filterComponent);

const { generateComponent } = require("../ai/agent");
if (meta?.aiPrompt) {
  await generateComponent(meta?.aiPrompt, pascalName);
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-query-hooks.js

```
const fs = require("fs");
const path = require("path");
const renderQueryHook = require("../templates/shadcn/useQueryHook.tpl.js");

const args = process.argv.slice(2);
if (!args.length) {
  console.error("❌ meta JSON 파일 경로를 입력해주세요.");
  process.exit(1);
}

const metaPath = path.resolve(args[0]);
if (!fs.existsSync(metaPath)) {
  console.error("❌ meta 파일이 존재하지 않습니다:", metaPath);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
const name = meta.name;
const methods = meta.api?.methods || {};
const baseUrl = meta.api?.baseUrl || "";

if (!name || !baseUrl || Object.keys(methods).length === 0) {
  console.error("❌ meta.api 정보가 부족합니다.");
  process.exit(1);
}

const targetDir = path.join("src", "features", name, "apis");
fs.mkdirSync(targetDir, { recursive: true });

const pascal = name.charAt(0).toUpperCase() + name.slice(1);

if (methods.get) {
  const code = renderQueryHook(meta);
  fs.writeFileSync(path.join(targetDir, `useGet${pascal}.ts`), code, "utf-8");
  console.log(`✅ useGet${pascal}.ts 생성 완료`);
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-shadcn-all.js

```
const { execSync } = require("child_process");
const path = require("path");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ meta JSON 파일 경로를 입력해주세요.");
  process.exit(1);
}

const metaPath = path.resolve(args[0]);

console.log("🛠 1단계: shadcn 컴포넌트 생성 중...");
execSync(`node scripts/generate-shadcn.js ${metaPath}`, { stdio: "inherit" });

console.log("\n🛠 2단계: preview 라우트 페이지 생성 중...");
execSync(`node scripts/generate-shadcn-route.js ${metaPath}`, { stdio: "inherit" });

console.log("\n🛠 3단계: columns.ts 별도 생성 중...");
execSync(`node scripts/generate-shadcn-columns.js ${metaPath}`, { stdio: "inherit" });

console.log("\n🛠 4단계: CRUD 라우트 별도 생성 중...");
execSync(`node scripts/generate-api-routes.js ${metaPath}`, { stdio: "inherit" });

console.log("\n🛠 5단계: api 데이터 라우트 별도 생성 중...");
execSync(`node scripts/generate-api-data-routes.js ${metaPath}`, { stdio: "inherit" });

console.log("\n🛠 6단계: react-query hooks 별도 생성 중...");
execSync(`node scripts/generate-query-hooks.js ${metaPath}`, { stdio: "inherit" });

console.log("\n🛠 7단계: filterStore.ts 별도 생성 중...");
execSync(`node scripts/generate-zustand-full-store.js ${metaPath}`, { stdio: "inherit" });

console.log("\n🎉 모든 shadcn 관련 파일이 성공적으로 생성되었습니다!");

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-shadcn-columns.js

```
const fs = require("fs");
const path = require("path");
const renderColumns = require("../templates/shadcn/Columns.tpl.js");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ meta JSON 파일 경로를 입력해주세요.");
  process.exit(1);
}

const metaPath = path.resolve(args[0]);
if (!fs.existsSync(metaPath)) {
  console.error("❌ meta 파일이 존재하지 않습니다:", metaPath);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
const pascalName = meta.name.charAt(0).toUpperCase() + meta.name.slice(1);
const targetDir = path.join("generated", "components", pascalName);
fs.mkdirSync(targetDir, { recursive: true });

const code = renderColumns(meta, pascalName);
fs.writeFileSync(path.join(targetDir, "columns.tsx"), code, "utf-8");

console.log(`✅ columns.ts 생성 완료 → ${targetDir}/columns.ts`);

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-shadcn-route.js

```
// node scripts/generate-shadcn-route.js meta/products.meta.json

const fs = require("fs");
const path = require("path");
const renderRoute = require("../templates/shadcn/RoutePreviewPage.tpl.js");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ meta JSON 파일 경로를 입력해주세요.");
  process.exit(1);
}

const metaPath = path.resolve(args[0]);
if (!fs.existsSync(metaPath)) {
  console.error("❌ meta 파일이 존재하지 않습니다:", metaPath);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
const routePath = path.join("src", "app", meta.name, "preview");
fs.mkdirSync(routePath, { recursive: true });

const routeCode = renderRoute(meta);
fs.writeFileSync(path.join(routePath, "page.tsx"), routeCode, "utf-8");

console.log(`✅ 라우트 페이지 생성 완료: /${meta.name}/preview`);

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-shadcn.js

```
const fs = require("fs");
const path = require("path");

const renderForm = require("../templates/shadcn/Form.tpl.js");
const renderFilter = require("../templates/shadcn/FilterBar.tpl.js");
const renderPreview = require("../templates/shadcn/PreviewPage.tpl.js");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ meta JSON 파일 경로를 입력해주세요.");
  process.exit(1);
}

const metaPath = path.resolve(args[0]);
if (!fs.existsSync(metaPath)) {
  console.error("❌ meta 파일이 존재하지 않습니다:", metaPath);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
const pascalName = meta.name.charAt(0).toUpperCase() + meta.name.slice(1);
const compDir = path.join("generated", "components", pascalName);
const pageDir = path.join("generated", "pages", meta.name);

fs.mkdirSync(compDir, { recursive: true });
fs.mkdirSync(pageDir, { recursive: true });

// Form 생성
const formCode = renderForm(meta, pascalName);
fs.writeFileSync(path.join(compDir, "Form.tsx"), formCode, "utf-8");
console.log(`✅ Form.tsx 생성 완료`);

// Filter 생성
const filterCode = renderFilter(meta, pascalName);
fs.writeFileSync(path.join(compDir, "FilterBar.tsx"), filterCode, "utf-8");
console.log(`✅ FilterBar.tsx 생성 완료`);

// Preview 페이지 생성
const previewCode = renderPreview(meta, pascalName);
fs.writeFileSync(path.join(pageDir, "preview.tsx"), previewCode, "utf-8");
console.log(`✅ preview.tsx 생성 완료`);

console.log(`🎉 모든 shadcn 컴포넌트 및 미리보기 페이지가 생성되었습니다.`);

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-zustand-full-store.js

```
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (!args.length) {
  console.error("❌ meta JSON 파일 경로를 입력해주세요.");
  process.exit(1);
}

const metaPath = path.resolve(args[0]);
if (!fs.existsSync(metaPath)) {
  console.error("❌ meta 파일이 존재하지 않습니다:", metaPath);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
const name = meta.name;
const filters = meta.filters || [];
const pascal = name.charAt(0).toUpperCase() + name.slice(1);

if (!name || filters.length === 0) {
  console.error("❌ meta.filters 정보가 부족하거나 도메인 이름 없음");
  process.exit(1);
}

const targetDir = path.join("src", "features", name, "stores");
fs.mkdirSync(targetDir, { recursive: true });

const filterKeys = filters.map(f => f.name);
const filterDefaults = filterKeys.map(k => `    ${k}: ""`).join(",\n");

const storeCode = `
import { create } from "zustand";
import type { FilterState } from "@/src/shared/types/store";
import type { ${pascal} } from "@/generated/components/${pascal}/columns";

export const use${pascal}Store = create<FilterState<${pascal}>>((set) => ({
  filters: {
${filterDefaults}
  },
  selectedItem: null,
  isEditMode: false,
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    })),
  setSelectedItem: (item) =>
    set(() => ({
      selectedItem: item,
      isEditMode: true
    })),
  resetSelectedItem: () =>
    set(() => ({
      selectedItem: null,
      isEditMode: false
    }))
}));
`;

const filePath = path.join(targetDir, "store.ts");
fs.writeFileSync(filePath, storeCode.trim(), "utf-8");

console.log("✅ zustand store.ts 생성 완료 →", filePath);
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\README.md

```
# API 라우트 생성 스크립트

이 디렉토리에는 메타데이터 파일을 기반으로 API 라우트 및 Mock 데이터를 자동으로 생성하는 스크립트가 포함되어 있습니다.

## 스크립트 목록

1. **generate-api-routes.js**: 이전 버전의 API 라우트 생성 스크립트입니다. 현재는 주로 호환성을 위해 유지되며, 내부적으로 `generate-api-data-routes.js`를 호출합니다.

2. **generate-api-data-routes.js**: 개선된 API 라우트 생성 스크립트로, 메타데이터 파일을 분석하여 타입 정의, API 핸들러, HTTP 메소드 핸들러를 생성하고 필요에 따라 Mock 서비스 함수도 추가합니다.

## 사용 방법

### 기본 사용법

```bash
node scripts/generate-api-routes.js <메타데이터파일경로>
```

또는

```bash
node scripts/generate-api-data-routes.js <메타데이터파일경로> [옵션]
```

### 옵션 (generate-api-data-routes.js)

- `--help`, `-h`: 도움말 표시
- `--verbose`, `-v`: 상세 로그 출력
- `--no-add`: 기존 mockService에 함수를 추가하지 않음

### 예시

```bash
# 기본 사용법
node scripts/generate-api-routes.js meta/users.meta.json

# 상세 로그 출력
node scripts/generate-api-data-routes.js meta/products.meta.json --verbose

# mock 함수 추가하지 않기
node scripts/generate-api-data-routes.js meta/customers.meta.json --no-add
```

## 주요 기능

- **타입 정의 생성**: 메타데이터의 columns 정보를 기반으로 TypeScript 인터페이스 생성
- **API 핸들러 생성**: MockApiHandler를 사용한 API 엔드포인트 처리
- **HTTP 메소드 핸들러**: GET, POST, PUT, PATCH, DELETE 메소드 핸들러 생성
- **Mock 서비스 함수 추가**: 엔티티에 맞는 Mock 데이터 생성 함수 추가

## 필요한 메타데이터 구조

메타데이터 파일은 다음과 같은 구조를 가져야 합니다:

```json
{
  "type": "crud",
  "name": "entityName", // 엔티티 이름 (필수)
  "api": {
    "baseUrl": "/api/path", // API 경로 (필수)
    "methods": {
      // 지원할 HTTP 메소드 (필수)
      "get": "GET",
      "post": "POST",
      "put": "PUT",
      "patch": "PATCH",
      "delete": "DELETE"
    }
  },
  "columns": [
    // 엔티티 필드 정보 (필수)
    {
      "name": "id",
      "label": "ID"
    },
    {
      "name": "name",
      "label": "이름"
    }
    // ... 추가 필드
  ],
  "mock": {
    // Mock 설정 (선택)
    "enabled": true,
    "rows": 10,
    "delay": 500,
    "source": "faker",
    "settings": {
      // 엔티티별 Mock 설정 (선택)
      // ... 엔티티별 설정
    }
  }
}
```

## 생성된 파일

스크립트는 다음과 같은 파일을 생성합니다:

1. `src/app/api/<path>/route.ts`: API 라우트 파일
2. `src/lib/mock/faker-service.ts`에 Mock 데이터 생성 함수 추가

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\shared\components\layout\LayoutShell.tsx

```
import * as React from "react"

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100 border-b p-4">
        <h1 className="text-lg font-semibold">dopamine-dash</h1>
      </header>

      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gray-100 border-t p-4 text-center text-sm text-muted-foreground">
        © 2025 dopamine-dash. All rights reserved.
      </footer>
    </div>
  );
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\shared\components\providers\query-provider.tsx

```
// src/providers/query-provider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\shared\components\ui\DataTable.tsx

```
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef
} from "@tanstack/react-table";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  selectedId?: string;
}

export function DataTable<T>({
  columns,
  data,
  onRowClick,
  selectedId
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const id = (row.original as any)?.id;
            const isSelected = id && id === selectedId;
            return (
              <TableRow
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className={isSelected ? "bg-muted" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\shared\utils\validate\validateNestedObject.ts

```
/**
 * 중첩된 객체의 필드 값을 검증하는 유틸리티 함수
 * @param {Object} object - 검증할 객체
 * @param {Object} validationRules - 검증 규칙 객체
 * @param {Object} context - 검증에 필요한 추가 컨텍스트 데이터
 * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object }
 *
 * @example
 * const object = {
 *   name: 'John',
 *   age: 25,
 *   email: 'john@example.com',
 *   phone: '010-1234-5678',
 *   address: {
 *     street: '123 Main St',
 *     city: 'Seoul',
 *     zipCode: '12345'
 *   },
 *   preferences: {
 *     notifications: true,
 *     theme: 'dark'
 *   },
 *   orders: [
 *     { id: 1, amount: 1000 },
 *     { id: 2, amount: 2000 }
 *   ],
 *   tags: ['new', 'vip'],
 *   lastLogin: '2024-04-04T12:00:00Z'
 * };
 *
 * const validationRules = {
 *   name: {
 *     required: true,
 *     type: 'string',
 *     minLength: 2,
 *     maxLength: 50,
 *     pattern: /^[a-zA-Z\s]+$/
 *   },
 *   age: {
 *     required: true,
 *     type: 'number',
 *     min: 0,
 *     max: 120
 *   },
 *   email: {
 *     required: true,
 *     type: 'string',
 *     pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 *   },
 *   phone: {
 *     required: true,
 *     type: 'string',
 *     pattern: /^010-\d{4}-\d{4}$/
 *   },
 *   address: {
 *     street: { required: true, type: 'string' },
 *     city: { required: true, type: 'string' },
 *     zipCode: {
 *       required: true,
 *       type: 'string',
 *       pattern: /^\d{5}$/
 *     }
 *   },
 *   preferences: {
 *     notifications: { required: true, type: 'boolean' },
 *     theme: {
 *       required: true,
 *       type: 'string',
 *       enum: ['light', 'dark', 'system']
 *     }
 *   },
 *   orders: {
 *     type: 'array',
 *     minLength: 0,
 *     maxLength: 10,
 *     items: {
 *       id: { required: true, type: 'number' },
 *       amount: { required: true, type: 'number', min: 0 }
 *     }
 *   },
 *   tags: {
 *     type: 'array',
 *     minLength: 0,
 *     maxLength: 5,
 *     items: { type: 'string' }
 *   },
 *   lastLogin: {
 *     required: true,
 *     type: 'string',
 *     pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
 *   }
 * };
 *
 * // validate 함수 사용 예시
 * const customValidationRules = {
 *   age: {
 *     required: true,
 *     validate: (value, context) => {
 *       if (value < context.minAge) {
 *         return `나이는 ${context.minAge}세 이상이어야 합니다.`;
 *       }
 *       return true;
 *     }
 *   },
 *   city: {
 *     required: true,
 *     validate: (value, context) => {
 *       if (!context.validRegions.includes(value)) {
 *         return `유효하지 않은 지역입니다. (${context.validRegions.join(', ')})`;
 *       }
 *       return true;
 *     }
 *   },
 *   // parentObject를 사용한 validate 함수 예시
 *   orders: {
 *     type: 'array',
 *     items: {
 *       amount: {
 *         required: true,
 *         validate: (value, context, parentObject) => {
 *           // 주문 금액이 1000원 미만이면서 VIP 태그가 있는 경우 검증
 *           if (value < 1000 && parentObject.tags?.includes('vip')) {
 *             return 'VIP 고객의 주문 금액은 1000원 이상이어야 합니다.';
 *           }
 *           return true;
 *         }
 *       }
 *     }
 *   },
 *   // 중첩된 객체에서 parentObject를 사용한 예시
 *   address: {
 *     street: {
 *       required: true,
 *       validate: (value, context, parentObject) => {
 *         // 도시가 서울인 경우 주소 형식 검증
 *         if (parentObject.city === '서울' && !value.includes('구')) {
 *           return '서울 주소는 구 단위까지 입력해야 합니다.';
 *         }
 *         return true;
 *       }
 *     }
 *   }
 * };
 *
 * // validate와 type을 함께 사용하면 안 되는 예시
 * const invalidRules = {
 *   age: {
 *     type: 'number',  // type과 validate를 함께 사용하면 안 됨
 *     validate: (value) => value > 0
 *   }
 * };
 *
 * const context = {
 *   minAge: 18,
 *   validRegions: ['서울', '부산'],
 *   regionDetails: {
 *     '서울': ['강남', '강북'],
 *     '부산': ['해운대', '서면']
 *   }
 * };
 *
 * const result = validateNestedObject(object, validationRules, context);
 *
 * @see =================== 변경 내역 ==================
 * [작성자][작업일시] - 내용
 * [H00040][2025-04-04 Friday 18:15:41] - 최초작성
 */

interface ValidationRule {
  required?: boolean;
  type?: "string" | "number" | "boolean" | "array" | "object" | "date" | "email" | "url";
  pattern?: RegExp;
  patternMessage?: string;
  enum?: any[];
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  validate?: (value: any, context: any, parentObject?: any) => boolean | string;
  items?: ValidationRule;
  properties?: Record<string, ValidationRule>;
  [key: string]: any; // 인덱스 시그니처 추가
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, any>;
}

interface ArrayValidationResult extends ValidationResult {
  items?: Array<{
    index: number;
    isValid: boolean;
    errors: Record<string, any>;
  }>;
}

interface FieldValidationResult extends ValidationResult {
  required?: string;
  custom?: string;
  type?: string;
  pattern?: string;
  enum?: string;
  min?: string;
  max?: string;
}

export function validateNestedObject(
  object: Record<string, any>,
  validationRules: Record<string, ValidationRule>,
  context: Record<string, any> = {}
): ValidationResult {
  function checkType(value: any, type: ValidationRule["type"]): { isValid: boolean; error: string } {
    switch (type) {
      case "string":
        return { isValid: typeof value === "string", error: "문자열이어야 합니다." };
      case "number":
        return { isValid: typeof value === "number", error: "숫자여야 합니다." };
      case "boolean":
        return { isValid: typeof value === "boolean", error: "불리언이어야 합니다." };
      case "array":
        return { isValid: Array.isArray(value), error: "배열이어야 합니다." };
      case "object":
        return {
          isValid: typeof value === "object" && value !== null && !Array.isArray(value),
          error: "객체여야 합니다.",
        };
      case "date":
        return { isValid: value instanceof Date || !isNaN(Date.parse(value)), error: "유효한 날짜여야 합니다." };
      case "email":
        return { isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), error: "유효한 이메일 주소여야 합니다." };
      case "url":
        try {
          new URL(value);
          return { isValid: true, error: "" };
        } catch {
          return { isValid: false, error: "유효한 URL이어야 합니다." };
        }
      default:
        return { isValid: true, error: "" };
    }
  }

  /**
   * 필드 값을 검증하는 함수
   * @param {*} value - 검증할 필드 값
   * @param {Object} rules - 검증 규칙 객체
   * @param {string} path - 현재 검증 중인 필드의 경로 (예: 'address.city')
   * @param {Object} context - 검증에 필요한 외부 데이터
   * @param {Object} parentObject - 현재 검증 중인 필드가 속한 부모 객체
   * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object }
   */
  function validateField(
    value: any,
    rules: ValidationRule,
    path: string = "",
    context: Record<string, any> = {},
    parentObject: Record<string, any> = {}
  ): FieldValidationResult {
    let isValid = true;
    const fieldErrors: FieldValidationResult["errors"] = {};

    // required 체크
    if (rules.required && (value === undefined || value === null || value === "")) {
      fieldErrors.required = "필수 입력값입니다.";
      isValid = false;
      return { isValid, errors: fieldErrors };
    }

    // validate 함수 체크 (value가 undefined가 아닌 경우에만)
    if (rules.validate && value !== undefined) {
      const validationResult = rules.validate(value, context, parentObject);
      if (validationResult !== true) {
        fieldErrors.custom = validationResult as string;
        isValid = false;
      }
    }

    // type 체크
    if (rules.type) {
      const typeCheck = checkType(value, rules.type);
      if (!typeCheck.isValid) {
        fieldErrors.type = typeCheck.error;
        isValid = false;
      }
    }

    // pattern 체크
    if (rules.pattern && !rules.pattern.test(value)) {
      fieldErrors.pattern = rules.patternMessage || "올바른 형식이 아닙니다.";
      isValid = false;
    }

    // enum 체크
    if (rules.enum && !rules.enum.includes(value)) {
      fieldErrors.enum = `유효하지 않은 값입니다. (${rules.enum.join(", ")})`;
      isValid = false;
    }

    // min/max 체크
    if (rules.min !== undefined && value < rules.min) {
      fieldErrors.min = `최소값은 ${rules.min}입니다.`;
      isValid = false;
    }
    if (rules.max !== undefined && value > rules.max) {
      fieldErrors.max = `최대값은 ${rules.max}입니다.`;
      isValid = false;
    }

    return { isValid, errors: fieldErrors };
  }

  /**
   * 배열을 검증하는 함수
   * @param {Array} array - 검증할 배열
   * @param {Object} rules - 검증 규칙 객체
   * @param {string} path - 현재 검증 중인 배열의 경로
   * @param {Object} context - 검증에 필요한 외부 데이터
   * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object, items: Array<Object> }
   */
  function validateArray(
    array: any[],
    rules: ValidationRule,
    path: string = "",
    context: Record<string, any> = {}
  ): ArrayValidationResult {
    let isValid = true;
    const arrayErrors: Record<string, any> = {};
    const items: Array<{
      index: number;
      isValid: boolean;
      errors: Record<string, any>;
    }> = [];

    // 배열 길이 체크
    if (rules.minLength !== undefined && array.length < rules.minLength) {
      arrayErrors.minLength = `최소 ${rules.minLength}개의 항목이 필요합니다.`;
      isValid = false;
    }
    if (rules.maxLength !== undefined && array.length > rules.maxLength) {
      arrayErrors.maxLength = `최대 ${rules.maxLength}개의 항목이 허용됩니다.`;
      isValid = false;
    }

    // 배열 아이템 검증
    array.forEach((item, index) => {
      const itemPath = `${path}[${index}]`;
      const itemResult = validateObject(item, rules.items || {}, itemPath, context);

      items.push({
        index,
        isValid: itemResult.isValid,
        errors: itemResult.errors,
      });

      if (!itemResult.isValid) {
        isValid = false;
      }
    });

    return {
      isValid,
      errors: arrayErrors,
      items,
    };
  }

  /**
   * 객체의 모든 필드를 검증하는 함수
   * @param {Object} obj - 검증할 객체
   * @param {Object} rules - 검증 규칙 객체
   * @param {string} path - 현재 검증 중인 객체의 경로
   * @param {Object} context - 검증에 필요한 외부 데이터
   * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object }
   */
  function validateObject(
    obj: Record<string, any>,
    rules: ValidationRule | Record<string, ValidationRule>,
    path: string = "",
    context: Record<string, any> = {}
  ): ValidationResult {
    let isValid = true;
    const objectErrors: Record<string, any> = {};

    // properties 속성이 있는 경우 해당 속성 내부의 필드들을 검증
    if ("properties" in rules) {
      const propertiesResult = validateObject(obj, rules.properties || {}, path, context);
      return propertiesResult;
    }

    for (const [key, rule] of Object.entries(rules as Record<string, ValidationRule>)) {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];

      // 중첩된 객체인 경우
      if (rule && typeof rule === "object" && !rule.required && !rule.type && !rule.pattern) {
        const result = validateObject(value || {}, rule, currentPath, context);
        if (!result.isValid) {
          objectErrors[key] = result.errors;
          isValid = false;
        }
        continue;
      }

      // 배열인 경우
      if (rule.type === "array") {
        const result = validateArray(value || [], rule, currentPath, context);
        if (!result.isValid) {
          objectErrors[key] = result;
          isValid = false;
        }
        continue;
      }

      // 일반 필드 검증
      const result = validateField(value, rule, currentPath, context, obj);
      if (!result.isValid) {
        objectErrors[key] = result.errors;
        isValid = false;
      }
    }

    return { isValid, errors: objectErrors };
  }

  const result = validateObject(object, validationRules, "", context);

  return {
    isValid: result.isValid,
    errors: result.errors,
  };
}

export default validateNestedObject;

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\api\api\products\route.ts

```
import { mockService, mockDataWithDelay } from "@/src/lib/mock";
import productsMetadata from "@/meta/products.meta.json";
import { getMockConfig } from "@/src/lib/mock";

const mockConfig = getMockConfig(productsMetadata);


export async function GET(req: Request) {
  if (mockConfig.enabled) {
    const mockData = await mockDataWithDelay(() => mockService.getProducts(mockConfig), mockConfig);
    return Response.json(mockData);
  }
  return Response.json([]);
}


export async function POST(req: Request) {
  const body = await req.json();
  if (mockConfig.enabled) {
    await mockDataWithDelay(() => {}, mockConfig);
    return Response.json({ ok: true, data: { ...body, id: crypto.randomUUID() } });
  }
  return Response.json({ ok: true, data: body });
}


export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Allow": "GET, POST, OPTIONS"
    }
  });
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\api\products\route.ts

```
import { NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker/locale/ko';
import { MockApiHandler } from '../../../lib/mock/api-handler';

export interface Products {
  id: string;
  name: string;
  price: number;
  category: string;
  status: string;
  description: string;
  brand: string;
}

// 모의 데이터 생성 함수
function getProducts(count = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price({ min: 1000, max: 100000 })),
    category: faker.helpers.arrayElement(["전자","의류","식품","가구","도서"]),
    status: faker.helpers.arrayElement(["active","inactive","soldout"]),
    description: faker.lorem.sentence(),
    brand: faker.lorem.word(),
  }));
}

// API 핸들러 인스턴스 생성
const apiHandler = new MockApiHandler<Products>({
  entityName: 'products',
  getMockData: getProducts,
  searchFields: ['id', 'name'], // 검색 가능 필드 (필요에 따라 수정)
});

// GET 요청 처리
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  
  // UI 컴포넌트에서 사용하기 위한 처리
  // format 또는 ui 파라미터가 있으면 간단한 배열 형태로 반환
  // 브랜드 목록과 같은 참조 데이터에 유용함
  if (url.searchParams.has('format') || url.searchParams.has('ui')) {
    const count = parseInt(url.searchParams.get('count') || '20');
    const items = getProducts(count);
    return NextResponse.json(items);
  }
  
  // 기본 페이지네이션 형태 응답
  return apiHandler.handleGet(req);
}

// POST 요청 처리
export async function POST(req: NextRequest) {
  return apiHandler.handlePost(req);
}

// PUT 요청 처리
export async function PUT(req: NextRequest) {
  return apiHandler.handlePut(req);
}

// DELETE 요청 처리
export async function DELETE(req: NextRequest) {
  return apiHandler.handleDelete(req);
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\favicon.ico

```
         (  F          (  n  00     (-  �         �  �F  (                                                           $   ]   �   �   ]   $                                       �   �   �   �   �   �   �   �                           8   �   �   �   �   �   �   �   �   �   �   8                  �   �   �   �   �   �   �   �   �   �   �   �              �   �   �   �   �   �   �   �   �   �   �   �   �   �       #   �   �   �OOO�������������������������ggg�   �   �   �   #   Y   �   �   ��������������������������555�   �   �   �   Y   �   �   �   �   �kkk���������������������   �   �   �   �   �   �   �   �   �   �			������������������   �   �   �   �   �   Y   �   �   �   �   �JJJ���������kkk�   �   �   �   �   �   Y   #   �   �   �   �   ����������			�   �   �   �   �   �   #       �   �   �   �   �   �111�DDD�   �   �   �   �   �   �              �   �   �   �   �   �   �   �   �   �   �   �                  8   �   �   �   �   �   �   �   �   �   �   8                           �   �   �   �   �   �   �   �                                       $   ]   �   �   ]   $                                                                                                                                                                                                                                                                                    (       @                                                                               ,   U   �   �   �   �   U   ,                                                                                      *   �   �   �   �   �   �   �   �   �   �   �   �   *                                                                      �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                          Q   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   Q                                               r   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   r                                       r   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   r                               O   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   O                          �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                      �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �               (   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   '           �   �   �   �   �   �   �888���������������������������������������������������������___�   �   �   �   �   �   �   �          �   �   �   �   �   �   ����������������������������������������������������������SSS�   �   �   �   �   �   �   �      +   �   �   �   �   �   �   �   �hhh�����������������������������������������������������   �   �   �   �   �   �   �   �   +   T   �   �   �   �   �   �   �   ��������������������������������������������������,,,�   �   �   �   �   �   �   �   �   T   �   �   �   �   �   �   �   �   �   �GGG���������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �+++���������������������������������jjj�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ����������������������������������   �   �   �   �   �   �   �   �   �   �   �   T   �   �   �   �   �   �   �   �   �   �   ��������������������������III�   �   �   �   �   �   �   �   �   �   �   �   T   +   �   �   �   �   �   �   �   �   �   �   �   �hhh����������������������   �   �   �   �   �   �   �   �   �   �   �   +      �   �   �   �   �   �   �   �   �   �   �   ������������������,,,�   �   �   �   �   �   �   �   �   �   �   �   �          �   �   �   �   �   �   �   �   �   �   �   �   �GGG�������������   �   �   �   �   �   �   �   �   �   �   �   �   �           '   �   �   �   �   �   �   �   �   �   �   �   �   ����������   �   �   �   �   �   �   �   �   �   �   �   �   (               �   �   �   �   �   �   �   �   �   �   �   �   �333�___�   �   �   �   �   �   �   �   �   �   �   �   �   �                      �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                          O   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   O                               r   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   r                                       r   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   r                                               Q   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   Q                                                          �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                      *   �   �   �   �   �   �   �   �   �   �   �   �   *                                                                                      ,   U   �   �   �   �   U   ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               (   0   `           -                                                                                             	   (   L   j   �   �   �   �   j   K   (   	                                                                                                                                          V   �   �   �   �   �   �   �   �   �   �   �   �   �   �   U                                                                                                                      %   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   &                                                                                                      �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                                          Q   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   R                                                                              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                     �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                             �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                     �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                       P   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   O                                  �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                       #   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   #                   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                  �   �   �   �   �   �   �   �   �   �$$$�hhh�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�PPP��   �   �   �   �   �   �   �   �   �              U   �   �   �   �   �   �   �   �   �   ������������������������������������������������������������������������������������������sss�   �   �   �   �   �   �   �   �   �   �   U           �   �   �   �   �   �   �   �   �   �   �   �eee��������������������������������������������������������������������������������������   �   �   �   �   �   �   �   �   �   �   �       	   �   �   �   �   �   �   �   �   �   �   �   ����������������������������������������������������������������������������������HHH�   �   �   �   �   �   �   �   �   �   �   �   �   	   (   �   �   �   �   �   �   �   �   �   �   �   �   �EEE�����������������������������������������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   (   K   �   �   �   �   �   �   �   �   �   �   �   �   �   �������������������������������������������������������������������������,,,�   �   �   �   �   �   �   �   �   �   �   �   �   �   L   j   �   �   �   �   �   �   �   �   �   �   �   �   �   �)))���������������������������������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   j   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ������������������������������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ����������������������������������������������������������iii�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �eee������������������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ��������������������������������������������������HHH�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   j   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �EEE���������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   j   L   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �����������������������������������������,,,�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   K   (   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �)))�������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   (   	   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ����������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   	       �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ��������������������������iii�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �           U   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �eee����������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   U              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ������������������HHH�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                  �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �EEE�������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                   #   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ���������,,,�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   #                       �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �222�}}}�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                  O   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   P                                       �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                     �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                             �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                     �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                              R   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   Q                                                                                          �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                                                      &   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   %                                                                                                                      U   �   �   �   �   �   �   �   �   �   �   �   �   �   �   V                                                                                                                                          	   (   K   j   �   �   �   �   j   L   (   	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        �PNG

   IHDR         \r�f   sRGB ���   8eXIfMM *    �i            �       �           D"8s  IDATx�]	�ՙn�]<QVA���h$	�N��13*�q��d�č�I���D�L2��(�(Ԙ2�ę�G	��q_@屈���xț�Џ��{o�������U�{}�O��;������9�d���(Dg��8	��N �]��@�hx�?v �N�3�=`;�6�.�&��u��  ��6�P��н��@�àR� P�iZq�^DN���wp����X�hИHg@��
:��|�5` p"@�'�ɲ�s{�p�*�2����� d ү���|(0�
0 ��>K�
�xX�6 IJ� �C|?$KEN�}ϓ|������h $	2 ��|/� . Nz �#���W�e�
�5������ܶ���;�y �� �g�s�h^  I�� DL(�;�8��Hjg�cH|x�1��R"�a���Ӂ� G��@��9`/`%0�H�@j�~,���K
�,t).��I���D�T�O�)~��V�u$b 誛�U%�7������ _�$b 8A������J�3` 510wQ�?��vr���:�2�K�@ ��v*{%#��A�Z�咁^(��=�g \��W�����!:��,`�6��643�:@�c.Fٟ����u?�<��'������_܏vp: �8Q��
I�Ł�p{3���kHȢ�G�����c�Ѽ<�62&�
��2uC�����敭��T�3�
�����;���d�/~m��.��X�@{�w.��d]G�� {lK��Eb���(P�RuM�T�C�����d��])��_Lm�=��=@b���K��GUk�^�U�������)1����g�T���m`9�\����Q��@����Ⱆ6�:ڞ�^�w�����E�D�� �	�5����F�,��
�X"�d�m�<�nB~��@����t�t�x���;�f�>����I8����8��C1۪$B���e���+��jl��EZ��& ��S:�:�6�m����\G1��`���!�nl�l�Ɗ�^�Q`��@Oc�S��@e�ͷ���qb�p���S��@up���F�D@�Г������2@#����L3 �A��$H2� _h��FH#rq(��O�D�򤬈���runGOWa�b� &�SgD�3�ED�to�*Ǥ����9k��~)���,$� x�R�1�v�K ��9�D䍁U(�w�&LE��ꩻ�S)��3�Y8x8 $.i�(��K�ŀY����a�]����4��ǀ	c����@3�f����4� Ƣ���/*b��� ���$!I�~��7�B*-1`	o � �	�$��ǡD�����L������ �J"���OQ��)��2@#�x4�"$e ���I�8��Oi��8�"� �G��8[x�t<�.��7&�m&؎R�^��tq� ؕ�.���Y�-2� �d� ��*_��&d|j\�W�b ��G����*g�� ��釁�F4�"I�؃�/ b1q�N����Y�D��p���9���p�}w\� �Ԥ���1 j`��O���xK=��H�� �A��1�#�
D:U8j���t���$b b�A||�U�Q��26%��)1 ��_�ꢳ!~D��� ��+b >A��:]�E$��50��GDhR�t����ݻwR�)��P� ��n$� 3���@bS�Nu�,Y�j�ʲ��:����;�����@�`�|�-[)�'OV��Ն�sFxڮ��ۥ�n}͛7�����~��ƺ�:���Q��J_��UKj8�q0x���;v4 ̞=[�hW=�	��	�&�!e5�8hѢE��w�]�����6���_�iW}�SZ�?	�/`�;vl�}��2 <�h�" ����A�܁�X,�m۶�+V�(��<�w���#F�^���;���aH�c ���)S�*�{a���p��c89(�^����4�&E��oÆ��W�/��u�=�^���*?{k^�_E�����z���g�� UI-���{WU*
�:p�9.tڷo(/ݺus>��3�'�^�Rg���ڞG��I_D�������~~� ��{���?N0�7�S��.ƍ׸�~?}/y]nA;�أ���2 ]�FOB2C?�_I����[�:�:�=#�OzK�-� ��ϣ�%����?j��I���P�ۯ��{N�-hU��t�:������� ,���G�K�-hU���c�hP7 ����@�n?�\�-�k�.���2�:�� �`��F��=�-�V�_�G��܂V� ��}�0 WI����F��ʭ���sM�rZ�8pJ�Q�*@OK8���
rZ��ݖa, ��w� �S�W^y����.��5�at7��ݏ���Tv#�~7n��A"�����+��W��pM��/�hK8����g��F/^������M{e ��R�|�)q��7�t��?8'���K��P~���瞰�\��r��>�ǷUk �eP��|�^x����
�/V/��v���������*�p�v�� ����ʟ]J��}��k8(������ĉ�ѣGǗ�O�mڴq,X�o���e.�^ �Qx���p�t����4^_�N�{�����y�2 �s����� �-عsg�s���i�v��Z8
!~PJ?�c�������|�] �ܽ{��z�긓R��1pn���z�����tlp�9�f�r�v�jT殿�z�4*O�L�~����ԕ3��4�~~�r�;�m�xY�+���������3 r�;�m�x�4���:7]ՁqL�4)U��!r�1��u�6���$��7����8�w��̙3Ǹ|5�>?�\z��O���͆� ��,�E����3�����2���[����2Wu:E�����^p.H1cJ�t�]}��B�u��SOu�����Ic�O�����%�  �AZ������k����D?�5 �@Q�����3�w�+��"��T��S��Uޥ�13��?��5 M'݋��>p��Z�j�~fj�׈�סԐ�n�����>� ��i5D�[bf ��~a�'�`Xc��� -�1�k����āI�������k��Q�ů|�k�M��(92�@�t�����݂X-�Lדa��N4��qܞ'$f0@�@V�nA�ܘY�L9:�|/^s� ��	��)0`�j��T\w�uZ-����¨\�	@�:��c�t���{�-��Rb��1%� �I,Y%T���~��r�1����C��,�$��*ˀ���f<��0z����h�F���� ����|���8Z-�CR����Tg� �HRf��glY����s��-��p��'+����m�_ؒg������C�{ �	����Ȫ�ϏΙ3g�-�GR|׹7`G��񥡘�0�U��_ٵZЏ�د�D�)���\>����ʗ������z N���@��~~��-��P��{rs���@�<����|.]�Ը|��m|g����_��y�W�KD1�b�M���%�s\����r�1��n�\�ƒ�"-� �`.4��~%3��I}[0A��$��= -�>BH"G�ۏ�^r��<�EBG�i �%���9�@^�~~@�����1����@� t�-[����{%@C�$�mAg���Κ5kʆх����/双O��l��ӿ��B�@.X���u�p�O��6��x�9MPn�`߷o_���^n�`t�
��(�����\r��s�A�y���ۂ�T��@h
�E0l�0��;�tڵӘkƸN����Y�jU��
S#�|^㽺- |��p�N�.���ޥ`�^{�zL�6��4 �ě�b��e�]&"�d�sΜ9Uޥ�U0�!��*nP�*`���o֨v����i8G�����hh��m������ɓ�s�=�{J�U0�Ղ���wZ������������8bEz���,Y�D��![C�>}��7:k׮�no��f� >jvR?#b��X�(��F�AT�F��i��[�{��zv��>��C���a+�[0B2�D��=��G~�(
�ĺ������LO�\s�܂>"8|�`[)
&Lp8�'��������4 oGe�#�ۏ�lْ_\�D̀܂�2Z�l��i�9��t�ȑ9f ޢ�-����=���Y�y��n?uQ�}Xͬ�sA�i >=��1�=R��+� +�܂��.2 ��K������CƢۃ20h� �˫%53�5@�MA�%���̣������j[��9�;�� _(�����0��~r���\�{�m�P����x#TT9��n?����N#��ץ&�}� ��)
�T�VL�!���j���`�p �8@Rr�UAV�A����=��-����pLH�`@n�*Ȋ1�܂U���?}w ]�H2@�ߴi��V���[�˯%�������5 �8�)Э
T`��|rZbZ-�.�!da+@� ���ߞ�Z�gf�[0p���� �� I��gr�$��o%P�_rCy�V�|߽����"m�Y���-�[ l��k xA� ��ۯ9]�[pҤI�Ȩ�pP���k ��Feِ���gHE�d�nAm"Z�$��5}���z�8����2r�X�|� ��Sܻw��r�J�s�J�~�T�f�z{ �ͫ ��x�j?j��Q�E�n� �js���|G�xз�<dXt(��Q�E�.�p�47 ��)���;��ys�_�V�D���-XTi����?� �~�薜����� �`Q�=V�?���^�
������.]�|X�
�m�B~��?���J� �D�������~�h r�����ER���A݀�B���~w�q�Ӿ}���<�ŕ[й5�d��-�`�5 ?�Kq�~l4��0@��)����/I��(����؋���n��9���Y�4�!�Cو2ח*w9���GKݐ�s�&�r�e��s��?�6�8J� |(�uwO䴁d�&K)�nA��?R���n@7,��8�=���r�e����n�M�69k��M7�����J��R�]�e�n��9���Z���� /?នo>��󕾤�rzr�� ��`���V{���u��4448�V��ra��p� ��QRZ�<{�dK.F9��#~T���s.����N%*� ���Ýu�8G&����/W:*x%�{�}@� ��l���Nc#�AI�������i����*?�د�0}�g���C"Āpۯ������4薒ҏ(b�8�_Q�Y� ���r7'���`��� �j �6�� *��3�W�g��"��l��1�:�Sg}%� �	��P?����1`�����Y� ��"��D�0b@�� �����9������[t��F1���p`k�\U�`��R��A#W81 e`)R�ZM��� ��[u��F0�	rq.����� #^�=C"Ā9P'�R~f�� �
pn�zdC"�e���?�\K����@&$b }jz�3۵� x/{��1 Ra�#�|��ƟUK�= &�^��TM�n�2�9�5)?s���{O'�D��D���o [kM�oK0�x�� �Td�_@]b r� �G�����; ����D��D���1�gaR�`��'`0�  �>\��/���f��������ŀ����!fn�Z�|b����U�.t���ट���r�9�+��������	�b rnE�Dk�= ��8�����!b R�Cl�P�E�`�܌�K�'~�@���}*�!`�@��6 L��;��	$b@D��?#��g�F�
��V��1�v��;�Es��Q����=ɮ�4���b@T��n��!��3q�0^�V�� c ��1�ܶ��[����M�=8I����1@�څ@Cu��`N�o�� WJĀ� W����e��I�� n��N�mீ��ܴ�_d��(�4`E܅I� ���"̵�1 *3�+\�E� �\M���)g	r���
���8�>��p�?vI� �0�ǀ~�!b������$'�%"I����R��i�1 �0��? S~&�� �r�����{ n�_�����L�?��T�e��Ǝ�7�C"r��OQ~"qI� ��O 8�?$b �܋r�#@�_�v�J̙��/��3�'d�/����W[����o'N��l��-2� ���@j�O~��0���2` H�@�؄��+����pOB� �uO��(l�S�ԕ���9����~�c�:x/�Xd�.���Ɣ�d ��V�y@F $H2� ����+M*�i��l8O@F $H2� ���2�4& r�PO��֢����7N�YS ����Y�1`��;�JS3n� g[�'��@W@"la`32�n?'�HB2p
�hām�mu �����j@F@��V����Z!��xI���H�y�ѱ)��>��Z!6 ���a�`�����dDV$9f���	pM�6�I�!LG:\LdrwPy�~�P�%��L3��7�TK��Am�mo|�6��	3��-�h J3��?�67 �yr���"����g��4. $�1���_�[*��&���S/�dq�������C��h �3��>�6Ŷ%������\�#�RZq��=lK|ŔX��X�WS�e j5 /����$���:��v@������8���d��1(�z2~F�)���3��͋���l��C�������#����=�.\Lt? %� N$9b�%�:���2��u	 �1|-�	ld�����t $b��@?���@� �F�c��ρ^�D�d�[9�ࠐz�����:
H�@ ��P2v )~���@����z5��|����R�ֵ���|`#�W39؂��<�"-�0��\<�d��u�oGLz 1��Gp����e�倯d� .�jH�@j�F�3��@ c{s<��J&	�@�����b���w��  �� ��n���v��< �����,M;��*p>p!0hH��{=�����x�]I�� DLh����<'��h8�@V �#��J���f� I�� �Hn����W�}�N�t[u�$�������� �@� 2 	�]&)�� #�3���,	=%�T���k�&�  I�����I��ӳ� �[8	�	�L�]�]t�T�g���6�-@b2 U�OV��: A?��} .i�|	�xC���rv�w; ��#�>�i 8_b82 �WP����� �� {'n���8�z;�Ƥy��s� ��@���P��o|�S�ih $3��@߹j��    IEND�B`�
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\globals.css

```
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.13 0.028 261.692);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.13 0.028 261.692);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.13 0.028 261.692);
  --primary: oklch(0.21 0.034 264.665);
  --primary-foreground: oklch(0.985 0.002 247.839);
  --secondary: oklch(0.967 0.003 264.542);
  --secondary-foreground: oklch(0.21 0.034 264.665);
  --muted: oklch(0.967 0.003 264.542);
  --muted-foreground: oklch(0.551 0.027 264.364);
  --accent: oklch(0.967 0.003 264.542);
  --accent-foreground: oklch(0.21 0.034 264.665);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.928 0.006 264.531);
  --input: oklch(0.928 0.006 264.531);
  --ring: oklch(0.707 0.022 261.325);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0.002 247.839);
  --sidebar-foreground: oklch(0.13 0.028 261.692);
  --sidebar-primary: oklch(0.21 0.034 264.665);
  --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
  --sidebar-accent: oklch(0.967 0.003 264.542);
  --sidebar-accent-foreground: oklch(0.21 0.034 264.665);
  --sidebar-border: oklch(0.928 0.006 264.531);
  --sidebar-ring: oklch(0.707 0.022 261.325);
}

.dark {
  --background: oklch(0.13 0.028 261.692);
  --foreground: oklch(0.985 0.002 247.839);
  --card: oklch(0.21 0.034 264.665);
  --card-foreground: oklch(0.985 0.002 247.839);
  --popover: oklch(0.21 0.034 264.665);
  --popover-foreground: oklch(0.985 0.002 247.839);
  --primary: oklch(0.928 0.006 264.531);
  --primary-foreground: oklch(0.21 0.034 264.665);
  --secondary: oklch(0.278 0.033 256.848);
  --secondary-foreground: oklch(0.985 0.002 247.839);
  --muted: oklch(0.278 0.033 256.848);
  --muted-foreground: oklch(0.707 0.022 261.325);
  --accent: oklch(0.278 0.033 256.848);
  --accent-foreground: oklch(0.985 0.002 247.839);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.551 0.027 264.364);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.21 0.034 264.665);
  --sidebar-foreground: oklch(0.985 0.002 247.839);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
  --sidebar-accent: oklch(0.278 0.033 256.848);
  --sidebar-accent-foreground: oklch(0.985 0.002 247.839);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.551 0.027 264.364);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\layout.tsx

```
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "@/shared/components/providers/query-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\page.tsx

```
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\products\preview\page.tsx

```

import Preview from "@/generated/pages/products/preview"

export default function Page() {
  return <Preview />
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\features\products\apis\useCreateProducts.ts

```
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(data)
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\features\products\apis\useDeleteProducts.ts

```
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${"/api/products"}/${id}`, {
        method: "DELETE"
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\features\products\apis\useGetProducts.ts

```
import { useQuery } from "@tanstack/react-query"

export function useGetProducts(filters: Record<string, string>) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/products?${query}`);
      return res.json();
    },
  });
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\features\products\apis\useUpdateProducts.ts

```
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/products", {
        method: "PUT",
        body: JSON.stringify(data)
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\features\products\stores\store.ts

```
import { create } from "zustand";
import type { FilterState } from "@/src/shared/types/store";
import type { Products } from "@/generated/components/Products/columns";

export const useProductsStore = create<FilterState<Products>>((set) => ({
  filters: {
    category: "",
    brand: "",
    name: ""
  },
  selectedItem: null,
  isEditMode: false,
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    })),
  setSelectedItem: (item) =>
    set(() => ({
      selectedItem: item,
      isEditMode: true
    })),
  resetSelectedItem: () =>
    set(() => ({
      selectedItem: null,
      isEditMode: false
    }))
}));
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\api-handler.ts

```
import { NextRequest, NextResponse } from "next/server";

/**
 * Mock API 핸들러 옵션 인터페이스
 */
export interface MockApiHandlerOptions<T> {
  /** 엔티티 이름 (테이블/컬렉션 이름) */
  entityName: string;
  /** 모의 데이터 생성 함수 */
  getMockData: (count?: number) => T[];
  /** 검색 가능한 필드 목록 */
  searchFields?: string[];
  /** 정렬 가능한 필드 목록 */
  sortableFields?: string[];
  /** 지연 시간 (ms) */
  delay?: number;
  /** 기본 페이지 크기 */
  defaultPageSize?: number;
  /** 최대 페이지 크기 */
  maxPageSize?: number;
}

/**
 * API 응답 구조
 */
export interface ApiResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Mock API 핸들러 클래스
 * RESTful API 엔드포인트를 위한 CRUD 작업 처리
 */
export class MockApiHandler<T extends { id: string }> {
  private data: T[] = [];
  private options: MockApiHandlerOptions<T>;
  private entityName: string;
  private storageKey: string;

  constructor(options: MockApiHandlerOptions<T>) {
    this.options = {
      defaultPageSize: 10,
      maxPageSize: 100,
      delay: 500,
      searchFields: ["id", "name"],
      sortableFields: ["id", "name"],
      ...options,
    };

    this.entityName = options.entityName;
    this.storageKey = `mock_data_${this.entityName}`;

    // 초기 데이터 로드
    this.loadData();
  }

  /**
   * 데이터를 로드합니다 (localStorage 또는 초기 모의 데이터)
   */
  private loadData(): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const storedData = localStorage.getItem(this.storageKey);
        if (storedData) {
          this.data = JSON.parse(storedData);
          return;
        }
      }
    } catch (error) {
      console.error("Failed to load data from storage:", error);
    }

    // 초기 모의 데이터 생성
    this.data = this.options.getMockData(50);
    this.saveData();
  }

  /**
   * 데이터를 저장합니다 (localStorage)
   */
  private saveData(): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      }
    } catch (error) {
      console.error("Failed to save data to storage:", error);
    }
  }

  /**
   * 지연 시간을 설정합니다
   */
  private async delay(): Promise<void> {
    if (this.options.delay && this.options.delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.options.delay));
    }
  }

  /**
   * GET 요청 처리 (목록 또는 단일 항목)
   */
  public async handleGet(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    // ID가 지정된 경우 단일 항목 조회
    if (id && id !== this.entityName) {
      const item = this.data.find((item) => item.id === id);
      if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
      return NextResponse.json(item);
    }

    // 목록 조회 (필터링, 정렬, 페이징 적용)
    return this.handleList(url);
  }

  /**
   * 목록 조회 요청 처리
   */
  private handleList(url: URL): NextResponse {
    // 페이징 파라미터
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = Math.min(
      parseInt(url.searchParams.get("pageSize") || String(this.options.defaultPageSize)),
      this.options.maxPageSize || 100
    );

    // 검색 파라미터
    const search = url.searchParams.get("search") || "";
    const searchFields = this.options.searchFields || [];

    // 필터링 파라미터
    const filters: Record<string, string> = {};
    for (const [key, value] of url.searchParams.entries()) {
      if (!["page", "pageSize", "search", "sortBy", "sortOrder"].includes(key)) {
        filters[key] = value;
      }
    }

    // 정렬 파라미터
    const sortBy = url.searchParams.get("sortBy") || "id";
    const sortOrder = url.searchParams.get("sortOrder") || "asc";

    // 검색 및 필터링 적용
    let filteredData = [...this.data];

    // 검색어가 있으면 적용
    if (search && searchFields.length > 0) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter((item) => {
        return searchFields.some((field) => {
          const value = String((item as any)[field] || "").toLowerCase();
          return value.includes(searchLower);
        });
      });
    }

    // 필터가 있으면 적용
    if (Object.keys(filters).length > 0) {
      filteredData = filteredData.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          const itemValue = String((item as any)[key] || "");
          return itemValue === value;
        });
      });
    }

    // 정렬 적용
    filteredData.sort((a, b) => {
      const valueA = (a as any)[sortBy];
      const valueB = (b as any)[sortBy];

      if (valueA === valueB) return 0;

      const comparison = valueA < valueB ? -1 : 1;
      return sortOrder.toLowerCase() === "desc" ? -comparison : comparison;
    });

    // 페이징 적용
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // 응답 구성
    const response: ApiResponse<T> = {
      items: paginatedData,
      total: filteredData.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredData.length / pageSize),
    };

    return NextResponse.json(response);
  }

  /**
   * POST 요청 처리 (새 항목 생성)
   */
  public async handlePost(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    try {
      const newItem = await req.json();

      // ID가 없으면 생성
      if (!newItem.id) {
        newItem.id = crypto.randomUUID();
      }

      // 이미 존재하는 ID인지 확인
      if (this.data.some((item) => item.id === newItem.id)) {
        return NextResponse.json({ error: "Item with this ID already exists" }, { status: 409 });
      }

      // 데이터 추가
      this.data.push(newItem as T);
      this.saveData();

      return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to process request" }, { status: 400 });
    }
  }

  /**
   * PUT 요청 처리 (항목 수정)
   */
  public async handlePut(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    try {
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();
      const updateData = await req.json();

      // ID가 지정되지 않은 경우
      if (!id || id === this.entityName) {
        return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
      }

      // ID가 일치하는 항목 찾기
      const index = this.data.findIndex((item) => item.id === id);
      if (index === -1) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }

      // ID는 변경하지 않음
      updateData.id = id;

      // 데이터 업데이트
      this.data[index] = { ...this.data[index], ...updateData };
      this.saveData();

      return NextResponse.json(this.data[index]);
    } catch (error) {
      return NextResponse.json({ error: "Failed to process request" }, { status: 400 });
    }
  }

  /**
   * DELETE 요청 처리 (항목 삭제)
   */
  public async handleDelete(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    // ID가 지정되지 않은 경우
    if (!id || id === this.entityName) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    // ID가 일치하는 항목 찾기
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // 데이터 삭제
    this.data.splice(index, 1);
    this.saveData();

    return NextResponse.json({ success: true });
  }
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\faker-service.ts

```
import { faker } from "@faker-js/faker/locale/ko";

export interface MockConfig {
  enabled: boolean;
  rows: number;
  delay: number;
  source: "faker";
  settings?: {
    categories?: string[];
    statusProbability?: Record<string, number>;
    priceRange?: { min: number; max: number };
    pagination?: { defaultSize: number; maxSize: number };
    seed?: number;
    [key: string]: any;
  };
}

export interface Products {
  id: string;
  name: string;
  price: number;
  category: string;
  status: "active" | "inactive" | "soldout";
  brand?: string;
}

// 모든 제품의 캐시 (고정 데이터)
let productsCache: Products[] = [];

// 브랜드 캐시
let brandsCache: { id: string; name: string }[] = [];

// 브랜드 데이터 생성 함수
const generateBrands = (config: MockConfig): { id: string; name: string }[] => {
  if (brandsCache.length === 0) {
    // 시드 설정
    if (config.settings?.seed) {
      faker.seed(config.settings.seed);
    }

    brandsCache = Array.from({ length: 10 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.company.name(),
    }));
  }
  return brandsCache;
};

// 랜덤 상태 선택 함수
const getRandomStatus = (config: MockConfig): "active" | "inactive" | "soldout" => {
  const statusProb = config.settings?.statusProbability;

  if (!statusProb) {
    return faker.helpers.arrayElement(["active", "inactive", "soldout"]);
  }

  // 가중치 기반으로 랜덤 상태 선택
  const rand = Math.random();
  let cumulativeProbability = 0;

  for (const [status, probability] of Object.entries(statusProb)) {
    cumulativeProbability += probability;
    if (rand <= cumulativeProbability) {
      return status as "active" | "inactive" | "soldout";
    }
  }

  return "active"; // 기본값
};

export const mockService = {
  getProducts: (config: MockConfig, filters?: Record<string, string>): Products[] => {
    if (!config.enabled) return [];

    // 시드 설정
    if (config.settings?.seed) {
      faker.seed(config.settings.seed);
    }

    // 캐시가 비어있으면 데이터 생성
    if (productsCache.length === 0) {
      const brands = generateBrands(config);
      const categories = config.settings?.categories || ["전자", "의류", "식품"];
      const priceRange = config.settings?.priceRange || { min: 1000, max: 100000 };

      productsCache = Array.from({ length: 20 }).map(() => {
        const randomBrandIndex = Math.floor(Math.random() * Math.min(5, brands.length));
        return {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price({ min: priceRange.min, max: priceRange.max })),
          category: faker.helpers.arrayElement(categories),
          status: getRandomStatus(config),
          brand: randomBrandIndex < brands.length ? brands[randomBrandIndex].name : faker.company.name(),
        };
      });
    }

    // 필터링
    let result = [...productsCache];

    if (filters) {
      if (filters.category && filters.category !== "") {
        result = result.filter((item) => item.category === filters.category);
      }

      if (filters.name && filters.name !== "") {
        result = result.filter((item) => item.name.toLowerCase().includes(filters.name!.toLowerCase()));
      }

      if (filters.brand && filters.brand !== "") {
        result = result.filter((item) => item.brand?.toLowerCase().includes(filters.brand!.toLowerCase()));
      }

      // 상태 필터
      if (filters.status && filters.status !== "") {
        result = result.filter((item) => item.status === filters.status);
      }
    }

    // 페이지네이션 처리
    const pagination = config.settings?.pagination;
    const pageSize = pagination ? parseInt(filters?.pageSize || "") || pagination.defaultSize : config.rows;
    const page = parseInt(filters?.page || "1") || 1;
    const start = (page - 1) * pageSize;

    return result.slice(start, start + pageSize);
  },

  getBrands: (config: MockConfig): { id: string; name: string }[] => {
    if (!config.enabled) return [];
    return generateBrands(config);
  },

  getUsers: (config: MockConfig, filters?: Record<string, string>): any[] => {
    if (!config.enabled) return [];

    // 캐시가 비어있으면 데이터 생성
    let cacheKey = "usersCache";
    let cache = (global as any)[cacheKey] || [];

    if (cache.length === 0) {
      // 시드 설정
      if (config.settings?.seed) {
        faker.seed(config.settings.seed);
      }

      const roles = config.settings?.roles || ["admin", "user", "guest"];

      cache = Array.from({ length: 20 }).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(roles),
        status: faker.helpers.arrayElement(["active", "inactive", "pending"]),
      }));

      // 캐시 저장
      (global as any)[cacheKey] = cache;
    }

    // 필터링
    let result = [...cache];

    if (filters) {
      // 각 필터 적용
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "" && key !== "page" && key !== "pageSize") {
          result = result.filter((item) => {
            const itemValue = String(item[key] || "").toLowerCase();
            return itemValue.includes(String(value).toLowerCase());
          });
        }
      });
    }

    // 페이지네이션 처리
    const pagination = config.settings?.pagination;
    const pageSize = pagination ? parseInt(filters?.pageSize || "") || pagination.defaultSize : config.rows;
    const page = parseInt(filters?.page || "1") || 1;
    const start = (page - 1) * pageSize;

    return result.slice(start, start + pageSize);
  },

  getCustomers: (config: MockConfig, filters?: Record<string, string>): any[] => {
    if (!config.enabled) return [];

    // 캐시가 비어있으면 데이터 생성
    let cacheKey = "customersCache";
    let cache = (global as any)[cacheKey] || [];

    if (cache.length === 0) {
      // 시드 설정
      if (config.settings?.seed) {
        faker.seed(config.settings.seed);
      }

      const customerTypes = config.settings?.customerTypes || ["개인", "기업", "공공기관"];
      const grades = config.settings?.grades || ["VIP", "Gold", "Silver", "Bronze"];

      cache = Array.from({ length: 20 }).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        customerType: faker.helpers.arrayElement(customerTypes),
        grade: faker.helpers.arrayElement(grades),
        address: faker.location.streetAddress(),
        memo: faker.lorem.sentence(),
      }));

      // 캐시 저장
      (global as any)[cacheKey] = cache;
    }

    // 필터링
    let result = [...cache];

    if (filters) {
      // 각 필터 적용
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "" && key !== "page" && key !== "pageSize") {
          result = result.filter((item) => {
            const itemValue = String(item[key] || "").toLowerCase();
            return itemValue.includes(String(value).toLowerCase());
          });
        }
      });
    }

    // 페이지네이션 처리
    const pagination = config.settings?.pagination;
    const pageSize = pagination ? parseInt(filters?.pageSize || "") || pagination.defaultSize : config.rows;
    const page = parseInt(filters?.page || "1") || 1;
    const start = (page - 1) * pageSize;

    return result.slice(start, start + pageSize);
  },
};

export const mockDataWithDelay = async <T>(dataFn: () => T, config: MockConfig): Promise<T> => {
  if (config.delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, config.delay));
  }
  return dataFn();
};

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\index.ts

```
import { MockConfig } from "./faker-service";
import { extractMockConfig } from "./meta-utils";

// 기본 mock 설정
export const DEFAULT_MOCK_CONFIG: MockConfig = {
  enabled: true,
  rows: 5,
  delay: 500,
  source: "faker",
  settings: {
    pagination: {
      defaultSize: 5,
      maxSize: 20,
    },
  },
};

// meta 파일에서 mock 설정 가져오기
export const getMockConfig = (metadata: any): MockConfig => {
  if (!metadata?.mock) {
    return DEFAULT_MOCK_CONFIG;
  }

  return {
    enabled: metadata.mock.enabled ?? DEFAULT_MOCK_CONFIG.enabled,
    rows: metadata.mock.rows ?? DEFAULT_MOCK_CONFIG.rows,
    delay: metadata.mock.delay ?? DEFAULT_MOCK_CONFIG.delay,
    source: metadata.mock.source ?? DEFAULT_MOCK_CONFIG.source,
    settings: {
      ...DEFAULT_MOCK_CONFIG.settings,
      ...metadata.mock.settings,
    },
  };
};

// 모든 모듈 내보내기
export * from "./faker-service";
export * from "./meta-utils";
export * from "./api-handler";

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\meta-utils.js

```
/**
 * MetaModel 필드 정보 기반으로 faker 함수 코드를 생성합니다.
 *
 * @param {string} field 필드 이름
 * @param {string} entityName 엔티티 이름
 * @param {object} settings Mock 설정
 * @param {Map<string, string>} existingTypes 이미 처리한 필드 타입 맵 (참조 전달)
 * @returns {string} faker 함수를 호출하는 코드 문자열
 */
function generateFakerCode(field, entityName, settings = {}, existingTypes = new Map()) {
  // 이미 처리된 필드라면 해당 값 반환
  if (existingTypes.has(field)) {
    return existingTypes.get(field);
  }

  // ID는 항상 UUID
  if (field === "id") {
    const code = "faker.string.uuid()";
    existingTypes.set(field, code);
    return code;
  }

  // 필드명에 따른 추론

  // 가격, 금액 관련 필드
  if (
    field === "price" ||
    field === "amount" ||
    field.includes("price") ||
    field.includes("amount") ||
    field.includes("cost")
  ) {
    const priceRange = settings.priceRange || { min: 1000, max: 100000 };
    const code = `parseInt(faker.commerce.price({ min: ${priceRange.min}, max: ${priceRange.max} }))`;
    existingTypes.set(field, code);
    return code;
  }

  // 이름 관련 필드
  if (field === "name") {
    // 엔티티 유형에 따라 다른 이름 생성
    if (entityName === "products" || entityName.includes("product")) {
      const code = "faker.commerce.productName()";
      existingTypes.set(field, code);
      return code;
    } else if (entityName === "brands" || entityName.includes("brand")) {
      const code = "faker.company.name()";
      existingTypes.set(field, code);
      return code;
    } else {
      const code = "faker.person.fullName()";
      existingTypes.set(field, code);
      return code;
    }
  }

  // 이메일
  if (field === "email" || field.includes("email")) {
    const code = "faker.internet.email()";
    existingTypes.set(field, code);
    return code;
  }

  // 전화번호
  if (field === "phone" || field === "tel" || field.includes("phone") || field.includes("tel")) {
    const code = "faker.phone.number()";
    existingTypes.set(field, code);
    return code;
  }

  // 주소
  if (field === "address" || field.includes("address")) {
    const code = "faker.location.streetAddress()";
    existingTypes.set(field, code);
    return code;
  }

  // 날짜
  if (
    field === "date" ||
    field === "createdAt" ||
    field === "updatedAt" ||
    field.includes("date") ||
    field.includes("Date")
  ) {
    const code = "faker.date.recent().toISOString()";
    existingTypes.set(field, code);
    return code;
  }

  // 메모, 설명 등 텍스트 필드
  if (field === "description" || field === "memo" || field === "content" || field.includes("desc")) {
    const code = "faker.lorem.sentence()";
    existingTypes.set(field, code);
    return code;
  }

  // 카테고리
  if (field === "category" || field.includes("category")) {
    const categories = settings.categories || ["전자", "의류", "식품"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(categories)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 상태
  if (field === "status" || field.includes("status")) {
    // 상태 확률 설정이 있으면 활용
    if (settings.statusProbability && Object.keys(settings.statusProbability).length > 0) {
      const statuses = Object.keys(settings.statusProbability);
      const code = `faker.helpers.arrayElement(${JSON.stringify(statuses)})`;
      existingTypes.set(field, code);
      return code;
    } else {
      const code = `faker.helpers.arrayElement(['active', 'inactive', 'pending'])`;
      existingTypes.set(field, code);
      return code;
    }
  }

  // 고객 유형
  if (field === "customerType" || field.includes("customerType") || field.includes("clientType")) {
    const types = settings.customerTypes || ["개인", "기업", "공공기관"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(types)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 역할
  if (field === "role" || field.includes("role")) {
    const roles = settings.roles || ["admin", "user", "guest"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(roles)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 등급
  if (field === "grade" || field.includes("grade") || field.includes("level")) {
    const grades = settings.grades || ["Gold", "Silver", "Bronze"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(grades)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 색상
  if (field === "color" || field.includes("color")) {
    const code = "faker.color.human()";
    existingTypes.set(field, code);
    return code;
  }

  // 이미지 URL
  if (
    field === "image" ||
    field === "thumbnail" ||
    field.includes("image") ||
    field.includes("img") ||
    field.includes("photo")
  ) {
    const code = "faker.image.url()";
    existingTypes.set(field, code);
    return code;
  }

  // URL
  if (field === "url" || field === "website" || field.includes("url") || field.includes("link")) {
    const code = "faker.internet.url()";
    existingTypes.set(field, code);
    return code;
  }

  // 사용자명
  if (field === "username" || field.includes("username")) {
    const code = "faker.internet.userName()";
    existingTypes.set(field, code);
    return code;
  }

  // 회사명
  if (field === "company" || field.includes("company")) {
    const code = "faker.company.name()";
    existingTypes.set(field, code);
    return code;
  }

  // 국가
  if (field === "country" || field.includes("country")) {
    const code = "faker.location.country()";
    existingTypes.set(field, code);
    return code;
  }

  // 도시
  if (field === "city" || field.includes("city")) {
    const code = "faker.location.city()";
    existingTypes.set(field, code);
    return code;
  }

  // 우편번호
  if (field === "zipcode" || field === "postalCode" || field.includes("zipcode") || field.includes("postal")) {
    const code = "faker.location.zipCode()";
    existingTypes.set(field, code);
    return code;
  }

  // 숫자 필드
  if (
    field === "count" ||
    field === "quantity" ||
    field.includes("count") ||
    field.includes("qty") ||
    field.includes("num")
  ) {
    const code = "faker.number.int({ min: 1, max: 100 })";
    existingTypes.set(field, code);
    return code;
  }

  // boolean 필드
  if (field === "isActive" || field === "isEnabled" || field.includes("is") || field.includes("has")) {
    const code = "faker.datatype.boolean()";
    existingTypes.set(field, code);
    return code;
  }

  // 기본값 (일반 텍스트)
  const code = "faker.lorem.word()";
  existingTypes.set(field, code);
  return code;
}

/**
 * 첫 글자를 대문자로 변환합니다.
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  generateFakerCode,
  capitalize,
};

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\meta-utils.ts

```
import { faker } from "@faker-js/faker/locale/ko";

/**
 * Meta 데이터에서 모델 필드를 추출합니다.
 */
export interface MetaModelField {
  name: string;
  type?: string;
  default?: any;
  cell?: {
    type?: string;
    [key: string]: any;
  };
}

/**
 * Meta 데이터에서 모델 정보를 추출하는 인터페이스
 */
export interface MetaModel {
  name: string;
  columns?: MetaModelField[];
  form?: MetaModelField[];
  mock?: {
    settings?: Record<string, any>;
  };
}

/**
 * 필드명과 메타데이터 설정에 기반하여 적절한 faker 함수 코드를 생성합니다.
 *
 * @param field 필드 이름
 * @param entityName 엔티티 이름
 * @param settings Mock 설정
 * @param existingTypes 이미 처리한 필드 타입 맵 (참조 전달)
 * @returns faker 함수를 호출하는 코드 문자열
 */
export function generateFakerCode(
  field: string,
  entityName: string,
  settings: Record<string, any> = {},
  existingTypes: Map<string, string> = new Map()
): string {
  // 이미 처리된 필드라면 해당 값 반환
  if (existingTypes.has(field)) {
    return existingTypes.get(field)!;
  }

  // ID는 항상 UUID
  if (field === "id") {
    const code = "faker.string.uuid()";
    existingTypes.set(field, code);
    return code;
  }

  // 필드명에 따른 추론

  // 가격, 금액 관련 필드
  if (
    field === "price" ||
    field === "amount" ||
    field.includes("price") ||
    field.includes("amount") ||
    field.includes("cost")
  ) {
    const priceRange = settings.priceRange || { min: 1000, max: 100000 };
    const code = `parseInt(faker.commerce.price({ min: ${priceRange.min}, max: ${priceRange.max} }))`;
    existingTypes.set(field, code);
    return code;
  }

  // 이름 관련 필드
  if (field === "name") {
    // 엔티티 유형에 따라 다른 이름 생성
    if (entityName === "products" || entityName.includes("product")) {
      const code = "faker.commerce.productName()";
      existingTypes.set(field, code);
      return code;
    } else {
      const code = "faker.person.fullName()";
      existingTypes.set(field, code);
      return code;
    }
  }

  // 이메일
  if (field === "email" || field.includes("email")) {
    const code = "faker.internet.email()";
    existingTypes.set(field, code);
    return code;
  }

  // 전화번호
  if (field === "phone" || field === "tel" || field.includes("phone") || field.includes("tel")) {
    const code = "faker.phone.number()";
    existingTypes.set(field, code);
    return code;
  }

  // 주소
  if (field === "address" || field.includes("address")) {
    const code = "faker.location.streetAddress()";
    existingTypes.set(field, code);
    return code;
  }

  // 날짜
  if (
    field === "date" ||
    field === "createdAt" ||
    field === "updatedAt" ||
    field.includes("date") ||
    field.includes("Date")
  ) {
    const code = "faker.date.recent().toISOString()";
    existingTypes.set(field, code);
    return code;
  }

  // 메모, 설명 등 텍스트 필드
  if (field === "description" || field === "memo" || field === "content" || field.includes("desc")) {
    const code = "faker.lorem.sentence()";
    existingTypes.set(field, code);
    return code;
  }

  // 카테고리
  if (field === "category" || field.includes("category")) {
    const categories = settings.categories || ["전자", "의류", "식품"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(categories)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 상태
  if (field === "status" || field.includes("status")) {
    // 상태 확률 설정이 있으면 활용
    if (settings.statusProbability && Object.keys(settings.statusProbability).length > 0) {
      const statuses = Object.keys(settings.statusProbability);
      const code = `faker.helpers.arrayElement(${JSON.stringify(statuses)})`;
      existingTypes.set(field, code);
      return code;
    } else {
      const code = `faker.helpers.arrayElement(['active', 'inactive', 'pending'])`;
      existingTypes.set(field, code);
      return code;
    }
  }

  // 고객 유형
  if (field === "customerType" || field.includes("customerType") || field.includes("clientType")) {
    const types = settings.customerTypes || ["개인", "기업", "공공기관"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(types)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 역할
  if (field === "role" || field.includes("role")) {
    const roles = settings.roles || ["admin", "user", "guest"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(roles)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 등급
  if (field === "grade" || field.includes("grade") || field.includes("level")) {
    const grades = settings.grades || ["Gold", "Silver", "Bronze"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(grades)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 색상
  if (field === "color" || field.includes("color")) {
    const code = "faker.color.human()";
    existingTypes.set(field, code);
    return code;
  }

  // 이미지 URL
  if (
    field === "image" ||
    field === "thumbnail" ||
    field.includes("image") ||
    field.includes("img") ||
    field.includes("photo")
  ) {
    const code = "faker.image.url()";
    existingTypes.set(field, code);
    return code;
  }

  // URL
  if (field === "url" || field === "website" || field.includes("url") || field.includes("link")) {
    const code = "faker.internet.url()";
    existingTypes.set(field, code);
    return code;
  }

  // 사용자명
  if (field === "username" || field.includes("username")) {
    const code = "faker.internet.userName()";
    existingTypes.set(field, code);
    return code;
  }

  // 회사명
  if (field === "company" || field.includes("company")) {
    const code = "faker.company.name()";
    existingTypes.set(field, code);
    return code;
  }

  // 국가
  if (field === "country" || field.includes("country")) {
    const code = "faker.location.country()";
    existingTypes.set(field, code);
    return code;
  }

  // 도시
  if (field === "city" || field.includes("city")) {
    const code = "faker.location.city()";
    existingTypes.set(field, code);
    return code;
  }

  // 우편번호
  if (field === "zipcode" || field === "postalCode" || field.includes("zipcode") || field.includes("postal")) {
    const code = "faker.location.zipCode()";
    existingTypes.set(field, code);
    return code;
  }

  // 숫자 필드
  if (
    field === "count" ||
    field === "quantity" ||
    field.includes("count") ||
    field.includes("qty") ||
    field.includes("num")
  ) {
    const code = "faker.number.int({ min: 1, max: 100 })";
    existingTypes.set(field, code);
    return code;
  }

  // boolean 필드
  if (field === "isActive" || field === "isEnabled" || field.includes("is") || field.includes("has")) {
    const code = "faker.datatype.boolean()";
    existingTypes.set(field, code);
    return code;
  }

  // 기본값 (일반 텍스트)
  const code = "faker.lorem.word()";
  existingTypes.set(field, code);
  return code;
}

/**
 * Meta에서 필드 정보를 추출하여 TypeScript 인터페이스 문자열을 생성합니다
 */
export function generateTypeFromMeta(meta: MetaModel): string {
  if (!meta.form && !meta.columns) {
    return `export interface ${capitalize(meta.name)} {
  id: string;
}`;
  }

  // form 필드와 columns 필드를 합침
  const allFields = new Map<string, MetaModelField>();

  // columns에서 정보 추출
  if (meta.columns) {
    meta.columns.forEach((col) => {
      if (!col.name.includes("actions") && !col.cell?.type?.includes("button")) {
        if (!allFields.has(col.name)) {
          allFields.set(col.name, col);
        }
      }
    });
  }

  // form에서 정보 추출 (더 자세한 타입 정보가 있을 가능성이 높음)
  if (meta.form) {
    meta.form.forEach((field) => {
      allFields.set(field.name, field);
    });
  }

  // ID 필드가 없으면 추가
  if (!allFields.has("id")) {
    allFields.set("id", { name: "id", type: "string" });
  }

  // 필드를 TypeScript 타입으로 변환
  const fieldStrings = Array.from(allFields.values()).map((field) => {
    const fieldName = field.name;
    const isRequired = !fieldName.endsWith("?");
    const cleanName = isRequired ? fieldName : fieldName.slice(0, -1);

    let tsType = "string";
    switch (field.type) {
      case "number":
      case "integer":
        tsType = "number";
        break;
      case "boolean":
        tsType = "boolean";
        break;
      case "date":
      case "datetime":
        tsType = "string"; // ISO date string
        break;
      case "json":
      case "object":
        tsType = "Record<string, any>";
        break;
      case "array":
        tsType = "any[]";
        break;
      default:
        tsType = "string";
    }

    return `  ${cleanName}${isRequired ? "" : "?"}: ${tsType};`;
  });

  return `export interface ${capitalize(meta.name)} {
${fieldStrings.join("\n")}
}`;
}

/**
 * Meta 파일에서 Mock API 설정을 추출합니다.
 */
export function extractMockConfig(meta: any) {
  if (!meta.mock) {
    return {
      enabled: false,
    };
  }

  return {
    enabled: meta.mock.enabled ?? false,
    rows: meta.mock.rows ?? 10,
    delay: meta.mock.delay ?? 0,
    source: meta.mock.source ?? "faker",
  };
}

/**
 * 첫 글자를 대문자로 변환합니다.
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\README.md

```
# Mock API 시스템

데이터가 준비되지 않은 상태에서도 개발과 테스트를 원활히 진행할 수 있도록 도와주는 Mock API 시스템입니다.

## 기능

- faker.js를 사용한 현실적인 테스트 데이터 생성
- Meta 파일에서 Mock 설정 관리
- 지연 시간, 데이터 수, 에러 확률 등 설정 가능
- 필터링 처리 지원
- 페이지네이션 지원
- 배치 처리 지원
- 일관된 API 응답 형식

## 사용 방법

### 1. Meta 파일에 Mock 설정 추가

```json
{
  "mock": {
    "enabled": true,
    "rows": 10,
    "delay": 500,
    "source": "faker",
    "settings": {
      "categories": ["전자", "의류", "식품", "가구", "도서"],
      "statusProbability": {
        "active": 0.7,
        "inactive": 0.2,
        "soldout": 0.1
      },
      "priceRange": {
        "min": 1000,
        "max": 100000
      },
      "pagination": {
        "defaultSize": 5,
        "maxSize": 20
      },
      "seed": 123
    }
  }
}
```

### 2. API Route 파일에 적용

```typescript
import { mockService } from "@/src/lib/mock";
import productsMetadata from "@/meta/products.meta.json";
import { getMockConfig } from "@/src/lib/mock";
import { MockApiHandler } from "@/src/lib/mock/api-handler";
import { Products } from "@/src/lib/mock/faker-service";

const mockConfig = getMockConfig(productsMetadata);

// API 핸들러 생성
const productsApiHandler = new MockApiHandler<Products>({
  mockConfig,
  mockDataFn: (params) => mockService.getProducts(mockConfig, params),
  mockSingleDataFn: (id) => {
    const products = mockService.getProducts(mockConfig);
    return products.find((product) => product.id === id) || null;
  },
});

// 라우트 핸들러 함수
export async function GET(req: Request) {
  return productsApiHandler.handleGet(req);
}

export async function POST(req: Request) {
  return productsApiHandler.handlePost(req);
}

export async function PUT(req: Request) {
  return productsApiHandler.handlePut(req);
}

export async function PATCH(req: Request) {
  return productsApiHandler.handlePatch(req);
}

export async function DELETE(req: Request) {
  return productsApiHandler.handleDelete(req);
}
```

### 3. 커스텀 Mock 서비스 구현

필요한 경우 자체 Mock 서비스를 구현할 수 있습니다:

```typescript
import { MockConfig } from "@/src/lib/mock";

export const customMockService = {
  getCustomData: (config: MockConfig): CustomData[] => {
    if (!config.enabled) return [];

    // 커스텀 로직으로 데이터 생성
    return [
      /* ... */
    ];
  },
};
```

### 4. 타입 생성

Meta 파일에서 TypeScript 인터페이스를 자동 생성하는 기능도 제공합니다:

```typescript
import { generateTypeFromMeta } from "@/src/lib/mock";
import metadata from "@/meta/products.meta.json";

const typeDefinition = generateTypeFromMeta(metadata);
console.log(typeDefinition);
```

## 고급 설정

### 필터링 처리

요청의 쿼리 파라미터를 기반으로 자동 필터링 처리가 됩니다.

### 배치 처리

배열 형태로 요청을 보내면 배치 처리됩니다:

```typescript
// 배치 POST 요청
const response = await fetch("/api/products", {
  method: "POST",
  body: JSON.stringify([item1, item2, item3]),
});
```

### 페이지네이션

페이지네이션 파라미터를 포함하면 자동으로 처리됩니다:

```
GET /api/products?page=2&pageSize=10
```

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\shared\types\store.ts

```
export interface FilterState<T> {
  filters: Record<string, string>;
  selectedItem: T | null;
  isEditMode: boolean;
  setFilter: (key: string, value: string) => void;
  setSelectedItem: (item: T) => void;
  resetSelectedItem: () => void;
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\filterComponent.tpl.js

```
module.exports = function renderFilterComponent(meta, pascalName) {
  const filters = (meta.filters || []).map((field) => {
    if (field.type === 'select') {
      const isStatic = field.options?.source === 'static';
      if (isStatic) {
        const options = field.options.data
          .map((opt) => `<option value="${opt}">${opt}</option>`)
          .join('');
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            ${options}
          </select>
        </label>`;
      } else {
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            {/* TODO: API로 ${field.options.url} 에서 옵션 가져오기 */}
          </select>
        </label>`;
      }
    } else {
      return `
      <label>${field.label}
        <input name="${field.name}" type="text" onChange={onChange} />
      </label>`;
    }
  }).join('\n');

  return `
export default function ${pascalName}FilterComponent({ onChange }) {
  return (
    <div>
      ${filters}
    </div>
  );
}`;
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\formComponent.tpl.js

```
module.exports = function renderFormComponent(meta, pascalName) {
  const fields = meta.form || [];

  const yupFields = fields
    .map((field) => {
      const rules = [];
      const v = field.validation || {};
      if (v.minLength) rules.push(`.min(${v.minLength})`);
      if (v.maxLength) rules.push(`.max(${v.maxLength})`);
      if (v.min) rules.push(`.min(${v.min})`);
      if (v.max) rules.push(`.max(${v.max})`);
      if (v.pattern) rules.push(`.matches(/${v.pattern}/, '${v.message || ""}')`);

      const baseType = field.type === "number" ? "yup.number()" : "yup.string()";
      return `  ${field.name}: ${baseType}${rules.join("")}`;
    })
    .join(",\n");

  const inputs = fields
    .map((field) => {
      const inputType = field.type === "number" ? "number" : "text";
      const tag =
        field.type === "textarea"
          ? `<textarea {...register("${field.name}")}></textarea>`
          : `<input type="${inputType}" {...register("${field.name}")} />`;
      return `
      <label>${field.label}
        ${tag}
        {errors.${field.name} && <span>{errors.${field.name}.message}</span>}
      </label>`;
    })
    .join("\n");

  return `
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
${yupFields}
});

export default function ${pascalName}FormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      ${inputs}
      <button type="submit">저장</button>
    </form>
  );
}
`;
};

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\Columns.tpl.js

```
module.exports = function renderColumnDefs(meta, pascalName) {
  const formMap = new Map();
  (meta.form || []).forEach(field => {
    formMap.set(field.name, field.type);
  });

  const columnDefs = (meta.columns || []).map(col => {
    const fieldType = formMap.get(col.name) || "text";
    const tsType = fieldType === "number" ? "number" : "string";

    if (col.cell?.type === "badge") {
      const map = col.cell.map || {};
      const colorMap = Object.entries(map).map(([key, color]) => {
        return `      "${key}": "bg-${color}-100 text-${color}-800"`;
      }).join(',\n');

      return `
  {
    accessorKey: "${col.name}",
    header: "${col.label}",
    cell: ({ row }) => {
      const value = row.getValue("${col.name}") as string;
      const colorMap: Record<string, string> = {
${colorMap}
      };
      return (
        <span className={cn("px-2 py-1 text-xs rounded-full", colorMap[value] || "bg-muted")}>
          {value}
        </span>
      );
    }
  }`;
    }

    if (col.cell?.type === "buttons" || col.cell?.type === "button") {
      const actions = col.cell.actions || [{
        label: col.cell.label || "수정",
        onClick: col.cell.onClick || "editItem",
        variant: col.cell.variant || "primary"
      }];

      const buttonsJsx = actions.map(btn => {
        const label = btn.label || "Button";
        const color = btn.variant === "destructive" ? "bg-red-500" : "bg-primary";
        const handler = btn.onClick || "() => {}";
        return `
          <button
            onClick={() => ${handler}(row.original)}
            className="text-white text-xs rounded px-2 py-1 ${color}"
          >
            ${label}
          </button>`;
      }).join('');

      return `
  {
    id: "${col.name}",
    header: "${col.label}",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          ${buttonsJsx}
        </div>
      );
    }
  }`;
    }

    return `
  {
    accessorKey: "${col.name}",
    header: "${col.label}"
  }`;
  }).join(',\n');

  const inferredTypes = (meta.columns || []).map(col => {
    const fieldType = formMap.get(col.name) || "text";
    const tsType = fieldType === "number" ? "number" : "string";
    return `  ${col.name}: ${tsType};`;
  }).join('\n');

  return `
import { ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

export type ${pascalName} = {
${inferredTypes}
}

export const columns = (
  editItem: (row: ${pascalName}) => void,
  deleteItem: (row: ${pascalName}) => void
): ColumnDef<${pascalName}>[] => [
${columnDefs}
]
`;
};
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\FilterBar.tpl.js

```
module.exports = function renderShadcnFilter(meta, pascalName) {
  const filters = (meta.filters || [])
    .map((field) => {
      const isDynamic = field.options?.source === "api";
      const varName = field.name + "Options";
      const valueKey = field.options?.valueKey || "id";
      const labelKey = field.options?.labelKey || "name";

      if (field.type === "select") {
        if (isDynamic) {
          return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <select name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
          {${varName}.map((opt) => (
            <option key={opt["${valueKey}"]} value={opt["${valueKey}"]}>
              {opt["${labelKey}"]}
            </option>
          ))}
        </select>
      </div>`;
        } else {
          const staticOptions = (field.options?.data || [])
            .map((opt) => `          <option value="${opt}">${opt}</option>`)
            .join("\n");
          return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <select name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
${staticOptions}
        </select>
      </div>`;
        }
      } else {
        return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <input type="text" name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md" />
      </div>`;
      }
    })
    .join("\n");

  const dynamicHooks = (meta.filters || [])
    .filter((f) => f.type === "select" && f.options?.source === "api")
    .map((f) => {
      const varName = f.name + "Options";
      const setFn = "set" + f.name.charAt(0).toUpperCase() + f.name.slice(1) + "Options";
      const valueKey = f.options?.valueKey || "id";
      const labelKey = f.options?.labelKey || "name";
      return `const [${varName}, ${setFn}] = React.useState<Array<Record<string, any>>>([]);

  React.useEffect(() => {
    fetch("${f.options.url}?ui=true")
      .then(res => res.json())
      .then(data => {
        // 배열인지 확인하고 설정
        if (Array.isArray(data)) {
          ${setFn}(data);
        } else {
          console.error("데이터가 배열이 아닙니다:", data);
          ${setFn}([]);
        }
      })
      .catch(err => {
        console.error("데이터를 불러오는데 실패했습니다:", err);
        ${setFn}([]);
      });
  }, []);`;
    })
    .join("\n\n");

  return `
"use client"

import * as React from "react"

export default function ${pascalName}FilterBar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  ${dynamicHooks}

  return (
    <div className="flex flex-wrap gap-4">
      ${filters}
    </div>
  );
}
`;
};

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\Form.tpl.js

```
module.exports = function renderShadcnForm(meta, pascalName) {
  const fields = meta.form || [];
  const name = meta.name;
  const title = meta.title || pascalName;

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
      const defaultValue = field.type === "number" ? 0 : '""';
      return `    ${field.name}: ${defaultValue}`;
    })
    .join(",\n");

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
import { toast } from "sonner"
import { useCreate${pascalName} } from "@/src/features/${name}/apis/useCreate${pascalName}"
import { useUpdate${pascalName} } from "@/src/features/${name}/apis/useUpdate${pascalName}"
import { use${pascalName}Store } from "@/src/features/${name}/stores/store"

const schema = z.object({
${zodFields}
});

type FormSchema = z.infer<typeof schema>;

interface Props {
  onSuccess?: () => void;
}

export default function ${pascalName}Form({ onSuccess }: Props) {
  const {
    selectedItem,
    isEditMode,
    resetSelectedItem
  } = use${pascalName}Store();

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: selectedItem ?? {
${defaultValues}
    }
  });

  const create = useCreate${pascalName}();
  const update = useUpdate${pascalName}();

  function handleSubmit(values: FormSchema) {
    const action = isEditMode ? update : create;
    action.mutate(values, {
      onSuccess: () => {
        toast.success(\`\${values.name} \${isEditMode ? "수정" : "등록"} 완료\`);
        form.reset();
        resetSelectedItem();
        onSuccess?.();
      }
    });
  }

  ${dynamicFetches}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        ${inputs}
        <Button type="submit" disabled={create.isPending || update.isPending}>
          {isEditMode ? "수정" : "저장"}
        </Button>
      </form>
    </Form>
  );
}
`;
};

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\PreviewPage.tpl.js

```
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
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\RoutePreviewPage.tpl.js

```
module.exports = function renderPreviewRoute(meta) {
  const pageName = meta.name;
  const pascalName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return `
import Preview from "@/generated/pages/${pageName}/preview"

export default function Page() {
  return <Preview />
}
`;
};
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\useQueryHook.tpl.js

```
module.exports = function renderQueryHook(meta) {
  const name = meta.name;
  const pascal = name.charAt(0).toUpperCase() + name.slice(1);
  const baseUrl = meta.api?.baseUrl;

  return `
import { useQuery } from "@tanstack/react-query"

export function useGet${pascal}(filters: Record<string, string>) {
  return useQuery({
    queryKey: ["${name}", filters],
    queryFn: async () => {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(\`${baseUrl}?\${query}\`);
      return res.json();
    },
  });
}
`.trim();
};
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\tableComponent.tpl.js

```
module.exports = function renderTableComponent(meta, pascalName) {
  const headers = meta.columns.map(col => `<th>${col.label}</th>`).join('');
  const cells = meta.columns.map(col => `<td>{item.${col.name}}</td>`).join('');

  return `
export default function ${pascalName}TableComponent() {
  const data = []; // TODO: API 연동 필요
  return (
    <table>
      <thead><tr>${headers}</tr></thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            ${cells}
          </tr>
        ))}
      </tbody>
    </table>
  );
}`;
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\todo\dopamine-dash-확장-아이디어-통합.md

```
# 📌 dopamine-dash 확장을 위한 아이디어 모음

## 0. 💡 기본 개념

- DX/UX 고급 확장 아이디어 생성
- dopamine-dash-template 프로젝트를 AI MCP(메타 중심 프로그래밍)로 발전시키기

## 1. 🧠 meta.json 설계 개선 아이디어

- `filter.type` 확장 → `number`, `date`, `daterange` 등 추가
- `sortable`, `searchable` 속성 지원 → 테이블 정렬/검색 활성화

```json
{
  "name": "price",
  "sortable": true
}
```

- `searchable`: 검색 가능한 필드 지정

```json
{
  "searchable": ["name", "brand"]
}
```

- 초기값 처리 강화: `defaultValue`, 날짜 포맷 등 타입별 초기값 포맷팅
- Form에 필드별 초기 값 포맷팅 + reset 시점 개선 (날짜 포맷, enum 변환 등 유연한 defaultValues 처리)
- 조건부 필드 렌더링(`conditionalFields`)

```json
{
  "if": { "field": "status", "equals": "soldout" },
  "show": ["reason"]
}
```

- Form 내 동적 필드 (조건부 렌더링)

  - meta에 조건식 정의 (ex: status가 soldout이면 reason 필드 노출)
  - status가 soldout이면 reason 필드가 input이고, 아니라면 selectbox 노출
  - watch()와 조건부 렌더링 자동 적용

- `formLayout`, `formGroups` 등 UI 배치 구조 지원
- `permissions`: ABAC 적용 위한 필드 (권한 기반 제어)

```json
"permissions": {
  "view": ["admin", "manager"],
  "edit": ["admin"]
}
```

- 컬럼 정렬/검색 활성화 (useReactTable → enableSorting)
  - sortable: true 옵션을 meta에서 주면 정렬 허용

---

## 2. ⚙️ 기능 자동화 및 UX 개선

- Dialog 애니메이션 적용을 위해 `framer-motion` 사용 검토
- 테이블 Pagination + Sorting 자동화
- 조회 성공/에러/toast 피드백 자동화
  - `react-query`의 `onSuccess`, `onError`를 이용한 meta 기반 UX 피드백 구성
- 상세 페이지 자동 생성
  - `/products/[id]/page.tsx`
  - 수정이 아닌 별도의 상세 보기 페이지
  - mock or fetch로 단일 데이터 조회
  - meta에 `"detailView": true` 옵션 추가
- 사용자 정의 액션 버튼 처리
  - 버튼 렌더링 자동
  - approveItem(item) 자동 함수 생성
  - toast 또는 모달 트리거 등도 설정 가능

```json
"actions": [
  { "label": "승인", "onClick": "approveItem", "color": "blue" }
]
```

- Postman 스크립트 자동 생성
- Form 필드 reset 처리 개선 (select 초기화 등)
- 검색 기능 자동화 (SearchBar)
  - meta에 searchable: ["name", "brand"] 같은 필드 지정
  - Search input 추가
  - useDebounce 처리 + query param에 포함
- 국제화 (i18n) 연동
  - meta.title, label, messages 등을 key로 추출
  - i18n 자동 구조 생성 (예: t("product.name"))

---

## 3. 🚀 AI + 코드 자동화 확장 방향

- `aiPrompt`를 단순 텍스트 → 구조화된 설명 형태로 확장

```json
"aiPrompt": {
  "summary": "상품 관리 화면입니다.",
  "fields": {
    "price": "숫자 필드, 0 이상",
    "status": "판매 상태, enum"
  }
}
```

- meta → `prisma.schema`, `Spring Entity`, `Zod Schema` 등 코드 자동 생성기
  - meta → prisma.schema 자동 생성기
  - meta → Spring Boot Java 파일 자동 생성기
- AI MCP(메타 중심 프로그래밍)로 진화 가능한 구조 → Meta-First Development
- Meta 기반 생성 코드의 AI 리뷰 + 승인 워크플로우 (GitHub Actions, CI 연동)

---

## 4. 🔮 앞으로 할 수 있는 확장 방향

1. 조회 전용 `generate-api` 도구 (조회 전용 대시보드)
2. meta.json 생성 UI (GUI 기반 Editor, 노코드 느낌)
3. GitHub Actions로 CRUD/코드 자동 publish
4. 플러그인 시스템 설계 → 필드 타입 추가, 테마 시스템
5. 팀/에이전트 기반 코드 리뷰 및 승인 프로세스(AI 자동 리뷰 포함)
6. CRUD actions에 대한 ABAC 심화 적용
   - 실행 전 검증 로직 추가
   - 실행 후 로그 저장을 위한 방법 설계

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\api\api\products\route.ts

```
import { mockService, mockDataWithDelay } from "@/src/lib/mock";
import productsMetadata from "@/meta/products.meta.json";
import { getMockConfig } from "@/src/lib/mock";

const mockConfig = getMockConfig(productsMetadata);


export async function GET(req: Request) {
  if (mockConfig.enabled) {
    const mockData = await mockDataWithDelay(() => mockService.getProducts(mockConfig), mockConfig);
    return Response.json(mockData);
  }
  return Response.json([]);
}


export async function POST(req: Request) {
  const body = await req.json();
  if (mockConfig.enabled) {
    await mockDataWithDelay(() => {}, mockConfig);
    return Response.json({ ok: true, data: { ...body, id: crypto.randomUUID() } });
  }
  return Response.json({ ok: true, data: body });
}


export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Allow": "GET, POST, OPTIONS"
    }
  });
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\api\products\route.ts

```
import { NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker/locale/ko';
import { MockApiHandler } from '../../../lib/mock/api-handler';

export interface Products {
  id: string;
  name: string;
  price: number;
  category: string;
  status: string;
  description: string;
  brand: string;
}

// 모의 데이터 생성 함수
function getProducts(count = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price({ min: 1000, max: 100000 })),
    category: faker.helpers.arrayElement(["전자","의류","식품","가구","도서"]),
    status: faker.helpers.arrayElement(["active","inactive","soldout"]),
    description: faker.lorem.sentence(),
    brand: faker.lorem.word(),
  }));
}

// API 핸들러 인스턴스 생성
const apiHandler = new MockApiHandler<Products>({
  entityName: 'products',
  getMockData: getProducts,
  searchFields: ['id', 'name'], // 검색 가능 필드 (필요에 따라 수정)
});

// GET 요청 처리
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  
  // UI 컴포넌트에서 사용하기 위한 처리
  // format 또는 ui 파라미터가 있으면 간단한 배열 형태로 반환
  // 브랜드 목록과 같은 참조 데이터에 유용함
  if (url.searchParams.has('format') || url.searchParams.has('ui')) {
    const count = parseInt(url.searchParams.get('count') || '20');
    const items = getProducts(count);
    return NextResponse.json(items);
  }
  
  // 기본 페이지네이션 형태 응답
  return apiHandler.handleGet(req);
}

// POST 요청 처리
export async function POST(req: NextRequest) {
  return apiHandler.handlePost(req);
}

// PUT 요청 처리
export async function PUT(req: NextRequest) {
  return apiHandler.handlePut(req);
}

// DELETE 요청 처리
export async function DELETE(req: NextRequest) {
  return apiHandler.handleDelete(req);
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\favicon.ico

```
         (  F          (  n  00     (-  �         �  �F  (                                                           $   ]   �   �   ]   $                                       �   �   �   �   �   �   �   �                           8   �   �   �   �   �   �   �   �   �   �   8                  �   �   �   �   �   �   �   �   �   �   �   �              �   �   �   �   �   �   �   �   �   �   �   �   �   �       #   �   �   �OOO�������������������������ggg�   �   �   �   #   Y   �   �   ��������������������������555�   �   �   �   Y   �   �   �   �   �kkk���������������������   �   �   �   �   �   �   �   �   �   �			������������������   �   �   �   �   �   Y   �   �   �   �   �JJJ���������kkk�   �   �   �   �   �   Y   #   �   �   �   �   ����������			�   �   �   �   �   �   #       �   �   �   �   �   �111�DDD�   �   �   �   �   �   �              �   �   �   �   �   �   �   �   �   �   �   �                  8   �   �   �   �   �   �   �   �   �   �   8                           �   �   �   �   �   �   �   �                                       $   ]   �   �   ]   $                                                                                                                                                                                                                                                                                    (       @                                                                               ,   U   �   �   �   �   U   ,                                                                                      *   �   �   �   �   �   �   �   �   �   �   �   �   *                                                                      �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                          Q   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   Q                                               r   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   r                                       r   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   r                               O   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   O                          �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                      �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �               (   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   '           �   �   �   �   �   �   �888���������������������������������������������������������___�   �   �   �   �   �   �   �          �   �   �   �   �   �   ����������������������������������������������������������SSS�   �   �   �   �   �   �   �      +   �   �   �   �   �   �   �   �hhh�����������������������������������������������������   �   �   �   �   �   �   �   �   +   T   �   �   �   �   �   �   �   ��������������������������������������������������,,,�   �   �   �   �   �   �   �   �   T   �   �   �   �   �   �   �   �   �   �GGG���������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �+++���������������������������������jjj�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ����������������������������������   �   �   �   �   �   �   �   �   �   �   �   T   �   �   �   �   �   �   �   �   �   �   ��������������������������III�   �   �   �   �   �   �   �   �   �   �   �   T   +   �   �   �   �   �   �   �   �   �   �   �   �hhh����������������������   �   �   �   �   �   �   �   �   �   �   �   +      �   �   �   �   �   �   �   �   �   �   �   ������������������,,,�   �   �   �   �   �   �   �   �   �   �   �   �          �   �   �   �   �   �   �   �   �   �   �   �   �GGG�������������   �   �   �   �   �   �   �   �   �   �   �   �   �           '   �   �   �   �   �   �   �   �   �   �   �   �   ����������   �   �   �   �   �   �   �   �   �   �   �   �   (               �   �   �   �   �   �   �   �   �   �   �   �   �333�___�   �   �   �   �   �   �   �   �   �   �   �   �   �                      �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                          O   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   O                               r   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   r                                       r   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   r                                               Q   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   Q                                                          �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                      *   �   �   �   �   �   �   �   �   �   �   �   �   *                                                                                      ,   U   �   �   �   �   U   ,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               (   0   `           -                                                                                             	   (   L   j   �   �   �   �   j   K   (   	                                                                                                                                          V   �   �   �   �   �   �   �   �   �   �   �   �   �   �   U                                                                                                                      %   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   &                                                                                                      �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                                          Q   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   R                                                                              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                     �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                             �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                     �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                       P   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   O                                  �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                       #   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   #                   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                  �   �   �   �   �   �   �   �   �   �$$$�hhh�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�eee�PPP��   �   �   �   �   �   �   �   �   �              U   �   �   �   �   �   �   �   �   �   ������������������������������������������������������������������������������������������sss�   �   �   �   �   �   �   �   �   �   �   U           �   �   �   �   �   �   �   �   �   �   �   �eee��������������������������������������������������������������������������������������   �   �   �   �   �   �   �   �   �   �   �       	   �   �   �   �   �   �   �   �   �   �   �   ����������������������������������������������������������������������������������HHH�   �   �   �   �   �   �   �   �   �   �   �   �   	   (   �   �   �   �   �   �   �   �   �   �   �   �   �EEE�����������������������������������������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   (   K   �   �   �   �   �   �   �   �   �   �   �   �   �   �������������������������������������������������������������������������,,,�   �   �   �   �   �   �   �   �   �   �   �   �   �   L   j   �   �   �   �   �   �   �   �   �   �   �   �   �   �)))���������������������������������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   j   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ������������������������������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ����������������������������������������������������������iii�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �eee������������������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ��������������������������������������������������HHH�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   j   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �EEE���������������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   j   L   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �����������������������������������������,,,�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   K   (   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �)))�������������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   (   	   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ����������������������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   	       �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ��������������������������iii�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �           U   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �eee����������������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   U              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ������������������HHH�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                  �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �EEE�������������   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                   #   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   ���������,,,�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   #                       �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �222�}}}�   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                  O   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   P                                       �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                     �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                             �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                     �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                              R   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   Q                                                                                          �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �                                                                                                      &   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   %                                                                                                                      U   �   �   �   �   �   �   �   �   �   �   �   �   �   �   V                                                                                                                                          	   (   K   j   �   �   �   �   j   L   (   	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        �PNG

   IHDR         \r�f   sRGB ���   8eXIfMM *    �i            �       �           D"8s  IDATx�]	�ՙn�]<QVA���h$	�N��13*�q��d�č�I���D�L2��(�(Ԙ2�ę�G	��q_@屈���xț�Џ��{o�������U�{}�O��;������9�d���(Dg��8	��N �]��@�hx�?v �N�3�=`;�6�.�&��u��  ��6�P��н��@�àR� P�iZq�^DN���wp����X�hИHg@��
:��|�5` p"@�'�ɲ�s{�p�*�2����� d ү���|(0�
0 ��>K�
�xX�6 IJ� �C|?$KEN�}ϓ|������h $	2 ��|/� . Nz �#���W�e�
�5������ܶ���;�y �� �g�s�h^  I�� DL(�;�8��Hjg�cH|x�1��R"�a���Ӂ� G��@��9`/`%0�H�@j�~,���K
�,t).��I���D�T�O�)~��V�u$b 誛�U%�7������ _�$b 8A������J�3` 510wQ�?��vr���:�2�K�@ ��v*{%#��A�Z�咁^(��=�g \��W�����!:��,`�6��643�:@�c.Fٟ����u?�<��'������_܏vp: �8Q��
I�Ł�p{3���kHȢ�G�����c�Ѽ<�62&�
��2uC�����敭��T�3�
�����;���d�/~m��.��X�@{�w.��d]G�� {lK��Eb���(P�RuM�T�C�����d��])��_Lm�=��=@b���K��GUk�^�U�������)1����g�T���m`9�\����Q��@����Ⱆ6�:ڞ�^�w�����E�D�� �	�5����F�,��
�X"�d�m�<�nB~��@����t�t�x���;�f�>����I8����8��C1۪$B���e���+��jl��EZ��& ��S:�:�6�m����\G1��`���!�nl�l�Ɗ�^�Q`��@Oc�S��@e�ͷ���qb�p���S��@up���F�D@�Г������2@#����L3 �A��$H2� _h��FH#rq(��O�D�򤬈���runGOWa�b� &�SgD�3�ED�to�*Ǥ����9k��~)���,$� x�R�1�v�K ��9�D䍁U(�w�&LE��ꩻ�S)��3�Y8x8 $.i�(��K�ŀY����a�]����4��ǀ	c����@3�f����4� Ƣ���/*b��� ���$!I�~��7�B*-1`	o � �	�$��ǡD�����L������ �J"���OQ��)��2@#�x4�"$e ���I�8��Oi��8�"� �G��8[x�t<�.��7&�m&؎R�^��tq� ؕ�.���Y�-2� �d� ��*_��&d|j\�W�b ��G����*g�� ��釁�F4�"I�؃�/ b1q�N����Y�D��p���9���p�}w\� �Ԥ���1 j`��O���xK=��H�� �A��1�#�
D:U8j���t���$b b�A||�U�Q��26%��)1 ��_�ꢳ!~D��� ��+b >A��:]�E$��50��GDhR�t����ݻwR�)��P� ��n$� 3���@bS�Nu�,Y�j�ʲ��:����;�����@�`�|�-[)�'OV��Ն�sFxڮ��ۥ�n}͛7�����~��ƺ�:���Q��J_��UKj8�q0x���;v4 ̞=[�hW=�	��	�&�!e5�8hѢE��w�]�����6���_�iW}�SZ�?	�/`�;vl�}��2 <�h�" ����A�܁�X,�m۶�+V�(��<�w���#F�^���;���aH�c ���)S�*�{a���p��c89(�^����4�&E��oÆ��W�/��u�=�^���*?{k^�_E�����z���g�� UI-���{WU*
�:p�9.tڷo(/ݺus>��3�'�^�Rg���ڞG��I_D�������~~� ��{���?N0�7�S��.ƍ׸�~?}/y]nA;�أ���2 ]�FOB2C?�_I����[�:�:�=#�OzK�-� ��ϣ�%����?j��I���P�ۯ��{N�-hU��t�:������� ,���G�K�-hU���c�hP7 ����@�n?�\�-�k�.���2�:�� �`��F��=�-�V�_�G��܂V� ��}�0 WI����F��ʭ���sM�rZ�8pJ�Q�*@OK8���
rZ��ݖa, ��w� �S�W^y����.��5�at7��ݏ���Tv#�~7n��A"�����+��W��pM��/�hK8����g��F/^������M{e ��R�|�)q��7�t��?8'���K��P~���瞰�\��r��>�ǷUk �eP��|�^x����
�/V/��v���������*�p�v�� ����ʟ]J��}��k8(������ĉ�ѣGǗ�O�mڴq,X�o���e.�^ �Qx���p�t����4^_�N�{�����y�2 �s����� �-عsg�s���i�v��Z8
!~PJ?�c�������|�] �ܽ{��z�긓R��1pn���z�����tlp�9�f�r�v�jT殿�z�4*O�L�~����ԕ3��4�~~�r�;�m�xY�+���������3 r�;�m�x�4���:7]ՁqL�4)U��!r�1��u�6���$��7����8�w��̙3Ǹ|5�>?�\z��O���͆� ��,�E����3�����2���[����2Wu:E�����^p.H1cJ�t�]}��B�u��SOu�����Ic�O�����%�  �AZ������k����D?�5 �@Q�����3�w�+��"��T��S��Uޥ�13��?��5 M'݋��>p��Z�j�~fj�׈�סԐ�n�����>� ��i5D�[bf ��~a�'�`Xc��� -�1�k����āI�������k��Q�ů|�k�M��(92�@�t�����݂X-�Lדa��N4��qܞ'$f0@�@V�nA�ܘY�L9:�|/^s� ��	��)0`�j��T\w�uZ-����¨\�	@�:��c�t���{�-��Rb��1%� �I,Y%T���~��r�1����C��,�$��*ˀ���f<��0z����h�F���� ����|���8Z-�CR����Tg� �HRf��glY����s��-��p��'+����m�_ؒg������C�{ �	����Ȫ�ϏΙ3g�-�GR|׹7`G��񥡘�0�U��_ٵZЏ�د�D�)���\>����ʗ������z N���@��~~��-��P��{rs���@�<����|.]�Ը|��m|g����_��y�W�KD1�b�M���%�s\����r�1��n�\�ƒ�"-� �`.4��~%3��I}[0A��$��= -�>BH"G�ۏ�^r��<�EBG�i �%���9�@^�~~@�����1����@� t�-[����{%@C�$�mAg���Κ5kʆх����/双O��l��ӿ��B�@.X���u�p�O��6��x�9MPn�`߷o_���^n�`t�
��(�����\r��s�A�y���ۂ�T��@h
�E0l�0��;�tڵӘkƸN����Y�jU��
S#�|^㽺- |��p�N�.���ޥ`�^{�zL�6��4 �ě�b��e�]&"�d�sΜ9Uޥ�U0�!��*nP�*`���o֨v����i8G�����hh��m������ɓ�s�=�{J�U0�Ղ���wZ������������8bEz���,Y�D��![C�>}��7:k׮�no��f� >jvR?#b��X�(��F�AT�F��i��[�{��zv��>��C���a+�[0B2�D��=��G~�(
�ĺ������LO�\s�܂>"8|�`[)
&Lp8�'��������4 oGe�#�ۏ�lْ_\�D̀܂�2Z�l��i�9��t�ȑ9f ޢ�-����=���Y�y��n?uQ�}Xͬ�sA�i >=��1�=R��+� +�܂��.2 ��K������CƢۃ20h� �˫%53�5@�MA�%���̣������j[��9�;�� _(�����0��~r���\�{�m�P����x#TT9��n?����N#��ץ&�}� ��)
�T�VL�!���j���`�p �8@Rr�UAV�A����=��-����pLH�`@n�*Ȋ1�܂U���?}w ]�H2@�ߴi��V���[�˯%�������5 �8�)Э
T`��|rZbZ-�.�!da+@� ���ߞ�Z�gf�[0p���� �� I��gr�$��o%P�_rCy�V�|߽����"m�Y���-�[ l��k xA� ��ۯ9]�[pҤI�Ȩ�pP���k ��Feِ���gHE�d�nAm"Z�$��5}���z�8����2r�X�|� ��Sܻw��r�J�s�J�~�T�f�z{ �ͫ ��x�j?j��Q�E�n� �js���|G�xз�<dXt(��Q�E�.�p�47 ��)���;��ys�_�V�D���-XTi����?� �~�薜����� �`Q�=V�?���^�
������.]�|X�
�m�B~��?���J� �D�������~�h r�����ER���A݀�B���~w�q�Ӿ}���<�ŕ[й5�d��-�`�5 ?�Kq�~l4��0@��)����/I��(����؋���n��9���Y�4�!�Cو2ח*w9���GKݐ�s�&�r�e��s��?�6�8J� |(�uwO䴁d�&K)�nA��?R���n@7,��8�=���r�e����n�M�69k��M7�����J��R�]�e�n��9���Z���� /?នo>��󕾤�rzr�� ��`���V{���u��4448�V��ra��p� ��QRZ�<{�dK.F9��#~T���s.����N%*� ���Ýu�8G&����/W:*x%�{�}@� ��l���Nc#�AI�������i����*?�د�0}�g���C"Āpۯ������4薒ҏ(b�8�_Q�Y� ���r7'���`��� �j �6�� *��3�W�g��"��l��1�:�Sg}%� �	��P?����1`�����Y� ��"��D�0b@�� �����9������[t��F1���p`k�\U�`��R��A#W81 e`)R�ZM��� ��[u��F0�	rq.����� #^�=C"Ā9P'�R~f�� �
pn�zdC"�e���?�\K����@&$b }jz�3۵� x/{��1 Ra�#�|��ƟUK�= &�^��TM�n�2�9�5)?s���{O'�D��D���o [kM�oK0�x�� �Td�_@]b r� �G�����; ����D��D���1�gaR�`��'`0�  �>\��/���f��������ŀ����!fn�Z�|b����U�.t���ट���r�9�+��������	�b rnE�Dk�= ��8�����!b R�Cl�P�E�`�܌�K�'~�@���}*�!`�@��6 L��;��	$b@D��?#��g�F�
��V��1�v��;�Es��Q����=ɮ�4���b@T��n��!��3q�0^�V�� c ��1�ܶ��[����M�=8I����1@�څ@Cu��`N�o�� WJĀ� W����e��I�� n��N�mீ��ܴ�_d��(�4`E܅I� ���"̵�1 *3�+\�E� �\M���)g	r���
���8�>��p�?vI� �0�ǀ~�!b������$'�%"I����R��i�1 �0��? S~&�� �r�����{ n�_�����L�?��T�e��Ǝ�7�C"r��OQ~"qI� ��O 8�?$b �܋r�#@�_�v�J̙��/��3�'d�/����W[����o'N��l��-2� ���@j�O~��0���2` H�@�؄��+����pOB� �uO��(l�S�ԕ���9����~�c�:x/�Xd�.���Ɣ�d ��V�y@F $H2� ����+M*�i��l8O@F $H2� ���2�4& r�PO��֢����7N�YS ����Y�1`��;�JS3n� g[�'��@W@"la`32�n?'�HB2p
�hām�mu �����j@F@��V����Z!��xI���H�y�ѱ)��>��Z!6 ���a�`�����dDV$9f���	pM�6�I�!LG:\LdrwPy�~�P�%��L3��7�TK��Am�mo|�6��	3��-�h J3��?�67 �yr���"����g��4. $�1���_�[*��&���S/�dq�������C��h �3��>�6Ŷ%������\�#�RZq��=lK|ŔX��X�WS�e j5 /����$���:��v@������8���d��1(�z2~F�)���3��͋���l��C�������#����=�.\Lt? %� N$9b�%�:���2��u	 �1|-�	ld�����t $b��@?���@� �F�c��ρ^�D�d�[9�ࠐz�����:
H�@ ��P2v )~���@����z5��|����R�ֵ���|`#�W39؂��<�"-�0��\<�d��u�oGLz 1��Gp����e�倯d� .�jH�@j�F�3��@ c{s<��J&	�@�����b���w��  �� ��n���v��< �����,M;��*p>p!0hH��{=�����x�]I�� DLh����<'��h8�@V �#��J���f� I�� �Hn����W�}�N�t[u�$�������� �@� 2 	�]&)�� #�3���,	=%�T���k�&�  I�����I��ӳ� �[8	�	�L�]�]t�T�g���6�-@b2 U�OV��: A?��} .i�|	�xC���rv�w; ��#�>�i 8_b82 �WP����� �� {'n���8�z;�Ƥy��s� ��@���P��o|�S�ih $3��@߹j��    IEND�B`�
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\globals.css

```
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.13 0.028 261.692);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.13 0.028 261.692);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.13 0.028 261.692);
  --primary: oklch(0.21 0.034 264.665);
  --primary-foreground: oklch(0.985 0.002 247.839);
  --secondary: oklch(0.967 0.003 264.542);
  --secondary-foreground: oklch(0.21 0.034 264.665);
  --muted: oklch(0.967 0.003 264.542);
  --muted-foreground: oklch(0.551 0.027 264.364);
  --accent: oklch(0.967 0.003 264.542);
  --accent-foreground: oklch(0.21 0.034 264.665);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.928 0.006 264.531);
  --input: oklch(0.928 0.006 264.531);
  --ring: oklch(0.707 0.022 261.325);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0.002 247.839);
  --sidebar-foreground: oklch(0.13 0.028 261.692);
  --sidebar-primary: oklch(0.21 0.034 264.665);
  --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
  --sidebar-accent: oklch(0.967 0.003 264.542);
  --sidebar-accent-foreground: oklch(0.21 0.034 264.665);
  --sidebar-border: oklch(0.928 0.006 264.531);
  --sidebar-ring: oklch(0.707 0.022 261.325);
}

.dark {
  --background: oklch(0.13 0.028 261.692);
  --foreground: oklch(0.985 0.002 247.839);
  --card: oklch(0.21 0.034 264.665);
  --card-foreground: oklch(0.985 0.002 247.839);
  --popover: oklch(0.21 0.034 264.665);
  --popover-foreground: oklch(0.985 0.002 247.839);
  --primary: oklch(0.928 0.006 264.531);
  --primary-foreground: oklch(0.21 0.034 264.665);
  --secondary: oklch(0.278 0.033 256.848);
  --secondary-foreground: oklch(0.985 0.002 247.839);
  --muted: oklch(0.278 0.033 256.848);
  --muted-foreground: oklch(0.707 0.022 261.325);
  --accent: oklch(0.278 0.033 256.848);
  --accent-foreground: oklch(0.985 0.002 247.839);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.551 0.027 264.364);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.21 0.034 264.665);
  --sidebar-foreground: oklch(0.985 0.002 247.839);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
  --sidebar-accent: oklch(0.278 0.033 256.848);
  --sidebar-accent-foreground: oklch(0.985 0.002 247.839);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.551 0.027 264.364);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\layout.tsx

```
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "@/shared/components/providers/query-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\page.tsx

```
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\app\products\preview\page.tsx

```

import Preview from "@/generated/pages/products/preview"

export default function Page() {
  return <Preview />
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\features\products\apis\useCreateProducts.ts

```
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(data)
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\features\products\apis\useDeleteProducts.ts

```
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${"/api/products"}/${id}`, {
        method: "DELETE"
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\features\products\apis\useGetProducts.ts

```
import { useQuery } from "@tanstack/react-query"

export function useGetProducts(filters: Record<string, string>) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/products?${query}`);
      return res.json();
    },
  });
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\features\products\apis\useUpdateProducts.ts

```
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/products", {
        method: "PUT",
        body: JSON.stringify(data)
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\features\products\stores\store.ts

```
import { create } from "zustand";
import type { FilterState } from "@/src/shared/types/store";
import type { Products } from "@/generated/components/Products/columns";

export const useProductsStore = create<FilterState<Products>>((set) => ({
  filters: {
    category: "",
    brand: "",
    name: ""
  },
  selectedItem: null,
  isEditMode: false,
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    })),
  setSelectedItem: (item) =>
    set(() => ({
      selectedItem: item,
      isEditMode: true
    })),
  resetSelectedItem: () =>
    set(() => ({
      selectedItem: null,
      isEditMode: false
    }))
}));
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\api-handler.ts

```
import { NextRequest, NextResponse } from "next/server";

/**
 * Mock API 핸들러 옵션 인터페이스
 */
export interface MockApiHandlerOptions<T> {
  /** 엔티티 이름 (테이블/컬렉션 이름) */
  entityName: string;
  /** 모의 데이터 생성 함수 */
  getMockData: (count?: number) => T[];
  /** 검색 가능한 필드 목록 */
  searchFields?: string[];
  /** 정렬 가능한 필드 목록 */
  sortableFields?: string[];
  /** 지연 시간 (ms) */
  delay?: number;
  /** 기본 페이지 크기 */
  defaultPageSize?: number;
  /** 최대 페이지 크기 */
  maxPageSize?: number;
}

/**
 * API 응답 구조
 */
export interface ApiResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Mock API 핸들러 클래스
 * RESTful API 엔드포인트를 위한 CRUD 작업 처리
 */
export class MockApiHandler<T extends { id: string }> {
  private data: T[] = [];
  private options: MockApiHandlerOptions<T>;
  private entityName: string;
  private storageKey: string;

  constructor(options: MockApiHandlerOptions<T>) {
    this.options = {
      defaultPageSize: 10,
      maxPageSize: 100,
      delay: 500,
      searchFields: ["id", "name"],
      sortableFields: ["id", "name"],
      ...options,
    };

    this.entityName = options.entityName;
    this.storageKey = `mock_data_${this.entityName}`;

    // 초기 데이터 로드
    this.loadData();
  }

  /**
   * 데이터를 로드합니다 (localStorage 또는 초기 모의 데이터)
   */
  private loadData(): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const storedData = localStorage.getItem(this.storageKey);
        if (storedData) {
          this.data = JSON.parse(storedData);
          return;
        }
      }
    } catch (error) {
      console.error("Failed to load data from storage:", error);
    }

    // 초기 모의 데이터 생성
    this.data = this.options.getMockData(50);
    this.saveData();
  }

  /**
   * 데이터를 저장합니다 (localStorage)
   */
  private saveData(): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      }
    } catch (error) {
      console.error("Failed to save data to storage:", error);
    }
  }

  /**
   * 지연 시간을 설정합니다
   */
  private async delay(): Promise<void> {
    if (this.options.delay && this.options.delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.options.delay));
    }
  }

  /**
   * GET 요청 처리 (목록 또는 단일 항목)
   */
  public async handleGet(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    // ID가 지정된 경우 단일 항목 조회
    if (id && id !== this.entityName) {
      const item = this.data.find((item) => item.id === id);
      if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
      return NextResponse.json(item);
    }

    // 목록 조회 (필터링, 정렬, 페이징 적용)
    return this.handleList(url);
  }

  /**
   * 목록 조회 요청 처리
   */
  private handleList(url: URL): NextResponse {
    // 페이징 파라미터
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = Math.min(
      parseInt(url.searchParams.get("pageSize") || String(this.options.defaultPageSize)),
      this.options.maxPageSize || 100
    );

    // 검색 파라미터
    const search = url.searchParams.get("search") || "";
    const searchFields = this.options.searchFields || [];

    // 필터링 파라미터
    const filters: Record<string, string> = {};
    for (const [key, value] of url.searchParams.entries()) {
      if (!["page", "pageSize", "search", "sortBy", "sortOrder"].includes(key)) {
        filters[key] = value;
      }
    }

    // 정렬 파라미터
    const sortBy = url.searchParams.get("sortBy") || "id";
    const sortOrder = url.searchParams.get("sortOrder") || "asc";

    // 검색 및 필터링 적용
    let filteredData = [...this.data];

    // 검색어가 있으면 적용
    if (search && searchFields.length > 0) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter((item) => {
        return searchFields.some((field) => {
          const value = String((item as any)[field] || "").toLowerCase();
          return value.includes(searchLower);
        });
      });
    }

    // 필터가 있으면 적용
    if (Object.keys(filters).length > 0) {
      filteredData = filteredData.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          const itemValue = String((item as any)[key] || "");
          return itemValue === value;
        });
      });
    }

    // 정렬 적용
    filteredData.sort((a, b) => {
      const valueA = (a as any)[sortBy];
      const valueB = (b as any)[sortBy];

      if (valueA === valueB) return 0;

      const comparison = valueA < valueB ? -1 : 1;
      return sortOrder.toLowerCase() === "desc" ? -comparison : comparison;
    });

    // 페이징 적용
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // 응답 구성
    const response: ApiResponse<T> = {
      items: paginatedData,
      total: filteredData.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredData.length / pageSize),
    };

    return NextResponse.json(response);
  }

  /**
   * POST 요청 처리 (새 항목 생성)
   */
  public async handlePost(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    try {
      const newItem = await req.json();

      // ID가 없으면 생성
      if (!newItem.id) {
        newItem.id = crypto.randomUUID();
      }

      // 이미 존재하는 ID인지 확인
      if (this.data.some((item) => item.id === newItem.id)) {
        return NextResponse.json({ error: "Item with this ID already exists" }, { status: 409 });
      }

      // 데이터 추가
      this.data.push(newItem as T);
      this.saveData();

      return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to process request" }, { status: 400 });
    }
  }

  /**
   * PUT 요청 처리 (항목 수정)
   */
  public async handlePut(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    try {
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();
      const updateData = await req.json();

      // ID가 지정되지 않은 경우
      if (!id || id === this.entityName) {
        return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
      }

      // ID가 일치하는 항목 찾기
      const index = this.data.findIndex((item) => item.id === id);
      if (index === -1) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }

      // ID는 변경하지 않음
      updateData.id = id;

      // 데이터 업데이트
      this.data[index] = { ...this.data[index], ...updateData };
      this.saveData();

      return NextResponse.json(this.data[index]);
    } catch (error) {
      return NextResponse.json({ error: "Failed to process request" }, { status: 400 });
    }
  }

  /**
   * DELETE 요청 처리 (항목 삭제)
   */
  public async handleDelete(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    // ID가 지정되지 않은 경우
    if (!id || id === this.entityName) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    // ID가 일치하는 항목 찾기
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // 데이터 삭제
    this.data.splice(index, 1);
    this.saveData();

    return NextResponse.json({ success: true });
  }
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\faker-service.ts

```
import { faker } from "@faker-js/faker/locale/ko";

export interface MockConfig {
  enabled: boolean;
  rows: number;
  delay: number;
  source: "faker";
  settings?: {
    categories?: string[];
    statusProbability?: Record<string, number>;
    priceRange?: { min: number; max: number };
    pagination?: { defaultSize: number; maxSize: number };
    seed?: number;
    [key: string]: any;
  };
}

export interface Products {
  id: string;
  name: string;
  price: number;
  category: string;
  status: "active" | "inactive" | "soldout";
  brand?: string;
}

// 모든 제품의 캐시 (고정 데이터)
let productsCache: Products[] = [];

// 브랜드 캐시
let brandsCache: { id: string; name: string }[] = [];

// 브랜드 데이터 생성 함수
const generateBrands = (config: MockConfig): { id: string; name: string }[] => {
  if (brandsCache.length === 0) {
    // 시드 설정
    if (config.settings?.seed) {
      faker.seed(config.settings.seed);
    }

    brandsCache = Array.from({ length: 10 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.company.name(),
    }));
  }
  return brandsCache;
};

// 랜덤 상태 선택 함수
const getRandomStatus = (config: MockConfig): "active" | "inactive" | "soldout" => {
  const statusProb = config.settings?.statusProbability;

  if (!statusProb) {
    return faker.helpers.arrayElement(["active", "inactive", "soldout"]);
  }

  // 가중치 기반으로 랜덤 상태 선택
  const rand = Math.random();
  let cumulativeProbability = 0;

  for (const [status, probability] of Object.entries(statusProb)) {
    cumulativeProbability += probability;
    if (rand <= cumulativeProbability) {
      return status as "active" | "inactive" | "soldout";
    }
  }

  return "active"; // 기본값
};

export const mockService = {
  getProducts: (config: MockConfig, filters?: Record<string, string>): Products[] => {
    if (!config.enabled) return [];

    // 시드 설정
    if (config.settings?.seed) {
      faker.seed(config.settings.seed);
    }

    // 캐시가 비어있으면 데이터 생성
    if (productsCache.length === 0) {
      const brands = generateBrands(config);
      const categories = config.settings?.categories || ["전자", "의류", "식품"];
      const priceRange = config.settings?.priceRange || { min: 1000, max: 100000 };

      productsCache = Array.from({ length: 20 }).map(() => {
        const randomBrandIndex = Math.floor(Math.random() * Math.min(5, brands.length));
        return {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price({ min: priceRange.min, max: priceRange.max })),
          category: faker.helpers.arrayElement(categories),
          status: getRandomStatus(config),
          brand: randomBrandIndex < brands.length ? brands[randomBrandIndex].name : faker.company.name(),
        };
      });
    }

    // 필터링
    let result = [...productsCache];

    if (filters) {
      if (filters.category && filters.category !== "") {
        result = result.filter((item) => item.category === filters.category);
      }

      if (filters.name && filters.name !== "") {
        result = result.filter((item) => item.name.toLowerCase().includes(filters.name!.toLowerCase()));
      }

      if (filters.brand && filters.brand !== "") {
        result = result.filter((item) => item.brand?.toLowerCase().includes(filters.brand!.toLowerCase()));
      }

      // 상태 필터
      if (filters.status && filters.status !== "") {
        result = result.filter((item) => item.status === filters.status);
      }
    }

    // 페이지네이션 처리
    const pagination = config.settings?.pagination;
    const pageSize = pagination ? parseInt(filters?.pageSize || "") || pagination.defaultSize : config.rows;
    const page = parseInt(filters?.page || "1") || 1;
    const start = (page - 1) * pageSize;

    return result.slice(start, start + pageSize);
  },

  getBrands: (config: MockConfig): { id: string; name: string }[] => {
    if (!config.enabled) return [];
    return generateBrands(config);
  },

  getUsers: (config: MockConfig, filters?: Record<string, string>): any[] => {
    if (!config.enabled) return [];

    // 캐시가 비어있으면 데이터 생성
    let cacheKey = "usersCache";
    let cache = (global as any)[cacheKey] || [];

    if (cache.length === 0) {
      // 시드 설정
      if (config.settings?.seed) {
        faker.seed(config.settings.seed);
      }

      const roles = config.settings?.roles || ["admin", "user", "guest"];

      cache = Array.from({ length: 20 }).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(roles),
        status: faker.helpers.arrayElement(["active", "inactive", "pending"]),
      }));

      // 캐시 저장
      (global as any)[cacheKey] = cache;
    }

    // 필터링
    let result = [...cache];

    if (filters) {
      // 각 필터 적용
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "" && key !== "page" && key !== "pageSize") {
          result = result.filter((item) => {
            const itemValue = String(item[key] || "").toLowerCase();
            return itemValue.includes(String(value).toLowerCase());
          });
        }
      });
    }

    // 페이지네이션 처리
    const pagination = config.settings?.pagination;
    const pageSize = pagination ? parseInt(filters?.pageSize || "") || pagination.defaultSize : config.rows;
    const page = parseInt(filters?.page || "1") || 1;
    const start = (page - 1) * pageSize;

    return result.slice(start, start + pageSize);
  },

  getCustomers: (config: MockConfig, filters?: Record<string, string>): any[] => {
    if (!config.enabled) return [];

    // 캐시가 비어있으면 데이터 생성
    let cacheKey = "customersCache";
    let cache = (global as any)[cacheKey] || [];

    if (cache.length === 0) {
      // 시드 설정
      if (config.settings?.seed) {
        faker.seed(config.settings.seed);
      }

      const customerTypes = config.settings?.customerTypes || ["개인", "기업", "공공기관"];
      const grades = config.settings?.grades || ["VIP", "Gold", "Silver", "Bronze"];

      cache = Array.from({ length: 20 }).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        customerType: faker.helpers.arrayElement(customerTypes),
        grade: faker.helpers.arrayElement(grades),
        address: faker.location.streetAddress(),
        memo: faker.lorem.sentence(),
      }));

      // 캐시 저장
      (global as any)[cacheKey] = cache;
    }

    // 필터링
    let result = [...cache];

    if (filters) {
      // 각 필터 적용
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "" && key !== "page" && key !== "pageSize") {
          result = result.filter((item) => {
            const itemValue = String(item[key] || "").toLowerCase();
            return itemValue.includes(String(value).toLowerCase());
          });
        }
      });
    }

    // 페이지네이션 처리
    const pagination = config.settings?.pagination;
    const pageSize = pagination ? parseInt(filters?.pageSize || "") || pagination.defaultSize : config.rows;
    const page = parseInt(filters?.page || "1") || 1;
    const start = (page - 1) * pageSize;

    return result.slice(start, start + pageSize);
  },
};

export const mockDataWithDelay = async <T>(dataFn: () => T, config: MockConfig): Promise<T> => {
  if (config.delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, config.delay));
  }
  return dataFn();
};

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\index.ts

```
import { MockConfig } from "./faker-service";
import { extractMockConfig } from "./meta-utils";

// 기본 mock 설정
export const DEFAULT_MOCK_CONFIG: MockConfig = {
  enabled: true,
  rows: 5,
  delay: 500,
  source: "faker",
  settings: {
    pagination: {
      defaultSize: 5,
      maxSize: 20,
    },
  },
};

// meta 파일에서 mock 설정 가져오기
export const getMockConfig = (metadata: any): MockConfig => {
  if (!metadata?.mock) {
    return DEFAULT_MOCK_CONFIG;
  }

  return {
    enabled: metadata.mock.enabled ?? DEFAULT_MOCK_CONFIG.enabled,
    rows: metadata.mock.rows ?? DEFAULT_MOCK_CONFIG.rows,
    delay: metadata.mock.delay ?? DEFAULT_MOCK_CONFIG.delay,
    source: metadata.mock.source ?? DEFAULT_MOCK_CONFIG.source,
    settings: {
      ...DEFAULT_MOCK_CONFIG.settings,
      ...metadata.mock.settings,
    },
  };
};

// 모든 모듈 내보내기
export * from "./faker-service";
export * from "./meta-utils";
export * from "./api-handler";

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\meta-utils.js

```
/**
 * MetaModel 필드 정보 기반으로 faker 함수 코드를 생성합니다.
 *
 * @param {string} field 필드 이름
 * @param {string} entityName 엔티티 이름
 * @param {object} settings Mock 설정
 * @param {Map<string, string>} existingTypes 이미 처리한 필드 타입 맵 (참조 전달)
 * @returns {string} faker 함수를 호출하는 코드 문자열
 */
function generateFakerCode(field, entityName, settings = {}, existingTypes = new Map()) {
  // 이미 처리된 필드라면 해당 값 반환
  if (existingTypes.has(field)) {
    return existingTypes.get(field);
  }

  // ID는 항상 UUID
  if (field === "id") {
    const code = "faker.string.uuid()";
    existingTypes.set(field, code);
    return code;
  }

  // 필드명에 따른 추론

  // 가격, 금액 관련 필드
  if (
    field === "price" ||
    field === "amount" ||
    field.includes("price") ||
    field.includes("amount") ||
    field.includes("cost")
  ) {
    const priceRange = settings.priceRange || { min: 1000, max: 100000 };
    const code = `parseInt(faker.commerce.price({ min: ${priceRange.min}, max: ${priceRange.max} }))`;
    existingTypes.set(field, code);
    return code;
  }

  // 이름 관련 필드
  if (field === "name") {
    // 엔티티 유형에 따라 다른 이름 생성
    if (entityName === "products" || entityName.includes("product")) {
      const code = "faker.commerce.productName()";
      existingTypes.set(field, code);
      return code;
    } else if (entityName === "brands" || entityName.includes("brand")) {
      const code = "faker.company.name()";
      existingTypes.set(field, code);
      return code;
    } else {
      const code = "faker.person.fullName()";
      existingTypes.set(field, code);
      return code;
    }
  }

  // 이메일
  if (field === "email" || field.includes("email")) {
    const code = "faker.internet.email()";
    existingTypes.set(field, code);
    return code;
  }

  // 전화번호
  if (field === "phone" || field === "tel" || field.includes("phone") || field.includes("tel")) {
    const code = "faker.phone.number()";
    existingTypes.set(field, code);
    return code;
  }

  // 주소
  if (field === "address" || field.includes("address")) {
    const code = "faker.location.streetAddress()";
    existingTypes.set(field, code);
    return code;
  }

  // 날짜
  if (
    field === "date" ||
    field === "createdAt" ||
    field === "updatedAt" ||
    field.includes("date") ||
    field.includes("Date")
  ) {
    const code = "faker.date.recent().toISOString()";
    existingTypes.set(field, code);
    return code;
  }

  // 메모, 설명 등 텍스트 필드
  if (field === "description" || field === "memo" || field === "content" || field.includes("desc")) {
    const code = "faker.lorem.sentence()";
    existingTypes.set(field, code);
    return code;
  }

  // 카테고리
  if (field === "category" || field.includes("category")) {
    const categories = settings.categories || ["전자", "의류", "식품"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(categories)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 상태
  if (field === "status" || field.includes("status")) {
    // 상태 확률 설정이 있으면 활용
    if (settings.statusProbability && Object.keys(settings.statusProbability).length > 0) {
      const statuses = Object.keys(settings.statusProbability);
      const code = `faker.helpers.arrayElement(${JSON.stringify(statuses)})`;
      existingTypes.set(field, code);
      return code;
    } else {
      const code = `faker.helpers.arrayElement(['active', 'inactive', 'pending'])`;
      existingTypes.set(field, code);
      return code;
    }
  }

  // 고객 유형
  if (field === "customerType" || field.includes("customerType") || field.includes("clientType")) {
    const types = settings.customerTypes || ["개인", "기업", "공공기관"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(types)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 역할
  if (field === "role" || field.includes("role")) {
    const roles = settings.roles || ["admin", "user", "guest"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(roles)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 등급
  if (field === "grade" || field.includes("grade") || field.includes("level")) {
    const grades = settings.grades || ["Gold", "Silver", "Bronze"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(grades)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 색상
  if (field === "color" || field.includes("color")) {
    const code = "faker.color.human()";
    existingTypes.set(field, code);
    return code;
  }

  // 이미지 URL
  if (
    field === "image" ||
    field === "thumbnail" ||
    field.includes("image") ||
    field.includes("img") ||
    field.includes("photo")
  ) {
    const code = "faker.image.url()";
    existingTypes.set(field, code);
    return code;
  }

  // URL
  if (field === "url" || field === "website" || field.includes("url") || field.includes("link")) {
    const code = "faker.internet.url()";
    existingTypes.set(field, code);
    return code;
  }

  // 사용자명
  if (field === "username" || field.includes("username")) {
    const code = "faker.internet.userName()";
    existingTypes.set(field, code);
    return code;
  }

  // 회사명
  if (field === "company" || field.includes("company")) {
    const code = "faker.company.name()";
    existingTypes.set(field, code);
    return code;
  }

  // 국가
  if (field === "country" || field.includes("country")) {
    const code = "faker.location.country()";
    existingTypes.set(field, code);
    return code;
  }

  // 도시
  if (field === "city" || field.includes("city")) {
    const code = "faker.location.city()";
    existingTypes.set(field, code);
    return code;
  }

  // 우편번호
  if (field === "zipcode" || field === "postalCode" || field.includes("zipcode") || field.includes("postal")) {
    const code = "faker.location.zipCode()";
    existingTypes.set(field, code);
    return code;
  }

  // 숫자 필드
  if (
    field === "count" ||
    field === "quantity" ||
    field.includes("count") ||
    field.includes("qty") ||
    field.includes("num")
  ) {
    const code = "faker.number.int({ min: 1, max: 100 })";
    existingTypes.set(field, code);
    return code;
  }

  // boolean 필드
  if (field === "isActive" || field === "isEnabled" || field.includes("is") || field.includes("has")) {
    const code = "faker.datatype.boolean()";
    existingTypes.set(field, code);
    return code;
  }

  // 기본값 (일반 텍스트)
  const code = "faker.lorem.word()";
  existingTypes.set(field, code);
  return code;
}

/**
 * 첫 글자를 대문자로 변환합니다.
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  generateFakerCode,
  capitalize,
};

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\meta-utils.ts

```
import { faker } from "@faker-js/faker/locale/ko";

/**
 * Meta 데이터에서 모델 필드를 추출합니다.
 */
export interface MetaModelField {
  name: string;
  type?: string;
  default?: any;
  cell?: {
    type?: string;
    [key: string]: any;
  };
}

/**
 * Meta 데이터에서 모델 정보를 추출하는 인터페이스
 */
export interface MetaModel {
  name: string;
  columns?: MetaModelField[];
  form?: MetaModelField[];
  mock?: {
    settings?: Record<string, any>;
  };
}

/**
 * 필드명과 메타데이터 설정에 기반하여 적절한 faker 함수 코드를 생성합니다.
 *
 * @param field 필드 이름
 * @param entityName 엔티티 이름
 * @param settings Mock 설정
 * @param existingTypes 이미 처리한 필드 타입 맵 (참조 전달)
 * @returns faker 함수를 호출하는 코드 문자열
 */
export function generateFakerCode(
  field: string,
  entityName: string,
  settings: Record<string, any> = {},
  existingTypes: Map<string, string> = new Map()
): string {
  // 이미 처리된 필드라면 해당 값 반환
  if (existingTypes.has(field)) {
    return existingTypes.get(field)!;
  }

  // ID는 항상 UUID
  if (field === "id") {
    const code = "faker.string.uuid()";
    existingTypes.set(field, code);
    return code;
  }

  // 필드명에 따른 추론

  // 가격, 금액 관련 필드
  if (
    field === "price" ||
    field === "amount" ||
    field.includes("price") ||
    field.includes("amount") ||
    field.includes("cost")
  ) {
    const priceRange = settings.priceRange || { min: 1000, max: 100000 };
    const code = `parseInt(faker.commerce.price({ min: ${priceRange.min}, max: ${priceRange.max} }))`;
    existingTypes.set(field, code);
    return code;
  }

  // 이름 관련 필드
  if (field === "name") {
    // 엔티티 유형에 따라 다른 이름 생성
    if (entityName === "products" || entityName.includes("product")) {
      const code = "faker.commerce.productName()";
      existingTypes.set(field, code);
      return code;
    } else {
      const code = "faker.person.fullName()";
      existingTypes.set(field, code);
      return code;
    }
  }

  // 이메일
  if (field === "email" || field.includes("email")) {
    const code = "faker.internet.email()";
    existingTypes.set(field, code);
    return code;
  }

  // 전화번호
  if (field === "phone" || field === "tel" || field.includes("phone") || field.includes("tel")) {
    const code = "faker.phone.number()";
    existingTypes.set(field, code);
    return code;
  }

  // 주소
  if (field === "address" || field.includes("address")) {
    const code = "faker.location.streetAddress()";
    existingTypes.set(field, code);
    return code;
  }

  // 날짜
  if (
    field === "date" ||
    field === "createdAt" ||
    field === "updatedAt" ||
    field.includes("date") ||
    field.includes("Date")
  ) {
    const code = "faker.date.recent().toISOString()";
    existingTypes.set(field, code);
    return code;
  }

  // 메모, 설명 등 텍스트 필드
  if (field === "description" || field === "memo" || field === "content" || field.includes("desc")) {
    const code = "faker.lorem.sentence()";
    existingTypes.set(field, code);
    return code;
  }

  // 카테고리
  if (field === "category" || field.includes("category")) {
    const categories = settings.categories || ["전자", "의류", "식품"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(categories)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 상태
  if (field === "status" || field.includes("status")) {
    // 상태 확률 설정이 있으면 활용
    if (settings.statusProbability && Object.keys(settings.statusProbability).length > 0) {
      const statuses = Object.keys(settings.statusProbability);
      const code = `faker.helpers.arrayElement(${JSON.stringify(statuses)})`;
      existingTypes.set(field, code);
      return code;
    } else {
      const code = `faker.helpers.arrayElement(['active', 'inactive', 'pending'])`;
      existingTypes.set(field, code);
      return code;
    }
  }

  // 고객 유형
  if (field === "customerType" || field.includes("customerType") || field.includes("clientType")) {
    const types = settings.customerTypes || ["개인", "기업", "공공기관"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(types)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 역할
  if (field === "role" || field.includes("role")) {
    const roles = settings.roles || ["admin", "user", "guest"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(roles)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 등급
  if (field === "grade" || field.includes("grade") || field.includes("level")) {
    const grades = settings.grades || ["Gold", "Silver", "Bronze"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(grades)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 색상
  if (field === "color" || field.includes("color")) {
    const code = "faker.color.human()";
    existingTypes.set(field, code);
    return code;
  }

  // 이미지 URL
  if (
    field === "image" ||
    field === "thumbnail" ||
    field.includes("image") ||
    field.includes("img") ||
    field.includes("photo")
  ) {
    const code = "faker.image.url()";
    existingTypes.set(field, code);
    return code;
  }

  // URL
  if (field === "url" || field === "website" || field.includes("url") || field.includes("link")) {
    const code = "faker.internet.url()";
    existingTypes.set(field, code);
    return code;
  }

  // 사용자명
  if (field === "username" || field.includes("username")) {
    const code = "faker.internet.userName()";
    existingTypes.set(field, code);
    return code;
  }

  // 회사명
  if (field === "company" || field.includes("company")) {
    const code = "faker.company.name()";
    existingTypes.set(field, code);
    return code;
  }

  // 국가
  if (field === "country" || field.includes("country")) {
    const code = "faker.location.country()";
    existingTypes.set(field, code);
    return code;
  }

  // 도시
  if (field === "city" || field.includes("city")) {
    const code = "faker.location.city()";
    existingTypes.set(field, code);
    return code;
  }

  // 우편번호
  if (field === "zipcode" || field === "postalCode" || field.includes("zipcode") || field.includes("postal")) {
    const code = "faker.location.zipCode()";
    existingTypes.set(field, code);
    return code;
  }

  // 숫자 필드
  if (
    field === "count" ||
    field === "quantity" ||
    field.includes("count") ||
    field.includes("qty") ||
    field.includes("num")
  ) {
    const code = "faker.number.int({ min: 1, max: 100 })";
    existingTypes.set(field, code);
    return code;
  }

  // boolean 필드
  if (field === "isActive" || field === "isEnabled" || field.includes("is") || field.includes("has")) {
    const code = "faker.datatype.boolean()";
    existingTypes.set(field, code);
    return code;
  }

  // 기본값 (일반 텍스트)
  const code = "faker.lorem.word()";
  existingTypes.set(field, code);
  return code;
}

/**
 * Meta에서 필드 정보를 추출하여 TypeScript 인터페이스 문자열을 생성합니다
 */
export function generateTypeFromMeta(meta: MetaModel): string {
  if (!meta.form && !meta.columns) {
    return `export interface ${capitalize(meta.name)} {
  id: string;
}`;
  }

  // form 필드와 columns 필드를 합침
  const allFields = new Map<string, MetaModelField>();

  // columns에서 정보 추출
  if (meta.columns) {
    meta.columns.forEach((col) => {
      if (!col.name.includes("actions") && !col.cell?.type?.includes("button")) {
        if (!allFields.has(col.name)) {
          allFields.set(col.name, col);
        }
      }
    });
  }

  // form에서 정보 추출 (더 자세한 타입 정보가 있을 가능성이 높음)
  if (meta.form) {
    meta.form.forEach((field) => {
      allFields.set(field.name, field);
    });
  }

  // ID 필드가 없으면 추가
  if (!allFields.has("id")) {
    allFields.set("id", { name: "id", type: "string" });
  }

  // 필드를 TypeScript 타입으로 변환
  const fieldStrings = Array.from(allFields.values()).map((field) => {
    const fieldName = field.name;
    const isRequired = !fieldName.endsWith("?");
    const cleanName = isRequired ? fieldName : fieldName.slice(0, -1);

    let tsType = "string";
    switch (field.type) {
      case "number":
      case "integer":
        tsType = "number";
        break;
      case "boolean":
        tsType = "boolean";
        break;
      case "date":
      case "datetime":
        tsType = "string"; // ISO date string
        break;
      case "json":
      case "object":
        tsType = "Record<string, any>";
        break;
      case "array":
        tsType = "any[]";
        break;
      default:
        tsType = "string";
    }

    return `  ${cleanName}${isRequired ? "" : "?"}: ${tsType};`;
  });

  return `export interface ${capitalize(meta.name)} {
${fieldStrings.join("\n")}
}`;
}

/**
 * Meta 파일에서 Mock API 설정을 추출합니다.
 */
export function extractMockConfig(meta: any) {
  if (!meta.mock) {
    return {
      enabled: false,
    };
  }

  return {
    enabled: meta.mock.enabled ?? false,
    rows: meta.mock.rows ?? 10,
    delay: meta.mock.delay ?? 0,
    source: meta.mock.source ?? "faker",
  };
}

/**
 * 첫 글자를 대문자로 변환합니다.
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\lib\mock\README.md

```
# Mock API 시스템

데이터가 준비되지 않은 상태에서도 개발과 테스트를 원활히 진행할 수 있도록 도와주는 Mock API 시스템입니다.

## 기능

- faker.js를 사용한 현실적인 테스트 데이터 생성
- Meta 파일에서 Mock 설정 관리
- 지연 시간, 데이터 수, 에러 확률 등 설정 가능
- 필터링 처리 지원
- 페이지네이션 지원
- 배치 처리 지원
- 일관된 API 응답 형식

## 사용 방법

### 1. Meta 파일에 Mock 설정 추가

```json
{
  "mock": {
    "enabled": true,
    "rows": 10,
    "delay": 500,
    "source": "faker",
    "settings": {
      "categories": ["전자", "의류", "식품", "가구", "도서"],
      "statusProbability": {
        "active": 0.7,
        "inactive": 0.2,
        "soldout": 0.1
      },
      "priceRange": {
        "min": 1000,
        "max": 100000
      },
      "pagination": {
        "defaultSize": 5,
        "maxSize": 20
      },
      "seed": 123
    }
  }
}
```

### 2. API Route 파일에 적용

```typescript
import { mockService } from "@/src/lib/mock";
import productsMetadata from "@/meta/products.meta.json";
import { getMockConfig } from "@/src/lib/mock";
import { MockApiHandler } from "@/src/lib/mock/api-handler";
import { Products } from "@/src/lib/mock/faker-service";

const mockConfig = getMockConfig(productsMetadata);

// API 핸들러 생성
const productsApiHandler = new MockApiHandler<Products>({
  mockConfig,
  mockDataFn: (params) => mockService.getProducts(mockConfig, params),
  mockSingleDataFn: (id) => {
    const products = mockService.getProducts(mockConfig);
    return products.find((product) => product.id === id) || null;
  },
});

// 라우트 핸들러 함수
export async function GET(req: Request) {
  return productsApiHandler.handleGet(req);
}

export async function POST(req: Request) {
  return productsApiHandler.handlePost(req);
}

export async function PUT(req: Request) {
  return productsApiHandler.handlePut(req);
}

export async function PATCH(req: Request) {
  return productsApiHandler.handlePatch(req);
}

export async function DELETE(req: Request) {
  return productsApiHandler.handleDelete(req);
}
```

### 3. 커스텀 Mock 서비스 구현

필요한 경우 자체 Mock 서비스를 구현할 수 있습니다:

```typescript
import { MockConfig } from "@/src/lib/mock";

export const customMockService = {
  getCustomData: (config: MockConfig): CustomData[] => {
    if (!config.enabled) return [];

    // 커스텀 로직으로 데이터 생성
    return [
      /* ... */
    ];
  },
};
```

### 4. 타입 생성

Meta 파일에서 TypeScript 인터페이스를 자동 생성하는 기능도 제공합니다:

```typescript
import { generateTypeFromMeta } from "@/src/lib/mock";
import metadata from "@/meta/products.meta.json";

const typeDefinition = generateTypeFromMeta(metadata);
console.log(typeDefinition);
```

## 고급 설정

### 필터링 처리

요청의 쿼리 파라미터를 기반으로 자동 필터링 처리가 됩니다.

### 배치 처리

배열 형태로 요청을 보내면 배치 처리됩니다:

```typescript
// 배치 POST 요청
const response = await fetch("/api/products", {
  method: "POST",
  body: JSON.stringify([item1, item2, item3]),
});
```

### 페이지네이션

페이지네이션 파라미터를 포함하면 자동으로 처리됩니다:

```
GET /api/products?page=2&pageSize=10
```

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\src\shared\types\store.ts

```
export interface FilterState<T> {
  filters: Record<string, string>;
  selectedItem: T | null;
  isEditMode: boolean;
  setFilter: (key: string, value: string) => void;
  setSelectedItem: (item: T) => void;
  resetSelectedItem: () => void;
}

```

