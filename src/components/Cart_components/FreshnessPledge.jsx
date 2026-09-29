import { useState } from 'react'

export default function FreshnessPledge() {
    // Not saved anywhere yet: it needs a note column on the orders table.
    const [note, setNote] = useState('')

    return (
        <div className='rounded-xl bg-[#292321] p-4'>
            <p className='font-label font-bold text-white'>Highland cupper's pledge & freshness guarantee</p>
            <p className='mt-1 text-sm text-[#9b9897]'>
                Every bean is cured on our Sen Monorom sorting tables, roasted within 72 hours of consignment packaging, and sealed with a one-way degassing diaphragm valve.
            </p>

            <details className='mt-4 rounded-lg bg-[#171311] p-3'>
                <summary className='cursor-pointer text-sm uppercase text-white'>
                    Add hand-inscribed tasting parchment note (complimentary)
                </summary>
                <label className='mt-3 block text-xs text-[#9b9897]'>
                    Your message
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        maxLength={200}
                        rows={3}
                        className='mt-1 w-full rounded bg-[#292321] p-2 text-sm text-white'
                    />
                </label>
                <p className='text-right text-xs text-[#9b9897]'>{note.length}/200</p>
            </details>
        </div>
    )
}