import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { getImageUrl } from '../../services/productService'
import { formatMoney } from '../../utils/formatMoney'
import { getGrindOptions } from '../../utils/grind'
import QuantityStepper from '../shared/QuantityStepper'

export default function CartItem({ item, onQuantityChange, onGrindChange, onRemove }) {
    const grindOptions = getGrindOptions(item.default_grind)

    return (
        <li className='flex gap-4 rounded-xl bg-[#292321] p-4'>
            <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className='h-28 w-28 shrink-0 rounded-lg bg-[#171311] object-contain'
            />

            <div className='flex flex-1 flex-col gap-2'>
                <div className='flex items-start justify-between gap-4'>
                    <div>
                        <p className='text-xs uppercase text-[#9b9897]'>{item.product_code} • {item.weight}</p>
                        <h2 className='font-head text-xl text-white'>{item.name}</h2>
                    </div>
                    <div className='text-right'>
                        <p className='font-head text-lg text-[#f5b44c]'>{formatMoney(item.line_total)}</p>
                        {item.quantity > 1 && <p className='text-xs text-[#9b9897]'>{formatMoney(item.price)} each</p>}
                    </div>
                </div>

                {item.flavor_notes && <p className='text-sm text-gray-300'>Notes: {item.flavor_notes}</p>}
                {item.roast_profile && (
                    <span className='w-fit rounded bg-[#211d1b] px-2 py-1 text-[10px] uppercase text-gray-300'>{item.roast_profile}</span>
                )}

                <div className='mt-auto flex flex-wrap items-center justify-between gap-3 pt-2'>
                    <label className='flex items-center gap-2 text-xs uppercase text-[#9b9897]'>
                        Profile:
                        <select
                            value={item.grind}
                            onChange={(e) => onGrindChange(item.id, e.target.value)}
                            className='rounded bg-[#171311] px-2 py-1.5 text-sm normal-case text-white'
                        >
                            {grindOptions.map((g) => (
                                <option key={g.title} value={g.title}>
                                    {g.title} ({g.subtitle})
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className='flex items-center gap-3'>
                        <QuantityStepper
                            compact
                            className='bg-[#171311]'
                            value={item.quantity}
                            max={item.stock}
                            onChange={(q) => onQuantityChange(item.id, q)}
                        />
                        <button
                            type='button'
                            aria-label={`Remove ${item.name}`}
                            onClick={() => onRemove(item.id)}
                            className='p-2 text-[#9b9897] hover:text-red-400'
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}