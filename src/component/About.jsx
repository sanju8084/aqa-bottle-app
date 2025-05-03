import React from 'react';
import AboutImg from './AboutImg';

const About = () => {
  return (
    <section className="bg-blue-50 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Side: Features Component */}
        <div className="w-full md:w-1/2">
          <AboutImg />
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2  md:text-left">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            We Provide Quality water Delivery
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            AquaBottle ensures you stay healthy and hydrated by delivering fresh, purified water straight to your doorstep. Our advanced filtration and eco-friendly practices guarantee both quality and sustainability. Join thousands who trust us for clean, convenient water delivery.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
