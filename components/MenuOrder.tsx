"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  CircleAlert, CircleCheck, CupSoda, Droplets, Hamburger, LayoutGrid, LoaderCircle, Minus, Phone, Pizza, Plus,
  Sandwich, Search, ShoppingBag, UtensilsCrossed, X, type LucideIcon,
} from "lucide-react";
import { categories, menu, site, formatPrice, TBD, type CategoryId, type MenuItem } from "@/content/site";
import Photo from "./Photo";
import WaIcon from "./WaIcon";

export const categoryIcons: Record<CategoryId, LucideIcon> = {
  shaorma: Sandwich, burgeri: Hamburger, pizza: Pizza, cartofi: UtensilsCrossed, bauturi: CupSoda, sosuri: Droplets,
};

type Cart = Record<string, number>;
type Method = "ridicare" | "livrare";
type Fields = { name: string; phone: string; method: Method | ""; address: string; notes: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = { kind: "idle" | "sending" | "success" | "error"; message?: string };

const norm = (s: string) => s.toLocaleLowerCase("ro-RO").normalize("NFD").replace(/[̀-ͯ]/g, "");
const phoneOk = (p: string) => /^(\+?40|0040|0)(7\d{8}|[23]\d{8})$/.test(p.replace(/[\s.\-()]/g, ""));

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Scrie-ne numele tău.";
  if (!phoneOk(f.phone)) e.phone = "Număr de telefon invalid. Exemplu: 0722 123 456.";
  if (!f.method) e.method = "Alege ridicare sau livrare.";
  if (f.method === "livrare" && f.address.trim().length < 6) e.address = "Scrie adresa completă pentru livrare.";
  return e;
}

