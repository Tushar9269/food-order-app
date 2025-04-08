import Image from "next/image";

export default function Hero() {
    return (
        <section className="hero mt-4 relative">

            <div className="py-12">
                <h1 className="text-5xl">
                    Savor the <br/> Flavors of the <br/>
                    <span className="text-[#f13a01]"> NORTH EAST </span>
                </h1>
                <p className="mt-12 my-6 text-gray-500 text-sm text-left pr-8">
                Welcome to NORTH EAST CANTEEN, where North East cuisine comes alive. Enjoy authentic dishes made with love, bold flavors, and fresh ingredients. Join us for a meal that celebrates our vibrant culinary heritage!
                </p>
            </div>

            <div className="relative hidden md:block">
                <Image
                    src={'/HomePage.png'}
                    alt={'best dish'}
                    layout={'fill'} objectFit={'contain'}
                />
            </div>

        </section>
    );
}
