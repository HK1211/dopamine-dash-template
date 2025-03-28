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
const methods = meta.api?.methods || {};
const baseUrl = meta.api?.baseUrl || "";

if (!name || !baseUrl || Object.keys(methods).length === 0) {
  console.error("❌ meta.api 정보가 부족합니다.");
  process.exit(1);
}

const targetDir = path.join("src", "features", name, "apis");
fs.mkdirSync(targetDir, { recursive: true });

const pascal = name.charAt(0).toUpperCase() + name.slice(1);
const camel = name.charAt(0).toLowerCase() + name.slice(1);

const files = [];

if (methods.get) {
  files.push({
    name: `useGet${pascal}.ts`,
    code: `
import { useQuery } from "@tanstack/react-query"

export function useGet${pascal}() {
  return useQuery({
    queryKey: ["${name}"],
    queryFn: async () => {
      const res = await fetch("${baseUrl}")
      return res.json()
    },
  });
}
`,
  });
}

if (methods.post) {
  files.push({
    name: `useCreate${pascal}.ts`,
    code: `
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreate${pascal}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("${baseUrl}", {
        method: "POST",
        body: JSON.stringify(data)
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["${name}"] });
    }
  });
}
`,
  });
}

if (methods.put) {
  files.push({
    name: `useUpdate${pascal}.ts`,
    code: `
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdate${pascal}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("${baseUrl}", {
        method: "PUT",
        body: JSON.stringify(data)
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["${name}"] });
    }
  });
}
`,
  });
}

if (methods.delete) {
  files.push({
    name: `useDelete${pascal}.ts`,
    code: `
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDelete${pascal}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(\`\${"${baseUrl}"}/\${id}\`, {
        method: "DELETE"
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["${name}"] });
    }
  });
}
`,
  });
}

for (const file of files) {
  const filePath = path.join(targetDir, file.name);
  fs.writeFileSync(filePath, file.code.trim(), "utf-8");
  console.log(`✅ 생성 완료 → ${filePath}`);
}
