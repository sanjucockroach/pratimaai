import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: ["/", "/services", "/work", "/about", "/contact", "/blog", "/admin"],
} satisfies Config;
