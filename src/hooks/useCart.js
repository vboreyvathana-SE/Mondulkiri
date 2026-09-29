import { useCallback, useEffect, useState } from 'react'
import * as cartService from '../services/cartService'

// Holds the cart for the Cart page. Every action calls the service, and the service
// returns the full updated cart, so the server (or mock) stays the source of truth.
export default function UseCart() {
    const [cart, setCart] = useState(null) // { items, summary }
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null) // the cart couldn't load at all
    const [actionError, setActionError] = useState(null) // a change failed, cart still shown
    const [promoError, setPromoError] = useState(null)

    useEffect(() => {
        let ignore = false
        cartService
            .getCart()
            .then((data) => {
                if (!ignore) setCart(data)
            })
            .catch((err) => {
                console.error('Failed to load cart:', err)
                if (!ignore) setError("We couldn't load your consignment. Try again later.")
            })
            .finally(() => {
                if (!ignore) setLoading(false)
            })
        return () => {
            ignore = true
        }
    }, [])

    const run = useCallback(async (action) => {
        setActionError(null)
        try {
            setCart(await action())
            return true
        } catch (err) {
            console.error(err)
            setActionError(err.message || 'Something went wrong. Please try again.')
            return false
        }
    }, [])

    const applyPromo = useCallback(async (code) => {
        setPromoError(null)
        try {
            setCart(await cartService.applyPromo(code))
            return true
        } catch (err) {
            setPromoError(err.message)
            return false
        }
    }, [])

    return {
        cart,
        loading,
        error,
        actionError,
        promoError,
        updateQuantity: (id, quantity) => run(() => cartService.updateItem(id, { quantity })),
        updateGrind: (id, grind) => run(() => cartService.updateItem(id, { grind })),
        removeItem: (id) => run(() => cartService.removeItem(id)),
        addToCart: (product) => run(() => cartService.addItem({ product_id: product.id, grind: product.grind })),
        setShipping: (method) => run(() => cartService.setShippingMethod(method)),
        applyPromo,
    }
}