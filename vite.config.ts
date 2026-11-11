import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // این خط باعث می‌شود خروجی به صورت SPA و استاتیک باشد
    spa: { enabled: true },
  },
  // غیرفعال کردن Nitro برای بیلد استاتیک
  nitro: false,
});
