"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { site } from "@/content/site";
import { base } from "@/lib/paths";
import { navLinks } from "@/lib/nav";


export default function Header({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const href = (id: string) => (home ? `#${id}` : `${base}/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 text-white transition-[background-color,box-shadow] duration-300 ${scrolled ? "bg-night/95 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-night"}`}>
      <div className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6 ${scrolled ? "h-14" : "h-[4.5rem]"}`}>
        <a href={home ? "#top" : `${base}/`} className="rounded-md">
          <Logo compact={scrolled} />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <a key={l.id} href={href(l.id)} className="rounded-full px-3.5 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${site.phoneE164}`} className="btn btn-accent hidden !px-4 !py-2.5 text-sm sm:inline-flex">
            <Phone aria-hidden="true" className="h-4 w-4" /> {site.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="meniu-mobil"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/15 lg:hidden"
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div className="chairs" aria-hidden="true" />
      {open && (
        <nav id="meniu-mobil" aria-label="Meniu mobil" className="absolute inset-x-0 top-full border-t border-white/10 bg-night px-4 pb-5 pt-2 shadow-2xl shadow-black/40 lg:hidden">
          <ul className="divide-y divide-white/10">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={href(l.id)} onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-base font-semibold">
                  {l.label} <span aria-hidden="true" className="text-white/40">→</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={`tel:${site.phoneE164}`} className="btn btn-accent mt-3 w-full">
            <Phone aria-hidden="true" className="h-4 w-4" /> Sună: {site.phoneDisplay}
          </a>
        </nav>
      )}
    </header>
  );
}
