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