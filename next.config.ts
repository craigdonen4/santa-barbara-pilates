import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zcyqhmsggjlqlhoygyll.supabase.co",
      },
    ],
  },
};

export default config;
