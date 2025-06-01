import React from "react";
import { Link } from "react-router-dom";
import { Typography, Grid } from "@mui/material";

const services = [
  { id: "01", name: "Speed Calculation" },
  { id: "02", name: "Live Detection" },
  { id: "03", name: "Sense Around Me" },
  { id: "04", name: "Data Visualization" },
  { id: "05 +", name: "Trajectory Prediction" },
];

const ServicesSection = () => {
  return (
   <div className="bg- text-white">
    
      <main className="flex flex-col items-center text-center mt-20 text-white">
        <h1 className="lg:px-50 mt-6 mb-5 text-3xl md:text-5xl lg:text-5xl font-bold leading-tight font-serif text-white drop-shadow-[0_3px_10px_rgba(255,255,255,0.1)]">
          <span className="text-lime-400 drop-shadow-[0_3px_10px_rgba(181,255,85,0.6)]">
            Empowering Safety</span> and Efficiency 
            with Real-time Analysis, Prediction, and Detection Technology.
        </h1>
        <p className="mt-6 text-lg md:text-xl lg:text-xl max-w-md text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
            Integrating <span className="text-lime-400 drop-shadow-[0_3px_8px_rgba(181,255,85,0.9)]">
            Speed Calculation</span>, Live Detection, Sense Around Me, Data Visualization, Trajectory Prediction,  
            and Real-time Analysis <span className="text-lime-400 drop-shadow-[0_3px_8px_rgba(181,255,85,0.9)]">for ultimate safety</span> and efficiency.
        </p>
        <Link to="/services">
          <button className="mt-10 bg-lime-400 hover:bg-cyan-400 transition-all duration-300 text-black px-8 py-3 rounded-full text-lg font-bold shadow-xl cursor-pointer">
            Check Services → Transform Tomorrow
          </button>
        </Link>
      </main>
      
    

    <Link to="/services" className="cursor-default " style={{ textDecoration: "none" }}>
      <Grid container spacing={1} justifyContent="center" sx={{ mt: 10, mb: 5, textAlign: "center" }}>
        {services.map((service, index) => (
          <Grid item key={index} xs={12} sm={6} md={2}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#fff",
                textShadow: "4px 4px 12px rgba(255, 255, 255, 0.8)",
              }}
            >
              {service.id}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                textShadow: "2px 2px 8px rgba(255, 255, 255, 0.8)",
              }}
            >
              {service.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Link>
    </div>
  );
};

export default ServicesSection;






