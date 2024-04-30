import { ImageResponse } from "next/og";

// The dynamically generated frame image
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionParam = searchParams.has("transaction");
    const transaction = transactionParam
      ? Number(searchParams.get("transaction"))
      : null;

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="bg-gray-50 flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span>
                  {!transaction
                    ? "Try Open Frames Transactions"
                    : "Transaction Successful!"}
                </span>
                <span tw="text-indigo-600">
                  {transaction
                    ? `Your transaction of ${transaction} ETH is complete.`
                    : `Click to make a transaction (0.0000032 ETH).`}
                </span>
              </h2>
            </div>
          </div>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
