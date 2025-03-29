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