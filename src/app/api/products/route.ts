import { NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker/locale/ko';
import { MockApiHandler } from '../../../lib/mock/api-handler';

export interface Products {
  id: string;
  name: string;
  price: number;
  category: string;
  status: string;
  description: string;
  brand: string;
}

// 모의 데이터 생성 함수
function getProducts(count = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price({ min: 1000, max: 100000 })),
    category: faker.helpers.arrayElement(["전자","의류","식품","가구","도서"]),
    status: faker.helpers.arrayElement(["active","inactive","soldout"]),
    description: faker.lorem.sentence(),
    brand: faker.lorem.word(),
  }));
}

// API 핸들러 인스턴스 생성
const apiHandler = new MockApiHandler<Products>({
  entityName: 'products',
  getMockData: getProducts,
  searchFields: ['id', 'name'], // 검색 가능 필드 (필요에 따라 수정)
});

// GET 요청 처리
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  
  // UI 컴포넌트에서 사용하기 위한 처리
  // format 또는 ui 파라미터가 있으면 간단한 배열 형태로 반환
  // 브랜드 목록과 같은 참조 데이터에 유용함
  if (url.searchParams.has('format') || url.searchParams.has('ui')) {
    const count = parseInt(url.searchParams.get('count') || '20');
    const items = getProducts(count);
    return NextResponse.json(items);
  }
  
  // 기본 페이지네이션 형태 응답
  return apiHandler.handleGet(req);
}

// POST 요청 처리
export async function POST(req: NextRequest) {
  return apiHandler.handlePost(req);
}

// PUT 요청 처리
export async function PUT(req: NextRequest) {
  return apiHandler.handlePut(req);
}

// DELETE 요청 처리
export async function DELETE(req: NextRequest) {
  return apiHandler.handleDelete(req);
}
