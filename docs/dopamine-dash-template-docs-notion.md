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
