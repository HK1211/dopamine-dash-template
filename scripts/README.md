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
