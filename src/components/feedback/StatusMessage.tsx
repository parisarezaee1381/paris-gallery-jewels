import { AlertTriangle, CheckCircle2, SearchX } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Kind = "empty" | "error" | "success";

const icons: Record<Kind, typeof SearchX> = { empty: SearchX, error: AlertTriangle, success: CheckCircle2 };

interface StatusMessageProps {
  kind?: Kind;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/** Shared empty / error / success state. */
export function StatusMessage({ kind = "empty", title, description, action, className }: StatusMessageProps) {
  const Icon = icons[kind];
  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={cn("flex flex-col items-center px-6 py-16 text-center", className)}
    >
      <span
        className={cn(
          "mb-5 grid size-16 place-items-center rounded-full border",
          kind === "success" && "border-success/40 text-success",
          kind === "error" && "border-destructive/40 text-destructive",
          kind === "empty" && "border-border text-muted-foreground",
        )}
      >
        <Icon className="size-7" strokeWidth={1.4} />
      </span>
      <h3 className="display-md">{title}</h3>
      {description && <div className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">{description}</div>}
      {action && <div className="mt-7 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}

export const EmptyState = (p: Omit<StatusMessageProps, "kind">) => <StatusMessage kind="empty" {...p} />;
export const ErrorState = (p: Omit<StatusMessageProps, "kind">) => <StatusMessage kind="error" {...p} />;
export const SuccessState = (p: Omit<StatusMessageProps, "kind">) => <StatusMessage kind="success" {...p} />;
