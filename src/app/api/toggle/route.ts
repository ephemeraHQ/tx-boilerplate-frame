import { networkToggle } from "@/utils/networkToggle";
import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

function toggleNetwork(networkIndex: number) {
    const newNetworkIndex = (networkIndex + 1) % networkToggle.length;
    return networkToggle[newNetworkIndex];
}


async function getResponse(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const network = Number(searchParams.get("network"));
    const networkIndex = networkToggle.findIndex(mapping => mapping.chainId === network)
    const currentChainId = networkToggle.at(networkIndex)?.chainId
    console.log(`Current chainID ${currentChainId}`)
    const newNetwork = toggleNetwork(networkIndex);
    console.log(`New network ${newNetwork.chainId}`)

    const frameMetadata = getFrameHtmlResponse({
        accepts: { xmtp: "2024-02-09", lens: "1.0.0" },
        isOpenFrame: true,
        buttons: [
            {
                label: "Toggle Network",
                action: "post",
                target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/toggle?network=${newNetwork.chainId}`,
            },
            {
                label: "Submit transaction",
                action: "tx",
                target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction?network=${currentChainId}`,
                postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction-success`,
            },
        ],
        state: { network: newNetwork.chainId.toString() },
        image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?network=${currentChainId}`,
    });
    return new NextResponse(frameMetadata);
}
export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
