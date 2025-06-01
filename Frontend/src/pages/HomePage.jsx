import React from "react";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Content0 from "../components/Content0";
import Footer from "../components/Footer";

function MainPage() {


  return (
    <>
    <div className=" min-h-screen overflow-x-hidden" >
      <Navbar />
      <Content0 />
      <Content />
      <Footer/>

    </div>
    </>
  );
}

export default MainPage;
