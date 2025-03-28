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

if (!name || filters.length === 0) {
  console.error("❌ meta.filters 정보가 부족합니다.");
  process.exit(1);
}

const targetDir = path.join("src", "features", name, "stores");
fs.mkdirSync(targetDir, { recursive: true });

const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
const storeName = `use${pascalName}FilterStore`;

const filterKeys = filters.map(f => f.name);
const typeFields = filterKeys.map(k => `    ${k}: string;`).join("\n");
const defaultValues = filterKeys.map(k => `    ${k}: ""`).join(",\n");

const storeCode = `
import { create } from "zustand";

interface FilterState {
  filters: {
${typeFields}
  };
  setFilter: (key: string, value: string) => void;
}

export const ${storeName} = create<FilterState>((set) => ({
  filters: {
${defaultValues}
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    }))
}));
`;

const filePath = path.join(targetDir, "filterStore.ts");
fs.writeFileSync(filePath, storeCode.trim(), "utf-8");

console.log("✅ zustand 필터 상태 스토어 생성 완료 →", filePath);