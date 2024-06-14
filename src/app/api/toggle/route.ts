import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

export const networkToggle: { chainId: number, network: string }[] = [
    { "chainId": 1, "network": "Ethereum Mainnet" },
    { "chainId": 11155111, "network": "Sepolia Testnet" },
    { "chainId": 10, "network": "Optimism Mainnet" },
    { "chainId": 42161, "network": "Arbitrum One Mainnet" },
    { "chainId": 56, "network": "Binance Smart Chain Mainnet" },
    { "chainId": 97, "network": "Binance Smart Chain Testnet" },
    { "chainId": 137, "network": "Polygon Mainnet" },
    { "chainId": 80002, "network": "Amoy Testnet" },
    { "chainId": 43114, "network": "Avalanche Mainnet" },
    { "chainId": 43113, "network": "Avalanche Fuji Testnet" },
    { "chainId": 250, "network": "Fantom Opera Mainnet" },
    { "chainId": 4002, "network": "Fantom Testnet" },
    { "chainId": 8453, "network": "Base" },
    { "chainId": 7777777, "network": "Zora" }
];

function toggleNetwork(networkIndex: number) {
    networkIndex = (networkIndex + 1) % networkToggle.length;
    return networkToggle[networkIndex];
}


async function getResponse(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const network = Number(searchParams.get("network"));
    const networkIndex = networkToggle.findIndex(mapping => mapping.chainId === network)
    const currentNetwork = toggleNetwork(networkIndex);

    const frameMetadata = getFrameHtmlResponse({
        accepts: { xmtp: "2024-02-09", lens: "1.0.0" },
        isOpenFrame: true,
        buttons: [
            {
                label: "Toggle Network",
                action: "post_redirect",
                target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/toggle`,
            },
            {
                label: "Submit transaction",
                action: "tx",
                target: `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction?network=${currentNetwork.chainId}`,
                postUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction-success`,
            },
        ],
        state: { network: currentNetwork.chainId.toString() },
        image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?network=${currentNetwork.chainId}`,
    });
    return new NextResponse(frameMetadata);
}
export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}
