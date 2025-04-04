# 프로젝트 파일 구조 (파트 1)

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\meta\brands.meta.json

```
{
  "type": "crud",
  "name": "brands",
  "title": "브랜드 관리",
  "path": "/brands",
  "description": "브랜드 정보를 관리할 수 있는 화면입니다.",
  "api": {
    "baseUrl": "/api/brands",
    "methods": {
      "get": "GET",
      "post": "POST",
      "put": "PUT",
      "delete": "DELETE"
    }
  },
  "filters": [
    {
      "name": "name",
      "label": "브랜드명",
      "type": "text"
    }
  ],
  "columns": [
    {
      "name": "id",
      "label": "ID"
    },
    {
      "name": "name",
      "label": "브랜드명"
    },
    {
      "name": "actions",
      "label": "관리",
      "cell": {
        "type": "buttons",
        "actions": [
          {
            "label": "수정",
            "onClick": "editItem"
          },
          {
            "label": "삭제",
            "onClick": "deleteItem",
            "variant": "destructive"
          }
        ]
      }
    }
  ],
  "form": [
    {
      "name": "name",
      "label": "브랜드명",
      "type": "text",
      "required": true
    }
  ],
  "buttons": {
    "top": ["add", "delete"],
    "bottom": ["save", "cancel"]
  },
  "edit": {
    "fetchDetail": false
  },
  "delete": {
    "confirm": true,
    "message": "정말로 삭제하시겠습니까?",
    "onSuccess": "toast.success('삭제가 완료되었습니다.')"
  },
  "mock": {
    "enabled": true,
    "rows": 10,
    "delay": 300,
    "source": "faker",
    "settings": {
      "pagination": {
        "defaultSize": 10,
        "maxSize": 20
      },
      "seed": 789
    }
  }
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\meta\customers.meta.json

```
{
  "type": "crud",
  "name": "customers",
  "title": "고객 관리",
  "path": "/customers",
  "description": "고객 정보를 추가, 수정, 삭제할 수 있는 화면입니다.",
  "api": {
    "baseUrl": "/api/customers",
    "methods": {
      "get": "GET",
      "post": "POST",
      "put": "PUT",
      "delete": "DELETE"
    }
  },
  "filters": [
    {
      "name": "customerType",
      "label": "고객 유형",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["개인", "기업", "공공기관"]
      }
    },
    {
      "name": "grade",
      "label": "등급",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["VIP", "Gold", "Silver", "Bronze"]
      }
    },
    {
      "name": "name",
      "label": "고객명",
      "type": "text"
    }
  ],
  "columns": [
    {
      "name": "id",
      "label": "고객 ID"
    },
    {
      "name": "name",
      "label": "고객명"
    },
    {
      "name": "phone",
      "label": "연락처"
    },
    {
      "name": "email",
      "label": "이메일"
    },
    {
      "name": "customerType",
      "label": "고객 유형"
    },
    {
      "name": "grade",
      "label": "등급",
      "cell": {
        "type": "badge",
        "map": {
          "VIP": "purple",
          "Gold": "amber",
          "Silver": "gray",
          "Bronze": "brown"
        }
      }
    },
    {
      "name": "actions",
      "label": "관리",
      "cell": {
        "type": "buttons",
        "actions": [
          {
            "label": "상세",
            "onClick": "viewItem"
          },
          {
            "label": "수정",
            "onClick": "editItem"
          },
          {
            "label": "삭제",
            "onClick": "deleteItem",
            "variant": "destructive"
          }
        ]
      }
    }
  ],
  "form": [
    {
      "name": "name",
      "label": "고객명",
      "type": "text",
      "required": true
    },
    {
      "name": "phone",
      "label": "연락처",
      "type": "tel",
      "validation": {
        "pattern": "^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$",
        "message": "올바른 전화번호 형식을 입력하세요 (예: 010-1234-5678)"
      }
    },
    {
      "name": "email",
      "label": "이메일",
      "type": "email"
    },
    {
      "name": "customerType",
      "label": "고객 유형",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["개인", "기업", "공공기관"]
      }
    },
    {
      "name": "grade",
      "label": "등급",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["VIP", "Gold", "Silver", "Bronze"]
      }
    },
    {
      "name": "address",
      "label": "주소",
      "type": "textarea"
    },
    {
      "name": "memo",
      "label": "메모",
      "type": "textarea"
    }
  ],
  "buttons": {
    "top": ["add", "delete"],
    "bottom": ["save", "cancel"]
  },
  "edit": {
    "fetchDetail": true
  },
  "delete": {
    "confirm": true,
    "message": "정말로 고객 정보를 삭제하시겠습니까?",
    "onSuccess": "toast.success('고객 정보가 삭제되었습니다.')"
  },
  "mock": {
    "enabled": true,
    "rows": 12,
    "delay": 400,
    "source": "faker",
    "settings": {
      "customerTypes": ["개인", "기업", "공공기관"],
      "grades": ["VIP", "Gold", "Silver", "Bronze"],
      "gradeProbability": {
        "VIP": 0.1,
        "Gold": 0.2,
        "Silver": 0.3,
        "Bronze": 0.4
      },
      "pagination": {
        "defaultSize": 8,
        "maxSize": 30
      },
      "seed": 789
    }
  }
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\meta\META-JSON-DESING-PRINCIPLES.md

