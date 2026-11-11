import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // مسیر پایه برای GitHub Pages (نام مخزن)
  base: '/paris-gallery-jewels/',
  
  tanstackStart: {
    server: { entry: "server" },
    // فعال‌سازی تولید HTML استاتیک
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
    },
  },
  // غیرفعال کردن Nitro برای بیلد استاتیک
  nitro: false,
});
