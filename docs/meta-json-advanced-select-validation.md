# 📌 meta.json의 select 필드 고급 validation 및 확장 기능

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

| 기능 | 효과 |
|------|------|
| `allowedValues` | 서버에서 보내준 옵션 외 유효성 강화 가능 |
| `defaultValue` | 사용자 경험 향상, 초기 필터링 UX 강화 |
| `readonlyOptions` | 권한에 따른 고정 출력, 관리 설정 대응 가능 |

---

이 확장들을 통해 `meta.json`은  
단순한 UI 구조를 넘어서, **입력 유효성 + 정책 표현 + UX 설정까지 모두 커버하는 DSL**이 됩니다.