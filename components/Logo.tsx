export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={`sign font-bold text-peach transition-all ${compact ? "text-lg" : "text-[1.4rem]"}`}>STRADA GRILL</span>
      <span className="mt-1 self-start rounded-[3px] bg-amber px-1.5 py-[3px] text-[0.55rem] font-semibold tracking-[0.22em] text-white">FOOD SHOP &amp; BISTRO</span>
    </span>
  );
}
