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
      to: "0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0",
      value: parseEther("0.0000032", "wei").toString(), // 0.0000032 ETH, ~1 cent
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
