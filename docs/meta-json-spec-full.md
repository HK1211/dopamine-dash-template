# 🧠 dopamine-dash-template 프로젝트 소개

---

## 🎯 프로젝트 목적

**dopamine-dash-template**는 `meta.json` 하나만 작성하면  
Next.js + Tailwind 기반의 실전용 CRUD 대시보드 UI를  
자동으로 생성해주는 프론트엔드 자동화 프레임워크입니다.

- Form, Filter, Table, Preview, Dialog, Drawer 등 UI 전 구성 자동 생성
- Zustand, react-query 기반 상태 관리/데이터 요청 자동 구성
- meta 기반으로 API 및 mock 데이터까지 자동 생성
- 사용자 정의 가능한 템플릿 확장 구조

---

## 💡 개발 철학

| 원칙              | 설명                                       |
| ----------------- | ------------------------------------------ |
| **Meta-first**    | 프론트 UI의 설계와 흐름을 선언형으로 설계  |
| **자동화 중심**   | 코드 작성이 아닌 DSL 기반 코드 생성        |
| **사용자 친화적** | 디자이너, 기획자, 개발자 누구나 참여 가능  |
| **UX/DX 우선**    | 실무에서 자주 쓰는 흐름과 피드백 자동 반영 |

---

## 🧩 프로젝트 구성요소

| 경로                      | 설명                                           |
| ------------------------- | ---------------------------------------------- |
| `meta/products.meta.json` | 이 화면의 모든 정의서 (UI/UX 흐름 포함)        |
| `templates/shadcn/`       | 컴포넌트/페이지 생성용 템플릿                  |
| `scripts/`                | meta를 읽어 실제 파일을 생성하는 코드          |
| `src/features/[name]/...` | 생성된 코드들이 도메인 기준으로 정리됨         |
| `src/app/api/...`         | API 자동 생성 결과물                           |
| `src/lib/mock/`           | faker 기반 mock 서비스 (UI 및 API 양방향 대응) |

---

## 📘 meta.json 구조 및 필드 설명

모든 자동화는 이 meta.json에서 시작합니다.  
아래는 각 필드의 의미와 사용 가능한 value에 대한 상세 설명입니다.

👉 다음 메시지에서 meta.json 필드 설명 이어집니다.

---

## 🧩 meta.json 전체 필드 설명서

## 📘 meta.json 필드 상세 설명서 (실용적인 예시 중심)

---

## 🧱 기본 구조

```json
{
  "type": "crud",
  "name": "products",
  "title": "상품 관리",
  ...
}
```

---

## 🔹 `filters[]` 필드

사용자 조회 조건을 구성하는 영역.  
필드는 상단에 렌더링되며, 입력한 값이 자동으로 API query로 연결됩니다.

### ✅ 공통 속성

| 필드      | 필수                                 | 설명                                               |
| --------- | ------------------------------------ | -------------------------------------------------- |
| `name`    | ✅                                   | 상태/쿼리 키 이름 (state, querystring 등에 사용됨) |
| `label`   | ✅                                   | 필터 영역에 표시할 라벨                            |
| `type`    | ✅                                   | `"text"` 또는 `"select"`                           |
| `options` | ⛔ (`type === 'select'`일 때만 필수) | select 옵션 구성                                   |

### ✅ `type` 값과 동적 필드 구성

| type       | 설명                  | 필수 하위 필드                                        |
| ---------- | --------------------- | ----------------------------------------------------- |
| `"text"`   | 일반 텍스트 입력 필터 | 없음                                                  |
| `"select"` | 드롭다운 필터         | `options.source` 및 `options.data` 또는 `options.url` |

---

### 🔸 예시 1: 정적 select

```json
{
  "name": "category",
  "label": "카테고리",
  "type": "select",
  "options": {
    "source": "static",
    "data": ["전자", "의류", "식품"]
  }
}
```

---

### 🔸 예시 2: API 기반 select

```json
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
}
```

> source가 `"api"`일 경우 반드시 `url`이 필요하고,  
> 응답 객체는 배열이며, 각각의 label/value는 지정된 키에서 가져옵니다.

---

## 🔹 `form[]` 필드

Form 입력 필드 정의 영역.  
타입에 따라 동적으로 컴포넌트가 렌더링되며, yup/zod 기반 validation이 자동 적용됩니다.

### ✅ form 필드 공통 속성

