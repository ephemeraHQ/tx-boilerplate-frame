import { NextRequest, NextResponse } from "next/server";

// Where we redirect the data in the last button for post_redirect
export async function POST(_: NextRequest): Promise<Response> {
  // Await data if needed; e.g. if there are multiple buttons that redirect to different places
  const headers = new Headers();
  headers.set("Location", `${process.env.NEXT_PUBLIC_BASE_URL}/`);
  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/transactionFrames`,
    {
      headers,
      status: 302,
    }
  );
  return response;
}
