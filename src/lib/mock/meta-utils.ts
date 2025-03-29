import { faker } from "@faker-js/faker/locale/ko";

/**
 * Meta 데이터에서 모델 필드를 추출합니다.
 */
export interface MetaModelField {
  name: string;
  type?: string;
  default?: any;
  cell?: {
    type?: string;
    [key: string]: any;
  };
}

/**
 * Meta 데이터에서 모델 정보를 추출하는 인터페이스
 */
export interface MetaModel {
  name: string;
  columns?: MetaModelField[];
  form?: MetaModelField[];
  mock?: {
    settings?: Record<string, any>;
  };
}

/**
 * 필드명과 메타데이터 설정에 기반하여 적절한 faker 함수 코드를 생성합니다.
 *
 * @param field 필드 이름
 * @param entityName 엔티티 이름
 * @param settings Mock 설정
 * @param existingTypes 이미 처리한 필드 타입 맵 (참조 전달)
 * @returns faker 함수를 호출하는 코드 문자열
 */
export function generateFakerCode(
  field: string,
  entityName: string,
  settings: Record<string, any> = {},
  existingTypes: Map<string, string> = new Map()
): string {
  // 이미 처리된 필드라면 해당 값 반환
  if (existingTypes.has(field)) {
    return existingTypes.get(field)!;
  }

  // ID는 항상 UUID
  if (field === "id") {
    const code = "faker.string.uuid()";
    existingTypes.set(field, code);
    return code;
  }

  // 필드명에 따른 추론

  // 가격, 금액 관련 필드
  if (
    field === "price" ||
    field === "amount" ||
    field.includes("price") ||
    field.includes("amount") ||
    field.includes("cost")
  ) {
    const priceRange = settings.priceRange || { min: 1000, max: 100000 };
    const code = `parseInt(faker.commerce.price({ min: ${priceRange.min}, max: ${priceRange.max} }))`;
    existingTypes.set(field, code);
    return code;
  }

  // 이름 관련 필드
  if (field === "name") {
    // 엔티티 유형에 따라 다른 이름 생성
    if (entityName === "products" || entityName.includes("product")) {
      const code = "faker.commerce.productName()";
      existingTypes.set(field, code);
      return code;
    } else {
      const code = "faker.person.fullName()";
      existingTypes.set(field, code);
      return code;
    }
  }

  // 이메일
  if (field === "email" || field.includes("email")) {
    const code = "faker.internet.email()";
    existingTypes.set(field, code);
    return code;
  }

  // 전화번호
  if (field === "phone" || field === "tel" || field.includes("phone") || field.includes("tel")) {
    const code = "faker.phone.number()";
    existingTypes.set(field, code);
    return code;
  }

  // 주소
  if (field === "address" || field.includes("address")) {
    const code = "faker.location.streetAddress()";
    existingTypes.set(field, code);
    return code;
  }

  // 날짜
  if (
    field === "date" ||
    field === "createdAt" ||
    field === "updatedAt" ||
    field.includes("date") ||
    field.includes("Date")
  ) {
    const code = "faker.date.recent().toISOString()";
    existingTypes.set(field, code);
    return code;
  }

  // 메모, 설명 등 텍스트 필드
  if (field === "description" || field === "memo" || field === "content" || field.includes("desc")) {
    const code = "faker.lorem.sentence()";
    existingTypes.set(field, code);
    return code;
  }

  // 카테고리
  if (field === "category" || field.includes("category")) {
    const categories = settings.categories || ["전자", "의류", "식품"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(categories)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 상태
  if (field === "status" || field.includes("status")) {
    // 상태 확률 설정이 있으면 활용
    if (settings.statusProbability && Object.keys(settings.statusProbability).length > 0) {
      const statuses = Object.keys(settings.statusProbability);
      const code = `faker.helpers.arrayElement(${JSON.stringify(statuses)})`;
      existingTypes.set(field, code);
      return code;
    } else {
      const code = `faker.helpers.arrayElement(['active', 'inactive', 'pending'])`;
      existingTypes.set(field, code);
      return code;
    }
  }

  // 고객 유형
  if (field === "customerType" || field.includes("customerType") || field.includes("clientType")) {
    const types = settings.customerTypes || ["개인", "기업", "공공기관"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(types)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 역할
  if (field === "role" || field.includes("role")) {
    const roles = settings.roles || ["admin", "user", "guest"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(roles)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 등급
  if (field === "grade" || field.includes("grade") || field.includes("level")) {
    const grades = settings.grades || ["Gold", "Silver", "Bronze"];
    const code = `faker.helpers.arrayElement(${JSON.stringify(grades)})`;
    existingTypes.set(field, code);
    return code;
  }

  // 색상
  if (field === "color" || field.includes("color")) {
    const code = "faker.color.human()";
    existingTypes.set(field, code);
    return code;
  }

  // 이미지 URL
  if (
    field === "image" ||
    field === "thumbnail" ||
    field.includes("image") ||
    field.includes("img") ||
    field.includes("photo")
  ) {
    const code = "faker.image.url()";
    existingTypes.set(field, code);
    return code;
  }

  // URL
  if (field === "url" || field === "website" || field.includes("url") || field.includes("link")) {
    const code = "faker.internet.url()";
    existingTypes.set(field, code);
    return code;
  }

  // 사용자명
  if (field === "username" || field.includes("username")) {
    const code = "faker.internet.userName()";
    existingTypes.set(field, code);
    return code;
  }

  // 회사명
  if (field === "company" || field.includes("company")) {
    const code = "faker.company.name()";
    existingTypes.set(field, code);
    return code;
  }

  // 국가
  if (field === "country" || field.includes("country")) {
    const code = "faker.location.country()";
    existingTypes.set(field, code);
    return code;
  }

  // 도시
  if (field === "city" || field.includes("city")) {
    const code = "faker.location.city()";
    existingTypes.set(field, code);
    return code;
  }

  // 우편번호
  if (field === "zipcode" || field === "postalCode" || field.includes("zipcode") || field.includes("postal")) {
    const code = "faker.location.zipCode()";
    existingTypes.set(field, code);
    return code;
  }

  // 숫자 필드
  if (
    field === "count" ||
    field === "quantity" ||
    field.includes("count") ||
    field.includes("qty") ||
    field.includes("num")
  ) {
    const code = "faker.number.int({ min: 1, max: 100 })";
    existingTypes.set(field, code);
    return code;
  }

  // boolean 필드
  if (field === "isActive" || field === "isEnabled" || field.includes("is") || field.includes("has")) {
    const code = "faker.datatype.boolean()";
    existingTypes.set(field, code);
    return code;
  }

  // 기본값 (일반 텍스트)
  const code = "faker.lorem.word()";
  existingTypes.set(field, code);
  return code;
}

/**
 * Meta에서 필드 정보를 추출하여 TypeScript 인터페이스 문자열을 생성합니다
 */
export function generateTypeFromMeta(meta: MetaModel): string {
  if (!meta.form && !meta.columns) {
    return `export interface ${capitalize(meta.name)} {
  id: string;
}`;
  }

  // form 필드와 columns 필드를 합침
  const allFields = new Map<string, MetaModelField>();

  // columns에서 정보 추출
  if (meta.columns) {
    meta.columns.forEach((col) => {
      if (!col.name.includes("actions") && !col.cell?.type?.includes("button")) {
        if (!allFields.has(col.name)) {
          allFields.set(col.name, col);
        }
      }
    });
  }

  // form에서 정보 추출 (더 자세한 타입 정보가 있을 가능성이 높음)
  if (meta.form) {
    meta.form.forEach((field) => {
      allFields.set(field.name, field);
    });
  }

  // ID 필드가 없으면 추가
  if (!allFields.has("id")) {
    allFields.set("id", { name: "id", type: "string" });
  }

  // 필드를 TypeScript 타입으로 변환
  const fieldStrings = Array.from(allFields.values()).map((field) => {
    const fieldName = field.name;
    const isRequired = !fieldName.endsWith("?");
    const cleanName = isRequired ? fieldName : fieldName.slice(0, -1);

    let tsType = "string";
    switch (field.type) {
      case "number":
      case "integer":
        tsType = "number";
        break;
      case "boolean":
        tsType = "boolean";
        break;
      case "date":
      case "datetime":
        tsType = "string"; // ISO date string
        break;
      case "json":
      case "object":
        tsType = "Record<string, any>";
        break;
      case "array":
        tsType = "any[]";
        break;
      default:
        tsType = "string";
    }

    return `  ${cleanName}${isRequired ? "" : "?"}: ${tsType};`;
  });

  return `export interface ${capitalize(meta.name)} {
${fieldStrings.join("\n")}
}`;
}

/**
 * Meta 파일에서 Mock API 설정을 추출합니다.
 */
export function extractMockConfig(meta: any) {
  if (!meta.mock) {
    return {
      enabled: false,
    };
  }

  return {
    enabled: meta.mock.enabled ?? false,
    rows: meta.mock.rows ?? 10,
    delay: meta.mock.delay ?? 0,
    source: meta.mock.source ?? "faker",
  };
}

/**
 * 첫 글자를 대문자로 변환합니다.
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
