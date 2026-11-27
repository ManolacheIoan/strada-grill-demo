import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Politica de cookies",
  description: `Ce cookie-uri folosește site-ul ${site.name}: fără cookie-uri de urmărire proprii; harta Google poate seta cookie-uri.`,
  alternates: { canonical: "./" },
};

export default function Page() {
  return (
    <LegalPage title="Politica de cookies" updated="noiembrie 2026">
      <p>Cookie-urile sunt fișiere mici salvate de browser. Le explicăm pe scurt pe cele care pot apărea pe acest site.</p>
      <h2>Cookie-uri proprii</h2>
      <p>Site-ul <strong>{site.name}</strong> nu folosește cookie-uri proprii de analiză sau de publicitate. Coșul de comandă e păstrat doar în pagina deschisă și dispare când o închizi.</p>
      <h2>Cookie-uri ale terților</h2>
      <ul>
        <li><strong>Google Maps</strong> — harta din secțiunea Contact poate seta cookie-uri Google, conform politicii Google.</li>
        <li><strong>WhatsApp</strong> — doar dacă deschizi linkul de comandă, pe site-ul sau aplicația WhatsApp.</li>
      </ul>
      <h2>Cum le controlezi</h2>
      <p>Poți șterge sau bloca cookie-urile din setările browserului. Site-ul funcționează și fără ele; doar harta s-ar putea să nu se afișeze.</p>
    </LegalPage>
  );
}
