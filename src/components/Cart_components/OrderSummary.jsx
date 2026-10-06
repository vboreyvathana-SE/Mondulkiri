import { formatMoney } from '../../utils/formatMoney'
import ShippingOptions from './ShippingOptions'
import PromoCodeInput from './PromoCodeInput'

export default function OrderSummary({ summary, promoError, onShippingChange, onApplyPromo, onCheckout, isCheckingOut }) {
    return (
        <div className='rounded-xl bg-[#292321] p-5'>
            <h2 className='font-head text-lg text-white'>Terrain Dispatch Bill</h2>

            <dl className='mt-4 flex flex-col gap-2 text-sm'>
                <Row
                    label={`Subtotal (${summary.item_count} ${summary.item_count === 1 ? 'item' : 'items'})`}
                    value={formatMoney(summary.subtotal)}
                />
                {summary.discount > 0 && (
                    <Row label={`Promo (${summary.promo_code})`} value={`−${formatMoney(summary.discount)}`} highlight />
                )}
                <Row
                    label='Highland dispatch method'
                    value={summary.dispatch_fee === 0 ? 'FREE (Terrain Perk)' : formatMoney(summary.dispatch_fee)}
                    highlight={summary.dispatch_fee === 0}
                />
                {summary.priority_fee > 0 && <Row label='Flight priority' value={formatMoney(summary.priority_fee)} />}
                <Row label='Estate cupping VAT (estimated)' value={formatMoney(summary.vat)} />
            </dl>

            <ShippingOptions value={summary.shipping_method} priorityFee={summary.priority_fee_price} onChange={onShippingChange} />

            <PromoCodeInput appliedCode={summary.promo_code} error={promoError} onApply={onApplyPromo} />

            <div className='mt-5 flex items-end justify-between'>
                <div>
                    <p className='text-xs uppercase text-[#9b9897]'>Total consignment</p>
                    <p className='text-xs text-[#9b9897]'>Guaranteed fresh batch origin</p>
                </div>
                <p className='font-head text-3xl text-white'>{formatMoney(summary.total)}</p>
            </div>

            <button
                type='button'
                onClick={onCheckout}
                disabled={isCheckingOut}
                className='cursor-pointer mt-4 w-full rounded-lg bg-[#f5b44c] py-3 text-sm font-bold uppercase text-[#292321] transition hover:bg-[#ffc15c] disabled:cursor-not-allowed disabled:opacity-60'
            >
                {isCheckingOut ? 'Recording your order…' : 'Proceed to encrypted dispatch →'}
            </button>

            <p className='mt-3 flex flex-wrap justify-between gap-2 text-[10px] uppercase text-[#9b9897]'>
                <span>256-bit encrypted</span>
                <span>Dispatched within 24h</span>
                <span>100% bio-canisters</span>
            </p>
        </div>
    )
}

function Row({ label, value, highlight = false }) {
    return (
        <div className='flex justify-between gap-4'>
            <dt className='text-[#9b9897]'>{label}</dt>
            <dd className={highlight ? 'font-bold text-[#f5b44c]' : 'text-white'}>{value}</dd>
        </div>
    )
}
