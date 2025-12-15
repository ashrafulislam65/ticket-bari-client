import React from "react";
import Image1 from '../assets/admin.jpg';
import Image2 from '../assets/vendor.jpg';



const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-200 lg:px-30">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-neutral mb-4">About Us</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We are passionate about connecting travelers with amazing experiences. 
          Our platform ensures smooth ticket booking, trusted vendors, and memorable journeys.
        </p>
      </div>

      {/* Our Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 my-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            alt="Mission"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To provide an easy, reliable, and enjoyable way to book tickets and travel seamlessly.
          </p>
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600">
            To become the most trusted travel platform where users can find the best tickets and experiences worldwide.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="my-12 text-center">
        <h2 className="text-4xl font-bold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="card bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
            <img
              src={Image1}
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
            <h3 className="text-xl font-semibold mt-4">Ashraful Islam</h3>
            <p className="text-gray-500">CEO & Founder</p>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
            <img
              src={Image2}
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
            <h3 className="text-xl font-semibold mt-4">Rafi Imrose</h3>
            <p className="text-gray-500">Lead Developer</p>
          </div>
          <div className="card bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
            <img
              src={Image2}
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
            <h3 className="text-xl font-semibold mt-4">Sarah Khan</h3>
            <p className="text-gray-500">Marketing Head</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="  p-12 rounded-lg text-center mt-12 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl font-bold mb-4">Join Us on Your Journey!</h2>
        <p className="mb-6">Discover the best tickets, travel safely, and create unforgettable memories.</p>
        <a href="/all-tickets" className="btn btn-neutral btn-lg">
          Explore Tickets
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
