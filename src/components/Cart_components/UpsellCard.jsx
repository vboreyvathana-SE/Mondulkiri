import { getImageUrl } from '../../services/productService'
import { formatMoney } from '../../utils/formatMoney'

export default function UpsellCard({ product, onAdd }) {
    return (
        <li className='flex flex-col overflow-hidden rounded-xl bg-[#292321]'>
            <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className='h-40 w-full bg-[#171311] object-contain'
            />
            <div className='flex flex-1 flex-col gap-2 p-4'>
                <div className='flex items-start justify-between gap-3'>
                    <div>
                        <p className='text-[10px] uppercase text-[#f5b44c]'>{product.product_type}</p>
                        <h3 className='font-head text-white'>{product.name}</h3>
                    </div>
                    <p className='font-head text-[#f5b44c]'>{formatMoney(product.price)}</p>
                </div>
                <p className='line-clamp-2 text-sm text-[#9b9897]'>{product.description}</p>
                <button
                    type='button'
                    onClick={() => onAdd(product)}
                    className='mt-auto rounded-lg bg-[#171311] py-2 text-xs font-bold uppercase text-white transition hover:brightness-125'
                >
                    Add to consignment
                </button>
            </div>
        </li>
    )
}