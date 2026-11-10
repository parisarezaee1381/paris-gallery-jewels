import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { Fragment, type ReactNode } from "react";

export interface Crumb {
  label: string;
  /** Rendered link; omit for the current page. */
  link?: ReactNode;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="transition-colors hover:text-brand">
            خانه
          </Link>
        </li>
        {items.map((item, i) => (
          <Fragment key={i}>
            <li aria-hidden>
              <ChevronLeft className="size-3.5" />
            </li>
            <li aria-current={item.link ? undefined : "page"} className={item.link ? "" : "text-foreground"}>
              {item.link ?? item.label}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
