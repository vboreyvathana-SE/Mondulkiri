// One line of the taste chart: label on the left, value on the right, a bar,
// and three little words under the bar.
//   percent : 0 to 100, how full the bar is
//   fill    : tailwind classes for the bar colour
export default function FlavorBar({ label, valueLabel, percent, fill, ends, valueColor = "text-[#fcba5f]" }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2 font-label text-[10px] leading-[14px] font-semibold uppercase">
        <span className="text-[#ede0da]">{label}</span>
        <span className={`font-bold ${valueColor}`}>{valueLabel}</span>
      </div>

      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-[#3b3330]"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        {fill ? (
          <div className={`h-full rounded-full ${fill}`} style={{ width: `${percent}%` }}></div>
        ) : (
          // no `fill` = the split bar: first part in brown, the rest in gold
          <div className="flex h-full w-full">
            <div className="h-full bg-[#75381e]" style={{ width: `${percent}%` }}></div>
            <div className="h-full bg-[#d99b43]" style={{ width: `${100 - percent}%` }}></div>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-2 text-[10px] uppercase tracking-wider text-[#9e8e7e]">
        {ends.map((text) => (
          <span key={text}>{text}</span>
        ))}
      </div>
    </div>
  );
}
