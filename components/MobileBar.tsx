import { Phone, ShoppingBag } from "lucide-react";
import { site } from "@/content/site";
import { base } from "@/lib/paths";

export default function MobileBar({ home = true }: { home?: boolean }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-line bg-paper/95 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-15px_rgb(22_33_46/.35)] backdrop-blur-md lg:hidden">
      <a href={`tel:${site.phoneE164}`} className="btn btn-dark !py-3.5"><Phone aria-hidden="true" className="h-4 w-4" /> Sună</a>
      <a href={home ? "#meniu" : `${base}/#meniu`} className="btn btn-accent !py-3.5"><ShoppingBag aria-hidden="true" className="h-4 w-4" /> Comandă</a>
    </div>
  );
}