```
# 🧠 meta.json 설계 철학 및 확장 전략

---

## 🎯 문서 목적

이 문서는 `meta.json`이 dopamine-dash-template 프로젝트에서 어떤 역할을 하고,  
어떤 철학을 기반으로 설계되었으며,  
다른 개발자 또는 AI와 협업 시 어떻게 확장성과 일관성을 유지할 수 있는지를 공유하기 위한 가이드입니다.

---

## 💡 meta.json의 존재 이유

- 단순한 JSON 설정이 아니라, UI/UX/DX/API 흐름 전체를 설계하는 DSL
- 팀 간의 커뮤니케이션 단위 → 기획/디자인/개발자 간 공유 가능한 **정의서**
- 코드 중심 사고가 아닌, 구조 중심의 선언형 설계

---

## 📐 설계 철학

| 원칙                       | 설명                                               |
| -------------------------- | -------------------------------------------------- |
| **Declarative DSL**        | 상태를 선언하면 구현은 자동으로 따라온다           |
| **UX-Driven**              | 기획/디자인 요구사항을 코드보다 먼저 반영          |
| **Extensible**             | 새로운 요구사항을 쉽게 수용할 수 있어야 한다       |
| **Meta-First, Code-Later** | meta가 우선, 생성된 코드는 파생물                  |
| **AI-Friendly**            | AI가 이해할 수 있는 문맥 구조 → prompt 구성 최적화 |

---

## 📦 설계 시 고려한 핵심 포인트

- 필드마다 `type`에 따라 필요한 속성이 다르다 → 동적 구조 지원
- `select`는 `source`가 `api`일 수도 있고, `static`일 수도 있다 → 공통 인터페이스 필요
- `validation`, `defaultValue`, `readonlyOptions`는 유형별로 의미가 달라진다 → 타입 기반 분기
- `aiPrompt`는 meta에 의미 부여 → Agent 또는 LLM 활용 기반

---

## 🔧 앞으로의 확장 가능성

| 기능                | 설계 방향                                |
| ------------------- | ---------------------------------------- |
| `grouping`, `tabs`  | Form layout 제어                         |
| `conditionalFields` | 조건부 필드 표시 (`if: field === value`) |
| `api.queryParamMap` | 상태 값을 API 파라미터에 매핑            |
| `i18nKeys`          | 각 label을 다국어 키로 연결              |
| `agent.note`        | 각 필드/화면에 대한 추가 AI context 설정 |

---

## 🧠 협업 또는 AI 적용 시 가이드

| 대상            | 적용 방식                                                              |
| --------------- | ---------------------------------------------------------------------- |
| 개발자          | meta를 기준으로 생성되는 코드를 이해하고 유지보수                      |
| 기획자/디자이너 | meta 일부만 수정해서 요구사항 반영 가능                                |
| AI Agent (LLM)  | `aiPrompt`, `form`, `columns` 등을 기반으로 요약/문서/테스트 생성 가능 |

---

## 🤝 팀 공유 시 추천 방식

- 이 문서를 팀 Notion이나 GitHub README에 포함
- `meta.json` 작성 시 항목 설명 툴팁 또는 문서 링크 삽입
- Slack 또는 Discord에서 meta 변경시 알림 + 리뷰 룰 지정

---

meta.json은 코드보다 먼저 제품의 구조를 설계하는 기준이며,  
앞으로 자동화 시스템이 발전할수록 이 구조의 역할은 더욱 중요해질 것입니다.

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\meta\products.meta.json

```
{
  "type": "crud",
  "name": "products",
  "title": "상품 관리",
  "path": "/products",
  "description": "상품 정보를 추가, 수정, 삭제할 수 있는 화면입니다.",
  "api": {
    "baseUrl": "/api/products",
    "methods": {
      "get": "GET",
      "post": "POST",
      "options": "OPTIONS"
    }
  },
  "filters": [
    {
      "name": "category",
      "label": "카테고리",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["전자", "의류", "식품"]
      }
    },
    {
      "name": "brand",
      "label": "브랜드",
      "type": "select",
      "options": {
        "source": "api",
        "url": "/api/brands",
        "labelKey": "name",
        "valueKey": "id"
      }
    },
    {
      "name": "name",
      "label": "상품명",
      "type": "text"
    }
  ],
  "columns": [
    {
      "name": "id",
      "label": "ID"
    },
    {
      "name": "name",
      "label": "상품명"
    },
    {
      "name": "price",
      "label": "가격"
    },
    {
      "name": "category",
      "label": "카테고리"
    },
    {
      "name": "status",
      "label": "상태",
      "cell": {
        "type": "badge",
        "map": {
          "active": "green",
          "inactive": "gray",
          "soldout": "red"
        }
      }
    },
    {
      "name": "actions",
      "label": "관리",
      "cell": {
        "type": "buttons",
        "actions": [
          {
            "label": "수정",
            "onClick": "editItem"
          },
          {
            "label": "삭제",
            "onClick": "deleteItem",
            "variant": "destructive"
          }
        ]
      }
    }
  ],
  "form": [
    {
      "name": "name",
      "label": "상품명",
      "type": "text",
      "required": true,
      "validation": {
        "minLength": 2,
        "maxLength": 50,
        "pattern": "^[가-힣a-zA-Z0-9\\s]+$",
        "message": "상품명은 2~50자, 한글/영문/숫자만 입력하세요."
      }
    },
    {
      "name": "price",
      "label": "가격",
      "type": "number",
      "validation": {
        "min": 0,
        "max": 10000000
      }
    },
    {
      "name": "category",
      "label": "카테고리",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["전자", "의류", "식품"]
      }
    },
    {
      "name": "description",
      "label": "설명",
      "type": "textarea"
    }
  ],
  "buttons": {
    "top": ["add", "delete"],
    "bottom": ["save", "cancel"]
  },
  "edit": {
    "fetchDetail": false
  },
  "delete": {
    "confirm": true,
    "message": "정말로 삭제하시겠습니까?",
    "onSuccess": "toast.success('삭제가 완료되었습니다.')"
  },
  "mock": {
    "enabled": true,
    "rows": 10,
    "delay": 500,
    "source": "faker",
    "settings": {
      "categories": ["전자", "의류", "식품", "가구", "도서"],
      "statusProbability": {
        "active": 0.7,
        "inactive": 0.2,
        "soldout": 0.1
      },
      "priceRange": {
        "min": 1000,
        "max": 100000
      },
      "pagination": {
        "defaultSize": 5,
        "maxSize": 20
      },
      "seed": 123
    }
  },
  "aiPrompt": "이 화면은 상품을 관리하는 CRUD 대시보드입니다. 필터, 리스트, 폼이 포함됩니다. 상태 컬럼은 뱃지로, 관리 컬럼은 수정 및 삭제 버튼으로 렌더링됩니다."
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\meta\users.meta.json

```
{
  "type": "crud",
  "name": "users",
  "title": "사용자 관리",
  "path": "/users",
  "description": "사용자 정보를 추가, 수정, 삭제할 수 있는 화면입니다.",
  "api": {
    "baseUrl": "/api/users",
    "methods": {
      "get": "GET",
      "post": "POST",
      "put": "PUT",
      "patch": "PATCH",
      "delete": "DELETE"
    }
  },
  "filters": [
    {
      "name": "role",
      "label": "역할",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["admin", "user", "guest"]
      }
    },
    {
      "name": "status",
      "label": "상태",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["active", "inactive", "pending"]
      }
    },
    {
      "name": "name",
      "label": "이름",
      "type": "text"
    }
  ],
  "columns": [
    {
      "name": "id",
      "label": "ID"
    },
    {
      "name": "name",
      "label": "이름"
    },
    {
      "name": "email",
      "label": "이메일"
    },
    {
      "name": "role",
      "label": "역할"
    },
    {
      "name": "status",
      "label": "상태",
      "cell": {
        "type": "badge",
        "map": {
          "active": "green",
          "inactive": "gray",
          "pending": "yellow"
        }
      }
    },
    {
      "name": "actions",
      "label": "관리",
      "cell": {
        "type": "buttons",
        "actions": [
          {
            "label": "수정",
            "onClick": "editItem"
          },
          {
            "label": "삭제",
            "onClick": "deleteItem",
            "variant": "destructive"
          }
        ]
      }
    }
  ],
  "form": [
    {
      "name": "name",
      "label": "이름",
      "type": "text",
      "required": true,
      "validation": {
        "minLength": 2,
        "maxLength": 50,
        "pattern": "^[가-힣a-zA-Z\\s]+$",
        "message": "이름은 2~50자, 한글/영문만 입력하세요."
      }
    },
    {
      "name": "email",
      "label": "이메일",
      "type": "email",
      "required": true,
      "validation": {
        "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        "message": "유효한 이메일 주소를 입력하세요."
      }
    },
    {
      "name": "role",
      "label": "역할",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["admin", "user", "guest"]
      }
    },
    {
      "name": "status",
      "label": "상태",
      "type": "select",
      "options": {
        "source": "static",
        "data": ["active", "inactive", "pending"]
      }
    },
    {
      "name": "password",
      "label": "비밀번호",
      "type": "password",
      "validation": {
        "minLength": 8,
        "message": "비밀번호는 최소 8자 이상이어야 합니다."
      }
    }
  ],
  "buttons": {
    "top": ["add", "delete"],
    "bottom": ["save", "cancel"]
  },
  "aiPrompt": "이 화면은 사용자를 관리하는 CRUD 대시보드입니다. 필터, 리스트, 폼이 포함됩니다. 상태 컬럼은 뱃지로, 관리 컬럼은 수정 및 삭제 버튼으로 렌더링됩니다.",
  "edit": {
    "fetchDetail": true
  },
  "delete": {
    "confirm": true,
    "message": "정말로 사용자를 삭제하시겠습니까?",
    "onSuccess": "toast.success('사용자 삭제가 완료되었습니다.')"
  },
  "mock": {
    "enabled": true,
    "rows": 15,
    "delay": 300,
    "source": "faker",
    "settings": {
      "roles": ["admin", "user", "guest"],
      "statusProbability": {
        "active": 0.6,
        "inactive": 0.3,
        "pending": 0.1
      },
      "pagination": {
        "defaultSize": 10,
        "maxSize": 50
      },
      "seed": 456
    }
  }
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-api-data-routes.js

```
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

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-api-routes.js

