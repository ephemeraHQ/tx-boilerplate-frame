import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  accepts: { xmtp: "2024-02-09" },
  isOpenFrame: true,
  buttons: [{ label: "Make transaction" }],
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?transaction=null`,
  post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
});

export const metadata: Metadata = {
  title: "Transaction Frame",
  description: "A frame to demonstrate transactions",
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return (
    <>
      <h1>Transaction Frame</h1>
    </>
  );
}
