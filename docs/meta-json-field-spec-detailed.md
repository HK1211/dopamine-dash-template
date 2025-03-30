# 📘 meta.json 필드 상세 설명서 (실용적인 예시 중심)

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

| 필드 | 필수 | 설명 |
|------|------|------|
| `name` | ✅ | 상태/쿼리 키 이름 (state, querystring 등에 사용됨) |
| `label` | ✅ | 필터 영역에 표시할 라벨 |
| `type` | ✅ | `"text"` 또는 `"select"` |
| `options` | ⛔ (`type === 'select'`일 때만 필수) | select 옵션 구성 |

### ✅ `type` 값과 동적 필드 구성

| type | 설명 | 필수 하위 필드 |
|------|------|----------------|
| `"text"` | 일반 텍스트 입력 필터 | 없음 |
| `"select"` | 드롭다운 필터 | `options.source` 및 `options.data` 또는 `options.url` |

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

### ✅ 공통 속성

| 필드 | 필수 | 설명 |
|------|------|------|
| `name` | ✅ | 상태/전송 키 이름 |
| `label` | ✅ | 폼에 표시할 제목 |
| `type` | ✅ | `"text"`, `"number"`, `"textarea"`, `"select"` 등 |
| `required` | ⛔ | 필수 여부 (기본값: true) |
| `validation` | ⛔ | 필드 타입에 따라 동적 validation 설정 |
| `options` | ⛔ (`type === 'select'`일 때만 필수) | select 구성 옵션

### ✅ type별 지원 값 및 조건

| type | 컴포넌트 | 필수 하위 필드 |
|------|----------|----------------|
| `"text"` | `<input type="text" />` | 없음 |
| `"number"` | `<input type="number" />` | 없음 |
| `"textarea"` | `<textarea />` | 없음 |
| `"select"` | `<select>` | `options.source`, `options.data` or `options.url` |

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