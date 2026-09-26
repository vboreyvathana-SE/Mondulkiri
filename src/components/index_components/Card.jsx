import React from 'react'

export default function Card() {
    return (
        <div className='w-full main-bg'>
            <header class="mx-auto flex max-w-7xl items-end justify-between gap-8 px-6 py-8">
                <div class="flex flex-col">
                    <span class="text-sm font-semibold text-amber-500 font-label">The Micro-Lot Trio</span>
                    <h1 class="text-3xl font-bold text-white font-head">Our Signature Estate Harvests</h1>
                </div>

                <p class="max-w-md text-zinc-400 font-body">
                    Three distinct expressions of Mondulkiri province: from rare spherical Peaberry to sun-dried Red Honey and intense Highland Dark.
                </p>
            </header>
            <div className='main-bg]'>
                <span className="flex w-5/6 h-1 bg-[#27221b] mx-auto"></span>
            </div>
        </div>
    )
}
