import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SpeedCalculation from "../components/allpages/SpeedCalculation";
import LiveDetection from "../components/allpages/LiveDetection";
import SenseAroundMe from "../components/allpages/SenseAroundMe";
import DataVisualization from "../components/allpages/DataVisualization";
import TrajectoryPrediction from "../components/allpages/TrajectoryPrediction";
import RealTimeAnalysis from "../components/allpages/RealTimeAnalysis";

const ServicePage = () => {
  const { serviceName } = useParams();

  const serviceComponents = {
    "speed-calculation": <SpeedCalculation />,
    "live-detection": <LiveDetection />,
    "sense-around-me": <SenseAroundMe />,
    "data-visualization": <DataVisualization />,
    "trajectory-prediction": <TrajectoryPrediction />,
    "real-time-analysis": <RealTimeAnalysis />
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 min-h-screen overflow-x-hidden">
        {serviceComponents[serviceName] || (
          <div className="text-center text-2xl text-red-500">Service Not Found</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ServicePage;