```
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
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-crud.js

```
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ 메타 파일 경로를 입력하세요. 예: node generate-crud.js meta/products.meta?.json");
  process.exit(1);
}

const metaPath = path.resolve(args[0]);
const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));

const toPascalCase = (str) => str.replace(/(^\w|_\w)/g, (match) => match.replace("_", "").toUpperCase());

const writeFileSafe = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    console.log(`⚠️ 파일이 이미 존재합니다: ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, content);
  console.log(`✅ 파일 생성됨: ${filePath}`);
};

const baseName = meta?.name;
const pascalName = toPascalCase(baseName);
const outPageDir = path.join("generated", "pages", baseName);
const outCompDir = path.join("generated", "components", pascalName);
const outHookDir = path.join("generated", "hooks");

fs.mkdirSync(outPageDir, { recursive: true });
fs.mkdirSync(outCompDir, { recursive: true });
fs.mkdirSync(outHookDir, { recursive: true });

const pageContent = `
import ${pascalName}FormComponent from '../../components/${pascalName}/${pascalName}FormComponent';
import ${pascalName}TableComponent from '../../components/${pascalName}/${pascalName}TableComponent';

export default function Page() {
  return (
    <div>
      <h1>${meta?.title}</h1>
      <${pascalName}FormComponent />
      <${pascalName}TableComponent />
    </div>
  );
}
`;

writeFileSafe(path.join(outPageDir, "page.tsx"), pageContent);

const renderFormComponent = require("../templates/formComponent.tpl");
const formCode = renderFormComponent(meta, pascalName);
writeFileSafe(path.join(outCompDir, `${pascalName}FormComponent.tsx`), formCode);

const tableHeaders = meta?.columns.map((col) => `<th>${col.label}</th>`).join("");
const tableCells = meta?.columns.map((col) => `<td>{item.${col.name}}</td>`).join("");

const tableComponent = `
export default function ${pascalName}TableComponent() {
  const data = []; // TODO: API 연동 필요
  return (
    <table>
      <thead><tr>${tableHeaders}</tr></thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            ${tableCells}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
`;

writeFileSafe(path.join(outCompDir, `${pascalName}TableComponent.tsx`), tableComponent);

const apiHookContent = `
import axios from 'axios';

export const use${pascalName}Api = () => {
  const baseUrl = '${meta?.api.baseUrl}';

  const getList = () => axios.get(baseUrl);
  const create = (data) => axios.post(baseUrl, data);
  const update = (id, data) => axios.put(\`\${baseUrl}/\${id}\`, data);
  const remove = (id) => axios.delete(\`\${baseUrl}/\${id}\`);

  return { getList, create, update, remove };
};
`;

writeFileSafe(path.join(outHookDir, `use${pascalName}Api.js`), apiHookContent);

const filterFields = (meta?.filters || [])
  .map((field) => {
    if (field.type === "select") {
      const isStatic = field.options?.source === "static";
      if (isStatic) {
        const options = field.options.data.map((opt) => `<option value="${opt}">${opt}</option>`).join("");
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            ${options}
          </select>
        </label>`;
      } else {
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            {/* TODO: API로 ${field.options.url}에서 옵션 가져오기 */}
          </select>
        </label>`;
      }
    } else {
      return `
      <label>${field.label}
        <input name="${field.name}" type="text" onChange={onChange} />
      </label>`;
    }
  })
  .join("\\n");

const filterComponent = `
export default function ${pascalName}FilterComponent({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}) {
  return (
    <div>
      ${filterFields}
    </div>
  );
}
`;

writeFileSafe(path.join(outCompDir, `${pascalName}FilterComponent.tsx`), filterComponent);

const { generateComponent } = require("../ai/agent");
if (meta?.aiPrompt) {
  await generateComponent(meta?.aiPrompt, pascalName);
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-query-hooks.js

```
const fs = require("fs");
const path = require("path");
const renderQueryHook = require("../templates/shadcn/useQueryHook.tpl.js");

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
const methods = meta.api?.methods || {};
const baseUrl = meta.api?.baseUrl || "";

if (!name || !baseUrl || Object.keys(methods).length === 0) {
  console.error("❌ meta.api 정보가 부족합니다.");
  process.exit(1);
}

const targetDir = path.join("src", "features", name, "apis");
fs.mkdirSync(targetDir, { recursive: true });

const pascal = name.charAt(0).toUpperCase() + name.slice(1);

if (methods.get) {
  const code = renderQueryHook(meta);
  fs.writeFileSync(path.join(targetDir, `useGet${pascal}.ts`), code, "utf-8");
  console.log(`✅ useGet${pascal}.ts 생성 완료`);
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-shadcn-all.js

```
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

console.log("\n🛠 4단계: CRUD 라우트 별도 생성 중...");
execSync(`node scripts/generate-api-routes.js ${metaPath}`, { stdio: "inherit" });

console.log("\n🛠 5단계: api 데이터 라우트 별도 생성 중...");
execSync(`node scripts/generate-api-data-routes.js ${metaPath}`, { stdio: "inherit" });

console.log("\n🛠 6단계: react-query hooks 별도 생성 중...");
execSync(`node scripts/generate-query-hooks.js ${metaPath}`, { stdio: "inherit" });

console.log("\n🛠 7단계: filterStore.ts 별도 생성 중...");
execSync(`node scripts/generate-zustand-full-store.js ${metaPath}`, { stdio: "inherit" });

console.log("\n🎉 모든 shadcn 관련 파일이 성공적으로 생성되었습니다!");

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-shadcn-columns.js

```
const fs = require("fs");
const path = require("path");
const renderColumns = require("../templates/shadcn/Columns.tpl.js");

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
const pascalName = meta.name.charAt(0).toUpperCase() + meta.name.slice(1);
const targetDir = path.join("generated", "components", pascalName);
fs.mkdirSync(targetDir, { recursive: true });

const code = renderColumns(meta, pascalName);
fs.writeFileSync(path.join(targetDir, "columns.tsx"), code, "utf-8");

console.log(`✅ columns.ts 생성 완료 → ${targetDir}/columns.ts`);

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-shadcn-route.js

```
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

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-shadcn.js

```
const fs = require("fs");
const path = require("path");

const renderForm = require("../templates/shadcn/Form.tpl.js");
const renderFilter = require("../templates/shadcn/FilterBar.tpl.js");
const renderPreview = require("../templates/shadcn/PreviewPage.tpl.js");

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
const pascalName = meta.name.charAt(0).toUpperCase() + meta.name.slice(1);
const compDir = path.join("generated", "components", pascalName);
const pageDir = path.join("generated", "pages", meta.name);

fs.mkdirSync(compDir, { recursive: true });
fs.mkdirSync(pageDir, { recursive: true });

// Form 생성
const formCode = renderForm(meta, pascalName);
fs.writeFileSync(path.join(compDir, "Form.tsx"), formCode, "utf-8");
console.log(`✅ Form.tsx 생성 완료`);

// Filter 생성
const filterCode = renderFilter(meta, pascalName);
fs.writeFileSync(path.join(compDir, "FilterBar.tsx"), filterCode, "utf-8");
console.log(`✅ FilterBar.tsx 생성 완료`);

// Preview 페이지 생성
const previewCode = renderPreview(meta, pascalName);
fs.writeFileSync(path.join(pageDir, "preview.tsx"), previewCode, "utf-8");
console.log(`✅ preview.tsx 생성 완료`);

console.log(`🎉 모든 shadcn 컴포넌트 및 미리보기 페이지가 생성되었습니다.`);

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\generate-zustand-full-store.js

```
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
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\scripts\README.md

```
# API 라우트 생성 스크립트

이 디렉토리에는 메타데이터 파일을 기반으로 API 라우트 및 Mock 데이터를 자동으로 생성하는 스크립트가 포함되어 있습니다.

## 스크립트 목록

1. **generate-api-routes.js**: 이전 버전의 API 라우트 생성 스크립트입니다. 현재는 주로 호환성을 위해 유지되며, 내부적으로 `generate-api-data-routes.js`를 호출합니다.

2. **generate-api-data-routes.js**: 개선된 API 라우트 생성 스크립트로, 메타데이터 파일을 분석하여 타입 정의, API 핸들러, HTTP 메소드 핸들러를 생성하고 필요에 따라 Mock 서비스 함수도 추가합니다.

## 사용 방법

### 기본 사용법

```bash
node scripts/generate-api-routes.js <메타데이터파일경로>
```

또는

```bash
node scripts/generate-api-data-routes.js <메타데이터파일경로> [옵션]
```

### 옵션 (generate-api-data-routes.js)

- `--help`, `-h`: 도움말 표시
- `--verbose`, `-v`: 상세 로그 출력
- `--no-add`: 기존 mockService에 함수를 추가하지 않음

### 예시

```bash
# 기본 사용법
node scripts/generate-api-routes.js meta/users.meta.json

# 상세 로그 출력
node scripts/generate-api-data-routes.js meta/products.meta.json --verbose

# mock 함수 추가하지 않기
node scripts/generate-api-data-routes.js meta/customers.meta.json --no-add
```

## 주요 기능

- **타입 정의 생성**: 메타데이터의 columns 정보를 기반으로 TypeScript 인터페이스 생성
- **API 핸들러 생성**: MockApiHandler를 사용한 API 엔드포인트 처리
- **HTTP 메소드 핸들러**: GET, POST, PUT, PATCH, DELETE 메소드 핸들러 생성
- **Mock 서비스 함수 추가**: 엔티티에 맞는 Mock 데이터 생성 함수 추가

## 필요한 메타데이터 구조

메타데이터 파일은 다음과 같은 구조를 가져야 합니다:

```json
{
  "type": "crud",
  "name": "entityName", // 엔티티 이름 (필수)
  "api": {
    "baseUrl": "/api/path", // API 경로 (필수)
    "methods": {
      // 지원할 HTTP 메소드 (필수)
      "get": "GET",
      "post": "POST",
      "put": "PUT",
      "patch": "PATCH",
      "delete": "DELETE"
    }
  },
  "columns": [
    // 엔티티 필드 정보 (필수)
    {
      "name": "id",
      "label": "ID"
    },
    {
      "name": "name",
      "label": "이름"
    }
    // ... 추가 필드
  ],
  "mock": {
    // Mock 설정 (선택)
    "enabled": true,
    "rows": 10,
    "delay": 500,
    "source": "faker",
    "settings": {
      // 엔티티별 Mock 설정 (선택)
      // ... 엔티티별 설정
    }
  }
}
```

## 생성된 파일

스크립트는 다음과 같은 파일을 생성합니다:

1. `src/app/api/<path>/route.ts`: API 라우트 파일
2. `src/lib/mock/faker-service.ts`에 Mock 데이터 생성 함수 추가

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\filterComponent.tpl.js

```
module.exports = function renderFilterComponent(meta, pascalName) {
  const filters = (meta.filters || []).map((field) => {
    if (field.type === 'select') {
      const isStatic = field.options?.source === 'static';
      if (isStatic) {
        const options = field.options.data
          .map((opt) => `<option value="${opt}">${opt}</option>`)
          .join('');
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            ${options}
          </select>
        </label>`;
      } else {
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            {/* TODO: API로 ${field.options.url} 에서 옵션 가져오기 */}
          </select>
        </label>`;
      }
    } else {
      return `
      <label>${field.label}
        <input name="${field.name}" type="text" onChange={onChange} />
      </label>`;
    }
  }).join('\n');

  return `
export default function ${pascalName}FilterComponent({ onChange }) {
  return (
    <div>
      ${filters}
    </div>
  );
}`;
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\formComponent.tpl.js

```
module.exports = function renderFormComponent(meta, pascalName) {
  const fields = meta.form || [];

  const yupFields = fields
    .map((field) => {
      const rules = [];
      const v = field.validation || {};
      if (v.minLength) rules.push(`.min(${v.minLength})`);
      if (v.maxLength) rules.push(`.max(${v.maxLength})`);
      if (v.min) rules.push(`.min(${v.min})`);
      if (v.max) rules.push(`.max(${v.max})`);
      if (v.pattern) rules.push(`.matches(/${v.pattern}/, '${v.message || ""}')`);

      const baseType = field.type === "number" ? "yup.number()" : "yup.string()";
      return `  ${field.name}: ${baseType}${rules.join("")}`;
    })
    .join(",\n");

  const inputs = fields
    .map((field) => {
      const inputType = field.type === "number" ? "number" : "text";
      const tag =
        field.type === "textarea"
          ? `<textarea {...register("${field.name}")}></textarea>`
          : `<input type="${inputType}" {...register("${field.name}")} />`;
      return `
      <label>${field.label}
        ${tag}
        {errors.${field.name} && <span>{errors.${field.name}.message}</span>}
      </label>`;
    })
    .join("\n");

  return `
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
${yupFields}
});

export default function ${pascalName}FormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      ${inputs}
      <button type="submit">저장</button>
    </form>
  );
}
`;
};

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\Columns.tpl.js

```
module.exports = function renderColumnDefs(meta, pascalName) {
  const formMap = new Map();
  (meta.form || []).forEach(field => {
    formMap.set(field.name, field.type);
  });

  const columnDefs = (meta.columns || []).map(col => {
    const fieldType = formMap.get(col.name) || "text";
    const tsType = fieldType === "number" ? "number" : "string";

    if (col.cell?.type === "badge") {
      const map = col.cell.map || {};
      const colorMap = Object.entries(map).map(([key, color]) => {
        return `      "${key}": "bg-${color}-100 text-${color}-800"`;
      }).join(',\n');

      return `
  {
    accessorKey: "${col.name}",
    header: "${col.label}",
    cell: ({ row }) => {
      const value = row.getValue("${col.name}") as string;
      const colorMap: Record<string, string> = {
${colorMap}
      };
      return (
        <span className={cn("px-2 py-1 text-xs rounded-full", colorMap[value] || "bg-muted")}>
          {value}
        </span>
      );
    }
  }`;
    }

    if (col.cell?.type === "buttons" || col.cell?.type === "button") {
      const actions = col.cell.actions || [{
        label: col.cell.label || "수정",
        onClick: col.cell.onClick || "editItem",
        variant: col.cell.variant || "primary"
      }];

      const buttonsJsx = actions.map(btn => {
        const label = btn.label || "Button";
        const color = btn.variant === "destructive" ? "bg-red-500" : "bg-primary";
        const handler = btn.onClick || "() => {}";
        return `
          <button
            onClick={() => ${handler}(row.original)}
            className="text-white text-xs rounded px-2 py-1 ${color}"
          >
            ${label}
          </button>`;
      }).join('');

      return `
  {
    id: "${col.name}",
    header: "${col.label}",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          ${buttonsJsx}
        </div>
      );
    }
  }`;
    }

    return `
  {
    accessorKey: "${col.name}",
    header: "${col.label}"
  }`;
  }).join(',\n');

  const inferredTypes = (meta.columns || []).map(col => {
    const fieldType = formMap.get(col.name) || "text";
    const tsType = fieldType === "number" ? "number" : "string";
    return `  ${col.name}: ${tsType};`;
  }).join('\n');

  return `
import { ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

export type ${pascalName} = {
${inferredTypes}
}

export const columns = (
  editItem: (row: ${pascalName}) => void,
  deleteItem: (row: ${pascalName}) => void
): ColumnDef<${pascalName}>[] => [
${columnDefs}
]
`;
};
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\FilterBar.tpl.js

```
module.exports = function renderShadcnFilter(meta, pascalName) {
  const filters = (meta.filters || [])
    .map((field) => {
      const isDynamic = field.options?.source === "api";
      const varName = field.name + "Options";
      const valueKey = field.options?.valueKey || "id";
      const labelKey = field.options?.labelKey || "name";

      if (field.type === "select") {
        if (isDynamic) {
          return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <select name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
          {${varName}.map((opt) => (
            <option key={opt["${valueKey}"]} value={opt["${valueKey}"]}>
              {opt["${labelKey}"]}
            </option>
          ))}
        </select>
      </div>`;
        } else {
          const staticOptions = (field.options?.data || [])
            .map((opt) => `          <option value="${opt}">${opt}</option>`)
            .join("\n");
          return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <select name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md">
          <option value="">전체</option>
${staticOptions}
        </select>
      </div>`;
        }
      } else {
        return `
      <div className="grid gap-1">
        <label className="text-sm font-medium">${field.label}</label>
        <input type="text" name="${field.name}" onChange={onChange} className="border px-3 py-2 rounded-md" />
      </div>`;
      }
    })
    .join("\n");

  const dynamicHooks = (meta.filters || [])
    .filter((f) => f.type === "select" && f.options?.source === "api")
    .map((f) => {
      const varName = f.name + "Options";
      const setFn = "set" + f.name.charAt(0).toUpperCase() + f.name.slice(1) + "Options";
      const valueKey = f.options?.valueKey || "id";
      const labelKey = f.options?.labelKey || "name";
      return `const [${varName}, ${setFn}] = React.useState<Array<Record<string, any>>>([]);

  React.useEffect(() => {
    fetch("${f.options.url}?ui=true")
      .then(res => res.json())
      .then(data => {
        // 배열인지 확인하고 설정
        if (Array.isArray(data)) {
          ${setFn}(data);
        } else {
          console.error("데이터가 배열이 아닙니다:", data);
          ${setFn}([]);
        }
      })
      .catch(err => {
        console.error("데이터를 불러오는데 실패했습니다:", err);
        ${setFn}([]);
      });
  }, []);`;
    })
    .join("\n\n");

  return `
"use client"

import * as React from "react"

export default function ${pascalName}FilterBar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  ${dynamicHooks}

  return (
    <div className="flex flex-wrap gap-4">
      ${filters}
    </div>
  );
}
`;
};

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\Form.tpl.js

```
module.exports = function renderShadcnForm(meta, pascalName) {
  const fields = meta.form || [];
  const name = meta.name;
  const title = meta.title || pascalName;

  const zodFields = fields.map((field) => {
    const name = field.name;
    const v = field.validation || {};
    const isNumber = field.type === 'number';
    const type = isNumber ? 'z.number()' : 'z.string()';
    const rules = [];

    if (v.required !== false) {
      if (isNumber) {
        rules.push('.min(0)');
      } else {
        rules.push('.nonempty()');
      }
    }

    if (v.minLength) rules.push(`.min(${v.minLength})`);
    if (v.maxLength) rules.push(`.max(${v.maxLength})`);
    if (v.pattern) rules.push(`.regex(/${v.pattern}/, "${v.message || ''}")`);
    if (v.min) rules.push(`.min(${v.min})`);
    if (v.max) rules.push(`.max(${v.max})`);

    return `  ${name}: ${type}${rules.join('')}`;
  }).join(',\n');

  const defaultValues = fields.map((field) => {
    const defaultValue =
      field.type === 'number' ? 0 :
      '""';
    return `    ${field.name}: ${defaultValue}`;
  }).join(',\n');

  const inputs = fields.map((field) => {
    if (field.type === 'select') {
      const isDynamic = field.options?.source === 'api';
      const optionsVar = field.name + "Options";
      const optionMap = isDynamic
        ? `        {${optionsVar}.map(opt => <option key={opt.${field.options?.valueKey}} value={opt.${field.options?.valueKey}}>{opt.${field.options?.labelKey}}</option>)}`
        : (field.options?.data || []).map(opt => `        <option value="${opt}">${opt}</option>`).join('\n');

      return `
      <FormField
        control={form.control}
        name="${field.name}"
        render={({ field }) => (
          <FormItem>
            <FormLabel>${field.label}</FormLabel>
            <FormControl>
              <select {...field} className="border px-3 py-2 rounded-md">
${optionMap}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />`;
    }

    const inputType = field.type === 'number' ? 'number' : 'text';
    return `
      <FormField
        control={form.control}
        name="${field.name}"
        render={({ field }) => (
          <FormItem>
            <FormLabel>${field.label}</FormLabel>
            <FormControl>
              <Input type="${inputType}" placeholder="${field.label}" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />`;
  }).join('\n');

  const dynamicFetches = fields
    .filter(f => f.type === 'select' && f.options?.source === 'api')
    .map(f => {
      const varName = f.name + "Options";
      const setFn = "set" + f.name.charAt(0).toUpperCase() + f.name.slice(1) + "Options";
      return `const [${varName}, ${setFn}] = React.useState([]);
  React.useEffect(() => {
    fetch("${f.options.url}")
      .then(res => res.json())
      .then(data => ${setFn}(data));
  }, []);`;
    }).join('\n\n');

  return `
"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { useCreate${pascalName} } from "@/src/features/${name}/apis/useCreate${pascalName}"
import { useUpdate${pascalName} } from "@/src/features/${name}/apis/useUpdate${pascalName}"
import { use${pascalName}Store } from "@/src/features/${name}/stores/store"

const schema = z.object({
${zodFields}
});

type FormSchema = z.infer<typeof schema>;

interface Props {
  onSuccess?: () => void;
}

export default function ${pascalName}Form({ onSuccess }: Props) {
  const {
    selectedItem,
    isEditMode,
    resetSelectedItem
  } = use${pascalName}Store();

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: selectedItem ?? {
${defaultValues}
    }
  });

  const create = useCreate${pascalName}();
  const update = useUpdate${pascalName}();

  function handleSubmit(values: FormSchema) {
    const action = isEditMode ? update : create;
    action.mutate(values, {
      onSuccess: () => {
        toast.success(\`\${title} \${isEditMode ? "수정" : "등록"} 완료\`);
        form.reset();
        resetSelectedItem();
        onSuccess?.();
      }
    });
  }

  ${dynamicFetches}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        ${inputs}
        <Button type="submit" disabled={create.isPending || update.isPending}>
          {isEditMode ? "수정" : "저장"}
        </Button>
      </form>
    </Form>
  );
}
`;
};
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\PreviewPage.tpl.js

```
module.exports = function renderShadcnPreview(meta, pascalName) {
  const title = meta.title || pascalName;
  const columns = meta.columns || [];
  const name = meta.name;
  const storeImport = `use${pascalName}Store`;
  const fetchDetail = meta.edit?.fetchDetail;
  const deleteConfirm = meta.delete?.confirm;
  const deleteMessage = meta.delete?.message || "정말 삭제하시겠습니까?";
  const deleteOnSuccess = meta.delete?.onSuccess || "";

  const hasActionCell = columns.some(col => col.cell?.type === "buttons" || col.cell?.type === "button");

  const handlers = hasActionCell ? `
  async function editItem(item: ${pascalName}) {
    ${fetchDetail
      ? `const res = await fetch("/api/${name}/" + item.id);
    const data = await res.json();
    setSelectedItem(data);`
      : `setSelectedItem(item);`}
    setDialogOpen(true);
  }

  function deleteItem(item: ${pascalName}) {
    ${deleteConfirm ? `if (!confirm("${deleteMessage}")) return;` : ""}
    deleteMutation.mutate(item.id, {
      onSuccess: () => {
        ${deleteOnSuccess}
      }
    });
  }

  function handleRowClick(item: ${pascalName}) {
    setSelectedItem(item);
    setDrawerOpen(true);
  }
` : "";

  const filterHandler = `
  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFilter(name, value);
  }
`;

  const columnCall = hasActionCell
    ? "columns(editItem, deleteItem)"
    : "columns";

  return `
"use client"

import * as React from "react"
import LayoutShell from "@/shared/components/layout/LayoutShell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import ${pascalName}Form from "@/generated/components/${pascalName}/Form"
import ${pascalName}FilterBar from "@/generated/components/${pascalName}/FilterBar"
import { columns } from "@/generated/components/${pascalName}/columns"
import type { ${pascalName} } from "@/generated/components/${pascalName}/columns"

import { ${storeImport} } from "@/src/features/${name}/stores/store"
import { useGet${pascalName} } from "@/src/features/${name}/apis/useGet${pascalName}"
import { useDelete${pascalName} } from "@/src/features/${name}/apis/useDelete${pascalName}"
import { DataTable } from "@/shared/components/ui/DataTable"

export default function ${pascalName}PreviewPage() {
  const {
    filters, setFilter,
    setSelectedItem, resetSelectedItem,
    selectedItem
  } = ${storeImport}();
  const { data = [], isLoading } = useGet${pascalName}(filters);
  const deleteMutation = useDelete${pascalName}();
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  ${handlers}
  ${filterHandler}

  return (
    <LayoutShell>
      <h1 className="text-2xl font-bold mb-4">${title} 관리</h1>

      <div className="flex justify-between items-center mb-4">
        <${pascalName}FilterBar onChange={handleFilterChange} />
        <Button onClick={() => {
          resetSelectedItem();
          setDialogOpen(true);
        }}>
          + 등록
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>${title} 목록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable<${pascalName}>
            columns={${columnCall}}
            data={data}
            onRowClick={handleRowClick}
            selectedId={selectedItem?.id}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{/* 등록 vs 수정 */}</DialogTitle>
          </DialogHeader>
          <${pascalName}Form onSuccess={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>상세 정보</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
              {JSON.stringify(selectedItem, null, 2)}
            </pre>
          </div>
        </DrawerContent>
      </Drawer>
    </LayoutShell>
  );
}
`;
};
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\RoutePreviewPage.tpl.js

```
module.exports = function renderPreviewRoute(meta) {
  const pageName = meta.name;
  const pascalName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return `
import Preview from "@/generated/pages/${pageName}/preview"

export default function Page() {
  return <Preview />
}
`;
};
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\shadcn\useQueryHook.tpl.js

```
module.exports = function renderQueryHook(meta) {
  const name = meta.name;
  const pascal = name.charAt(0).toUpperCase() + name.slice(1);
  const baseUrl = meta.api?.baseUrl;

  return `
import { useQuery } from "@tanstack/react-query"

export function useGet${pascal}(filters: Record<string, string>) {
  return useQuery({
    queryKey: ["${name}", filters],
    queryFn: async () => {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(\`${baseUrl}?\${query}\`);
      return res.json();
    },
  });
}
`.trim();
};
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\templates\tableComponent.tpl.js

```
module.exports = function renderTableComponent(meta, pascalName) {
  const headers = meta.columns.map(col => `<th>${col.label}</th>`).join('');
  const cells = meta.columns.map(col => `<td>{item.${col.name}}</td>`).join('');

  return `
export default function ${pascalName}TableComponent() {
  const data = []; // TODO: API 연동 필요
  return (
    <table>
      <thead><tr>${headers}</tr></thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            ${cells}
          </tr>
        ))}
      </tbody>
    </table>
  );
}`;
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\shared\components\layout\LayoutShell.tsx

```
import * as React from "react"

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100 border-b p-4">
        <h1 className="text-lg font-semibold">dopamine-dash</h1>
      </header>

      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gray-100 border-t p-4 text-center text-sm text-muted-foreground">
        © 2025 dopamine-dash. All rights reserved.
      </footer>
    </div>
  );
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\shared\components\providers\query-provider.tsx

```
// src/providers/query-provider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\shared\components\ui\DataTable.tsx

```
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef
} from "@tanstack/react-table";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  selectedId?: string;
}

