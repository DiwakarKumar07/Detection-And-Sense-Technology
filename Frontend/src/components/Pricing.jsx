import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Basic",
      price: "$9.99/month",
      features: ["50 Analyses/day", "Some Service" , "Live Stream Access", "Basic Features"],
    },
    {
      title: "Standard",
      price: "$19.99/month",
      features: ["100 Analyses/day", "Live Stream", "Advanced Features", "Data Export"],
    },
    {
      title: "Premium",
      price: "$29.99/month",
      features: ["Unlimited Analyses", "Live Stream", "All Features", "Priority Support"],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center  text-white px-6">
        {/* Pricing Header */}
        <h3 className="text-5xl font-extrabold text-center mb-12 text-cyan-400 uppercase tracking-wide">
        Membership Plans
        </h3>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="relative bg-black p-8 rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:-translate-y-3 text-center border border-gray-800"
            >
              {/* Glowing Border */}
              <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl opacity-30 hover:opacity-80 transition-all duration-300"></div>

              <h4 className="text-2xl text-cyan-400 font-bold">{plan.title}</h4>
              <p className="text-3xl text-white font-extrabold my-4">{plan.price}</p>
              <ul className="text-gray-300 text-sm mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="py-1">✅ {feature}</li>
                ))}
              </ul>
              
              <button className="bg-cyan-500 text-black px-6 py-3 rounded-md font-bold hover:bg-cyan-400 transition">
                <Link to="/payment">Pay With UPI</Link>
              </button> 
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
