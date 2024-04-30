import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { NextRequest, NextResponse } from "next/server";

// TX successful response frame with redirect to docs
async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { isValid } = await getXmtpFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(
    `<!DOCTYPE html><html><head><title>Transaction Success</title><meta property="of:accepts:xmtp" content="2024-02-09"/><meta property="fc:frame" content="vNext"/><meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/og?transaction=0.0000032"/><meta property="fc:frame:button:1" content="Learn more about transaction frames"/><meta property="fc:frame:button:1:action" content="post_redirect"/><meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/end"/></head></html>`
  );
}
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
