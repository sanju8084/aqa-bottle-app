import React from "react";

const products = [
  {
    id: 1,
    name: "1 Litre Bottle",
    price: "₹20",
    image: "./bottle1.png",
  },
  {
    id: 2,
    name: "5 Litre Can",
    price: "₹60",
    image:"./bottle2.png",
  },
  {
    id: 3,
    name: "20 Litre Jar",
    price: "₹120",
    image:"./bottle3.png",
  },
];

const Product = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-12" id="products">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
          We Deliver Bottles
        </h2>
        <p className="text-gray-600">Choose from our range of clean water bottles</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-blue-50 rounded-lg shadow-md p-5 flex flex-col items-center hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {product.name}
            </h3>
            <p className="text-lg font-medium text-gray-800">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Product;
