export default function PledgeCard({
  amount,
  name,
  handle,
  rotation = 0,
  className = "",
}) {
  return (
    <div
      className={`relative w-[220px] overflow-hidden rounded-lg bg-brand-lime p-4 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-forest">
          NEW PLEDGE
        </span>
        <span className="text-[11px] text-brand-sage">just now</span>
      </div>

      <div className="mt-2 flex items-start">
        <span className="text-xl font-bold text-brand-forest">$</span>
        <span className="text-[72px] font-black leading-none text-brand-forest">
          {amount}
        </span>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-sm font-medium text-brand-forest">{name}</span>
        <span className="text-sm text-brand-sage">via @{handle}</span>
      </div>
    </div>
  );
}
