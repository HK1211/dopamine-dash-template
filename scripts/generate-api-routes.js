const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

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

console.log("🔄 향상된 API 라우트 생성기로 전환하는 중...");

// 새로운 generate-api-data-routes.js 스크립트 호출
try {
  execSync(`node scripts/generate-api-data-routes.js ${args.join(" ")}`, { stdio: "inherit" });
  console.log("✅ API 라우트 생성 완료!");
} catch (error) {
  console.error("❌ API 라우트 생성 중 오류가 발생했습니다:", error.message);
  process.exit(1);
}
