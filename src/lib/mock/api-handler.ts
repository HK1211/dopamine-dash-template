import { NextRequest, NextResponse } from "next/server";

/**
 * Mock API 핸들러 옵션 인터페이스
 */
export interface MockApiHandlerOptions<T> {
  /** 엔티티 이름 (테이블/컬렉션 이름) */
  entityName: string;
  /** 모의 데이터 생성 함수 */
  getMockData: (count?: number) => T[];
  /** 검색 가능한 필드 목록 */
  searchFields?: string[];
  /** 정렬 가능한 필드 목록 */
  sortableFields?: string[];
  /** 지연 시간 (ms) */
  delay?: number;
  /** 기본 페이지 크기 */
  defaultPageSize?: number;
  /** 최대 페이지 크기 */
  maxPageSize?: number;
}

/**
 * API 응답 구조
 */
export interface ApiResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Mock API 핸들러 클래스
 * RESTful API 엔드포인트를 위한 CRUD 작업 처리
 */
export class MockApiHandler<T extends { id: string }> {
  private data: T[] = [];
  private options: MockApiHandlerOptions<T>;
  private entityName: string;
  private storageKey: string;

  constructor(options: MockApiHandlerOptions<T>) {
    this.options = {
      defaultPageSize: 10,
      maxPageSize: 100,
      delay: 500,
      searchFields: ["id", "name"],
      sortableFields: ["id", "name"],
      ...options,
    };

    this.entityName = options.entityName;
    this.storageKey = `mock_data_${this.entityName}`;

    // 초기 데이터 로드
    this.loadData();
  }

  /**
   * 데이터를 로드합니다 (localStorage 또는 초기 모의 데이터)
   */
  private loadData(): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const storedData = localStorage.getItem(this.storageKey);
        if (storedData) {
          this.data = JSON.parse(storedData);
          return;
        }
      }
    } catch (error) {
      console.error("Failed to load data from storage:", error);
    }

    // 초기 모의 데이터 생성
    this.data = this.options.getMockData(50);
    this.saveData();
  }

  /**
   * 데이터를 저장합니다 (localStorage)
   */
  private saveData(): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      }
    } catch (error) {
      console.error("Failed to save data to storage:", error);
    }
  }

  /**
   * 지연 시간을 설정합니다
   */
  private async delay(): Promise<void> {
    if (this.options.delay && this.options.delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.options.delay));
    }
  }

  /**
   * GET 요청 처리 (목록 또는 단일 항목)
   */
  public async handleGet(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    // ID가 지정된 경우 단일 항목 조회
    if (id && id !== this.entityName) {
      const item = this.data.find((item) => item.id === id);
      if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
      return NextResponse.json(item);
    }

    // 목록 조회 (필터링, 정렬, 페이징 적용)
    return this.handleList(url);
  }

  /**
   * 목록 조회 요청 처리
   */
  private handleList(url: URL): NextResponse {
    // 페이징 파라미터
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = Math.min(
      parseInt(url.searchParams.get("pageSize") || String(this.options.defaultPageSize)),
      this.options.maxPageSize || 100
    );

    // 검색 파라미터
    const search = url.searchParams.get("search") || "";
    const searchFields = this.options.searchFields || [];

    // 필터링 파라미터
    const filters: Record<string, string> = {};
    for (const [key, value] of url.searchParams.entries()) {
      if (!["page", "pageSize", "search", "sortBy", "sortOrder"].includes(key)) {
        filters[key] = value;
      }
    }

    // 정렬 파라미터
    const sortBy = url.searchParams.get("sortBy") || "id";
    const sortOrder = url.searchParams.get("sortOrder") || "asc";

    // 검색 및 필터링 적용
    let filteredData = [...this.data];

    // 검색어가 있으면 적용
    if (search && searchFields.length > 0) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter((item) => {
        return searchFields.some((field) => {
          const value = String((item as any)[field] || "").toLowerCase();
          return value.includes(searchLower);
        });
      });
    }

    // 필터가 있으면 적용
    if (Object.keys(filters).length > 0) {
      filteredData = filteredData.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          const itemValue = String((item as any)[key] || "");
          return itemValue === value;
        });
      });
    }

    // 정렬 적용
    filteredData.sort((a, b) => {
      const valueA = (a as any)[sortBy];
      const valueB = (b as any)[sortBy];

      if (valueA === valueB) return 0;

      const comparison = valueA < valueB ? -1 : 1;
      return sortOrder.toLowerCase() === "desc" ? -comparison : comparison;
    });

    // 페이징 적용
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // 응답 구성
    const response: ApiResponse<T> = {
      items: paginatedData,
      total: filteredData.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredData.length / pageSize),
    };

    return NextResponse.json(response);
  }

  /**
   * POST 요청 처리 (새 항목 생성)
   */
  public async handlePost(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    try {
      const newItem = await req.json();

      // ID가 없으면 생성
      if (!newItem.id) {
        newItem.id = crypto.randomUUID();
      }

      // 이미 존재하는 ID인지 확인
      if (this.data.some((item) => item.id === newItem.id)) {
        return NextResponse.json({ error: "Item with this ID already exists" }, { status: 409 });
      }

      // 데이터 추가
      this.data.push(newItem as T);
      this.saveData();

      return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to process request" }, { status: 400 });
    }
  }

  /**
   * PUT 요청 처리 (항목 수정)
   */
  public async handlePut(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    try {
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();
      const updateData = await req.json();

      // ID가 지정되지 않은 경우
      if (!id || id === this.entityName) {
        return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
      }

      // ID가 일치하는 항목 찾기
      const index = this.data.findIndex((item) => item.id === id);
      if (index === -1) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }

      // ID는 변경하지 않음
      updateData.id = id;

      // 데이터 업데이트
      this.data[index] = { ...this.data[index], ...updateData };
      this.saveData();

      return NextResponse.json(this.data[index]);
    } catch (error) {
      return NextResponse.json({ error: "Failed to process request" }, { status: 400 });
    }
  }

  /**
   * DELETE 요청 처리 (항목 삭제)
   */
  public async handleDelete(req: NextRequest): Promise<NextResponse> {
    await this.delay();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    // ID가 지정되지 않은 경우
    if (!id || id === this.entityName) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    // ID가 일치하는 항목 찾기
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // 데이터 삭제
    this.data.splice(index, 1);
    this.saveData();

    return NextResponse.json({ success: true });
  }
}
