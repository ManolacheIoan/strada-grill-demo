import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { base } from "@/lib/paths";

export default function NotFound() {
  return (
    <main className="mosaic flex min-h-dvh flex-col items-center justify-center px-4 text-center text-white">
      <Logo />
      <p className="mt-10 font-display text-7xl font-bold text-peach">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold">Pagina nu există</h1>
      <p className="mt-2 text-white/70">Dar meniul e la un click distanță.</p>
      <a href={`${base}/`} className="btn btn-accent mt-8"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Înapoi la meniu</a>
    </main>
  );
}
