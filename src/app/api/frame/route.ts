import { NextRequest, NextResponse } from "next/server";

// Where we get the info for which frame to render (beyond the first frame)
async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const id: any = searchParams.get("id");
  const idAsNumber = Number(id);

  const nextId = idAsNumber + 1;

  // If id is 1, complete the transaction
  if (idAsNumber === 1) {
    return new NextResponse(
      `<!DOCTYPE html><html><head><title>This is frame 2</title><meta property="of:accepts:xmtp" content="2023-02-09"/><meta property="fc:frame" content="vNext"/><meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/og?transaction=0.25"/><meta property="fc:frame:button:1" content="Learn more about transaction frames"/><meta property="fc:frame:button:1:action" content="post_redirect"/><meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/end"/></head></html>`
    );
  } else {
    // Default response; just reiterates starting frame
    return new NextResponse(
      `<!DOCTYPE html><html><head><title>This is frame ${id}</title><meta property="fc:frame" content="vNext"/><meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/og?transaction=null"/><meta property="fc:frame:button:1" content="Make transaction???"/><meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${nextId}"</head></html>`
    );
  }
}
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
