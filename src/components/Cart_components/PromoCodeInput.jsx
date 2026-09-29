import { useState } from 'react'

export default function PromoCodeInput({ appliedCode, error, onApply }) {
    const [code, setCode] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        const ok = await onApply(code)
        if (ok) setCode('')
    }

    return (
        <form onSubmit={handleSubmit} className='mt-4'>
            <div className='flex'>
                <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder='Promo or tasting club key'
                    aria-label='Promo code'
                    className='min-w-0 flex-1 rounded-l-lg bg-[#171311] px-3 py-2 text-sm text-white placeholder:text-[#6f6a68]'
                />
                <button
                    type='submit'
                    className='rounded-r-lg bg-[#171311] px-4 text-xs font-bold uppercase text-[#f5b44c] hover:brightness-125'
                >
                    Apply
                </button>
            </div>
            {error && <p role='alert' className='mt-1 text-xs text-red-400'>{error}</p>}
            {appliedCode && !error && <p className='mt-1 text-xs text-[#f5b44c]'>Code {appliedCode} applied.</p>}
        </form>
    )
}