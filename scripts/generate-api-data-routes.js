const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// 메타 유틸리티 파일을 가져옵니다
const metaUtils = require("../src/lib/mock/meta-utils");

// 도움말
function showHelp() {
  console.log(`\n사용법: node generate-api-data-routes.js [메타데이터 파일 경로]\n`);
  console.log("메타데이터 파일 경로: meta 디렉토리 내의 .meta.json 파일 경로");
  console.log("예시: node generate-api-data-routes.js meta/customers.meta.json\n");

  console.log("사용 가능한 옵션:");
  console.log("  --help, -h         도움말 출력");
  console.log("  --all              모든 메타데이터 파일 처리");
  process.exit(0);
}

// 인자 확인
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  showHelp();
}

// 경로 설정
const META_DIR = path.join(__dirname, "..", "meta");
const API_DIR = path.join(__dirname, "..", "src", "app", "api");
const MOCK_DIR = path.join(__dirname, "..", "src", "lib", "mock");

// 모든 메타데이터 파일 처리
if (args.includes("--all")) {
  const metaFiles = fs.readdirSync(META_DIR).filter((file) => file.endsWith(".meta.json"));

  if (metaFiles.length === 0) {
    console.log("메타데이터 파일이 없습니다. meta 디렉토리에 .meta.json 파일을 추가하세요.");
    process.exit(1);
  }

  metaFiles.forEach((file) => {
    const metaFilePath = path.join(META_DIR, file);
    processMetaFile(metaFilePath);
  });
} else if (args.length > 0) {
  // 특정 메타데이터 파일 처리
  const metaFilePath = args[0].startsWith("meta/") ? path.join(__dirname, "..", args[0]) : path.join(META_DIR, args[0]);

  if (!fs.existsSync(metaFilePath)) {
    console.log(`메타데이터 파일을 찾을 수 없습니다: ${metaFilePath}`);
    showHelp();
  }

  processMetaFile(metaFilePath);
} else {
  console.log("메타데이터 파일 경로를 입력하세요.");
  showHelp();
}

/**
 * 메타데이터 파일을 처리하여 API 라우트 생성
 * @param {string} metaFilePath 메타데이터 파일 경로
 */
function processMetaFile(metaFilePath) {
  try {
    console.log(`메타데이터 파일 처리 중: ${metaFilePath}`);

    // 메타데이터 파일 읽기
    const metaData = JSON.parse(fs.readFileSync(metaFilePath, "utf8"));
    const entityName = path.basename(metaFilePath).replace(".meta.json", "");

    // API 디렉토리 생성
    const apiEntityDir = path.join(API_DIR, entityName);
    if (!fs.existsSync(apiEntityDir)) {
      fs.mkdirSync(apiEntityDir, { recursive: true });
    }

    // 필드 추출
    const fields = extractFields(metaData);

    // TypeScript 인터페이스 생성
    const interfaceName = metaUtils.capitalize(entityName);
    const tsInterface = generateTypeScriptInterface(interfaceName, fields);

    // faker 함수 생성
    const mockFunction = generateMockFunction(entityName, fields, metaData);

    // API 라우트 파일 생성
    const routeFilePath = path.join(apiEntityDir, "route.ts");
    const routeContent = generateRouteFile(interfaceName, entityName, tsInterface, mockFunction);

    fs.writeFileSync(routeFilePath, routeContent);
    console.log(`API 라우트 파일 생성 완료: ${routeFilePath}`);

    // 메인 faker 서비스에 함수 등록
    updateFakerService(interfaceName, entityName, fields);
  } catch (error) {
    console.error(`처리 중 오류 발생: ${error.message}`);
  }
}

/**
 * 메타데이터에서 필드 추출
 * @param {object} metaData 메타데이터 객체
 * @returns {Array} 필드 목록
 */
