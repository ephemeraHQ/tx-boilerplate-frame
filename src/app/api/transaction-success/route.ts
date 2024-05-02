import { confirmationFrameHtml } from "@/app/page";
import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";
import { NextRequest, NextResponse } from "next/server";

// TX successful response frame with redirect to docs
async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { isValid } = await getXmtpFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(confirmationFrameHtml);
}
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
