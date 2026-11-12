import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: '/paris-gallery-jewels/',
  
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      autoStaticPathsDiscovery: true,
      // این خط را به false تغییر دهید
      crawlLinks: false, 
      // صفحات اصلی را دستی معرفی کنید (فقط مسیرهایی که مطمئنید وجود دارند)
      pages: [
        { path: '/' },
        { path: '/shop' },
        // اگر مطمئنید صفحه about وجود دارد، آن را از کامنت خارج کنید
        // { path: '/about' }, 
      ],
    },
  },
  nitro: false,
});
