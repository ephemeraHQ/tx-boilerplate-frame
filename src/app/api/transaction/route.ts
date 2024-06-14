import { NextRequest, NextResponse } from "next/server";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const { searchParams } = new URL(req.url);
  const network = Boolean(searchParams.get("network"));


  const txData: FrameTransactionResponse = {
    chainId: `eip155:${network}`,
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
