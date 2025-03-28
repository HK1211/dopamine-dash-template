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
