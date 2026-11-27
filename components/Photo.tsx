import { Camera, type LucideIcon } from "lucide-react";
import { asset, imageSrcSet } from "@/lib/paths";

type Props = {
  name: string | null;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Iconița afișată pe placeholder când nu există poză. */
  icon?: LucideIcon;
  placeholderLabel?: string;
  width?: number;
  height?: number;
};

/** Imagine responsivă WebP, sau placeholder premium când `name` e null. */
export default function Photo({ name, alt, sizes, className = "", priority, icon, placeholderLabel, width = 1280, height = 960 }: Props) {
  if (!name) return <Placeholder icon={icon} label={placeholderLabel ?? alt} className={className} />;
  return (
    <img
      src={asset(`/images/${name}-640.webp`)}
      srcSet={imageSrcSet(name)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`object-cover ${className}`}
    />
  );
}

export function Placeholder({ icon: Icon = Camera, label, className = "" }: { icon?: LucideIcon; label: string; className?: string }) {
  return (
    <div role="img" aria-label={`${label} — foto se înlocuiește cu poza reală`} className={`placeholder relative flex flex-col items-center justify-center gap-3 text-white ${className}`}>
      <Icon aria-hidden="true" strokeWidth={1.25} className="h-10 w-10 opacity-80" />
      <span className="px-4 text-center text-[0.7rem] font-medium uppercase tracking-[0.16em] text-white/80">{label}</span>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] font-medium text-white/85">
        Foto — se înlocuiește cu poza reală
      </span>
    </div>
  );
}
