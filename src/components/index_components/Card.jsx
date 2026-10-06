import Products from "../../components/product_componets/Products";

export default function Card() {
    return (
        <section className="main-bg px-6 py-8">

            <header className="max-w-7xl mx-auto flex items-end justify-between gap-8 py-8">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-amber-500 font-label">
                        The Micro-Lot Trio
                    </span>

                    <h1 className="text-3xl font-bold text-white font-head">
                        Our Signature Estate Harvests
                    </h1>
                </div>

                <p className="max-w-md text-zinc-400 font-body">
                    Three distinct expressions of Mondulkiri province: from rare
                    spherical Peaberry to sun-dried Red Honey and intense
                    Highland Dark.
                </p>
            </header>

            <div className="w-5/6 h-1 bg-[#27221b] mx-auto mb-8"></div>

            <div className="max-w-350 mx-auto">
                <Products limit={3} />
            </div>

        </section>
    );
}