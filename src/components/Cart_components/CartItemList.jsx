import CartItem from './CartItem'

export default function CartItemList({ items, onQuantityChange, onGrindChange, onRemove }) {
    return (
        <ul className='flex flex-col gap-4'>
            {items.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={onQuantityChange}
                    onGrindChange={onGrindChange}
                    onRemove={onRemove}
                />
            ))}
        </ul>
    )
}