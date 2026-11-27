import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site, TBD } from "@/content/site";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description: `Cum folosește ${site.name} datele trimise prin formularul de comandă: nume, telefon și adresă de livrare.`,
  alternates: { canonical: "./" },
};

export default function Page() {
  return (
    <LegalPage title="Politica de confidențialitate" updated="noiembrie 2026">
      <p>
        Această pagină explică ce date personale colectează <strong>{site.name}</strong> ({site.address.street}, {site.city}) prin acest site și cum le folosește.
        Operatorul datelor: <span className="tbd">{TBD}</span> (denumire firmă, CUI, sediu).
      </p>
      <h2>Ce date colectăm</h2>
      <ul>
        <li>Numele, numărul de telefon și, pentru livrare, adresa — doar când trimiți o comandă prin formular sau pe WhatsApp.</li>
        <li>Produsele comandate și mențiunile tale.</li>
      </ul>
      <h2>De ce le folosim</h2>
      <p>Exclusiv pentru a prelua, confirma și livra comanda. Nu trimitem reclame și nu vindem datele nimănui.</p>
      <h2>Cine le mai procesează</h2>
      <ul>
        <li>Formspree (formspree.io) — serviciul care ne transmite formularul de comandă.</li>
        <li>WhatsApp (Meta) — dacă alegi să trimiți comanda pe WhatsApp.</li>
        <li>Google — harta afișată pe site este încărcată de la Google Maps.</li>
      </ul>
      <h2>Cât timp le păstrăm</h2>
      <p>Cât e necesar pentru comandă și obligațiile legale. Perioada exactă: <span className="tbd">{TBD}</span>.</p>
      <h2>Drepturile tale</h2>
      <p>Ai dreptul de acces, rectificare, ștergere, restricționare și opoziție, precum și dreptul de a depune plângere la ANSPDCP (dataprotection.ro). Pentru orice solicitare, sună-ne la {site.phoneDisplay}.</p>
    </LegalPage>
  );
}
