const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

// 제외할 디렉토리 및 파일 패턴
const excludedDirs = ["node_modules", ".git", "dist", "build"];
const excludedFilePatterns = [".log", ".lock", ".map"];

// 최대 파일 크기 (바이트 단위) - 약 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

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

// 출력 파일을 여러 조각으로 나누는 함수
async function splitOutputToFiles(files, outputDir) {
  try {
    // 출력 디렉토리가 없으면 생성
    if (!fs.existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    let currentPart = 1;
    let currentSize = 0;
    let output = "# 프로젝트 파일 구조 (파트 1)\n\n";
    let fileCount = 0;

    for (const file of files) {
      const fileContent = `## 파일: ${file.path}\n\n\`\`\`\n${file.content}\n\`\`\`\n\n`;
      const fileContentSize = Buffer.byteLength(fileContent, "utf8");

      // 현재 파일을 추가했을 때 최대 크기를 초과하는지 확인
      if (currentSize + fileContentSize > MAX_FILE_SIZE && fileCount > 0) {
        // 현재 파트 저장
        const outputFile = path.join(outputDir, `ai-prompt-part${currentPart}.md`);
        await writeFile(outputFile, output);
        console.log(`파트 ${currentPart} 저장됨: ${fileCount}개 파일`);

        // 새 파트 시작
        currentPart++;
        fileCount = 0;
        currentSize = 0;
        output = `# 프로젝트 파일 구조 (파트 ${currentPart})\n\n`;
      }

      // 현재 파일 추가
      output += fileContent;
      currentSize += fileContentSize;
      fileCount++;
    }

    // 마지막 파트 저장
    if (fileCount > 0) {
      const outputFile = path.join(outputDir, `ai-prompt-part${currentPart}.md`);
      await writeFile(outputFile, output);
      console.log(`파트 ${currentPart} 저장됨: ${fileCount}개 파일`);
    }

    return currentPart; // 생성된 파트 수 반환
  } catch (error) {
    console.error("파일 분할 중 오류 발생:", error);
    throw error;
  }
}

// 메인 함수
async function main() {
  try {
    const rootDir = process.cwd();
    console.log(`프로젝트 디렉토리: ${rootDir} 분석 중...`);

    const files = await getFiles(rootDir);
    console.log(`총 ${files.length}개 파일을 찾았습니다.`);

    // 출력 디렉토리
    const outputDir = path.join(rootDir, "ai-prompt");

    // 파일을 여러 파트로 나누기
    const partCount = await splitOutputToFiles(files, outputDir);

    console.log(`분석 완료! ${files.length}개 파일이 ${partCount}개의 파트로 나뉘어 저장되었습니다.`);
    console.log(`각 파트는 ai-prompt 디렉토리의 ai-prompt-part1.md, ai-prompt-part2.md, ... 형식으로 저장되었습니다.`);
  } catch (error) {
    console.error("오류 발생:", error);
  }
}

main();
