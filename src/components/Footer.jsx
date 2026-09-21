import { Link } from 'react-router-dom';

function Footer() {

  return (
    <div>
      <footer className='flex item-center justify-between p-12 bg-linear-to-r from-[#120b08] via-[#1a110d] to-[#211611] text-white gap-5'>
        <div className="max-w-md space-y-6">
          <h1 className="font-head text-4xl font-extrabold">Mondulkiri</h1>

          <p className="text-[#837565]">
            Hand-harvested Arabica and Robusta cultivated in volcanic red soil beneath Cambodia's misty rainforest canopy.
            Grounded agricultural luxury, honorably sourced.
          </p>

          {/* Left-aligned row with dot vertically centered with text */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 shrink-0 bg-[#FCBA5F] rounded-full"></span>
            <p className="text-[#FCBA5F] font-medium">Highland Altitude: 800m - 1,050m</p>
          </div>
        </div>

        <div className='pb-3.5 font-body text-white font-semibold'>
          <h3 className='uppercase'>The collection</h3>
          <ul className='space-y-1.5 font-body text-[#837565]'>
            <li className='pt-0.5 transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'> <Link to="#"> Reserve Peaberry </Link></li>
            <li className='pt-0.5 transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'> <Link to="#"> Volcanic Honey Process </Link></li>
            <li className='pt-0.5 transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'> <Link to="#"> Highland Dark Roast </Link></li>
            <li className='pt-0.5 transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'> <Link to="#"> Bousra Estate Caturra </Link></li>
            <li className='pt-0.5 transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'> <Link to="#"> Artisan Tasting Packs </Link></li>
          </ul>
        </div>

        <div className='pb-3.5 font-body text-white font-semibold'>
          <h3 className='uppercase'>Origin & Craft</h3>
          <ul className='space-y-1.5 font-body text-[#837565]'>
            <li className='pt-0.5 transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'> <Link to="#">The Indigenous Collective </Link></li>
            <li className='pt-0.5 transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'> <Link to="#">Sen Monorom Highlands </Link></li>
            <li className='pt-0.5 transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'> <Link to="#">Phnong Farmer Partnership </Link></li>
            <li className='pt-0.5 transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'> <Link to="#">Phin & Pour-Over Ratios </Link></li>
            <li className='pt-0.5 transition-all duration-300 hover:-translate-y-1 hover:text-[#FFEEDD]'> <Link to="#">Phin & Pour-Over Ratios </Link></li>
          </ul>
        </div>

        <div className='max-w-100'>
          <h3 className='uppercase font-bold font-body pb-2.5'>Micro-Lot Newsletter</h3>
          <p className='text-[#837565] pb-2.5'>
            Receive notes from each micro-lot harvest, seasonal cupping announcements, and exclusive reserve drops.
          </p>
          <form action="" method='post'>
            <input className='p-1.5 rounded-xs border border-white/10
             bg-white/5 backdrop-blur-md' type="email" name='user_email' placeholder='Enter your email address' />
            <button className='ml-1.5 p-1.5 uppercase font-semibold rounded-xs bg-[#d99b43] text-white'>subscribe</button>
          </form>
          <p className='text-[#837565] pt-3'>location</p>
          <p className='text-[#837565]'>Bousra Roastery • Sen Monorom • Mondulkiri, Cambodia</p>
        </div>
      </footer>

    <div className='bg-linear-to-r from-[#120b08] via-[#1a110d] to-[#211611]'>
      <span className="flex w-5/6 h-1 bg-[#231A0F] mx-auto"></span>
    </div>


      <div className='bg-linear-to-r from-[#120b08] via-[#1a110d] to-[#211611] text-[#837565] p-12 flex justify-between items-center'>
        <p>© 2025 Mondulkiri Coffee Co. Preserving Cambodian Highland Terroir.</p>
        <div className='flex gap-2.5'>
          <p>Fair Trade Charter</p>
          <p>Sustainability</p>
          <p>Ethical Sourcing</p>
        </div>
      </div>
    </div>


  )
}

export default Footer
