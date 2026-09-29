import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'
import CartHeader from '../components/Cart_components/CartHeader'
import FreeDispatchBanner from '../components/Cart_components/FreeDispatchBanner'
import CartItemList from '../components/Cart_components/CartItemList'
import FreshnessPledge from '../components/Cart_components/FreshnessPledge'
import OrderSummary from '../components/Cart_components/OrderSummary'
import IncludedGift from '../components/Cart_components/IncludedGift'
import UpsellSection from '../components/Cart_components/Upsellsection'

export default function Cart() {
    const {
        cart,
        loading,
        error,
        actionError,
        promoError,
        updateQuantity,
        updateGrind,
        removeItem,
        addToCart,
        setShipping,
        applyPromo,
    } = useCart()

    if (loading) return <p className='main-bg p-12 text-[#D1C4BF]'>Loading your consignment...</p>
    if (error) return <p className='main-bg p-12 text-[#D1C4BF]'>{error}</p>

    const { items, summary } = cart

    function handleCheckout() {
        // Checkout / orders aren't built yet.
        console.log('Checkout: not built yet')
    }

    return (
        <section className='main-bg px-6 py-8 text-white'>
            <div className='mx-auto max-w-7xl'>
                <CartHeader lotCount={items.length} />

                {actionError && (
                    <p role='alert' className='mb-4 rounded-lg bg-red-950/60 p-3 text-sm text-red-300'>{actionError}</p>
                )}

                {items.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className='grid gap-6 lg:grid-cols-[1fr_380px]'>
                        <div className='flex flex-col gap-4'>
                            <FreeDispatchBanner
                                subtotal={summary.subtotal}
                                threshold={summary.free_dispatch_threshold}
                                unlocked={summary.dispatch_unlocked}
                            />
                            <CartItemList
                                items={items}
                                onQuantityChange={updateQuantity}
                                onGrindChange={updateGrind}
                                onRemove={removeItem}
                            />
                            <FreshnessPledge />
                        </div>

                        <aside className='flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start'>
                            <OrderSummary
                                summary={summary}
                                promoError={promoError}
                                onShippingChange={setShipping}
                                onApplyPromo={applyPromo}
                                onCheckout={handleCheckout}
                            />
                            <IncludedGift />
                        </aside>
                    </div>
                )}

                <UpsellSection excludeIds={items.map((i) => i.product_id)} onAdd={addToCart} />
            </div>
        </section>
    )
}

function EmptyCart() {
    return (
        <div className='rounded-xl bg-[#292321] p-10 text-center'>
            <p className='font-head text-xl text-white'>Your consignment is empty</p>
            <p className='mt-1 text-sm text-[#9b9897]'>Add a micro-lot from the reserve shop to begin.</p>
            <Link
                to='/products'
                className='mt-4 inline-block rounded-lg bg-[#f5b44c] px-5 py-2 text-sm font-bold uppercase text-[#292321] hover:bg-[#ffc15c]'
            >
                Browse the reserve
            </Link>
        </div>
    )
}