export default function MenuOrder() {
  const [cat, setCat] = useState<CategoryId | "toate">("toate");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<Cart>({});
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [fields, setFields] = useState<Fields>({ name: "", phone: "", method: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const opener = useRef<HTMLElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input,select,textarea,summary");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      opener.current?.focus();
    };
  }, [open]);

  const visible = useMemo(() => {
    const nq = norm(q.trim());
    return menu.filter((m) => (cat === "toate" || m.category === cat) && (!nq || norm(`${m.name} ${m.description} ${m.category}`).includes(nq)));
  }, [cat, q]);

  const lines = menu.filter((m) => cart[m.id]).map((m) => ({ item: m, qty: cart[m.id] }));
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const missingPrice = lines.some((l) => l.item.price == null);
  const total = lines.reduce((s, l) => s + (l.item.price ?? 0) * l.qty, 0);
  const totalLabel = missingPrice ? "se confirmă la telefon" : formatPrice(total);

  const change = (id: string, d: number) => {
    if (d > 0) setBump((b) => b + 1);
    setStatus({ kind: "idle" });
    setCart((c) => {
      const n = Math.max(0, (c[id] ?? 0) + d);
      const next = { ...c };
      if (n) next[id] = n;
      else delete next[id];
      return next;
    });
  };

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const orderText = (f: Fields) =>
    [
      `Bună ziua! Aș dori să comand de la ${site.name}:`,
      ...lines.map((l) => `• ${l.qty} × ${l.item.name}${l.item.price != null ? ` (${formatPrice(l.item.price * l.qty)})` : ""}`),
      `Total: ${totalLabel}`,
      "",
      `Nume: ${f.name.trim() || "-"}`,
      `Telefon: ${f.phone.trim() || "-"}`,
      `Mod: ${f.method === "livrare" ? `livrare la ${f.address.trim()}` : f.method === "ridicare" ? "ridic din local" : "-"}`,
      ...(f.notes.trim() ? [`Mențiuni: ${f.notes.trim()}`] : []),
    ].join("\n");

  const check = () => {
    const e = validate(fields);
    setErrors(e);
    const firstKey = Object.keys(e)[0];
    if (firstKey) document.getElementById(`f-${firstKey}`)?.focus();
    return !firstKey;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!check()) return;
    if (!site.formspreeEndpoint) {
      setStatus({ kind: "error", message: "Trimiterea online nu e încă activă. Trimite aceeași comandă pe WhatsApp sau sună-ne — durează câteva secunde." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...fields, comanda: orderText(fields), total: totalLabel, _subject: `Comandă nouă — ${fields.name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: "success", message: `Mulțumim, ${fields.name.trim().split(" ")[0]}! Comanda a ajuns la noi. Te sunăm pentru confirmare.` });
      setCart({});
    } catch {
      setStatus({ kind: "error", message: "Comanda nu a putut fi trimisă. Verifică internetul sau trimite-o pe WhatsApp ori la telefon." });
    }
  };

  const sendWhatsApp = () => {
    if (!check()) return;
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(orderText(fields))}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="meniu" aria-labelledby="meniu-titlu" className="section mx-auto max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-reveal>
        <div>
          <p className="eyebrow">Meniu</p>
          <h2 id="meniu-titlu" className="h2">Ce poftești azi?</h2>
        </div>
        <p className="max-w-sm text-[0.95rem] text-ink-soft">
          Adaugi în coș și trimiți comanda în câteva secunde. Produsele marcate „exemplu” și câmpurile <span className="tbd">{TBD}</span> se completează cu meniul real.
        </p>
      </div>

      <div className="sticky top-[3.75rem] z-20 -mx-4 mt-7 border-b border-line bg-cream/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="relative">
          <label htmlFor="cauta" className="sr-only">Caută în meniu</label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-mute" />
          <input id="cauta" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută: shaorma, pizza, cartofi…" autoComplete="off" className="field pl-12" />
        </div>
        <div role="group" aria-label="Filtrează după categorie" className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {[{ id: "toate" as const, label: "Toate", Icon: LayoutGrid }, ...categories.map((c) => ({ id: c.id, label: c.label, Icon: categoryIcons[c.id] }))].map(({ id, label, Icon }) => {
            const active = cat === id;
            return (
              <button key={id} type="button" aria-pressed={active} onClick={() => setCat(id)} className={`chip ${active ? "chip-on" : ""}`}>
                <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} /> {label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{visible.length} produse afișate</p>

      {visible.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-semibold">Niciun produs pentru „{q}”.</p>
          <button type="button" onClick={() => { setQ(""); setCat("toate"); }} className="mt-3 text-sm font-semibold text-amber underline-offset-4 hover:underline">Arată tot meniul</button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5">
          {categories.filter((c) => visible.some((m) => m.category === c.id)).map((c) => (
            <CategoryBlock key={c.id} category={c} items={visible.filter((m) => m.category === c.id)} cart={cart} onChange={change} />
          ))}
        </div>
      )}

      {count > 0 && (
        <button
          key={bump}
          type="button"
          onClick={(e) => { opener.current = e.currentTarget; setOpen(true); }}
          className="pop fixed inset-x-3 bottom-[4.9rem] z-40 flex items-center justify-between rounded-2xl bg-night px-5 py-3.5 text-left text-white shadow-2xl shadow-night/40 lg:inset-x-auto lg:bottom-6 lg:right-6 lg:min-w-[22rem]"
        >
          <span className="flex items-center gap-3">
            <span className="relative">
              <ShoppingBag aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber px-1 text-[0.7rem] font-bold">{count}</span>
            </span>
            <span className="font-semibold">Vezi comanda <span className="sr-only">({count} produse)</span></span>
          </span>
          <span className="text-sm text-white/75">{missingPrice ? "total la confirmare" : formatPrice(total)} →</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-night/60 backdrop-blur-[2px] sm:items-center sm:p-4" onClick={() => setOpen(false)}>
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cos-titlu"
            className="sheet max-h-[92dvh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-[1.75rem] bg-paper p-5 shadow-2xl sm:rounded-[1.75rem] sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 id="cos-titlu" className="font-display text-2xl font-bold">Comanda ta</h2>
              <button type="button" autoFocus onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-cream transition hover:bg-line" aria-label="Închide coșul">
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            {status.kind === "success" ? (
              <div className="py-8 text-center" role="status">
                <CircleCheck aria-hidden="true" className="mx-auto h-12 w-12 text-success" strokeWidth={1.5} />
                <p className="mt-4 text-lg font-semibold">{status.message}</p>
                <button type="button" onClick={() => { setStatus({ kind: "idle" }); setOpen(false); }} className="btn btn-dark mt-6">Înapoi la meniu</button>
              </div>
            ) : lines.length === 0 ? (
              <p className="py-8 text-center text-ink-soft">Coșul e gol. Adaugă ceva bun din meniu.</p>
            ) : (
              <>
                <ul className="mt-4 divide-y divide-line">
                  {lines.map((l) => (
                    <li key={l.item.id} className="flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{l.item.name}</p>
                        <p className="text-sm text-ink-soft">{l.item.price == null ? TBD : formatPrice(l.item.price * l.qty)}</p>
                      </div>
                      <Stepper name={l.item.name} qty={l.qty} onChange={(d) => change(l.item.id, d)} />
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex items-baseline justify-between rounded-2xl bg-cream px-4 py-3">
                  <span className="font-semibold">Total</span>
                  <span className="font-display text-lg font-bold">{totalLabel}</span>
                </div>

                <form noValidate onSubmit={submit} className="mt-5 grid gap-3.5" aria-describedby="form-info">
                  <p id="form-info" className="text-sm font-semibold">Datele tale, ca să confirmăm comanda</p>
                  <Field id="name" label="Nume" error={errors.name}>
                    <input id="f-name" className="field" autoComplete="name" value={fields.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
                  </Field>
                  <Field id="phone" label="Telefon" error={errors.phone}>
                    <input id="f-phone" className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx" value={fields.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
                  </Field>
                  <fieldset>
                    <legend className="mb-1.5 text-sm font-medium">Cum vrei comanda?</legend>
                    <div className="grid grid-cols-2 gap-2" id="f-method" tabIndex={-1}>
                      {(["ridicare", "livrare"] as const).map((m) => (
                        <label key={m} className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-amber ${fields.method === m ? "border-night bg-night text-white" : "border-line bg-white hover:border-ink-mute"}`}>
                          <input type="radio" name="method" value={m} checked={fields.method === m} onChange={() => set("method", m)} className="sr-only" aria-describedby={errors.method ? "e-method" : undefined} />
                          {m === "ridicare" ? "Ridic din local" : "Livrare acasă"}
                        </label>
                      ))}
                    </div>
                    {errors.method && <p id="e-method" className="err">{errors.method}</p>}
                  </fieldset>
                  {fields.method === "livrare" && (
                    <Field id="address" label="Adresa de livrare" error={errors.address}>
                      <input id="f-address" className="field" autoComplete="street-address" placeholder="Strada, număr, bloc, apartament" value={fields.address} onChange={(e) => set("address", e.target.value)} aria-invalid={!!errors.address} aria-describedby={errors.address ? "e-address" : undefined} />
                    </Field>
                  )}
                  <Field id="notes" label="Mențiuni (opțional)">
                    <textarea id="f-notes" className="field min-h-20 resize-y" placeholder="Fără ceapă, sos separat…" value={fields.notes} onChange={(e) => set("notes", e.target.value)} />
                  </Field>

                  {status.kind === "error" && (
                    <p role="alert" className="flex gap-2 rounded-xl border border-amber/30 bg-amber/5 px-3.5 py-3 text-sm text-amber-dark">
                      <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /> {status.message}
                    </p>
                  )}

                  <div className="mt-1 grid gap-2.5">
                    <button type="submit" disabled={status.kind === "sending"} className="btn btn-accent w-full !py-4 text-base disabled:opacity-70">
                      {status.kind === "sending" ? <><LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" /> Se trimite…</> : "Trimite comanda"}
                    </button>
                    <button type="button" onClick={sendWhatsApp} className="btn btn-wa w-full">
                      <WaIcon /> Trimite pe WhatsApp
                    </button>
                    <a href={`tel:${site.phoneE164}`} className="btn btn-ghost w-full">
                      <Phone aria-hidden="true" className="h-4 w-4" /> Sau sună: {site.phoneDisplay}
                    </a>
                  </div>
                  <p className="text-center text-xs text-ink-soft">Fără cont și fără plată online. Plătești la livrare sau în local.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function CategoryBlock({ category: c, items, cart, onChange }: { category: (typeof categories)[number]; items: MenuItem[]; cart: Cart; onChange: (id: string, d: number) => void }) {
  const Icon = categoryIcons[c.id];
  return (
    <article aria-labelledby={`cat-${c.id}`} className="card card-static grid md:grid-cols-[minmax(0,19rem)_1fr]">
      <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-full">
        <Photo name={c.image} alt={`${c.label} — foto ilustrativă`} sizes="(min-width: 768px) 304px, 100vw" className="absolute inset-0 h-full w-full" icon={Icon} placeholderLabel={c.label} />
        {c.image && <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" aria-hidden="true" />}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
          {c.image ? (
            <>
              <h3 id={`cat-${c.id}`} className="font-display text-2xl font-bold tracking-tight">{c.label}</h3>
              <span className="rounded-full bg-black/45 px-2.5 py-1 text-[0.65rem] font-medium text-white/90 backdrop-blur-sm">Foto ilustrativă</span>
            </>
          ) : (
            <h3 id={`cat-${c.id}`} className="sr-only">{c.label}</h3>
          )}
        </div>
      </div>
      <ul className="divide-y divide-line px-4 sm:px-6">
        {items.map((m) => (
          <ItemRow key={m.id} item={m} qty={cart[m.id] ?? 0} onChange={(d) => onChange(m.id, d)} />
        ))}
      </ul>
    </article>
  );
}

function ItemRow({ item, qty, onChange }: { item: MenuItem; qty: number; onChange: (d: number) => void }) {
  return (
    <li className="flex items-center gap-3 py-3.5 sm:gap-4 sm:py-5">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h4 className="font-display text-[1.05rem] font-semibold leading-snug">{item.name}</h4>
          {item.example && <span className="rounded-full bg-cream px-2 py-0.5 text-[0.65rem] font-medium text-ink-soft">exemplu</span>}
        </div>
        <p className="mt-0.5 text-[0.8rem] text-ink-soft sm:text-sm">{item.description}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        {item.price == null ? <span className="text-xs text-ink-soft"><span className="hidden sm:inline">preț </span><span className="tbd">{TBD}</span></span> : <span className="font-display text-lg font-bold">{formatPrice(item.price)}</span>}
        {qty === 0 ? (
          <button type="button" onClick={() => onChange(1)} className="btn btn-accent !h-10 !w-10 !gap-1.5 !rounded-full !p-0 text-sm sm:!h-auto sm:!w-auto sm:!px-4 sm:!py-2.5" aria-label={`Adaugă în coș: ${item.name}`}>
            <Plus aria-hidden="true" className="h-4 w-4" /> <span className="hidden sm:inline">Adaugă</span>
          </button>
        ) : (
          <Stepper name={item.name} qty={qty} onChange={onChange} />
        )}
      </div>
    </li>
  );
}

function Stepper({ name, qty, onChange }: { name: string; qty: number; onChange: (d: number) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-line bg-white p-1">
      <button type="button" onClick={() => onChange(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-cream transition hover:bg-line" aria-label={`Scade cantitatea: ${name}`}>
        <Minus aria-hidden="true" className="h-4 w-4" />
      </button>
      <span className="w-6 text-center text-sm font-bold" aria-live="polite">{qty}</span>
      <button type="button" onClick={() => onChange(1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-amber text-white transition hover:bg-amber-dark" aria-label={`Crește cantitatea: ${name}`}>
        <Plus aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`f-${id}`} className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p id={`e-${id}`} className="err">{error}</p>}
    </div>
  );
}
