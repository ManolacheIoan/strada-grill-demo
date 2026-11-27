import { MessageCircle } from "lucide-react";

/** Iconiță pentru WhatsApp (lucide). */
export default function WaIcon({ className = "h-5 w-5" }: { className?: string }) {
  return <MessageCircle aria-hidden="true" className={className} strokeWidth={2} />;
}
