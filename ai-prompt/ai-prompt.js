const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// 제외할 디렉토리 및 파일 패턴
const excludedDirs = ["node_modules", ".git", "dist", "build"];
const excludedFilePatterns = [".log", ".lock", ".map"];

// 파일 내용을 가져오는 함수
async function getFiles(dir) {
  let results = [];
  const items = await readdir(dir);

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const itemStat = await stat(itemPath);

    // 디렉토리 확인 및 제외할 디렉토리 필터링
    if (itemStat.isDirectory()) {
      if (!excludedDirs.includes(item)) {
        const subResults = await getFiles(itemPath);
        results = [...results, ...subResults];
      }
    } else {
      // 파일 확장자 필터링
      const shouldExclude = excludedFilePatterns.some((pattern) => itemPath.includes(pattern));
      if (!shouldExclude) {
        try {
          const content = await readFile(itemPath, "utf8");
          results.push({
            path: itemPath,
            content,
          });
        } catch (error) {
          console.error(`파일 읽기 오류 (${itemPath}):`, error.message);
        }
      }
    }
  }

  return results;
}

// 메인 함수
async function main() {
  try {
    const rootDir = process.cwd();
    console.log(`프로젝트 디렉토리: ${rootDir} 분석 중...`);

    const files = await getFiles(rootDir);

    // 결과 형식화
    let output = "# 프로젝트 파일 구조\n\n";
    for (const file of files) {
      output += `## 파일: ${file.path}\n\n\`\`\`\n${file.content}\n\`\`\`\n\n`;
    }

    // 결과 저장
    const outputFile = path.join(rootDir, "ai-prompt.md");
    await writeFile(outputFile, output);

    console.log(`분석 완료! ${files.length}개 파일이 ai-prompt.md에 저장되었습니다.`);
  } catch (error) {
    console.error("오류 발생:", error);
  }
}

main();