export function DataTable<T>({
  columns,
  data,
  onRowClick,
  selectedId
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const id = (row.original as any)?.id;
            const isSelected = id && id === selectedId;
            return (
              <TableRow
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className={isSelected ? "bg-muted" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\shared\utils\validate\validateNestedObject.ts

```
/**
 * 중첩된 객체의 필드 값을 검증하는 유틸리티 함수
 * @param {Object} object - 검증할 객체
 * @param {Object} validationRules - 검증 규칙 객체
 * @param {Object} context - 검증에 필요한 추가 컨텍스트 데이터
 * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object }
 *
 * @example
 * const object = {
 *   name: 'John',
 *   age: 25,
 *   email: 'john@example.com',
 *   phone: '010-1234-5678',
 *   address: {
 *     street: '123 Main St',
 *     city: 'Seoul',
 *     zipCode: '12345'
 *   },
 *   preferences: {
 *     notifications: true,
 *     theme: 'dark'
 *   },
 *   orders: [
 *     { id: 1, amount: 1000 },
 *     { id: 2, amount: 2000 }
 *   ],
 *   tags: ['new', 'vip'],
 *   lastLogin: '2024-04-04T12:00:00Z'
 * };
 *
 * const validationRules = {
 *   name: {
 *     required: true,
 *     type: 'string',
 *     minLength: 2,
 *     maxLength: 50,
 *     pattern: /^[a-zA-Z\s]+$/
 *   },
 *   age: {
 *     required: true,
 *     type: 'number',
 *     min: 0,
 *     max: 120
 *   },
 *   email: {
 *     required: true,
 *     type: 'string',
 *     pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 *   },
 *   phone: {
 *     required: true,
 *     type: 'string',
 *     pattern: /^010-\d{4}-\d{4}$/
 *   },
 *   address: {
 *     street: { required: true, type: 'string' },
 *     city: { required: true, type: 'string' },
 *     zipCode: {
 *       required: true,
 *       type: 'string',
 *       pattern: /^\d{5}$/
 *     }
 *   },
 *   preferences: {
 *     notifications: { required: true, type: 'boolean' },
 *     theme: {
 *       required: true,
 *       type: 'string',
 *       enum: ['light', 'dark', 'system']
 *     }
 *   },
 *   orders: {
 *     type: 'array',
 *     minLength: 0,
 *     maxLength: 10,
 *     items: {
 *       id: { required: true, type: 'number' },
 *       amount: { required: true, type: 'number', min: 0 }
 *     }
 *   },
 *   tags: {
 *     type: 'array',
 *     minLength: 0,
 *     maxLength: 5,
 *     items: { type: 'string' }
 *   },
 *   lastLogin: {
 *     required: true,
 *     type: 'string',
 *     pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
 *   }
 * };
 *
 * // validate 함수 사용 예시
 * const customValidationRules = {
 *   age: {
 *     required: true,
 *     validate: (value, context) => {
 *       if (value < context.minAge) {
 *         return `나이는 ${context.minAge}세 이상이어야 합니다.`;
 *       }
 *       return true;
 *     }
 *   },
 *   city: {
 *     required: true,
 *     validate: (value, context) => {
 *       if (!context.validRegions.includes(value)) {
 *         return `유효하지 않은 지역입니다. (${context.validRegions.join(', ')})`;
 *       }
 *       return true;
 *     }
 *   },
 *   // parentObject를 사용한 validate 함수 예시
 *   orders: {
 *     type: 'array',
 *     items: {
 *       amount: {
 *         required: true,
 *         validate: (value, context, parentObject) => {
 *           // 주문 금액이 1000원 미만이면서 VIP 태그가 있는 경우 검증
 *           if (value < 1000 && parentObject.tags?.includes('vip')) {
 *             return 'VIP 고객의 주문 금액은 1000원 이상이어야 합니다.';
 *           }
 *           return true;
 *         }
 *       }
 *     }
 *   },
 *   // 중첩된 객체에서 parentObject를 사용한 예시
 *   address: {
 *     street: {
 *       required: true,
 *       validate: (value, context, parentObject) => {
 *         // 도시가 서울인 경우 주소 형식 검증
 *         if (parentObject.city === '서울' && !value.includes('구')) {
 *           return '서울 주소는 구 단위까지 입력해야 합니다.';
 *         }
 *         return true;
 *       }
 *     }
 *   }
 * };
 *
 * // validate와 type을 함께 사용하면 안 되는 예시
 * const invalidRules = {
 *   age: {
 *     type: 'number',  // type과 validate를 함께 사용하면 안 됨
 *     validate: (value) => value > 0
 *   }
 * };
 *
 * const context = {
 *   minAge: 18,
 *   validRegions: ['서울', '부산'],
 *   regionDetails: {
 *     '서울': ['강남', '강북'],
 *     '부산': ['해운대', '서면']
 *   }
 * };
 *
 * const result = validateNestedObject(object, validationRules, context);
 *
 * @see =================== 변경 내역 ==================
 * [작성자][작업일시] - 내용
 * [H00040][2025-04-04 Friday 18:15:41] - 최초작성
 */

interface ValidationRule {
  required?: boolean;
  type?: "string" | "number" | "boolean" | "array" | "object" | "date" | "email" | "url";
  pattern?: RegExp;
  patternMessage?: string;
  enum?: any[];
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  validate?: (value: any, context: any, parentObject?: any) => boolean | string;
  items?: ValidationRule;
  properties?: Record<string, ValidationRule>;
  [key: string]: any; // 인덱스 시그니처 추가
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, any>;
}

interface ArrayValidationResult extends ValidationResult {
  items?: Array<{
    index: number;
    isValid: boolean;
    errors: Record<string, any>;
  }>;
}

interface FieldValidationResult extends ValidationResult {
  required?: string;
  custom?: string;
  type?: string;
  pattern?: string;
  enum?: string;
  min?: string;
  max?: string;
}

export function validateNestedObject(
  object: Record<string, any>,
  validationRules: Record<string, ValidationRule>,
  context: Record<string, any> = {}
): ValidationResult {
  function checkType(value: any, type: ValidationRule["type"]): { isValid: boolean; error: string } {
    switch (type) {
      case "string":
        return { isValid: typeof value === "string", error: "문자열이어야 합니다." };
      case "number":
        return { isValid: typeof value === "number", error: "숫자여야 합니다." };
      case "boolean":
        return { isValid: typeof value === "boolean", error: "불리언이어야 합니다." };
      case "array":
        return { isValid: Array.isArray(value), error: "배열이어야 합니다." };
      case "object":
        return {
          isValid: typeof value === "object" && value !== null && !Array.isArray(value),
          error: "객체여야 합니다.",
        };
      case "date":
        return { isValid: value instanceof Date || !isNaN(Date.parse(value)), error: "유효한 날짜여야 합니다." };
      case "email":
        return { isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), error: "유효한 이메일 주소여야 합니다." };
      case "url":
        try {
          new URL(value);
          return { isValid: true, error: "" };
        } catch {
          return { isValid: false, error: "유효한 URL이어야 합니다." };
        }
      default:
        return { isValid: true, error: "" };
    }
  }

  /**
   * 필드 값을 검증하는 함수
   * @param {*} value - 검증할 필드 값
   * @param {Object} rules - 검증 규칙 객체
   * @param {string} path - 현재 검증 중인 필드의 경로 (예: 'address.city')
   * @param {Object} context - 검증에 필요한 외부 데이터
   * @param {Object} parentObject - 현재 검증 중인 필드가 속한 부모 객체
   * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object }
   */
  function validateField(
    value: any,
    rules: ValidationRule,
    path: string = "",
    context: Record<string, any> = {},
    parentObject: Record<string, any> = {}
  ): FieldValidationResult {
    let isValid = true;
    const fieldErrors: FieldValidationResult["errors"] = {};

    // required 체크
    if (rules.required && (value === undefined || value === null || value === "")) {
      fieldErrors.required = "필수 입력값입니다.";
      isValid = false;
      return { isValid, errors: fieldErrors };
    }

    // validate 함수 체크 (value가 undefined가 아닌 경우에만)
    if (rules.validate && value !== undefined) {
      const validationResult = rules.validate(value, context, parentObject);
      if (validationResult !== true) {
        fieldErrors.custom = validationResult as string;
        isValid = false;
      }
    }

    // type 체크
    if (rules.type) {
      const typeCheck = checkType(value, rules.type);
      if (!typeCheck.isValid) {
        fieldErrors.type = typeCheck.error;
        isValid = false;
      }
    }

    // pattern 체크
    if (rules.pattern && !rules.pattern.test(value)) {
      fieldErrors.pattern = rules.patternMessage || "올바른 형식이 아닙니다.";
      isValid = false;
    }

    // enum 체크
    if (rules.enum && !rules.enum.includes(value)) {
      fieldErrors.enum = `유효하지 않은 값입니다. (${rules.enum.join(", ")})`;
      isValid = false;
    }

    // min/max 체크
    if (rules.min !== undefined && value < rules.min) {
      fieldErrors.min = `최소값은 ${rules.min}입니다.`;
      isValid = false;
    }
    if (rules.max !== undefined && value > rules.max) {
      fieldErrors.max = `최대값은 ${rules.max}입니다.`;
      isValid = false;
    }

    return { isValid, errors: fieldErrors };
  }

  /**
   * 배열을 검증하는 함수
   * @param {Array} array - 검증할 배열
   * @param {Object} rules - 검증 규칙 객체
   * @param {string} path - 현재 검증 중인 배열의 경로
   * @param {Object} context - 검증에 필요한 외부 데이터
   * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object, items: Array<Object> }
   */
  function validateArray(
    array: any[],
    rules: ValidationRule,
    path: string = "",
    context: Record<string, any> = {}
  ): ArrayValidationResult {
    let isValid = true;
    const arrayErrors: Record<string, any> = {};
    const items: Array<{
      index: number;
      isValid: boolean;
      errors: Record<string, any>;
    }> = [];

    // 배열 길이 체크
    if (rules.minLength !== undefined && array.length < rules.minLength) {
      arrayErrors.minLength = `최소 ${rules.minLength}개의 항목이 필요합니다.`;
      isValid = false;
    }
    if (rules.maxLength !== undefined && array.length > rules.maxLength) {
      arrayErrors.maxLength = `최대 ${rules.maxLength}개의 항목이 허용됩니다.`;
      isValid = false;
    }

    // 배열 아이템 검증
    array.forEach((item, index) => {
      const itemPath = `${path}[${index}]`;
      const itemResult = validateObject(item, rules.items || {}, itemPath, context);

      items.push({
        index,
        isValid: itemResult.isValid,
        errors: itemResult.errors,
      });

      if (!itemResult.isValid) {
        isValid = false;
      }
    });

    return {
      isValid,
      errors: arrayErrors,
      items,
    };
  }

  /**
   * 객체의 모든 필드를 검증하는 함수
   * @param {Object} obj - 검증할 객체
   * @param {Object} rules - 검증 규칙 객체
   * @param {string} path - 현재 검증 중인 객체의 경로
   * @param {Object} context - 검증에 필요한 외부 데이터
   * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object }
   */
  function validateObject(
    obj: Record<string, any>,
    rules: ValidationRule | Record<string, ValidationRule>,
    path: string = "",
    context: Record<string, any> = {}
  ): ValidationResult {
    let isValid = true;
    const objectErrors: Record<string, any> = {};

    // properties 속성이 있는 경우 해당 속성 내부의 필드들을 검증
    if ("properties" in rules) {
      const propertiesResult = validateObject(obj, rules.properties || {}, path, context);
      return propertiesResult;
    }

    for (const [key, rule] of Object.entries(rules as Record<string, ValidationRule>)) {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];

      // 중첩된 객체인 경우
      if (rule && typeof rule === "object" && !rule.required && !rule.type && !rule.pattern) {
        const result = validateObject(value || {}, rule, currentPath, context);
        if (!result.isValid) {
          objectErrors[key] = result.errors;
          isValid = false;
        }
        continue;
      }

      // 배열인 경우
      if (rule.type === "array") {
        const result = validateArray(value || [], rule, currentPath, context);
        if (!result.isValid) {
          objectErrors[key] = result;
          isValid = false;
        }
        continue;
      }

      // 일반 필드 검증
      const result = validateField(value, rule, currentPath, context, obj);
      if (!result.isValid) {
        objectErrors[key] = result.errors;
        isValid = false;
      }
    }

    return { isValid, errors: objectErrors };
  }

  const result = validateObject(object, validationRules, "", context);

  return {
    isValid: result.isValid,
    errors: result.errors,
  };
}

export default validateNestedObject;

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\button.tsx

```
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\card.tsx

```
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\dialog.tsx

```
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\drawer.tsx

```
"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\form.tsx

```
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\input.tsx

```
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\label.tsx

```
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\README.md

```
# 컴포넌트 추가 예시

```bash
npx shadcn@latest init
npx shadcn@latest add input button form
```

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\select.tsx

```
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\table.tsx

```
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\tabs.tsx

```
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

## 파일: C:\ccgolf-workspace-20250106\dopamine-dash-template\components\ui\textarea.tsx

```
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```

