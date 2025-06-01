import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Services = () => {
  const features = [
    {
      title: "Speed Calculation",
      description: "Accurately calculate the speed of moving entities within the video footage.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/hwLdY9B9TBLzFWjnNCk8OYyWUgkCaqV9ryNolBBtO2E.jpg",
      path: "/services/speed-calculation"
    },
    {
      title: "Live Detection",
      description: "Detect and analyze motion in live video streams for immediate insights.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/EBuVlY2GPnImH9Hwh72OJ5zNoVxDbOVV7OkEZLcekKQ.jpg",
      path: "/services/live-detection"
    },
    {
      title: "Sense Around Me",
      description: "Utilize AI to sense and interpret the environment around the me for enhanced situational awareness.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/GWp9oNW7onoqRveVnwF-vMN42cbxOmgxDzQkHOMXqOs.jpg",
      path: "/services/sense-around-me"
    },
    {
      title: "Data Visualization",
      description: "Visualize the analyzed data through comprehensive charts and graphs for better understanding and insights.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/ztHwbsjnob5CfdP5Qr-lwhqp3jP8K44LaI29OJLyyd8.jpg",
      path: "/services/data-visualization"
    },
    {
      title: "Trajectory Prediction",
      description: "Predict the future movements of detected entities based on their current trajectory.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/jU5FRUMTy7SvEvSkouf_WqUXcpUJMrk-9AYdHT3l5bo.jpg",
      path: "/services/trajectory-prediction"
    },
    {
      title: "Distance Tracker",
      description: "It will help you to Distance Track and it detecte how long you travelled via video footage.",
      imgSrc: "https://storage.googleapis.com/a1aa/image/MKg2hvKbs3irKwUHna_7JK6UOLznrQt1ddi3zKguilk.jpg",
      path: "/services/real-time-analysis"
    }
  ];

  return (
    <>
      <Navbar />
      <section id="features" className="p-6 shadow-lg rounded-lg max-w-5xl mx-auto mt-16 min-h-screen my-12">
        <h3 className="text-5xl font-extrabold text-center mb-12 text-cyan-400 tracking-wide ">OUR SERVICES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-black p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 text-center cursor-pointer"
            >
              <Link to={feature.path} >
                <img src={feature.imgSrc} alt={feature.title} className="mb-4 w-full h-52 object-cover rounded-lg " />
              </Link>
              <h4 className="text-lg text-gray-200 font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-300 text-sm">{feature.description}</p>
              <Link to={feature.path} className="text-blue-400 underline mt-2 inline-block hover:text-blue-300">Learn more</Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;