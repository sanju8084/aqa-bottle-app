import React from "react";
import { Mail, Phone, MapPin } from "lucide-react"; 

const Contact = () => {
  return (
    <div className="bg-blue-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div
          className="bg-cover bg-center text-black flex flex-col justify-center p-10 space-y-6"
          style={{
            backgroundImage: "url('./contactImg.png')", 
          }}
        >
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-black">
            We'd love to hear from you. Whether you have a question about deliveries,
            bottles, or anything else — our team is ready to answer.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5" />
              <span>+91 9876543210</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5" />
              <span>support@aquabottle.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5" />
              <span>123 Aqua Street, Muzaffarpur City, IN</span>
            </div>
          </div>
        </div>

        <div className="p-10">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
