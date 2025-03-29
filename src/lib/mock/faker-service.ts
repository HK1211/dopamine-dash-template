import { faker } from "@faker-js/faker/locale/ko";

export interface MockConfig {
  enabled: boolean;
  rows: number;
  delay: number;
  source: "faker";
  settings?: {
    categories?: string[];
    statusProbability?: Record<string, number>;
    priceRange?: { min: number; max: number };
    pagination?: { defaultSize: number; maxSize: number };
    seed?: number;
    [key: string]: any;
  };
}

export interface Products {
  id: string;
  name: string;
  price: number;
  category: string;
  status: "active" | "inactive" | "soldout";
  brand?: string;
}

// 모든 제품의 캐시 (고정 데이터)
let productsCache: Products[] = [];

// 브랜드 캐시
let brandsCache: { id: string; name: string }[] = [];

// 브랜드 데이터 생성 함수
const generateBrands = (config: MockConfig): { id: string; name: string }[] => {
  if (brandsCache.length === 0) {
    // 시드 설정
    if (config.settings?.seed) {
      faker.seed(config.settings.seed);
    }

    brandsCache = Array.from({ length: 10 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.company.name(),
    }));
  }
  return brandsCache;
};

// 랜덤 상태 선택 함수
const getRandomStatus = (config: MockConfig): "active" | "inactive" | "soldout" => {
  const statusProb = config.settings?.statusProbability;

  if (!statusProb) {
    return faker.helpers.arrayElement(["active", "inactive", "soldout"]);
  }

  // 가중치 기반으로 랜덤 상태 선택
  const rand = Math.random();
  let cumulativeProbability = 0;

  for (const [status, probability] of Object.entries(statusProb)) {
    cumulativeProbability += probability;
    if (rand <= cumulativeProbability) {
      return status as "active" | "inactive" | "soldout";
    }
  }

  return "active"; // 기본값
};

export const mockService = {
  getProducts: (config: MockConfig, filters?: Record<string, string>): Products[] => {
    if (!config.enabled) return [];

    // 시드 설정
    if (config.settings?.seed) {
      faker.seed(config.settings.seed);
    }

    // 캐시가 비어있으면 데이터 생성
    if (productsCache.length === 0) {
      const brands = generateBrands(config);
      const categories = config.settings?.categories || ["전자", "의류", "식품"];
      const priceRange = config.settings?.priceRange || { min: 1000, max: 100000 };

      productsCache = Array.from({ length: 20 }).map(() => {
        const randomBrandIndex = Math.floor(Math.random() * Math.min(5, brands.length));
        return {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price({ min: priceRange.min, max: priceRange.max })),
          category: faker.helpers.arrayElement(categories),
          status: getRandomStatus(config),
          brand: randomBrandIndex < brands.length ? brands[randomBrandIndex].name : faker.company.name(),
        };
      });
    }

    // 필터링
    let result = [...productsCache];

    if (filters) {
      if (filters.category && filters.category !== "") {
        result = result.filter((item) => item.category === filters.category);
      }

      if (filters.name && filters.name !== "") {
        result = result.filter((item) => item.name.toLowerCase().includes(filters.name!.toLowerCase()));
      }

      if (filters.brand && filters.brand !== "") {
        result = result.filter((item) => item.brand?.toLowerCase().includes(filters.brand!.toLowerCase()));
      }

      // 상태 필터
      if (filters.status && filters.status !== "") {
        result = result.filter((item) => item.status === filters.status);
      }
    }

    // 페이지네이션 처리
    const pagination = config.settings?.pagination;
    const pageSize = pagination ? parseInt(filters?.pageSize || "") || pagination.defaultSize : config.rows;
    const page = parseInt(filters?.page || "1") || 1;
    const start = (page - 1) * pageSize;

    return result.slice(start, start + pageSize);
  },

  getBrands: (config: MockConfig): { id: string; name: string }[] => {
    if (!config.enabled) return [];
    return generateBrands(config);
  },

  getUsers: (config: MockConfig, filters?: Record<string, string>): any[] => {
    if (!config.enabled) return [];

    // 캐시가 비어있으면 데이터 생성
    let cacheKey = "usersCache";
    let cache = (global as any)[cacheKey] || [];

    if (cache.length === 0) {
      // 시드 설정
      if (config.settings?.seed) {
        faker.seed(config.settings.seed);
      }

      const roles = config.settings?.roles || ["admin", "user", "guest"];

      cache = Array.from({ length: 20 }).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(roles),
        status: faker.helpers.arrayElement(["active", "inactive", "pending"]),
      }));

      // 캐시 저장
      (global as any)[cacheKey] = cache;
    }

    // 필터링
    let result = [...cache];

    if (filters) {
      // 각 필터 적용
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "" && key !== "page" && key !== "pageSize") {
          result = result.filter((item) => {
            const itemValue = String(item[key] || "").toLowerCase();
            return itemValue.includes(String(value).toLowerCase());
          });
        }
      });
    }

    // 페이지네이션 처리
    const pagination = config.settings?.pagination;
    const pageSize = pagination ? parseInt(filters?.pageSize || "") || pagination.defaultSize : config.rows;
    const page = parseInt(filters?.page || "1") || 1;
    const start = (page - 1) * pageSize;

    return result.slice(start, start + pageSize);
  },

  getCustomers: (config: MockConfig, filters?: Record<string, string>): any[] => {
    if (!config.enabled) return [];

    // 캐시가 비어있으면 데이터 생성
    let cacheKey = "customersCache";
    let cache = (global as any)[cacheKey] || [];

    if (cache.length === 0) {
      // 시드 설정
      if (config.settings?.seed) {
        faker.seed(config.settings.seed);
      }

      const customerTypes = config.settings?.customerTypes || ["개인", "기업", "공공기관"];
      const grades = config.settings?.grades || ["VIP", "Gold", "Silver", "Bronze"];

      cache = Array.from({ length: 20 }).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        customerType: faker.helpers.arrayElement(customerTypes),
        grade: faker.helpers.arrayElement(grades),
        address: faker.location.streetAddress(),
        memo: faker.lorem.sentence(),
      }));

      // 캐시 저장
      (global as any)[cacheKey] = cache;
    }

    // 필터링
    let result = [...cache];

    if (filters) {
      // 각 필터 적용
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "" && key !== "page" && key !== "pageSize") {
          result = result.filter((item) => {
            const itemValue = String(item[key] || "").toLowerCase();
            return itemValue.includes(String(value).toLowerCase());
          });
        }
      });
    }

    // 페이지네이션 처리
    const pagination = config.settings?.pagination;
    const pageSize = pagination ? parseInt(filters?.pageSize || "") || pagination.defaultSize : config.rows;
    const page = parseInt(filters?.page || "1") || 1;
    const start = (page - 1) * pageSize;

    return result.slice(start, start + pageSize);
  },
};

export const mockDataWithDelay = async <T>(dataFn: () => T, config: MockConfig): Promise<T> => {
  if (config.delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, config.delay));
  }
  return dataFn();
};
