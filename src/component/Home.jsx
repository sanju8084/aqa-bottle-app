import React, { useState } from "react";
import Order from "./Order"; // import Order component
import Product from "./Product";
import About from "./About";
import Contact from "./Contact";
const Home = () => {
  const [showOrder, setShowOrder] = useState(false);

  if (showOrder) {
    return <Order />;
  }

  return (
    <>
      <header
        className="w-full h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('./bg.png')",
        }}
      >
        <div className=" w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-10 py-10 gap-6 md:gap-10">
          {/* Image Section */}
          <div className="w-full md:w-auto flex justify-center order-1 md:order-2">
            <img
              src="./bg_bottle.png"
              alt="Water Bottle"
              className="h-52 sm:h-60 md:h-[400px] object-contain"
            />
          </div>

          {/* Text Section */}
          <div className="text-white max-w-xl text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
              Stay Hydrated with Pure Aqua
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6">
              Order clean, fresh, and safe drinking water bottles to your doorstep.
              Hassle-free delivery. Trusted by thousands.
            </p>
            <button
              onClick={() => setShowOrder(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-lg shadow-md"
            >
              Order Now
            </button>
          </div>
        </div>
      </header>
      <Product />
      <About />
      <Contact />
    </>
  );
};

export default Home;
