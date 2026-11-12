import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // 👇 تنظیم base باید داخل آبجکت vite باشد
  vite: {
    base: '/paris-gallery-jewels/',
  },
  
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: false,
      pages: [
        { path: '/' },
        { path: '/shop' },
      ],
    },
  },
  nitro: false,
});
