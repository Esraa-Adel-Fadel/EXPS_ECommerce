import about from "../assets/images/about.jpg";
export const About = () => {
  return (
    <main className="min-h-screen bg-[#F7F3ED]">
     {/* Intro */}
<section className="px-6 py-14 md:py-20">
  <div className="mx-auto max-w-4xl text-center">

    {/* Small Label */}
    <p className="animate-[fadeIn_0.6s_ease-out] text-xs font-semibold uppercase tracking-[0.3em] text-[#df5612]">
      About LuxeLiving
    </p>

    {/* Divider */}
    <div className="mt-4 flex items-center justify-center gap-3">
      <span className="h-px w-10 origin-right animate-[scaleX_0.7s_ease-out] bg-stone-300" />

      <span className="animate-[fadeIn_0.8s_ease-out] text-sm text-[#df5612]">
        ✦
      </span>

      <span className="h-px w-10 origin-left animate-[scaleX_0.7s_ease-out] bg-stone-300" />
    </div>

    {/* Heading */}
    <h1 className="mt-5 animate-[slideUp_0.8s_ease-out] text-4xl font-semibold leading-tight text-stone-800 md:text-6xl">
      Your space should
      <br />
      <span className="font-normal italic text-[#df5612]">
        feel like you.
      </span>
    </h1>

    {/* Description */}
    <p className="mx-auto mt-5 max-w-2xl animate-[fadeIn_1s_ease-out_0.3s_both] text-sm leading-7 text-stone-600 md:text-base">
      We believe furniture is more than something you put in a room.
      It is where life happens, memories are made, and everyday moments
      become part of your story.
    </p>

  </div>
</section>
      {/* Our Story */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={about}
            alt="Elegant living room"
            className="h-full min-h-[400px] w-full object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#df5612]">
            Our Story
          </p>

          <h2 className="text-3xl font-semibold leading-tight text-stone-800 md:text-4xl">
            Furniture that brings comfort and character to your space.
          </h2>

          <p className="mt-5 leading-7 text-stone-600">
            LuxeLiving was created with a simple idea: finding beautiful
            furniture should be an enjoyable experience. We carefully select
            pieces that combine style, comfort, and practicality.
          </p>

          <p className="mt-4 leading-7 text-stone-600">
            From cozy living rooms to productive workspaces, our collection is
            designed to help you create a space that reflects your lifestyle.
          </p>
        </div>
      </section>
      {/* What We Offer */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Section Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#df5612]">
              What We Offer
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-stone-800 md:text-4xl">
              Everything you need to create your space.
            </h2>

            <p className="mt-4 leading-7 text-stone-600">
              Discover thoughtfully selected furniture designed to bring
              comfort, style, and functionality into your everyday life.
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="border border-stone-200 p-8 text-center">
              <h3 className="text-xl font-semibold text-stone-800">
                Quality Furniture
              </h3>

              <p className="mt-3 leading-6 text-stone-600">
                Carefully selected pieces made to combine comfort, durability,
                and timeless design.
              </p>
            </div>

            <div className="border border-stone-200 p-8 text-center">
              <h3 className="text-xl font-semibold text-stone-800">
                Beautiful Selection
              </h3>

              <p className="mt-3 leading-6 text-stone-600">
                Explore furniture for your living room, bedroom, office,
                kitchen, and outdoor spaces.
              </p>
            </div>

            <div className="border border-stone-200 p-8 text-center">
              <h3 className="text-xl font-semibold text-stone-800">
                Easy Shopping
              </h3>

              <p className="mt-3 leading-6 text-stone-600">
                Browse our collection, add your favorite pieces to your cart,
                and place your order with ease.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
