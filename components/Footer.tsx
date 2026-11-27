import { Clock, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "@/lib/nav";
import { site } from "@/content/site";
import { base } from "@/lib/paths";

export default function Footer({ home = true }: { home?: boolean }) {
  const href = (id: string) => (home ? `#${id}` : `${base}/#${id}`);
  return (
    <footer className="bg-night pb-28 text-white/75 lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">Fast food în centrul Tecuciului. La pachet, cu livrare sau la masă.</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-peach" />{site.address.street}, {site.city}</li>
            <li><a href={`tel:${site.phoneE164}`} className="flex gap-2.5 hover:text-white"><Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-peach" />{site.phoneDisplay}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Program</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {site.hours.map((h) => (
              <li key={h.days} className="flex gap-2.5"><Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-peach" /><span>{h.days}: <span className="text-white/60">{h.time}</span></span></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Navigare</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}><a href={href(l.id)} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Toate drepturile rezervate.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><a href={`${base}/confidentialitate/`} className="hover:text-white">Confidențialitate</a></li>
            <li><a href={`${base}/cookies/`} className="hover:text-white">Cookies</a></li>
            {site.demo.enabled && <li>{site.demo.text}</li>}
          </ul>
        </div>
      </div>
    </footer>
  );
}
