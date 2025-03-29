import { MockConfig } from "./faker-service";
import { extractMockConfig } from "./meta-utils";

// 기본 mock 설정
export const DEFAULT_MOCK_CONFIG: MockConfig = {
  enabled: true,
  rows: 5,
  delay: 500,
  source: "faker",
  settings: {
    pagination: {
      defaultSize: 5,
      maxSize: 20,
    },
  },
};

// meta 파일에서 mock 설정 가져오기
export const getMockConfig = (metadata: any): MockConfig => {
  if (!metadata?.mock) {
    return DEFAULT_MOCK_CONFIG;
  }

  return {
    enabled: metadata.mock.enabled ?? DEFAULT_MOCK_CONFIG.enabled,
    rows: metadata.mock.rows ?? DEFAULT_MOCK_CONFIG.rows,
    delay: metadata.mock.delay ?? DEFAULT_MOCK_CONFIG.delay,
    source: metadata.mock.source ?? DEFAULT_MOCK_CONFIG.source,
    settings: {
      ...DEFAULT_MOCK_CONFIG.settings,
      ...metadata.mock.settings,
    },
  };
};

// 모든 모듈 내보내기
export * from "./faker-service";
export * from "./meta-utils";
export * from "./api-handler";
