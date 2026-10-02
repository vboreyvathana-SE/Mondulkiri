import ContactHero from "../components/contact_components/ContactHero";
import InquiryForm from "../components/contact_components/InquiryForm";
import QuickContactCards from "../components/contact_components/QuickContactCards";
import LocationCard from "../components/contact_components/LocationCard";
import GlobalAlliances from "../components/contact_components/GlobalAlliances";
import TerrainSection from "../components/contact_components/TerrainSection";
import FaqSection from "../components/contact_components/FaqSection";
import SamplerBanner from "../components/contact_components/SamplerBanner";
import { locations } from "../components/contact_components/contactData";

export default function Contact() {
  return (
    <main className="bg-[#18120f] font-body text-[#ede0da]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <ContactHero />

        {/* form on the left, locations on the right */}
        <section className="grid grid-cols-1 items-start gap-6 pb-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <InquiryForm />
            <QuickContactCards />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
            <GlobalAlliances />
          </div>
        </section>

        <TerrainSection />
        <FaqSection />
        <SamplerBanner />
      </div>
    </main>
  );
}
