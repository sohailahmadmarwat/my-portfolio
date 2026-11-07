import { MessageCircle } from "lucide-react";
import { links } from "../data/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-fg shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle size={24} aria-hidden="true" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-fg opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}