| 필드         | 필수                                 | 설명                                              |
| ------------ | ------------------------------------ | ------------------------------------------------- |
| `name`       | ✅                                   | 상태/전송 키 이름                                 |
| `label`      | ✅                                   | 폼에 표시할 제목                                  |
| `type`       | ✅                                   | `"text"`, `"number"`, `"textarea"`, `"select"` 등 |
| `required`   | ⛔                                   | 필수 여부 (기본값: true)                          |
| `validation` | ⛔                                   | 필드 타입에 따라 동적 validation 설정             |
| `options`    | ⛔ (`type === 'select'`일 때만 필수) | select 구성 옵션                                  |

### ✅ type별 지원 값 및 조건

| type         | 컴포넌트                  | 필수 하위 필드                                    |
| ------------ | ------------------------- | ------------------------------------------------- |
| `"text"`     | `<input type="text" />`   | 없음                                              |
| `"number"`   | `<input type="number" />` | 없음                                              |
| `"textarea"` | `<textarea />`            | 없음                                              |
| `"select"`   | `<select>`                | `options.source`, `options.data` or `options.url` |

---

### 🔸 예시 3: Validation 포함 number 필드

```json
{
  "name": "price",
  "label": "가격",
  "type": "number",
  "validation": {
    "min": 0,
    "max": 1000000
  }
}
```

---

### 🔸 예시 4: select 필드 (API 기반)

```json
{
  "name": "status",
  "label": "상태",
  "type": "select",
  "options": {
    "source": "api",
    "url": "/api/statuses",
    "labelKey": "label",
    "valueKey": "code"
  }
}
```

---

## ✅ 동적 필드 구성 원칙

1. `type` 필드가 `select`일 경우 → `options`가 반드시 존재해야 함
2. `options.source === 'api'`일 경우 → 반드시 `url` 지정
3. `options.source === 'static'`일 경우 → `data: []` 배열 필수
4. `validation`은 타입에 따라 동적 분기 적용됨

---

📌 이 구조를 기반으로 dopamine-dash는 **UI 구성, 상태 생성, validation, API, mock**까지 모두 자동화됩니다.

---

## 🔧 select 필드 고급 validation 및 확장 기능

## 📌 meta.json의 select 필드 고급 validation 및 확장 기능

---

## 🔐 select 타입 유효성 검사 정리

`form[].type === "select"` 또는 `filters[].type === "select"`인 경우,  
다음과 같은 고급 유효성 검사 및 사용자 제어 기능이 가능합니다.

---

### ✅ allowedValues

> 사용자가 선택 가능한 **값을 제한**합니다.  
> API에서 불안정한 데이터를 받아오는 경우,  
> or DB enum과 정합성을 맞추고 싶은 경우 매우 유용합니다.

```json
{
  "name": "status",
  "label": "상태",
  "type": "select",
  "options": {
    "source": "api",
    "url": "/api/statuses",
    "labelKey": "label",
    "valueKey": "code"
  },
  "validation": {
    "allowedValues": ["active", "inactive", "soldout"],
    "message": "유효하지 않은 상태입니다."
  }
}
```

- 값이 allowedValues 배열에 없으면 유효성 실패
- 추후 DB enum 대응 시에도 일관된 값 유지 가능

---

### ✅ defaultValue

> 최초 렌더링 시 선택되어 있어야 할 기본값을 지정합니다.  
> 예를 들어 `"전체"`나 `"active"` 등의 초기값이 필요한 경우 사용합니다.

```json
{
  "name": "category",
  "label": "카테고리",
  "type": "select",
  "defaultValue": "전체",
  "options": {
    "source": "static",
    "data": ["전체", "전자", "의류"]
  }
}
```

---

### ✅ readonlyOptions

> 관리자에 의해 고정된 옵션 목록을 UI에 표시합니다.  
> 사용자 선택은 허용하지 않고 값만 보여주고 싶을 때 사용합니다.

```json
{
  "name": "systemCode",
  "label": "시스템 코드",
  "type": "select",
  "readonlyOptions": true,
  "options": {
    "source": "static",
    "data": ["ADMIN", "USER", "GUEST"]
  }
}
```

- UI에서는 `<select disabled>` 혹은 `<input readonly value="ADMIN" />` 형식으로 출력

---

## ✅ 기대 효과

| 기능              | 효과                                       |
| ----------------- | ------------------------------------------ |
| `allowedValues`   | 서버에서 보내준 옵션 외 유효성 강화 가능   |
| `defaultValue`    | 사용자 경험 향상, 초기 필터링 UX 강화      |
| `readonlyOptions` | 권한에 따른 고정 출력, 관리 설정 대응 가능 |

---

이 확장들을 통해 `meta.json`은  
단순한 UI 구조를 넘어서, **입력 유효성 + 정책 표현 + UX 설정까지 모두 커버하는 DSL**이 됩니다.
