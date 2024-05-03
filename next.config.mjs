/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/transactionFrames",
        destination: "https://www.xmtp.org/docs/tutorials/transaction-frames",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
