export default function PledgeCard({
  amount,
  name,
  handle,
  rotation = 0,
  className = "",
}) {
  return (
    <div
      className={`relative w-[360px] overflow-hidden border-[3px] border-brand-forest bg-brand-lime px-5 pb-5 pt-6 font-sans text-brand-forest ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="absolute left-6 top-0 h-2 w-20 bg-brand-forest" />

      <div className="flex items-start justify-between">
        <span className="text-[15px] font-bold uppercase tracking-[0.07em] text-brand-sage">
          NEW PLEDGE
        </span>
        <span className="text-[15px] font-bold text-brand-sage">just now</span>
      </div>

      <div className="mt-4 flex items-end gap-4">
        <span className="pb-1 text-[42px] font-medium leading-none text-ink">
          $
        </span>
        <span className="text-[92px] font-black leading-[0.82] text-ink">
          {amount}
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-[18px] font-medium leading-none text-ink">
          {name}
        </span>
        <span className="text-[14px] font-medium leading-none text-brand-forest">
          via <span className="font-bold">@{handle}</span>
        </span>
      </div>
    </div>
  );
}
