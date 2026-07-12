import { Phone, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function StickyMobileCTA() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin') || pathname.startsWith('/auth')) return null;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/85 backdrop-blur-xl border-t border-border/70 px-3 py-2.5 flex gap-2 shadow-luxury">
      <a
        href="tel:+447436624578"
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-heading font-semibold text-sm rounded-md active:scale-[0.98] transition"
      >
        <Phone className="w-4 h-4" /> Call
      </a>
      <a
        href="https://wa.me/447436624578?text=Hi%2C%20I%27m%20interested%20in%20one%20of%20your%20cars."
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-heading font-semibold text-sm rounded-md active:scale-[0.98] transition"
      >
        <MessageCircle className="w-4 h-4" /> WhatsApp
      </a>
    </div>
  );
}
