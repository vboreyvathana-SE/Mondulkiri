import { Link } from 'react-router-dom'

export default function CartHeader({ lotCount }) {
    return (
        <header className='mb-6'>
            <div className='flex flex-wrap items-center justify-between gap-2 text-xs uppercase text-[#9b9897]'>
                <p>
                    <Link to='/products' className='hover:text-[#f5b44c]'>← Return to reserve shop</Link>
                    {' / '}Reserve cellar ({lotCount} {lotCount === 1 ? 'lot' : 'lots'}){' / '}Highland dispatch
                </p>
                <span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[#f5b44c]'>Roasted to order</span>
            </div>

            <div className='mt-4 flex flex-wrap items-end justify-between gap-4'>
                <div>
                    <p className='font-label text-xs uppercase text-amber-500'>Artisanal terroir dispatch</p>
                    <h1 className='font-head text-4xl text-white'>Your Tasting Consignment</h1>
                </div>
                <p className='max-w-sm text-sm text-[#9b9897]'>
                    Small-batch micro-lots hand-sorted in Sen Monorom and shipped in nitrogen-flushed parchment foil canisters for peak aromatic vitality.
                </p>
            </div>
        </header>
    )
}