function extractFields(metaData) {
  const fields = new Map();

  // 필수 ID 필드 추가
  fields.set("id", { name: "id", type: "string" });

  // 데이터 구조에 따라 필드 추출 방식 변경
  if (metaData.fields) {
    // fields 배열이 직접 있는 경우
    metaData.fields.forEach((field) => {
      if (field.name !== "id" && !fields.has(field.name)) {
        fields.set(field.name, field);
      }
    });
  }

  if (metaData.columns) {
    // 컬럼 정보가 있는 경우 (DataTable 형식)
    metaData.columns.forEach((col) => {
      // actions는 UI 전용 필드이므로 제외
      if (col.name === "actions" || col.field === "actions") {
        return;
      }

      // 필드명이 name 또는 field 속성에 있을 수 있음
      const fieldName = col.field || col.name || col.accessorKey || col.id;
      if (!fieldName) {
        console.warn(`필드명이 없는 컬럼 발견: ${JSON.stringify(col)}`);
        return;
      }

      // 컬럼 객체에서 필요한 정보만 추출
      if (!fields.has(fieldName)) {
        fields.set(fieldName, {
          name: fieldName,
          type: col.type || guessTypeFromName(fieldName),
          ...(col.cell && { cell: col.cell }),
        });
      }
    });
  }

  if (metaData.form) {
    // 폼 필드가 있는 경우 (더 상세한 정보를 포함할 가능성이 높음)
    metaData.form.forEach((field) => {
      if (field.name !== "id" && !fields.has(field.name)) {
        fields.set(field.name, {
          name: field.name,
          type: field.type || guessTypeFromName(field.name),
          ...(field.options && { options: field.options }),
        });
      }
    });
  }

  if (metaData.properties) {
    // JSON Schema 형식
    Object.entries(metaData.properties).forEach(([name, prop]) => {
      if (name !== "id" && !fields.has(name)) {
        fields.set(name, {
          name,
          type: prop.type || guessTypeFromName(name),
        });
      }
    });
  }

  // 엔티티별 특수 필드 처리
  const entityName = metaData.name || "";

  // 필터에서 필드 추가 (검색 필드로 사용될 수 있음)
  if (metaData.filters) {
    metaData.filters.forEach((filter) => {
      const fieldName = filter.name;
      if (fieldName !== "id" && !fields.has(fieldName)) {
        fields.set(fieldName, {
          name: fieldName,
          type: filter.type || guessTypeFromName(fieldName),
          ...(filter.options && { options: filter.options }),
        });
      }
    });
  }

  // mock.settings에서 추가 필드 정보 확인
  if (metaData.mock?.settings) {
    const settings = metaData.mock.settings;

    // 상품(products)의 경우 Brand 필드 추가
    if (entityName === "products" && !fields.has("brand")) {
      fields.set("brand", { name: "brand", type: "string", optional: true });
    }

    // 고객(customers)의 경우 grade, address 필드 확인
    if (entityName === "customers") {
      if (!fields.has("address")) {
        fields.set("address", { name: "address", type: "string" });
      }
      if (!fields.has("memo")) {
        fields.set("memo", { name: "memo", type: "string" });
      }
    }
  }

  // 기본 형식을 찾을 수 없는 경우 경고
  if (fields.size <= 1) {
    // id만 있는 경우
    console.warn("메타데이터에서 필드를 찾을 수 없습니다. 최소한의 필드만 생성합니다.");
  }

  return Array.from(fields.values());
}

/**
 * 필드 이름을 기반으로 타입 추론
 * @param {string} fieldName 필드 이름
 * @returns {string} 추론된 타입
 */
function guessTypeFromName(fieldName) {
  const lowerField = fieldName.toLowerCase();

  // 일반적인 타입 추론
  if (lowerField === "id") return "string";
  if (lowerField.includes("date") || lowerField === "createdat" || lowerField === "updatedat") return "date";
  if (lowerField === "email") return "email";
  if (lowerField === "phone" || lowerField.includes("phone") || lowerField.includes("tel")) return "phone";
  if (lowerField === "price" || lowerField.includes("price") || lowerField.includes("amount")) return "number";
  if (lowerField === "quantity" || lowerField === "qty" || lowerField.includes("count")) return "number";
  if (lowerField.startsWith("is") || lowerField.startsWith("has")) return "boolean";
  if (lowerField === "image" || lowerField.includes("image") || lowerField.includes("photo")) return "image";

  // 기본 타입
  return "string";
}

/**
 * TypeScript 인터페이스 생성
 * @param {string} interfaceName 인터페이스 이름
 * @param {Array} fields 필드 목록
 * @returns {string} TypeScript 인터페이스 문자열
 */
function generateTypeScriptInterface(interfaceName, fields) {
  const typeMap = {
    string: "string",
    number: "number",
    boolean: "boolean",
    date: "string", // ISO 문자열로 저장
    email: "string",
    phone: "string",
    image: "string",
    url: "string",
    select: "string",
    enum: "string",
    array: "string[]",
    object: "Record<string, any>",
  };

  // 필드 정의를 위한 배열
  const fieldDefinitions = [];

  // 이미 추가된 필드 이름을 추적하기 위한 Set
  const addedFields = new Set();

  // 모든 필드 추가 (중복 방지)
  fields.forEach((field) => {
    const fieldName = field.name;

    // 이미 추가된 필드는 중복 추가 방지
    if (addedFields.has(fieldName)) {
      return;
    }

    // 필드 추가 및 기록
    const tsType = typeMap[field.type] || "string";
    const optionalMark = field.optional ? "?" : "";
    fieldDefinitions.push(`  ${fieldName}${optionalMark}: ${tsType};`);
    addedFields.add(fieldName);
  });

  return `export interface ${interfaceName} {\n${fieldDefinitions.join("\n")}\n}`;
}

/**
 * faker를 사용한 모의 데이터 생성 함수 작성
 * @param {string} entityName 엔티티 이름
 * @param {Array} fields 필드 목록
 * @param {object} metaData 원본 메타데이터
 * @returns {string} 모의 데이터 생성 함수 문자열
 */
