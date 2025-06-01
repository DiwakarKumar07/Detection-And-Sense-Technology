import React from "react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      title: "High Accuracy",
      description: "Ensures reliable speed and motion detection with AI-driven precision.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/58xPCrL-HmO-HAVYVBSaCjkzmSZSmyrUYRyvKOT9XGg.jpg",
    },
    {
      title: "User-Friendly Interface",
      description: "Easy-to-use design, making it accessible to everyone.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/IOtlf_ulJo6BjZAZvlSE_5k1mtddnrY0BaeosyV9Nhs.jpg",
    },
    {
      title: "AI-Powered Predictions",
      description: "Uses machine learning to analyze motion and predict future movements.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/DpeDRY8xBVZk99PtIjzvGSjjrZzojH7O2GWYeqZN4EA.jpg",
    },
  ];

  return (
    <section id="features" className="max-w-screen-lg mx-auto py-16 px-6">
      <h3 className="text-4xl font-bold text-center mb-12 text-cyan-400">
        Key Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-black p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:-translate-y-3 text-center"
          >
            <img
              src={feature.imgSrc}
              alt={feature.title}
              className="mb-4 w-full h-52 object-cover rounded-lg shadow-lg"
            />
            <h4 className="text-lg text-cyan-400 font-bold">{feature.title}</h4>
            <p className="text-gray-300 text-sm mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const PricingNews = () => {
  const pricingPlans = [
    { title: "Basic", price: "$9.99/month", features: ["50 analyses/day", "Some Service" , "Live Stream Access", "Basic Features"] },
    { title: "Standard", price: "$19.99/month", features: ["100 analyses/day", "Live Stream", "Advanced Features", "Data Export"] },
    { title: "Premium", price: "$29.99/month", features: ["Unlimited analyses", "Live Stream", "All Features", "Priority Support"] },
  ];

  const newsItems = [
    {
      title: "New AI Model Release",
      description: "Our latest AI update improves accuracy and performance.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/jTq4gyKJAZ1uCpsMTZA4nj8yEiG85t1qPBwYuXVbfuk.jpg",
    },
    {
      title: "Partnership with Tech Leaders",
      description: "We’re collaborating with top AI firms for groundbreaking advancements.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/hrcpEZmzQAfolFe3vDoZfqQ5CJvNeTjonNe4jRRdOEM.jpg",
    },
    {
      title: "AI in Real-Time Safety",
      description: "Learn how our AI-driven system is making environments safer.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/6wZ7ve0yPpWDw0zMrU81wYxMyMXKVj8vANa6dknihZg.jpg",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-6 py- max-w-screen-lg">
        <Features />

        {/* Pricing Section */}
        <section id="pricing" className="my-5">
          <h3 className="text-4xl font-bold text-center mb-12 text-cyan-400">
            Membership Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-black p-8 rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:-translate-y-3 text-center"
              >
                <h4 className="text-xl text-cyan-400 font-bold">{plan.title}</h4>
                <p className="text-2xl text-white font-bold my-4">{plan.price}</p>
                <ul className="text-gray-300 text-sm mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="py-1">✅ {feature}</li>
                  ))}
                </ul>
                <button className="bg-cyan-500 text-black px-6 py-2 rounded-md font-bold hover:bg-cyan-400 transition">
                   <Link to="/payment">Pay With UPI</Link>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="my-16">
          <h3 className="text-4xl font-bold text-center mb-12 text-cyan-400">
            Latest News
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news, index) => (
              <div
                key={index}
                className="bg-black p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:-translate-y-3 text-center"
              >
                <img
                  src={news.imgSrc}
                  alt={news.title}
                  className="mb-4 w-full h-52 object-cover rounded-lg shadow-lg"
                />
                <h4 className="text-lg text-cyan-400 font-semibold">{news.title}</h4>
                <p className="text-gray-300 text-sm mt-2">{news.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default PricingNews;
