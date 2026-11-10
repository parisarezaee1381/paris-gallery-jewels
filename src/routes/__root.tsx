import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { DirectionProvider } from "@radix-ui/react-direction";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { FavoritesSheet } from "@/components/layout/FavoritesSheet";
import { StatusMessage } from "@/components/feedback/StatusMessage";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { FavoritesProvider } from "@/hooks/use-favorites";
import { UiStateProvider } from "@/hooks/use-ui-state";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <StatusMessage
        title="این صفحه پیدا نشد"
        description="شاید آدرس تغییر کرده یا این قطعه دیگر در گالری نیست."
        action={
          <>
            <Button asChild>
              <Link to="/">بازگشت به خانه</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/shop">رفتن به فروشگاه</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <StatusMessage
        kind="error"
        title="این صفحه بارگذاری نشد"
        description="مشکلی پیش آمد. دوباره امتحان کنید یا به صفحه‌ی اصلی برگردید."
        action={
          <>
            <Button
              onClick={() => {
                router.invalidate();
                reset();
              }}
            >
              تلاش دوباره
            </Button>
            <Button asChild variant="outline">
              <a href="/">صفحه‌ی اصلی</a>
            </Button>
          </>
        }
      />
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Each content route sets its own title/description. Never add og:image here.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#F7F3ED" },
      { title: "Paris Gallery — گوشواره‌های دست‌ساز هنری" },
      { name: "description", content: "گوشواره‌های دست‌ساز خمیر پلیمری با الهام از مد دهه‌ی شصت و هفتاد." },
      { name: "author", content: "Paris Gallery" },
      { property: "og:site_name", content: "Paris Gallery" },
      { property: "og:locale", content: "fa_IR" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@1,6..96,400..600&family=Markazi+Text:wght@400..700&family=Vazirmatn:wght@300..700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <DirectionProvider dir="rtl">
        <FavoritesProvider>
          <UiStateProvider>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background">
              پرش به محتوا
            </a>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main id="main" className="flex-1">
                <Outlet />
              </main>
              <Footer />
            </div>
            <SearchDialog />
            <FavoritesSheet />
            <Toaster position="bottom-left" dir="rtl" />
          </UiStateProvider>
        </FavoritesProvider>
      </DirectionProvider>
    </QueryClientProvider>
  );
}
