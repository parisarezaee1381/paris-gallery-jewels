import { Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Search } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/data/products";
import { useFavorites } from "@/hooks/use-favorites";
import { useUiState } from "@/hooks/use-ui-state";
import { toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

const navLinkClass =
  "relative py-2 text-[0.95rem] text-foreground transition-colors hover:text-brand after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-brand after:transition-transform hover:after:scale-x-100 data-[status=active]:text-brand data-[status=active]:after:scale-x-100";

function NavItem({ to, children, exact }: { to: "/" | "/shop" | "/about"; children: ReactNode; exact?: boolean }) {
  return (
    <Link to={to} className={navLinkClass} activeOptions={{ exact, includeSearch: false }}>
      {children}
    </Link>
  );
}

function CollectionsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(navLinkClass, "inline-flex cursor-pointer items-center gap-1 outline-none")}>
        مجموعه‌ها
        <ChevronDown className="size-3.5" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" sideOffset={12} className="w-64 rounded-none border-foreground/15 p-2">
        {categories.map((c) => (
          <DropdownMenuItem key={c.id} asChild className="cursor-pointer rounded-none px-3 py-2.5">
            <Link to="/shop" search={{ category: c.id }} className="flex flex-col items-start gap-0.5">
              <span className="font-serif text-lg leading-tight">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.tagline}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer rounded-none px-3 py-2 text-sm text-brand">
          <Link to="/shop">مشاهده همه‌ی گوشواره‌ها</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const { ids } = useFavorites();
  const { setSearchOpen, setFavoritesOpen } = useUiState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm transition-colors",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="bg-ink text-ink-foreground">
        <Container className="flex h-8 items-center justify-center text-[0.72rem] tracking-wide">
          بدون پرداخت آنلاین · رزرو از طریق واتس‌اپ · هر قطعه دست‌ساز و تک
        </Container>
      </div>
      <Container className="grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-20">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="باز کردن منو"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <Logo className="hidden md:inline-flex" />
        </div>

        <div className="flex justify-center">
          <Logo className="md:hidden" />
          <nav aria-label="منوی اصلی" className="hidden items-center gap-9 md:flex">
            <NavItem to="/" exact>
              خانه
            </NavItem>
            <NavItem to="/shop">فروشگاه</NavItem>
            <CollectionsDropdown />
            <NavItem to="/about">درباره ما</NavItem>
          </nav>
        </div>

        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="icon" aria-label="جستجو" onClick={() => setSearchOpen(true)}>
            <Search className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`علاقه‌مندی‌ها (${toPersianDigits(ids.length)})`}
            onClick={() => setFavoritesOpen(true)}
            className="relative"
          >
            <Heart className="size-5" />
            {ids.length > 0 && (
              <span className="absolute end-1.5 top-1.5 grid size-[1.1rem] place-items-center rounded-full bg-brand text-[0.62rem] font-bold leading-none text-brand-foreground">
                {toPersianDigits(ids.length)}
              </span>
            )}
          </Button>
        </div>
      </Container>
      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}
