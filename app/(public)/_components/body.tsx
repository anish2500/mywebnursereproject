'use client';

const monsteraImg = '/images/bs.webp';
const succulentImg = '/images/bs2.jpg';
const bonsaiImg = '/images/bs3.jpg';
const nurseryBg = '/images/farm1.jpg';

export default function Body() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        id="home"
        className="relative text-white text-center flex items-center justify-center
                   px-4 py-16 min-h-[60vh]
                   bg-linear-to-br from-[#4caf50] to-[#a5d6a7]
                   md:py-24 md:min-h-[70vh]
                   lg:py-32 lg:min-h-[80vh]"
        style={{
          backgroundImage: `url(${nurseryBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-[1]" />

        {/* Content */}
        <div className="relative z-[2] max-w-[600px] mx-auto
                        xl:max-w-[800px]">
          <h2 className="text-[2rem] leading-tight mb-4 font-bold
                         sm:text-[2.5rem]
                         md:text-[3rem]
                         lg:text-[3.5rem]
                         xl:text-[4rem]">
            Bring Nature Home
          </h2>

          <p className="text-[1.1rem] leading-relaxed mb-8
                        sm:text-[1.2rem]
                        md:text-[1.25rem]
                        lg:text-[1.3rem]">
            Discover the best selection of indoor and outdoor plants.
          </p>

          {/* Search */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4 mt-4
                       sm:flex-row sm:max-w-[500px] sm:mx-auto"
          >
            <div className="relative flex-1">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-[1.2rem]">
                search
              </span>
              <input
                type="text"
                placeholder="Search plants..."
                className="w-full p-4 pl-12 min-h-[52px] rounded-full
                           border border-white
                           bg-white/90 text-[#333]
                           placeholder:text-[#666]
                           text-base
                           focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button
              type="submit"
              className="min-h-[52px] px-8 py-4 rounded-full cursor-pointer
                         bg-[#00897b] text-white
                         font-semibold text-lg
                         transition-all duration-300
                         hover:bg-[#26a69a] hover:shadow-lg
                         focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* FEATURES */}
      <section
        className="bg-white px-4 py-12
                   sm:flex sm:flex-wrap sm:justify-center sm:gap-8 sm:py-16
                   lg:px-8 lg:py-20
                   xl:px-12 xl:py-24"
      >
        {[
          {
            title: 'Fresh & Healthy',
            text: 'All plants are grown with love and care.',
          },
          {
            title: 'Eco-friendly Packaging',
            text: 'We ensure minimal environmental footprint.',
          },
          {
            title: 'Fast Delivery',
            text: 'Get your plants delivered at your doorstep quickly.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="text-center p-4 mb-8
                       sm:flex-1 sm:max-w-[300px] sm:mb-0
                       lg:flex-[1_1_300px]"
          >
            <h3 className="text-[#4caf50] text-[1.3rem] mb-4 font-bold">
              {item.title}
            </h3>
            <p className="text-[#666] text-base leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </section>

      {/* SHOWCASE */}
      <section
        id="shop"
        className="bg-[#f8f9fa] text-center px-8 py-12
                   md:px-16 md:py-16
                   lg:px-20 lg:py-20
                   xl:px-24 xl:py-24"
      >
        <h2 className="text-[#2e7d32] text-[1.8rem] mb-8 leading-snug font-bold
                       md:text-[2rem]">
          Best Sellers
        </h2>

        <div
          className="flex flex-col items-center gap-6
                     md:flex-row md:justify-center md:gap-8
                     lg:gap-10
                     xl:gap-12"
        >
          {[
            { img: monsteraImg, title: 'Monstera Deliciosa' },
            { img: succulentImg, title: 'Assorted Succulents' },
            { img: bonsaiImg, title: 'Ficus Bonsai' },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl overflow-hidden
                         w-full max-w-[320px]
                         shadow-[0_4px_12px_rgba(0,0,0,0.1)]
                         transition-all duration-300
                         hover:-translate-y-1
                         hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]
                         md:w-[300px]
                         lg:w-[340px]
                         xl:w-[360px]"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-[200px] object-cover block"
              />
              <h4 className="text-[#4caf50] text-[1.1rem] p-4 m-0 font-semibold">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}