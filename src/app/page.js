import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";


export default function Home() {
  return (
    <>
      <Hero/>
      <HomeMenu/>
      <section className="text-center my-16" id="about">
        <SectionHeaders
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
          Welcome to Northeast Haos Canteen, where tradition meets flavor! We bring you the authentic taste of Northeast India, serving dishes that celebrate our rich culinary heritage.          </p>
          <p>
          At Northeast Haos Canteen, we believe in using fresh, locally sourced ingredients to craft meals that feel like home. Whether you’re craving a comforting bowl of smoked meat curry, aromatic bamboo shoot dishes, or classic street-style delights, we’ve got something to satisfy your taste buds.
          </p>
          <p>
          Join us for a meal and experience the warmth of our hospitality, the richness of our culture, and the unforgettable flavors of the Northeast.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+919876543210">
            +91 98765 43210
          </a>
        </div>
      </section>
    </>
  );
}
