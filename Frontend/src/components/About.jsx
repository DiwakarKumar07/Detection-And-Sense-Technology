import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar/>
      <div className="font-roboto min-h-screen mt-15">
        <div className="container mx-auto px-4 py-8 ">
          <div className="bg-black shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-white uppercase tracking-widest">
                The Geniuses Behind Our Work
              </p>
              <h1 className="text-4xl font-bold text-yellow-500">
                Our Team
              </h1>
              <div className="flex justify-center mt-4">
                <div className="border-t-2 border-yellow-500 w-16"></div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-8 md:mb-0 md:mr-8">
                <img
                  alt="Portrait of a team member"
                  className="rounded-full border-4 border-yellow-500"
                  height="400"
                  src="someone.jpeg"
                  // src="https://storage.googleapis.com/a1aa/image/x0VsMf_JPhyoO53NSKagwwjt-mNtD0UNb5iZHM9m5co.jpg"
                  width="400"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">
                  Er. Diwakar / CEO & Founder
                </h2>
                <p className="text-gray-200 mb-4">
                  Full Stack Developer & AI Enthusiast
                </p>
                <div className="flex justify-center md:justify-start space-x-4 mb-4">
                  <a className="text-gray-500 hover:text-yellow-500" href="https://www.instagram.com/er.diwakar07/">
                    <i className="fab fa-instagram-f">instagram</i>
                  </a>
                  <a className="text-gray-500 hover:text-yellow-500" href="#">
                    <i className="fab fa-twitter">twitter</i>
                  </a>
                  <a className="text-gray-500 hover:text-yellow-500" href="#">
                    <i className="fab fa-google-plus-g">git hub</i>
                  </a>
                  <a className="text-gray-500 hover:text-yellow-500" href="#">
                    <i className="fab fa-linkedin-in">linkedin</i>
                  </a>
                </div>
                <p className="text-gray-200 mb-4">
                 "Hi, I'm Diwakar, a B.Tech student in Computer Science and Engineering, passionate about Full Stack Development.
                  I specialize in both frontend and backend technologies, leveraging AI-powered tools to build innovative web applications.
                  My mission is to create intelligent solutions that enhance efficiency and drive technological evolution."
                </p>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600">
                  View Profile
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-black text-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto mt-8">
            <h1 className="text-center text-3xl font-bold mb-4">
              RECOGMOTION
              <span className="text-green-500"> ON THE MOVE</span>
            </h1>
            <p className="text-center mb-4">
              Founded in 2025, Recogmotion is pioneering AI-driven motion analysis.
            </p>
            <p className="text-center mb-8">
             "Our technology integrates Speed Calculation, Live Detection, and Sense Around Me for enhanced safety.
             With Data Visualization, Trajectory Prediction, Distance Tracker and Real-time Analysis, we deliver intelligent insights to optimize decision-making."
            </p>
            <div className="md:flex md:space-x-8 mb-8">
              <div className="md:w-1/2">
                <h2 className="text-xl font-bold text-cyan-400 mb-2">
                  Our Mission: Impact Beyond Limits
                </h2>
                <p className="mb-4">
                "Impact Beyond Limits" defines our purpose—to push past traditional boundaries using AI and motion tracking.
                 Our solutions provide real-time insights, predictive analytics, and automated efficiency, ensuring safety and innovation.
                
                </p>
                <img
                  alt="Er.Diwakar, founders of RecogMotion"
                  height="300"
                  src="someone.jpeg"
                  // src="https://storage.googleapis.com/a1aa/image/fuHaU5EstXAQmfKIdwaHBKcqak6I6Pd4b7GCIXDzj4c.jpg"
                  width="400"/>
                <p className="mt-4">
                "Impact Beyond Limits" perfectly captures the revolutionary spirit of our project. By integrating advanced technologies like Speed Calculation, Live Detection, and Sense Around Me, we enhance safety in unprecedented ways.
                 Our Data Visualization, Trajectory Prediction, Distanct Tracker and Real-time Analysis tools offer clear insights and predictive capabilities, enabling proactive decision-making and heightened efficiency. This project is 
                 not just about meeting current technological standards, but about setting new ones, pushing past traditional boundaries, and creating a safer, smarter future. We're committed to making a profound impact that extends far beyond the limits of today’s innovations.
                </p>
              </div>

              <div className="md:w-1/2">
                <h2 className="text-xl font-bold mb-2 text-green-400">
                Empowering Tomorrow
                </h2>
                <p className="mb-4">
                  "Empowering Tomorrow" embodies our project's commitment to shaping a safer, more efficient future through cutting-edge technology. By integrating Speed Calculation, Live Detection, and Sense Around Me, we enhance safety measures in real-time. Our Data Visualization, Trajectory Prediction, Distanc Tracker and Real-time Analysis tools provide insightful and predictive capabilities, enabling proactive decision-making and heightened efficiency. This project not only addresses the needs of today but also anticipates the challenges of tomorrow. We aim to empower individuals and organizations with innovative solutions that drive transformative change and set new standards for technological advancements.
                  <span className="text-green-500">
                    We’re all ears - chat to us on Facebook Messenger.
                  </span>
                </p>
                <img
                  alt="Vision Image"
                  height="300"
                  src="https://storage.googleapis.com/a1aa/image/1Y8D9qC3JfWPtSwk34zOwrNUR-7clAO5ncjaa_uG2Us.jpg"
                  width="400"
                />
                <p className="mt-4">
                "Empowering Tomorrow" is our promise to the future. Our AI-driven solutions enhance decision-making in traffic safety,
                industrial automation, and smart surveillance. By leveraging real-time data, we create solutions that adapt and evolve.
                </p>
              </div>
            </div>
          </div>

          {/* Our Innovations Section */}
          <div className="bg-black shadow-lg rounded-lg p-8 max-w-4xl mx-auto mt-8">
            <h2 className="text-3xl font-bold text-cyan-400 text-center mb-4">Our Innovations</h2>
            <p className="text-gray-300 text-lg leading-relaxed text-center">
              At <span className="text-cyan-400 font-bold">Recogmotion</span>, we are revolutionizing **motion tracking** and **AI-driven analytics** 
              with cutting-edge technologies designed for **safety, efficiency, and real-time insights**. Our core innovations include:
            </p>

            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              <span className="text-yellow-400 font-semibold">Speed Calculation</span>,  
              <span className="text-yellow-400 font-semibold">Live Detection</span>, and  
              <span className="text-yellow-400 font-semibold">Sense Around Me</span>—advanced AI-powered solutions that enhance safety by detecting motion,  
              analyzing object speed, and providing real-time situational awareness. These technologies enable **intelligent monitoring**,  
              ensuring proactive responses to movement patterns in dynamic environments.  
            </p>

            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              Beyond safety, we empower decision-making with advanced **data intelligence solutions** like  
              <span className="text-green-400 font-semibold">Data Visualization</span>,  
              <span className="text-green-400 font-semibold">Trajectory Prediction</span>,  
              <span className="text-green-400 font-semibold">Distance Tracker</span>, and  
              <span className="text-green-400 font-semibold">Real-Time Analysis</span>.  
              These systems work together to **track movement, predict future trajectories, and analyze distances traveled**,  
              transforming raw data into **actionable insights**. By combining these powerful tools, we offer a **seamless AI ecosystem**  
              that enhances surveillance, automation, research, and industrial applications.  
            </p>

            <p className="text-gray-300 text-lg leading-relaxed mt-4 text-center">
              At Recogmotion, our mission is to push the boundaries of **AI-driven analytics and real-time monitoring**.  
              Whether it’s ensuring safety on the roads, optimizing sports performance, or enhancing autonomous systems,  
              we are committed to delivering **precision, efficiency, and innovation** in motion analysis.
            </p>
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
}

export default About;
