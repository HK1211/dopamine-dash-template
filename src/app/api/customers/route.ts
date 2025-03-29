import { NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker/locale/ko';
import { MockApiHandler } from '../../../lib/mock/api-handler';

export interface Customers {
  id: string;
  name: string;
  phone: string;
  email: string;
  customerType: string;
  grade: string;
  address: string;
  memo: string;
}

// 모의 데이터 생성 함수
function getCustomers(count = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    customerType: faker.helpers.arrayElement(["개인","기업","공공기관"]),
    grade: faker.helpers.arrayElement(["VIP","Gold","Silver","Bronze"]),
    address: faker.location.streetAddress(),
    memo: faker.lorem.sentence(),
  }));
}

// API 핸들러 인스턴스 생성
const apiHandler = new MockApiHandler<Customers>({
  entityName: 'customers',
  getMockData: getCustomers,
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
    const items = getCustomers(count);
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
