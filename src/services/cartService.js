import { getProducts } from './productService'

// TEMPORARY MOCK CART.
// It behaves like the future PHP cart API so the React side can be finished first:
//   - it stores only lines { product_id, grind, quantity } (like a cart_items table)
//   - it reads name/image/price/stock from the real products table on every call
//   - it calculates subtotal, dispatch, VAT and total itself (the server's job later)
// Every function returns the whole cart: { items, summary }.
// When the PHP endpoints exist, replace each function body with a fetch() call
// and keep the return shape. Nothing else in the front-end has to change.

const STORAGE_KEY = 'mondulkiri_mock_cart'

const FREE_DISPATCH_THRESHOLD = 60
const STANDARD_DISPATCH_FEE = 5 // placeholder, pick your real fee
const PRIORITY_FEE = 12
const VAT_RATE = 0.08
const PROMO_CODES = { CUPPER10: 0.1 } // test code: 10% off
const SHIPPING_METHODS = ['carbon-neutral', 'priority']

const round2 = (n) => Math.round(n * 100) / 100
const lineId = (productId, grind) => `${productId}|${grind}`

function readState() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
        if (saved && Array.isArray(saved.lines)) return saved
    } catch {
        // ignore broken storage and start fresh
    }
    return { lines: [], shipping_method: 'carbon-neutral', promo_code: null }
}

function writeState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
        // storage full or blocked: the cart just won't persist
    }
}

function buildCart(state, byId) {
    const items = state.lines.flatMap((line) => {
        const p = byId.get(String(line.product_id))
        const stock = Number(p?.stock)
        if (!p || !(stock > 0)) return [] // product deleted or sold out: drop the line

        const price = Number(p.price)
        const quantity = Math.min(line.quantity, stock)
        return [{
            id: line.id,
            product_id: p.id,
            product_code: p.product_code,
            product_type: p.product_type,
            name: p.name,
            image: p.image,
            flavor_notes: p.flavor_notes,
            roast_profile: p.roast_profile,
            weight: p.weight,
            default_grind: p.grind,
            grind: line.grind,
            stock,
            price,
            quantity,
            line_total: round2(price * quantity),
        }]
    })

    const hasItems = items.length > 0
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = round2(items.reduce((sum, i) => sum + i.line_total, 0))
    const discount = round2(subtotal * (PROMO_CODES[state.promo_code] ?? 0))
    const dispatchUnlocked = subtotal >= FREE_DISPATCH_THRESHOLD
    const dispatchFee = hasItems && !dispatchUnlocked ? STANDARD_DISPATCH_FEE : 0
    const priorityFee = hasItems && state.shipping_method === 'priority' ? PRIORITY_FEE : 0
    const vat = round2((subtotal - discount) * VAT_RATE)
    const total = round2(subtotal - discount + dispatchFee + priorityFee + vat)

    return {
        items,
        summary: {
            item_count: itemCount,
            subtotal,
            promo_code: state.promo_code,
            discount,
            dispatch_unlocked: dispatchUnlocked,
            free_dispatch_threshold: FREE_DISPATCH_THRESHOLD,
            dispatch_fee: dispatchFee,
            shipping_method: state.shipping_method,
            priority_fee: priorityFee,
            priority_fee_price: PRIORITY_FEE,
            vat,
            total,
        },
    }
}

// Loads products + saved lines, applies one change, saves, returns the fresh cart.
async function withState(mutate) {
    const products = await getProducts()
    const byId = new Map(products.map((p) => [String(p.id), p]))
    const state = readState()
    mutate(state, byId)
    writeState(state)
    return buildCart(state, byId)
}

export function getCart() {
    return withState(() => {})
}

export function addItem({ product_id, grind, quantity = 1 }) {
    return withState((state, byId) => {
        const p = byId.get(String(product_id))
        if (!p) throw new Error('Product not found.')
        const stock = Number(p.stock)
        if (!(stock > 0)) throw new Error('This product is out of stock.')

        const chosenGrind = grind ?? p.grind
        const id = lineId(p.id, chosenGrind)
        const existing = state.lines.find((l) => l.id === id)
        if (existing) {
            existing.quantity = Math.min(existing.quantity + quantity, stock)
        } else {
            state.lines.push({ id, product_id: p.id, grind: chosenGrind, quantity: Math.min(quantity, stock) })
        }
    })
}

export function updateItem(id, changes) {
    return withState((state, byId) => {
        const line = state.lines.find((l) => l.id === id)
        if (!line) return
        const stock = Number(byId.get(String(line.product_id))?.stock ?? 1)

        if (Number.isFinite(changes.quantity)) {
            line.quantity = Math.max(1, Math.min(changes.quantity, stock))
        }

        if (changes.grind && changes.grind !== line.grind) {
            const newId = lineId(line.product_id, changes.grind)
            const other = state.lines.find((l) => l.id === newId)
            if (other) {
                // same product + grind already in the cart: merge the two lines
                other.quantity = Math.min(other.quantity + line.quantity, stock)
                state.lines = state.lines.filter((l) => l !== line)
            } else {
                line.grind = changes.grind
                line.id = newId
            }
        }
    })
}

export function removeItem(id) {
    return withState((state) => {
        state.lines = state.lines.filter((l) => l.id !== id)
    })
}

export function applyPromo(code) {
    return withState((state) => {
        const clean = (code ?? '').trim().toUpperCase()
        if (clean && !Object.hasOwn(PROMO_CODES, clean)) {
            throw new Error("That code isn't valid.")
        }
        state.promo_code = clean || null
    })
}

export function setShippingMethod(method) {
    return withState((state) => {
        if (!SHIPPING_METHODS.includes(method)) throw new Error('Unknown dispatch option.')
        state.shipping_method = method
    })
}