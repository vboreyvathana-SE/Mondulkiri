import { formatMoney } from '../../utils/formatMoney'

export default function ShippingOptions({ value, priorityFee, onChange }) {
    return (
        <fieldset className='mt-4 rounded-lg bg-[#171311] p-3'>
            <legend className='px-1 text-[10px] uppercase text-[#9b9897]'>Carbon stewardship</legend>

            <Option
                checked={value === 'carbon-neutral'}
                onSelect={() => onChange('carbon-neutral')}
                title='Carbon-neutral expedited'
                note='2 - 3 business days direct from roastery'
                price='Included'
            />
            <Option
                checked={value === 'priority'}
                onSelect={() => onChange('priority')}
                title='Next flight cupper priority'
                note='Morning courier with insulated thermal fin'
                price={`+${formatMoney(priorityFee)}`}
            />
        </fieldset>
    )
}

function Option({ checked, onSelect, title, note, price }) {
    return (
        <label className='flex cursor-pointer items-start gap-3 py-2'>
            <input type='radio' name='shipping' checked={checked} onChange={onSelect} className='mt-1 accent-[#f5b44c]' />
            <span className='flex-1'>
                <span className='block text-sm font-bold text-white'>{title}</span>
                <span className='block text-xs text-[#9b9897]'>{note}</span>
            </span>
            <span className='text-xs font-bold text-[#f5b44c]'>{price}</span>
        </label>
    )
}