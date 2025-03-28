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