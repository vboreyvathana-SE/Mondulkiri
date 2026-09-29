import { formatMoney } from '../../utils/formatMoney'

export default function FreeDispatchBanner({ subtotal, threshold, unlocked }) {
    const percent = Math.min(100, Math.round((subtotal / threshold) * 100))

    return (
        <div className='rounded-xl bg-[#292321] p-4'>
            <div className='flex items-center justify-between'>
                <p className='font-label text-sm font-bold text-[#f5b44c]'>Complimentary terroir cold-chain dispatch</p>
                {unlocked && <span className='text-xs font-bold uppercase text-[#f5b44c]'>Unlocked</span>}
            </div>
            <p className='mt-1 text-sm text-[#9b9897]'>
                {unlocked
                    ? `You have reached the ${formatMoney(threshold)} threshold. Carbon-neutral mountain logistics included.`
                    : `Add ${formatMoney(threshold - subtotal)} more to unlock complimentary cold-chain dispatch.`}
            </p>
            <div
                className='mt-3 h-1.5 overflow-hidden rounded-full bg-[#171311]'
                role='progressbar'
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                aria-label='Progress toward free dispatch'
            >
                <div className='h-full rounded-full bg-[#f5b44c] transition-all duration-300' style={{ width: `${percent}%` }} />
            </div>
        </div>
    )
}