import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/reservation";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  message: string;
  children?: ReactNode;
  variant?: "whatsapp" | "outline" | "outline-ivory" | "ivory";
  size?: "default" | "lg" | "sm";
  className?: string;
}

/** Opens WhatsApp in a new tab with a pre-filled Persian message. */
export function WhatsAppButton({ message, children = "گفتگو در واتس‌اپ", variant = "whatsapp", size = "default", className }: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <MessageCircle aria-hidden />
      {children}
    </a>
  );
}
