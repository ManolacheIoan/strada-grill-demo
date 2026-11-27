/**
 * TOT conținutul site-ului se editează aici.
 * Firma e FICTIVĂ (site demonstrativ Manotek). Ce e marcat „[exemplu]” e o valoare exemplu.
 */

export const TBD = "[exemplu]";

export const site = {
  name: "Strada Grill",
  city: "Tecuci",
  address: {
    street: "Str. Exemplu nr. 8",
    locality: "Tecuci",
    region: "Galați",
    country: "RO",
  },
  phoneDisplay: "07XX XXX XXX",
  phoneE164: "+40700000000",
  /** Număr WhatsApp pentru comenzi, fără „+”. */
  whatsapp: "40700000000",
  /** Endpoint Formspree (ex. "https://formspree.io/f/abcdwxyz"). Gol = formularul propune WhatsApp / telefon. */
  formspreeEndpoint: "",
  google: {
    rating: "4,6",
    ratingValue: 4.6,
    reviews: "300",
    reviewsLabel: "300 de recenzii [exemplu]",
    url: "https://www.google.com/maps/search/?api=1&query=fast+food+Tecuci",
  },
  facebook: {
    followers: "2.000",
    followersText: "2.000 de oameni [exemplu]",
    url: "https://www.facebook.com/",
  },
  mapEmbed: "https://maps.google.com/maps?q=45.8486,27.4339&z=15&output=embed",
  siteUrl: "https://manolacheioan.github.io/strada-grill-demo",

  demo: {
    enabled: true,
    text: "Site demonstrativ realizat de Manotek — firmă fictivă. Meniul și prețurile sunt exemple.",
  },

  seo: {
    title: "Strada Grill — shaorma, burgeri, pizza (site demonstrativ)",
    description:
      "Strada Grill (firmă fictivă, site demonstrativ Manotek): shaorma, burgeri, pizza și cartofi, la pachet sau cu livrare. Comandă din meniu sau pe WhatsApp.",
  },

  hero: {
    eyebrow: "Fast food · Tecuci",
    titleA: "Fast food bun,",
    titleB: "chiar pe strada ta",
    subtitle: "Shaorma, burgeri, pizza și cartofi, făcute pe loc. Alegi din meniu și comanzi în câteva secunde.",
  },

  offer: {
    enabled: true,
    label: "Oferta zilei",
    title: "Shaorma + cartofi + băutură",
    description: "Meniul complet, la un preț bun. Conținutul ofertei se schimbă zilnic.",
    /** true = afișată cu eticheta „[exemplu]”. */
    example: true,
    price: 39 as number | null,
    oldPrice: 47 as number | null,
    validity: `azi, până la 22:00 ${TBD}`,
  },

  delivery: {
    zone: `Tecuci, în 5 km ${TBD}`,
    minOrder: `40 lei ${TBD}`,
    fee: `Gratuită peste 80 lei ${TBD}`,
    time: `30–45 de minute ${TBD}`,
    payment: "Plătești la livrare sau în local. Fără plată online.",
  },

  hours: [
    { days: "Luni – Vineri", time: `10:00 – 23:00 ${TBD}` },
    { days: "Sâmbătă", time: `11:00 – 24:00 ${TBD}` },
    { days: "Duminică", time: `11:00 – 22:00 ${TBD}` },
  ],
} as const;

export type CategoryId = "shaorma" | "burgeri" | "pizza" | "cartofi" | "bauturi" | "sosuri";

/** `image` = numele fișierului din public/images (fără -640/-1280). `null` = placeholder premium. */
export const categories: { id: CategoryId; label: string; image: string | null }[] = [
  { id: "shaorma", label: "Shaorma", image: "shaorma" },
  { id: "burgeri", label: "Burgeri", image: "burgeri" },
  { id: "pizza", label: "Pizza", image: "pizza" },
  { id: "cartofi", label: "Cartofi", image: "cartofi" },
  { id: "bauturi", label: "Băuturi", image: null },
  { id: "sosuri", label: "Sosuri", image: "sosuri" },
];

export type MenuItem = {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  /** Preț în lei; `null` = „[exemplu]”. */
  price: number | null;
  /** true = produs exemplu, afișat cu eticheta „[exemplu]”. */
  example?: boolean;
};

/** Meniu exemplu (firmă fictivă). Prețurile sunt orientative. */
export const menu: MenuItem[] = [
  { id: "sh-pui", category: "shaorma", name: "Shaorma de pui", description: "Lipie, pui la rotisor, cartofi, varză, sos de usturoi", price: 22, example: true },
  { id: "sh-mixta", category: "shaorma", name: "Shaorma mixtă", description: "Pui și vită, legume proaspete, sos picant", price: 26, example: true },
  { id: "sh-farfurie", category: "shaorma", name: "Shaorma la farfurie", description: "Carne de pui, cartofi, salată și două sosuri", price: 32, example: true },
  { id: "bg-clasic", category: "burgeri", name: "Burger clasic", description: "Vită 150 g, salată, roșii, ceapă, sos casei", price: 28, example: true },
  { id: "bg-cheese", category: "burgeri", name: "Cheeseburger", description: "Vită 150 g, cheddar dublu, castraveți murați", price: 31, example: true },
  { id: "bg-crispy", category: "burgeri", name: "Burger crispy de pui", description: "Pui crocant, coleslaw, sos de maioneză cu lămâie", price: 29, example: true },
  { id: "pz-marg", category: "pizza", name: "Pizza Margherita", description: "Sos de roșii, mozzarella, busuioc · 32 cm", price: 30, example: true },
  { id: "pz-quattro", category: "pizza", name: "Pizza Quattro Stagioni", description: "Șuncă, ciuperci, ardei, măsline · 32 cm", price: 36, example: true },
  { id: "pz-casei", category: "pizza", name: "Pizza casei", description: "Salam, bacon, porumb, ou, mozzarella · 32 cm", price: 38, example: true },
  { id: "cf-mici", category: "cartofi", name: "Cartofi prăjiți, porție mică", description: "150 g", price: 9, example: true },
  { id: "cf-mari", category: "cartofi", name: "Cartofi prăjiți, porție mare", description: "250 g", price: 13, example: true },
  { id: "cf-wedges", category: "cartofi", name: "Cartofi wedges", description: "Cu condimente, 250 g", price: 14, example: true },
  { id: "bt-cola", category: "bauturi", name: "Băutură răcoritoare 0,5 l", description: "Cola, portocale sau lămâie", price: 8, example: true },
  { id: "bt-apa", category: "bauturi", name: "Apă plată sau minerală", description: "0,5 l", price: 5, example: true },
  { id: "ss-usturoi", category: "sosuri", name: "Sos de usturoi", description: "50 g", price: 4, example: true },
  { id: "ss-ketchup", category: "sosuri", name: "Ketchup dulce sau picant", description: "50 g", price: 3, example: true },
];

export const formatPrice = (p: number | null) => (p == null ? TBD : `${p.toLocaleString("ro-RO")} lei`);