function generateMockFunction(entityName, fields, metaData) {
  // 메타데이터에서 설정 정보 추출
  const settings = metaData.mock?.settings || {};
  const fieldTypesMap = new Map();

  // 생성된 인터페이스에 맞게 필드 목록 생성
  const validFields = fields.filter((field) => field.name !== "id");

  // 각 필드에 대한 faker 코드 생성
  const fieldGenerators = validFields
    .map((field) => {
      const fieldName = field.name;

      // 메타 유틸리티 함수를 사용하여 faker 코드 생성
      const fakerCode = metaUtils.generateFakerCode(fieldName, entityName, settings, fieldTypesMap);
      return `    ${fieldName}: ${fakerCode},`;
    })
    .join("\n");

  return `function get${metaUtils.capitalize(entityName)}(count = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
${fieldGenerators}
  }));
}`;
}

/**
 * API 라우트 파일 생성
 * @param {string} interfaceName 인터페이스 이름
 * @param {string} entityName 엔티티 이름
 * @param {string} tsInterface TypeScript 인터페이스 문자열
 * @param {string} mockFunction 모의 데이터 생성 함수 문자열
 * @returns {string} API 라우트 파일 내용
 */
function generateRouteFile(interfaceName, entityName, tsInterface, mockFunction) {
  return `import { NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker/locale/ko';
import { MockApiHandler } from '../../../lib/mock/api-handler';

${tsInterface}

// 모의 데이터 생성 함수
${mockFunction}

// API 핸들러 인스턴스 생성
const apiHandler = new MockApiHandler<${interfaceName}>({
  entityName: '${entityName}',
  getMockData: get${metaUtils.capitalize(entityName)},
  searchFields: ['id', 'name'], // 검색 가능 필드 (필요에 따라 수정)
});

// GET 요청 처리
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  
  // UI 컴포넌트에서 사용하기 위한 처리
  // format 또는 ui 파라미터가 있으면 간단한 배열 형태로 반환
  // 브랜드 목록과 같은 참조 데이터에 유용함
  if (url.searchParams.has('format') || url.searchParams.has('ui')) {
    const count = parseInt(url.searchParams.get('count') || '20');
    const items = get${metaUtils.capitalize(entityName)}(count);
    return NextResponse.json(items);
  }
  
  // 기본 페이지네이션 형태 응답
  return apiHandler.handleGet(req);
}

// POST 요청 처리
export async function POST(req: NextRequest) {
  return apiHandler.handlePost(req);
}

// PUT 요청 처리
export async function PUT(req: NextRequest) {
  return apiHandler.handlePut(req);
}

// DELETE 요청 처리
export async function DELETE(req: NextRequest) {
  return apiHandler.handleDelete(req);
}
`;
}

/**
 * faker-service.ts 파일 업데이트
 * @param {string} interfaceName 인터페이스 이름
 * @param {string} entityName 엔티티 이름
 * @param {Array} fields 필드 목록
 */
function updateFakerService(interfaceName, entityName, fields) {
  const fakerServicePath = path.join(MOCK_DIR, "faker-service.ts");

  // 파일이 없으면 경고만 출력
  if (!fs.existsSync(fakerServicePath)) {
    console.warn(`faker-service.ts 파일이 없습니다: ${fakerServicePath}`);
    return;
  }

  console.log(`faker-service.ts 파일 업데이트 중...`);

  try {
    // 기존 파일 읽기
    let content = fs.readFileSync(fakerServicePath, "utf8");

    // 이미 함수가 있는지 확인
    const functionName = `get${metaUtils.capitalize(entityName)}`;
    if (content.includes(`export function ${functionName}`)) {
      console.log(`${functionName} 함수가 이미 존재합니다. 업데이트하지 않습니다.`);
      return;
    }

    // 인터페이스 추가
    if (!content.includes(`export interface ${interfaceName}`)) {
      const interfaceCode = generateTypeScriptInterface(interfaceName, fields);
      content = content.replace(
        /\/\/ 인터페이스 선언[\s\S]*?(export interface|\/\/ 유틸리티 함수)/m,
        (match) =>
          `// 인터페이스 선언\n${interfaceCode}\n\n${
            match.includes("// 유틸리티 함수") ? "// 유틸리티 함수" : "export interface"
          }`
      );
    }

    // faker 함수 추가
    const mockFunction = generateMockFunction(entityName, fields, {});
    content = content.replace(
      /export \{[\s\S]*?\};/m,
      (match) => `${mockFunction}\n\n${match.replace(/export \{/, `export {\n  ${functionName},`)}`
    );

    // 파일 저장
    fs.writeFileSync(fakerServicePath, content);
    console.log(`faker-service.ts 파일 업데이트 완료`);
  } catch (error) {
    console.error(`faker-service.ts 파일 업데이트 중 오류 발생: ${error.message}`);
  }
}
