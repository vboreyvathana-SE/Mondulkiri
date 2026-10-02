import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById, getImageUrl } from '../../services/productService'
import { addItem } from '../../services/cartService'
import { formatMoney as money } from '../../utils/formatMoney'
import { getGrindOptions } from '../../utils/grind'
import QuantityStepper from '../shared/QuantityStepper'

const SUBSCRIBE_DISCOUNT = 0.15

// Details that are NOT in the products table yet, keyed by product id.
// A product without an entry simply doesn't show these parts.
// Later, move these into real columns.
const PRODUCT_EXTRAS = {
    1: {
        harvest: 'Current Harvest 2024 • Volcanic Red Basalt',
        elevation: '1,020 MASL',
        origin: 'Sen Monorom Estate',
        cuppingScore: '92.25 PTS',
        terroir: 'Bousra Ridge micro-climate gives slow bean maturation, harvested by Indigenous Bunong community coffee stewards.',
        roastStages: [
            { label: 'Rest 8.2 / Cool', flex: 3, color: 'bg-[#6b4a2b]' },
            { label: '1st Crack @ 9:15', flex: 2, color: 'bg-[#FCBA5F]' },
            { label: 'Batch #892 (28d Age)', flex: 2, color: 'bg-[#8a6d3b]' },
        ],
    },
}

const FOOTER_NOTES = [
    'Small-batch drum roasted every Monday & Thursday at Sen Monorom roastery.',
    'Complimentary cold-chain micro-dispatch on orders over $60.',
    'Purity sealed with one-way aromatic degassing membrane.',
]

