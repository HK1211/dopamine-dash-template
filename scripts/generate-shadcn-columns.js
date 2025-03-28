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
