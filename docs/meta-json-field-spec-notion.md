# 📘 meta.json 필드 상세 설명서

---

## 🧱 기본 구조

```json
{
  "type": "crud",
  "name": "products",
  "title": "상품 관리",
  "path": "/products",
  "description": "...",
  "api": { ... },
  "filters": [ ... ],
  "columns": [ ... ],
  "form": [ ... ],
  "buttons": { "top": [...], "bottom": [...] },
  "edit": { "fetchDetail": true },
  "delete": { "confirm": true, ... },
  "mock": { "enabled": true, "rows": 5, ... },
  "aiPrompt": "..."
}
```

---

## 🔹 공통 메타 정보

| 필드 | 설명 |
|------|------|
| `type` | 화면 유형. 보통 `"crud"` |
| `name` | 이 화면의 키. 디렉토리, 함수명 등에 사용됨 |
| `title` | 페이지 제목 및 헤더에 표시될 이름 |
| `path` | Next.js 라우트 경로 |
| `description` | 이 화면에 대한 설명 (문서/Agent용) |

---

## 🔹 api

```json
"api": {
  "baseUrl": "/api/products",
  "methods": {
    "get": "GET",
    "post": "POST",
    "put": "PUT",
    "delete": "DELETE"
  }
}
```

- CRUD API가 자동 생성됨
- `baseUrl` 기준으로 `/route.ts` 파일 생성됨

---

## 🔹 filters

```json
"filters": [
  {
    "name": "category",
    "label": "카테고리",
    "type": "select",
    "options": {
      "source": "static", // or "api"
      "data": ["전자", "의류"]
    }
  }
]
```

| 필드 | 설명 |
|------|------|
| `type` | `"text"` / `"select"` 등 |
| `options.source` | `"static"` 또는 `"api"` |
| `options.url` | `"api/brands"` (source가 api일 경우 필수) |
| `label` | UI에 표시할 이름 |

---

## 🔹 form

```json
"form": [
  {
    "name": "price",
    "type": "number",
    "label": "가격",
    "required": true,
    "validation": {
      "min": 0,
      "max": 100000
    }
  }
]
```

| 필드 | 설명 |
|------|------|
| `type` | `"text"`, `"number"`, `"select"`, `"textarea"` |
| `required` | 필수 여부 (true/false) |
| `validation.min`, `.max` | 숫자형일 경우 허용 범위 |
| `validation.minLength`, `.pattern` | 문자열일 경우 검증 규칙 |
| `options.source` | selectbox의 옵션을 API에서 받아오는 경우 `"api"` 지정 |

---

## 🔹 columns

```json
"columns": [
  { "name": "name", "label": "상품명" },
  {
    "name": "status",
    "label": "상태",
    "cell": {
      "type": "badge",
      "map": {
        "active": "green",
        "inactive": "gray"
      }
    }
  }
]
```

- 테이블에 표시할 컬럼 목록
- `cell.type`을 통해 badge, 버튼 등 custom 렌더링 가능

---

## 🔹 buttons

```json
"buttons": {
  "top": ["add", "delete"],
  "bottom": ["save", "cancel"]
}
```

- 각 위치에 버튼 정의 가능
- 자동으로 상단/하단에 버튼 그룹 렌더링됨

---

## 🔹 edit

```json
"edit": {
  "fetchDetail": true
}
```

- 수정 버튼 클릭 시 상세 조회 API 호출 여부
- `false`인 경우 row.original만으로 수정 가능

---

## 🔹 delete

```json
"delete": {
  "confirm": true,
  "message": "정말 삭제하시겠습니까?",
  "onSuccess": "toast.success('삭제 완료')"
}
```

- 삭제 전 confirm 여부
- toast 메시지도 제어 가능

---

## 🔹 mock

```json
"mock": {
  "enabled": true,
  "rows": 10,
  "delay": 500,
  "source": "faker"
}
```

- mock 데이터 생성 여부
- rows: 개수
- delay: 응답 지연 시간
- source: "faker" 또는 "static"

---

## 🔹 aiPrompt

```json
"aiPrompt": "이 화면은 상품을 관리하는 CRUD 대시보드입니다..."
```

- AI Agent에게 이 페이지의 목적을 설명하기 위한 문맥 정보
- 문서 생성, 자동 설명, 테스트, i18n 키 추출 등에 활용 가능

---

✅ 이 구조를 기반으로 dopamine-dash는 전체 UI + 상태 + API + 문서 + 테스트까지 자동화됩니다.