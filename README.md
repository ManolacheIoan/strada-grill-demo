# Strada Grill — site demonstrativ

Site demo realizat de **Manotek** pentru un fast food **fictiv** din Tecuci. Numele, adresa, telefonul, meniul, prețurile, oferta zilei și nota Google sunt exemple, marcate pe site cu „[exemplu]”.

Live: https://manolacheioan.github.io/strada-grill-demo/

- **Tot conținutul**: `content/site.ts` (meniu pe categorii, oferta zilei, livrare, program, contact).
- **Comenzi**: coș în pagină; comanda pleacă prin Formspree (`formspreeEndpoint`) sau ca un singur mesaj WhatsApp.
- **Poze**: ilustrative, de pe Unsplash (vezi `CREDITS.md`).

```bash
npm install
npm run dev
npm run build   # export static în out/
```

Stack: Next.js (App Router, export static), TypeScript, Tailwind CSS, lucide-react. Publicat pe GitHub Pages prin GitHub Actions.
