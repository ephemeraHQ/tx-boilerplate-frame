import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

const confirmationFrameHtml = getFrameHtmlResponse({
  accepts: {
    xmtp: "2024-02-09",
    lens: "1.0.0",
  },
  isOpenFrame: true,
  buttons: [
    {
      action: "post_redirect",
      label: "Learn more about transaction frames",
    },
  ],
  postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/end`,
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?transaction=true`,
});

async function getResponse(req: NextRequest): Promise<NextResponse> {
  return new NextResponse(confirmationFrameHtml);
}
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
