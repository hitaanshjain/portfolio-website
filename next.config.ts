import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Consolidate link previews and SEO on the custom domain. Requests that
    // still arrive on the vercel.app subdomain 308 to hitaansh.dev with the
    // path preserved.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "hitaanshjain.vercel.app" }],
        destination: "https://hitaansh.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
