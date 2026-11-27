import { site } from "@/content/site";

export const navLinks = [
  { id: "meniu", label: "Meniu" },
  ...(site.offer.enabled ? [{ id: "oferta", label: "Oferta zilei" }] : []),
  { id: "livrare", label: "Livrare și program" },
  { id: "local", label: "Localul" },
  { id: "contact", label: "Contact" },
];
