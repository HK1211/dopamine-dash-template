# Mock API 시스템

데이터가 준비되지 않은 상태에서도 개발과 테스트를 원활히 진행할 수 있도록 도와주는 Mock API 시스템입니다.

## 기능

- faker.js를 사용한 현실적인 테스트 데이터 생성
- Meta 파일에서 Mock 설정 관리
- 지연 시간, 데이터 수, 에러 확률 등 설정 가능
- 필터링 처리 지원
- 페이지네이션 지원
- 배치 처리 지원
- 일관된 API 응답 형식

## 사용 방법

### 1. Meta 파일에 Mock 설정 추가

```json
{
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
  }
}
```

### 2. API Route 파일에 적용

```typescript
import { mockService } from "@/src/lib/mock";
import productsMetadata from "@/meta/products.meta.json";
import { getMockConfig } from "@/src/lib/mock";
import { MockApiHandler } from "@/src/lib/mock/api-handler";
import { Products } from "@/src/lib/mock/faker-service";

const mockConfig = getMockConfig(productsMetadata);

// API 핸들러 생성
const productsApiHandler = new MockApiHandler<Products>({
  mockConfig,
  mockDataFn: (params) => mockService.getProducts(mockConfig, params),
  mockSingleDataFn: (id) => {
    const products = mockService.getProducts(mockConfig);
    return products.find((product) => product.id === id) || null;
  },
});

// 라우트 핸들러 함수
export async function GET(req: Request) {
  return productsApiHandler.handleGet(req);
}

export async function POST(req: Request) {
  return productsApiHandler.handlePost(req);
}

export async function PUT(req: Request) {
  return productsApiHandler.handlePut(req);
}

export async function PATCH(req: Request) {
  return productsApiHandler.handlePatch(req);
}

export async function DELETE(req: Request) {
  return productsApiHandler.handleDelete(req);
}
```

### 3. 커스텀 Mock 서비스 구현

필요한 경우 자체 Mock 서비스를 구현할 수 있습니다:

```typescript
import { MockConfig } from "@/src/lib/mock";

export const customMockService = {
  getCustomData: (config: MockConfig): CustomData[] => {
    if (!config.enabled) return [];

    // 커스텀 로직으로 데이터 생성
    return [
      /* ... */
    ];
  },
};
```

### 4. 타입 생성

Meta 파일에서 TypeScript 인터페이스를 자동 생성하는 기능도 제공합니다:

```typescript
import { generateTypeFromMeta } from "@/src/lib/mock";
import metadata from "@/meta/products.meta.json";

const typeDefinition = generateTypeFromMeta(metadata);
console.log(typeDefinition);
```

## 고급 설정

### 필터링 처리

요청의 쿼리 파라미터를 기반으로 자동 필터링 처리가 됩니다.

### 배치 처리

배열 형태로 요청을 보내면 배치 처리됩니다:

```typescript
// 배치 POST 요청
const response = await fetch("/api/products", {
  method: "POST",
  body: JSON.stringify([item1, item2, item3]),
});
```

### 페이지네이션

페이지네이션 파라미터를 포함하면 자동으로 처리됩니다:

```
GET /api/products?page=2&pageSize=10
```
