import { mockService, mockDataWithDelay } from "@/src/lib/mock";
import productsMetadata from "@/meta/products.meta.json";
import { getMockConfig } from "@/src/lib/mock";

const mockConfig = getMockConfig(productsMetadata);


export async function GET(req: Request) {
  if (mockConfig.enabled) {
    const mockData = await mockDataWithDelay(() => mockService.getProducts(mockConfig), mockConfig);
    return Response.json(mockData);
  }
  return Response.json([]);
}


export async function POST(req: Request) {
  const body = await req.json();
  if (mockConfig.enabled) {
    await mockDataWithDelay(() => {}, mockConfig);
    return Response.json({ ok: true, data: { ...body, id: crypto.randomUUID() } });
  }
  return Response.json({ ok: true, data: body });
}


export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Allow": "GET, POST, OPTIONS"
    }
  });
}