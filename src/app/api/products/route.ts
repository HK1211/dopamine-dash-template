
export async function GET(req: Request) {
  return Response.json([]);
}


export async function POST(req: Request) {
  const body = await req.json();
  return Response.json({ ok: true, data: body });
}


export async function PUT(req: Request) {
  const body = await req.json();
  return Response.json({ ok: true, data: body });
}


export async function DELETE(req: Request) {
  return Response.json({ ok: true });
}
