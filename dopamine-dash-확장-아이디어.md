# 📌 dopamine-dash 확장을 위한 아이디어 모음

## 1. 🧠 meta.json 설계 개선 아이디어

- `filter.type` 확장 → `number`, `date`, `daterange` 등 추가  
- `sortable`, `searchable` 속성 지원 → 테이블 정렬/검색 활성화
```json
{
  "name": "price",
  "sortable": true
}
```

- `searchable`: 검색 가능한 필드 지정
```json
{
  "searchable": ["name", "brand"]
}
```

- 초기값 처리 강화: `defaultValue`, 날짜 포맷 등 타입별 초기값 포맷팅
- 조건부 필드 렌더링(`conditionalFields`)
```json
{
  "if": { "field": "status", "equals": "soldout" },
  "show": ["reason"]
}
```

- `formLayout`, `formGroups` 등 UI 배치 구조 지원
- `permissions`: ABAC 적용 위한 필드 (권한 기반 제어)
```json
"permissions": {
  "view": ["admin", "manager"],
  "edit": ["admin"]
}
```

---

## 2. ⚙️ 기능 자동화 및 UX 개선

- ✅ Dialog 애니메이션 → `framer-motion` 사용
- ✅ 테이블 Pagination + Sorting 자동화
- ✅ `react-query` → `onSuccess`, `onError` 활용한 자동 toast 처리
- ✅ 상세 페이지 자동 생성  
  `/products/[id]/page.tsx`, meta에 `"detailView": true` 옵션 추가
- ✅ 사용자 정의 액션 버튼 처리
```json
"actions": [
  { "label": "승인", "onClick": "approveItem", "color": "blue" }
]
```

- ✅ Postman 스크립트 자동 생성
- ✅ Form 필드 reset 처리 개선 (select 초기화 등)

---

## 3. 🚀 AI + 코드 자동화 확장 방향

- `aiPrompt`를 단순 텍스트 → 구조화된 설명 형태로 확장
```json
"aiPrompt": {
  "summary": "상품 관리 화면입니다.",
  "fields": {
    "price": "숫자 필드, 0 이상",
    "status": "판매 상태, enum"
  }
}
```

- meta → `prisma.schema`, `Spring Entity`, `Zod Schema` 등 코드 자동 생성기
- AI MCP(메타 중심 프로그래밍)로 진화 가능한 구조 → Meta-First Development
- Meta 기반 생성 코드의 AI 리뷰 + 승인 워크플로우 (GitHub Actions, CI 연동)

---

## 🔮 앞으로 할 수 있는 확장 방향

1. 조회 전용 `generate-api` 도구
2. meta.json 생성 UI (GUI 기반 Editor)
3. GitHub Actions로 CRUD/코드 자동 publish
4. 플러그인 시스템 설계 → 필드 타입 추가, 테마 시스템
5. 팀/에이전트 기반 코드 리뷰 및 승인 프로세스(AI 자동 리뷰 포함)
