// Grind choices offered besides the product's own recommended grind (products.grind).
// Shared by the product detail page and the cart so "Coarse" means the same thing in both.
export const GRIND_ALTERNATIVES = [
    { title: 'Coarse', subtitle: 'French Press & Chemex' },
    { title: 'Medium', subtitle: 'Drip / V60' },
    { title: 'Fine', subtitle: 'Espresso / Aeropress' },
]

export function getGrindOptions(productGrind) {
    return [{ title: productGrind, subtitle: 'Recommended' }, ...GRIND_ALTERNATIVES]
}