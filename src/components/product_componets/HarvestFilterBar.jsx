import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function HarvestFilterBar({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  sortOption,
  setSortOption,
  categories = [],
}) {
  return (
    <section className="w-full bg-[#120b08] px-6 pb-8">
      <div className="w-full bg-[#1a110d] border border-white/5 rounded-xl p-4 md:p-6 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4">

        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full lg:w-1/3 relative"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm"
          />

          <input
            type="text"
            placeholder="Search single origins, cupping notes, lots..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs font-body text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </form>

        {/* Category Filters */}
        <div className="w-full lg:w-auto flex flex-wrap items-center gap-2 overflow-x-auto py-1">

          <button
            onClick={() => setTypeFilter("all")}
            className={`px-4 py-2 rounded-lg text-xs font-label uppercase tracking-wider font-semibold transition-all cursor-pointer whitespace-nowrap ${typeFilter === "all"
                ? "bg-[#FCBA5F] text-[#120b08]"
                : "bg-white/5 text-stone-400 border border-white/5 hover:bg-white/10 hover:text-stone-200"
              }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setTypeFilter(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-label uppercase tracking-wider font-semibold transition-all cursor-pointer whitespace-nowrap ${typeFilter === cat.id
                  ? "bg-[#FCBA5F] text-[#120b08]"
                  : "bg-white/5 text-stone-400 border border-white/5 hover:bg-white/10 hover:text-stone-200"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="w-full lg:w-auto flex items-center justify-end gap-3 shrink-0">

          <span className="font-label text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
            Sort By:
          </span>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-black/40 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-xs font-label uppercase tracking-wider font-bold text-stone-200 focus:outline-none focus:border-amber-500/50 cursor-pointer"
            >
              <option value="product_code">
                Product Code
              </option>

              <option value="featured">
                Featured Reserve
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>
            </select>

            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs pointer-events-none"
            />
          </div>
        </div>

      </div>
    </section>
  );
}