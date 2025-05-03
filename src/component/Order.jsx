import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Order = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    bottle1L: 0,
    bottle5L: 0,
    bottle20L: 0,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.startsWith("bottle") ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, address } = formData;

    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        uid: user.uid,
        email: user.email,
        ...formData,
        deliveryStatus: "Pending", // Added

        timestamp: serverTimestamp(),
      });

      setSubmitted(true);
      console.log("Order submitted:", formData);
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Book Your Bottle
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Select Quantity</label>
              <div className="space-y-3">
                {[
                  { label: "1L", name: "bottle1L" },
                  { label: "5L", name: "bottle5L" },
                  { label: "20L", name: "bottle20L" }
                ].map(({ label, name }) => (
                  <div key={name} className="flex justify-between items-center">
                    <span>{label} Bottle</span>
                    <input
                      type="number"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      min={0}
                      className="w-20 border border-gray-300 rounded-lg p-1 text-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Submit Order
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600">
            <h3 className="text-xl font-semibold mb-2">Order Submitted!</h3>
            <p>Thank you, {formData.name}. We will contact you at:</p>
            <p className="italic">{formData.phone}</p>
            <p className="mt-1">and deliver to: {formData.address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
