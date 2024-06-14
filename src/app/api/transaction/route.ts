import { NextRequest, NextResponse } from "next/server";
import { parseEther } from "viem";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { getXmtpFrameMessage } from "@coinbase/onchainkit/xmtp";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body = await req.json();
  const { isValid } = await getXmtpFrameMessage(body);
  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const txData: FrameTransactionResponse = {
    // Sepolia
    chainId: `eip155:11155111`,
    method: "eth_sendTransaction",
    params: {
      abi: [],
      to: "0x0000000000000000000000000000000000000000",
      value: "0"
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
