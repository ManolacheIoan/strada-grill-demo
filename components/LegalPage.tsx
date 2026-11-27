import Header from "./Header";
import Footer from "./Footer";
import MobileBar from "./MobileBar";

/** Machetă pentru paginile legale (text generic, marcat „de verificat”). */
export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <Header home={false} />
      <main id="continut" className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
        <p className="eyebrow">Informații legale</p>
        <h1 className="h2">{title}</h1>
        <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-amber/50 bg-[#fff7ef] px-3.5 py-2 text-sm text-amber-dark">
          Text generic — <strong>de verificat</strong> cu un consultant juridic înainte de lansare. Ultima actualizare: {updated}.
        </p>
        <div className="legal mt-8 space-y-5 leading-relaxed text-ink-soft [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink">
          {children}
        </div>
      </main>
      <Footer home={false} />
      <MobileBar home={false} />
    </>
  );
}
