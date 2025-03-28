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

console.log("\n🎉 모든 shadcn 관련 파일이 성공적으로 생성되었습니다!");