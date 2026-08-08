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
      // The resume used to live at /resume.pdf. Anyone who saved or shared
      // that link (recruiters, submitted applications) still lands on the
      // current file. Temporary so a future rename isn't fighting a cached
      // permanent redirect.
      {
        source: "/resume.pdf",
        destination: "/Hitaansh_Jain_Resume.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