export default function ProductDetailSection({ lotCount }) {
    const { id } = useParams() // route should look like /products/:id

    const [product, setProduct] = useState(null)
    const [error, setError] = useState(false)

    const [activeImage, setActiveImage] = useState(0)
    const [grind, setGrind] = useState(null) // null = use the product's own grind
    const [purchaseType, setPurchaseType] = useState('one-time')
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        let ignore = false // stops an old request from overwriting a newer one

        async function loadProduct() {
            setProduct(null)
            setError(false)
            setActiveImage(0)
            setGrind(null)
            setQuantity(1)
            try {
                const data = await getProductById(id)
                if (!ignore) setProduct(data)
            } catch (err) {
                console.error('Failed to load product:', err)
                if (!ignore) setError(true)
            }
        }
        loadProduct()

        return () => {
            ignore = true
        }
    }, [id])

    if (error) return <p className='p-12 text-[#D1C4BF]'>We couldn't load this product. Try again later.</p>
    if (!product) return <p className='p-12 text-[#D1C4BF]'>Loading...</p>

    // Derived values
    const extras = PRODUCT_EXTRAS[product.id] ?? {}
    const gallery = product.image ? [product.image] : []
    const descriptors = (product.flavor_notes ?? '').split(',').map((s) => s.trim()).filter(Boolean)
    const price = Number(product.price)
    const stock = Number(product.stock)
    const inStock = stock > 0
    const isSubscribed = purchaseType === 'subscribe'
    const unitPrice = isSubscribed ? price * (1 - SUBSCRIBE_DISCOUNT) : price
    const total = unitPrice * quantity

    const selectedGrind = grind ?? product.grind
    const grindOptions = getGrindOptions(product.grind)

    async function handleAddToCart() {
        // Subscription isn't stored anywhere yet, so only product, grind and quantity are sent.
        // The server calculates the price from product_id.
        try {
            await addItem({ product_id: product.id, grind: selectedGrind, quantity })
            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
        } catch (err) {
            console.error('Failed to add to cart:', err)
        }
    }

    return (
        <section className='main-bg'>
            {/* Breadcrumb + harvest tags */}
            <div className='uppercase flex items-center justify-between p-12'>
                <p>
                    <Link to='/products' className='hover:text-[#f5b44c]'>← Return to reserve shop</Link>
                    {' / '}Reserve cellar ({lotCount} {lotCount === 1 ? 'lot' : 'lots'}){' / '}Highland dispatch
                </p>
                <div className='text-[#B5A9A4]'>
                    <p>Reserves / {product.product_type} / {product.name} ({product.product_code})</p>
                </div>
                <div className='flex'>
                    {extras.harvest && (
                        <p className='p-1.5 uppercase text-[#FCBA5F] font-label text-sm backdrop-blur-md border border-white/10 bg-white/5'>{extras.harvest}</p>
                    )}
                    {extras.elevation && <p className='p-1.5 text-[#D1C4BF]'>{extras.elevation}</p>}
                </div>
            </div>

            <div className='grid gap-10 px-12 pb-12 lg:grid-cols-2'>
                {/* LEFT: gallery */}
                <div>
                    <div className='relative overflow-hidden rounded-2xl'>
                        <img
                            src={getImageUrl(gallery[activeImage])}
                            alt={product.name}
                            className='w-full h-full rounded-2xl object-contain transition-transform duration-300 hover:scale-105'
                        />
                        {extras.origin && (
                            <div className='absolute top-4 left-4 p-2 rounded-xl backdrop-blur-md border border-white/10 bg-white/5'>
                                <p className='text-xs uppercase text-[#FCBA5F] font-label'>Pre-certified</p>
                                <p className='text-xs text-[#D1C4BF]'>{extras.origin}</p>
                            </div>
                        )}
                        {extras.elevation && (
                            <div className='absolute bottom-4 left-4 p-2 rounded-xl backdrop-blur-md border border-white/10 bg-white/5'>
                                <p className='text-xs uppercase text-[#9b9897]'>Harvest elevation</p>
                                <p className='font-head text-white'>{extras.elevation}</p>
                            </div>
                        )}
                    </div>

                    {/* Thumbnails only appear once a product has more than one image */}
                    {gallery.length > 1 && (
                        <div className='mt-4 flex gap-3'>
                            {gallery.map((img, i) => (
                                <button
                                    key={img}
                                    type='button'
                                    onClick={() => setActiveImage(i)}
                                    className={`w-20 h-20 overflow-hidden rounded-xl border-2 ${i === activeImage ? 'border-[#FCBA5F]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={getImageUrl(img)} alt={`${product.name} view ${i + 1}`} className='w-full h-full object-cover' />
                                </button>
                            ))}
                        </div>
                    )}

                    {extras.terroir && (
                        <div className='mt-4 p-4 rounded-xl bg-[#292321]'>
                            <p className='uppercase font-label font-bold text-white'>Protected highland micro-climate</p>
                            <p className='text-sm text-[#9b9897]'>{extras.terroir}</p>
                        </div>
                    )}
                </div>

                {/* RIGHT: details + purchase */}
                <div>
                    <div className='flex flex-wrap gap-x-3 text-sm uppercase text-[#9b9897]'>
                        <p>{product.product_code}</p>
                        <p>{product.product_type}</p>
                        {extras.origin && <p>{extras.origin}</p>}
                    </div>
                    <h1 className='font-head text-3xl text-white font-bold'>{product.name}</h1>

                    <div className='p-2.5 rounded-xl'>
                        <div className='flex bg-[#292321] p-2.5 rounded-xl justify-baseline'>
                            <h1 className='font-head text-lg md:text-xl lg:text-2xl text-[#FCBA5F] font-bold'>{money(price)}</h1>
                            <p className='text-[#9b9897] items-end'>/ {product.weight}</p>
                        </div>
                        {extras.cuppingScore && (
                            <div className='bg-transparent backdrop-blur-lg'>
                                <p className='font-label font-bold text-white'>Cupping Score: {extras.cuppingScore}</p>
                                <p className='text-[#9b9897]'>(SCA Certified)</p>
                            </div>
                        )}
                    </div>

                    <p className='text-[#9b9897]'>Primary Cupping Descriptors</p>
                    <div className='flex flex-wrap'>
                        {descriptors.map((d) => (
                            <p key={d} className='p-1.5 text-white rounded-xl font-label font-bold'>{d}</p>
                        ))}
                    </div>
                    <p className='text-[#9b9897]'>{product.description}</p>

                    {/* Roast profile */}
                    <div className='mt-6 p-4 rounded-xl bg-[#292321]'>
                        <div className='flex items-center justify-between'>
                            <p className='uppercase text-sm font-label font-bold text-white'>Flame drum roasting telemetry</p>
                            <p className='text-sm uppercase text-[#FCBA5F]'>{product.roast_profile}</p>
                        </div>
                        {extras.roastStages && (
                            <>
                                <div className='mt-3 flex h-2 overflow-hidden rounded-full'>
                                    {extras.roastStages.map((s) => (
                                        <div key={s.label} className={s.color} style={{ flex: s.flex }} />
                                    ))}
                                </div>
                                <div className='mt-2 flex text-xs text-[#9b9897]'>
                                    {extras.roastStages.map((s) => (
                                        <p key={s.label} style={{ flex: s.flex }}>{s.label}</p>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Grind */}
                    <div className='mt-6'>
                        <p className='uppercase text-sm font-label font-bold text-white'>Grind milling profile</p>
                        <div className='mt-2 grid grid-cols-2 gap-2 md:grid-cols-4'>
                            {grindOptions.map((g) => (
                                <OptionCard
                                    key={g.title}
                                    selected={selectedGrind === g.title}
                                    onClick={() => setGrind(g.title)}
                                    title={g.title}
                                    subtitle={g.subtitle}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Package: one weight per product in the database, so this is display-only */}
                    <div className='mt-6'>
                        <p className='uppercase text-sm font-label font-bold text-white'>Packaging consignment size</p>
                        <div className='mt-2 rounded-xl border border-[#FCBA5F] bg-[#FCBA5F]/10 p-3'>
                            <p className='text-sm font-label font-bold text-white'>{product.weight}</p>
                            <p className='mt-1 text-sm text-[#FCBA5F]'>{money(price)}</p>
                        </div>
                    </div>

                    {/* Purchase type (subscription is front-end only for now) */}
                    <div className='mt-6 flex flex-col gap-2' role='radiogroup'>
                        <PurchaseOption
                            selected={!isSubscribed}
                            onClick={() => setPurchaseType('one-time')}
                            title='One-time consignment'
                            subtitle='Standard cold-chain dispatch'
                            price={money(price)}
                        />
                        <PurchaseOption
                            selected={isSubscribed}
                            onClick={() => setPurchaseType('subscribe')}
                            title='Subscribe & conserve 15%'
                            subtitle='Flexible cadence · complimentary cold-chain dispatch'
                            badge='Highland Guild'
                            price={money(price * (1 - SUBSCRIBE_DISCOUNT))}
                            priceNote='/ dispatch'
                        />
                    </div>

                    {/* Quantity + add to cart */}
                    <div className='mt-6 flex items-stretch gap-3'>
                        <QuantityStepper value={quantity} onChange={setQuantity} max={stock} disabled={!inStock} />
                        <button
                            type='button'
                            disabled={!inStock}
                            onClick={handleAddToCart}
                            className='flex-1 rounded-xl bg-[#FCBA5F] px-4 py-3 font-label font-bold uppercase text-[#292321] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50'
                        >
                            {!inStock ? 'Out of stock' : added ? 'Added to consignment ✓' : `Add to consignment • ${money(total)}`}
                        </button>
                    </div>

                    <ul className='mt-6 flex flex-col gap-2 text-sm text-[#9b9897]'>
                        {FOOTER_NOTES.map((note) => (
                            <li key={note}>• {note}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

function OptionCard({ selected, onClick, title, subtitle }) {
    return (
        <button
            type='button'
            onClick={onClick}
            aria-pressed={selected}
            className={`rounded-xl border p-3 text-left transition ${selected ? 'border-[#FCBA5F] bg-[#FCBA5F]/10' : 'border-white/10 bg-[#292321] hover:border-white/30'}`}
        >
            <p className='text-sm font-label font-bold text-white'>{title}</p>
            <p className='text-xs text-[#9b9897]'>{subtitle}</p>
        </button>
    )
}

function PurchaseOption({ selected, onClick, title, subtitle, price, priceNote, badge }) {
    return (
        <button
            type='button'
            onClick={onClick}
            role='radio'
            aria-checked={selected}
            className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${selected ? 'border-[#FCBA5F] bg-[#FCBA5F]/10' : 'border-white/10 bg-[#292321] hover:border-white/30'}`}
        >
            <div>
                <div className='flex items-center gap-2'>
                    <p className='font-label font-bold uppercase text-white'>{title}</p>
                    {badge && <span className='rounded bg-[#FCBA5F] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#292321]'>{badge}</span>}
                </div>
                <p className='text-xs text-[#9b9897]'>{subtitle}</p>
            </div>
            <div className='text-right'>
                <p className='font-head text-white'>{price}</p>
                {priceNote && <p className='text-xs text-[#9b9897]'>{priceNote}</p>}
            </div>
        </button>
    )
}