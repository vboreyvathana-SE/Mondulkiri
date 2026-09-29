export default function QuantityStepper({
    value,
    onChange,
    min = 1,
    max = Infinity,
    disabled = false,
    compact = false,
    className = 'bg-[#292321]',
}) {
    const padding = compact ? 'px-3 py-1.5' : 'px-4 py-3'

    return (
        <div className={`flex items-center rounded-xl ${className}`}>
            <button
                type='button'
                aria-label='Decrease quantity'
                disabled={disabled || value <= min}
                onClick={() => onChange(value - 1)}
                className={`${padding} text-white disabled:opacity-40`}
            >
                −
            </button>
            <span className='w-8 text-center text-white'>{value}</span>
            <button
                type='button'
                aria-label='Increase quantity'
                disabled={disabled || value >= max}
                onClick={() => onChange(value + 1)}
                className={`${padding} text-white disabled:opacity-40`}
            >
                +
            </button>
        </div>
    )
}