import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useCart from '../hooks/useCart'
import CartHeader from '../components/Cart_components/CartHeader'
import FreeDispatchBanner from '../components/Cart_components/FreeDispatchBanner'
import CartItemList from '../components/Cart_components/CartItemList'
import FreshnessPledge from '../components/Cart_components/FreshnessPledge'
import OrderSummary from '../components/Cart_components/OrderSummary'
import IncludedGift from '../components/Cart_components/IncludedGift'
import UpsellSection from '../components/Cart_components/Upsellsection'

import { isLoggedIn } from '../components/auth_components/authSession'
import { checkoutCart } from '../services/productService'

export default function Cart() {
    const navigate = useNavigate()
    const [checkoutError, setCheckoutError] = useState('')
    const [checkoutSuccess, setCheckoutSuccess] = useState('')
    const [isCheckingOut, setIsCheckingOut] = useState(false)

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
        clearCart,
    } = useCart()

    if (loading) return <p className='main-bg p-12 text-[#D1C4BF]'>Loading your consignment...</p>

    if (error) return <p className='main-bg p-12 text-[#D1C4BF]'>{error}</p>

    const { items, summary } = cart

    async function handleCheckout() {
        if (isCheckingOut) return

        setCheckoutError('')
        setCheckoutSuccess('')
        setIsCheckingOut(true)

        const loggedIn = await isLoggedIn();

        if (!loggedIn) {
            setIsCheckingOut(false)
            navigate("/login", {
                state: { from: "/cart" }
            });
            return;
        }

        try {
            const result = await checkoutCart(items)
            const cleared = await clearCart()

            if (!cleared) {
                throw new Error('Your order was recorded, but we could not clear the cart. Please refresh the page.')
            }

            setCheckoutSuccess(result.message || 'Your order has been recorded successfully.')
        } catch (err) {
            if (err.status === 401) {
                navigate('/login', { state: { from: '/cart' } })
                return
            }

            console.error('Checkout failed:', err)
            setCheckoutError(err.message || 'We could not record your order. Please try again.')
        } finally {
            setIsCheckingOut(false)
        }
    }

    return (
        <section className='main-bg px-6 py-8 text-white'>
            <div className='mx-auto max-w-7xl'>
                <CartHeader lotCount={items.length} />

                {actionError && (
                    <p role='alert' className='mb-4 rounded-lg bg-red-950/60 p-3 text-sm text-red-300'>{actionError}</p>
                )}

                {checkoutError && (
                    <p role='alert' className='mb-4 rounded-lg bg-red-950/60 p-3 text-sm text-red-300'>{checkoutError}</p>
                )}

                {checkoutSuccess && (
                    <p role='status' className='mb-4 rounded-lg bg-emerald-950/60 p-3 text-sm text-emerald-300'>{checkoutSuccess}</p>
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
                                isCheckingOut={isCheckingOut}
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
