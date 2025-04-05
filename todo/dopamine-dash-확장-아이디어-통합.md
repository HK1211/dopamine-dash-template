# 📌 dopamine-dash 확장을 위한 아이디어 모음

## 0. 💡 기본 개념

- DX/UX 고급 확장 아이디어 생성
- dopamine-dash-template 프로젝트를 AI MCP(메타 중심 프로그래밍)로 발전시키기

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
- Form에 필드별 초기 값 포맷팅 + reset 시점 개선 (날짜 포맷, enum 변환 등 유연한 defaultValues 처리)
- 조건부 필드 렌더링(`conditionalFields`)

```json
{
  "if": { "field": "status", "equals": "soldout" },
  "show": ["reason"]
}
```

- Form 내 동적 필드 (조건부 렌더링)

  - meta에 조건식 정의 (ex: status가 soldout이면 reason 필드 노출)
  - status가 soldout이면 reason 필드가 input이고, 아니라면 selectbox 노출
  - watch()와 조건부 렌더링 자동 적용

- `formLayout`, `formGroups` 등 UI 배치 구조 지원
- `permissions`: ABAC 적용 위한 필드 (권한 기반 제어)

```json
"permissions": {
  "view": ["admin", "manager"],
  "edit": ["admin"]
}
```

- 컬럼 정렬/검색 활성화 (useReactTable → enableSorting)
  - sortable: true 옵션을 meta에서 주면 정렬 허용

---

## 2. ⚙️ 기능 자동화 및 UX 개선

- Dialog 애니메이션 적용을 위해 `framer-motion` 사용 검토
- 테이블 Pagination + Sorting 자동화
- 조회 성공/에러/toast 피드백 자동화
  - `react-query`의 `onSuccess`, `onError`를 이용한 meta 기반 UX 피드백 구성
- 상세 페이지 자동 생성
  - `/products/[id]/page.tsx`
  - 수정이 아닌 별도의 상세 보기 페이지
  - mock or fetch로 단일 데이터 조회
  - meta에 `"detailView": true` 옵션 추가
- 사용자 정의 액션 버튼 처리
  - 버튼 렌더링 자동
  - approveItem(item) 자동 함수 생성
  - toast 또는 모달 트리거 등도 설정 가능

```json
"actions": [
  { "label": "승인", "onClick": "approveItem", "color": "blue" }
]
```

- Postman 스크립트 자동 생성
- Form 필드 reset 처리 개선 (select 초기화 등)
- 검색 기능 자동화 (SearchBar)
  - meta에 searchable: ["name", "brand"] 같은 필드 지정
  - Search input 추가
  - useDebounce 처리 + query param에 포함
- 국제화 (i18n) 연동
  - meta.title, label, messages 등을 key로 추출
  - i18n 자동 구조 생성 (예: t("product.name"))

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
  - meta → prisma.schema 자동 생성기
  - meta → Spring Boot Java 파일 자동 생성기
- AI MCP(메타 중심 프로그래밍)로 진화 가능한 구조 → Meta-First Development
- Meta 기반 생성 코드의 AI 리뷰 + 승인 워크플로우 (GitHub Actions, CI 연동)

---

## 4. 🔮 앞으로 할 수 있는 확장 방향

1. 조회 전용 `generate-api` 도구 (조회 전용 대시보드)
2. meta.json 생성 UI (GUI 기반 Editor, 노코드 느낌)
3. GitHub Actions로 CRUD/코드 자동 publish
4. 플러그인 시스템 설계 → 필드 타입 추가, 테마 시스템
5. 팀/에이전트 기반 코드 리뷰 및 승인 프로세스(AI 자동 리뷰 포함)
6. CRUD actions에 대한 ABAC 심화 적용
   - 실행 전 검증 로직 추가
   - 실행 후 로그 저장을 위한 방법 설계
