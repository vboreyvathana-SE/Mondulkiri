import { useEffect, useState } from 'react'
import { getProducts } from '../../services/productService'
import UpsellCard from './UpsellCard'

// Suggests up to 3 products that are not already in the cart.
// Same pattern as Products.jsx: this component fetches, UpsellCard only displays.
export default function UpsellSection({ excludeIds, onAdd }) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        let ignore = false
        getProducts()
            .then((data) => {
                if (!ignore) setProducts(data)
            })
            .catch((err) => console.error('Failed to load suggestions:', err))
        return () => {
            ignore = true
        }
    }, [])

    const inCart = new Set(excludeIds.map(String))
    const suggestions = products
        .filter((p) => !inCart.has(String(p.id)) && Number(p.stock) > 0)
        .slice(0, 3)

    if (suggestions.length === 0) return null

    return (
        <section className='mt-12'>
            <div className='mb-4 flex flex-wrap items-end justify-between gap-4'>
                <div>
                    <p className='font-label text-xs uppercase text-amber-500'>Highland brewing equipment</p>
                    <h2 className='font-head text-2xl text-white'>Complement Your Cupping Ritual</h2>
                </div>
                <p className='max-w-sm text-sm text-[#9b9897]'>
                    Pair your whole-bean micro-lots with traditional extraction tools crafted for dense highland Arabica.
                </p>
            </div>
            <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {suggestions.map((p) => (
                    <UpsellCard key={p.id} product={p} onAdd={onAdd} />
                ))}
            </ul>
        </section>
    )
}