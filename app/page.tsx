import type { Metadata } from "next";
import {
  Armchair, ArrowRight, ArrowUpRight, Bike, CakeSlice, MapPin, Navigation, Phone, Smartphone, Star, Store, Wallet, Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import MenuOrder from "@/components/MenuOrder";
import Photo, { Placeholder } from "@/components/Photo";
import WaIcon from "@/components/WaIcon";
import { site, formatPrice, TBD } from "@/content/site";

export const metadata: Metadata = { alternates: { canonical: "./" }, openGraph: { url: "./" } };

const tel = `tel:${site.phoneE164}`;

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex text-chair-yellow" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => <Star key={i} className={className} fill="currentColor" strokeWidth={0} />)}
      <span className="relative">
        <Star className={`${className} text-current opacity-25`} fill="currentColor" strokeWidth={0} />
        <span className="absolute inset-0 w-[10%] overflow-hidden"><Star className={className} fill="currentColor" strokeWidth={0} /></span>
      </span>
    </span>
  );
}

export default function Home() {
  const { offer, delivery } = site;

  return (
    <>
      <a href="#continut" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-amber focus:px-4 focus:py-2.5 focus:font-semibold focus:text-white">
        Sari la conținut
      </a>
      <span id="top" />

      {site.demo.enabled && (
        <div className="bg-night px-4 py-2 text-center text-[0.75rem] text-white/70">
          {site.demo.text}
        </div>
      )}

      <Header />

      <main id="continut">
        {/* HERO */}
        <section className="mosaic on-dark relative overflow-hidden text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:pb-20 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <p className="eyebrow">{site.hero.eyebrow}</p>
              <h1 className="mt-5 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]">
                {site.hero.titleA} <span className="text-peach">{site.hero.titleB}</span>
              </h1>
              <p className="rise mt-6 max-w-lg text-lg leading-relaxed text-white/75">{site.hero.subtitle}</p>
              <div className="rise rise-2 mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={tel} className="btn btn-accent text-base sm:text-lg"><Phone aria-hidden="true" className="h-5 w-5" /> Comandă la telefon</a>
                <a href="#meniu" className="btn btn-outline-light text-base sm:text-lg">Vezi meniul <ArrowRight aria-hidden="true" className="h-5 w-5" /></a>
              </div>
              <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
                <a href={site.google.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                  <span className="font-display text-3xl font-bold">{site.google.rating}</span>
                  <span>
                    <Stars />
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-white/65 group-hover:text-white">{site.google.reviewsLabel} pe Google <ArrowUpRight aria-hidden="true" className="h-3 w-3" /></span>
                  </span>
                </a>
                <span className="hidden h-9 w-px bg-white/10 sm:block" aria-hidden="true" />
                <span className="flex items-center gap-3">
                  <span className="font-display text-3xl font-bold">{site.facebook.followers}</span>
                  <span className="text-xs leading-tight text-white/65">urmăritori<br />pe Facebook [exemplu]</span>
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 ring-1 ring-white/10">
                <Photo name="hero" alt="Burger dublu cu cheddar, pe fundal închis — foto ilustrativă" sizes="(min-width: 1024px) 540px, 92vw" priority className="aspect-[4/3] w-full" width={1200} height={900} />
                <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[0.7rem] font-medium text-white/90 backdrop-blur-sm">Foto ilustrativă</span>
              </div>
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 text-ink shadow-xl sm:-left-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 text-amber"><Store aria-hidden="true" className="h-5 w-5" /></span>
                <span>
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-amber">Shaorma · Burgeri · Pizza</span>
                  <span className="block text-sm font-semibold">Aproape de centru</span>
                </span>
              </div>
            </div>
          </div>
          <div className="chairs" aria-hidden="true" />
        </section>

        {/* AVANTAJE */}
        <section aria-label="De ce să comanzi de la noi" className="border-b border-line bg-paper">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
            {[
              [Zap, "Comanzi în secunde", "Coșul se trimite pe WhatsApp"],
              [Wallet, "Plătești la final", "La livrare sau în local"],
              [Smartphone, "Fără cont", "Fără aplicație, fără parole"],
              [MapPin, "În centrul orașului", site.address.street],
            ].map(([Icon, t, d], i) => {
              const I = Icon as typeof Zap;
              return (
                <li key={t as string} className={`flex items-center gap-3.5 px-4 py-5 sm:px-6 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream text-amber"><I aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-tight">{t as string}</span>
                    <span className="mt-0.5 block truncate text-xs text-ink-soft">{d as string}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* OFERTA ZILEI */}
        {offer.enabled && (
          <section id="oferta" aria-labelledby="oferta-titlu" className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 md:pt-20">
            <div data-reveal className="on-dark grid overflow-hidden rounded-[2rem] bg-night text-white shadow-2xl shadow-night/25 md:grid-cols-[1.1fr_1fr]">
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-amber px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em]">{offer.label}</span>
                  {offer.example && <span className="tbd">{TBD}</span>}
                </div>
                <h2 id="oferta-titlu" className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{offer.title}</h2>
                <p className="mt-3 max-w-md text-white/70">{offer.description}</p>
                <dl className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-3">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-white/55">Preț</dt>
                    <dd className={offer.price == null ? "mt-1" : "mt-1 font-display text-4xl font-bold text-peach"}>
                      {offer.price == null ? <span className="tbd">{TBD}</span> : formatPrice(offer.price)}
                      {offer.oldPrice != null && <s className="ml-2 text-base text-white/50">{formatPrice(offer.oldPrice)}</s>}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-white/55">Valabilitate</dt>
                    <dd className="mt-1"><span className="tbd">{offer.validity}</span></dd>
                  </div>
                </dl>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={tel} className="btn btn-accent"><Phone aria-hidden="true" className="h-4 w-4" /> Comandă oferta</a>
                  <a href="#meniu" className="btn btn-outline-light">Vezi tot meniul</a>
                </div>
              </div>
              <div className="relative min-h-64">
                <Photo name="oferta" alt="Shaorma la farfurie cu salată și sosuri — foto ilustrativă" sizes="(min-width: 768px) 520px, 100vw" className="absolute inset-0 h-full w-full" width={1200} height={1200} />
                <div className="absolute inset-0 bg-gradient-to-r from-night via-night/10 to-transparent max-md:bg-gradient-to-t" aria-hidden="true" />
              </div>
            </div>
          </section>
        )}

        <MenuOrder />

        {/* CUM COMANZI */}
        <section aria-labelledby="pasi-titlu" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 md:pb-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_2fr] lg:items-center">
            <div data-reveal>
              <p className="eyebrow">Simplu</p>
              <h2 id="pasi-titlu" className="h2">Comanda ta, în trei pași</h2>
              <p className="mt-3 text-ink-soft">Fără aplicații și fără cont. Doar tu, meniul și telefonul.</p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-3">
              {[
                ["Alegi", "Filtrezi pe categorii sau cauți direct ce ai poftă."],
                ["Trimiți", "Formular, WhatsApp cu mesajul gata scris, sau telefon."],
                ["Savurezi", "Ridici din local sau primești acasă. Plătești la final."],
              ].map(([t, d], i) => (
                <li key={t} data-reveal={String(i + 1)} className="card card-static p-6">
                  <span className="font-display text-sm font-bold text-amber">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* LOCALUL */}
        <section id="local" aria-labelledby="local-titlu" className="section bg-paper">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end" data-reveal>
              <div>
                <p className="eyebrow">Localul</p>
                <h2 id="local-titlu" className="h2">Stai la masă sau iei la pachet</h2>
              </div>
              <p className="max-w-md text-ink-soft">Sală luminoasă, vitrină cu preparate făcute pe loc și câteva mese pentru cine vrea să mănânce cald, pe loc.</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:h-[30rem] lg:grid-cols-[1.4fr_1fr] lg:grid-rows-2">
              <Placeholder icon={Store} label="Fațada localului" className="min-h-72 rounded-[1.5rem] sm:col-span-2 lg:col-span-1 lg:row-span-2" />
              <Placeholder icon={Armchair} label="Sala de mese" className="min-h-56 rounded-[1.5rem]" />
              <Placeholder icon={CakeSlice} label="Vitrina cu preparate" className="min-h-56 rounded-[1.5rem]" />
            </div>
          </div>
        </section>

        {/* LIVRARE + PROGRAM */}
        <section id="livrare" aria-labelledby="livrare-titlu" className="section mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-[1.35fr_1fr]">
          <div data-reveal className="card card-static p-6 sm:p-9">
            <p className="eyebrow">Livrare</p>
            <h2 id="livrare-titlu" className="h2">Cald, la ușa ta</h2>
            <dl className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {[
                ["Zonă de livrare", delivery.zone],
                ["Comandă minimă", delivery.minOrder],
                ["Taxă de livrare", delivery.fee],
                ["Timp estimat", delivery.time],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-cream px-4 py-3.5">
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">{k}</dt>
                  <dd className="mt-1.5">{v === TBD ? <span className="tbd">{TBD}</span> : <span className="text-sm font-medium">{v}</span>}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 flex items-center gap-2.5 text-sm text-ink-soft"><Bike aria-hidden="true" className="h-4 w-4 text-amber" /> {delivery.payment}</p>
          </div>
          <div data-reveal="2" className="mosaic on-dark flex flex-col rounded-[1.25rem] p-6 text-white sm:p-9">
            <p className="eyebrow">Program</p>
            <h2 className="h2">Când ne găsești</h2>
            <dl className="mt-6 divide-y divide-white/10">
              {site.hours.map((h) => (
                <div key={h.days} className="flex items-center justify-between py-3.5">
                  <dt className="font-medium">{h.days}</dt>
                  <dd><span className="tbd">{h.time}</span></dd>
                </div>
              ))}
            </dl>
            <a href={tel} className="btn btn-accent mt-6 w-full"><Phone aria-hidden="true" className="h-4 w-4" /> {site.phoneDisplay}</a>
          </div>
        </section>

        {/* RECENZII */}
        <section aria-labelledby="recenzii-titlu" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 md:pb-20">
          <div data-reveal className="card card-static grid items-center gap-6 p-7 sm:p-10 md:grid-cols-[auto_1fr_auto] md:gap-12">
            <div className="flex items-center gap-5">
              <span className="font-display text-7xl font-bold tracking-tight">{site.google.rating}</span>
              <span>
                <Stars className="h-5 w-5" />
                <span className="mt-1.5 block text-sm font-medium text-ink-soft">din 5, pe Google</span>
              </span>
            </div>
            <div>
              <p className="eyebrow">Recenzii</p>
              <h2 id="recenzii-titlu" className="mt-2 font-display text-2xl font-bold tracking-tight">{site.google.reviews} de clienți și-au spus părerea <span className="tbd">[exemplu]</span></h2>
              <p className="mt-1.5 text-ink-soft">Citește recenziile direct pe Google. Pe Facebook ne urmăresc {site.facebook.followersText}.</p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row md:flex-col">
              <a href={site.google.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Vezi recenziile pe Google <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
              {site.facebook.url && <a href={site.facebook.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Facebook <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-labelledby="contact-titlu" className="mosaic on-dark text-white">
          <div className="section mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
            <div data-reveal>
              <p className="eyebrow">Ți-e foame?</p>
              <h2 id="contact-titlu" className="h2">Sună acum. Te așteptăm.</h2>
              <address className="mt-7 space-y-4 not-italic">
                <a href={tel} className="flex items-center gap-3 font-display text-3xl font-bold tracking-tight text-peach transition hover:text-white sm:text-4xl">
                  <Phone aria-hidden="true" className="h-7 w-7" /> {site.phoneDisplay}
                </a>
                <p className="flex items-center gap-3 text-white/80"><MapPin aria-hidden="true" className="h-5 w-5 text-peach" /> {site.address.street}, {site.city}, jud. {site.address.region}</p>
              </address>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Bună ziua! Aș dori să comand de la ${site.name}.`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-wa"><WaIcon /> Scrie pe WhatsApp</a>
                <a href={site.google.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light"><Navigation aria-hidden="true" className="h-4 w-4" /> Indicații în Google Maps</a>
              </div>
            </div>
            <div data-reveal="2" className="overflow-hidden rounded-[1.5rem] ring-1 ring-white/10">
              <iframe
                title={`Hartă: ${site.name}, ${site.address.street}, ${site.city}`}
                src={site.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-80 w-full border-0 lg:h-[26rem]"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBar />
    </>
  );
}
