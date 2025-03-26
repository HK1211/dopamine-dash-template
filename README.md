# temp

1. `root/`: root에는 지금 하는것 처럼 프로젝트 기초가 되는 리소스와, 그리고 전역에서 다뤄지는 리소스, 그리고 도메인에 사용될 업무단위의 비즈니스용 리소스를 구분해서 최소한으로만 구성하는게 내 취향이야. 예를들면:

```tree
my-dashboard/
├── node_modules/
├── public/
├── src/
│   └── app/
│   └── core/
│   └── features/
│   └── shared/
├── .env
├── .gitignore
├── next.config.ts

├── README.md
├── package-lock.json
├── package.json
└── tsconfig.json
```

core: 대시보드 기본 구성 리소스

```tree
core/
  config/

```

shared: 프로젝트별 공통 리소스

```tree
shared/                     # 비즈니스와 관계된 재사용 될 수 있는 리소스 입니다.
  apis/
    rtk-query/
  constants/                # 정적 원시 값 모음
  data/                     # 정적 Object(js, json등) 모음
  ui/
    atoms/
    molecules/
    organisms/
    templates/
    pages/
    components/
  utils/
    number/
    string/
    navigate/
    location/
    date/
  helfers/                   # 정적인 Object를 반환하는 함수 모음
  stores/
    react-context/
    zustand/
    redux/
      features/
        login/
          action.ts
          action-type.ts
          slice.ts
          slice-type.ts
        register/
      reducers/
        index.ts
      index.ts
  hooks/
```

features: 프로젝트별 각 리소스(shared 하위 모듈들과 동일한 구조사용 가능)

```tree
features:
  project1/
    apis/
    rtk-query/
    constants/                # 정적 원시 값 모음
    data/                     # 정적 Object(js, json등) 모음
    ui/
      atoms/
      molecules/
      organisms/
      templates/
      pages/
      components/
    utils/
      number/
      string/
      navigate/
      location/
      date/
    helfers/                   # 정적인 Object를 반환하는 함수 모음
    stores/
      react-context/
      zustand/
      redux/
        features/
          login/
            action.ts
            action-type.ts
            slice.ts
            slice-type.ts
          register/
        reducers/
          index.ts
        index.ts
    hooks/
  project2/
    (...)
```
