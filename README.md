# 🚀 dopamine-dash

**Meta 기반 + AI 지원 자동화 대시보드 프로젝트 생성기**

`dopamine-dash`는 단 하나의 meta.json 파일로  
필터, 리스트, 폼, 버튼까지 자동 생성되는 대시보드를  
AI의 도움까지 받아 빠르게 구성할 수 있는 CLI 툴입니다.

---

## ✨ 주요 기능

- 🔧 `meta/*.json` 기반 CRUD 화면 자동 생성
- 🤖 `meta.aiPrompt`로 AI가 컴포넌트 코드 생성
- ⚙️ 코드 생성 스크립트 자동 실행
- 📦 Next.js + Tailwind 기반 템플릿 포함
- 🧠 유효성 검사 자동 반영 (`yup`, `react-hook-form`)
- 🧩 확장 가능한 폴더 구조 (features/shared/core)

---

## ⚡ 설치 & 실행

```bash
npx create-dopamine-dash my-dashboard
cd my-dashboard
npm run dev
```

### 📁 meta 샘플

```json
{
  "type": "crud",
  "name": "products",
  "title": "상품 관리",
  "path": "/products",
  "form": [ ... ],
  "columns": [ ... ],
  "filters": [ ... ],
  "aiPrompt": "상품 목록을 조회하고 추가, 수정할 수 있는 화면입니다."
}
```

### 🛠 스크립트 실행 예시

```bash
npm run generate:crud meta/products.meta.json
```

→ 페이지, 폼, 테이블, 훅이 자동 생성됩니다.

### 💬 기술 스택

- Next.js 14 (App Router)

- TypeScript + TailwindCSS

- react-hook-form + yup

- OpenAI API (선택적)

### 🙌 만든 사람

- Author: @HK1211

- CLI 패키지: create-dopamine-dash
