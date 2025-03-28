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

const routeDir = path.join("src", "app", ...baseUrl.replace(/^\//, "").split("/"));
fs.mkdirSync(routeDir, { recursive: true });

const handlers = [];

if (methods.get?.toUpperCase() === "GET") {
  handlers.push(`
export async function GET(req: Request) {
  return Response.json([]);
}
`);
}

if (methods.post?.toUpperCase() === "POST") {
  handlers.push(`
export async function POST(req: Request) {
  const body = await req.json();
  return Response.json({ ok: true, data: body });
}
`);
}

if (methods.put?.toUpperCase() === "PUT") {
  handlers.push(`
export async function PUT(req: Request) {
  const body = await req.json();
  return Response.json({ ok: true, data: body });
}
`);
}

if (methods.delete?.toUpperCase() === "DELETE") {
  handlers.push(`
export async function DELETE(req: Request) {
  return Response.json({ ok: true });
}
`);
}

const routeFile = path.join(routeDir, "route.ts");
fs.writeFileSync(routeFile, handlers.join("\n"), "utf-8");

console.log(`✅ API 라우트 파일 생성 완료 → ${routeFile}`);
