const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 animate-fade-in bg-black">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
        
        <div className="footer-section px-10">
          <h3 className="text-lg font-bold mb-4 hover:text-orange-500 transition duration-300">About Us</h3>
          <p className="mb-2 text-sm">
          "Our innovative technology integrates Speed Calculation, Live Detection, and Sense Around Me for enhanced safety. With Data Visualization, Trajectory Prediction, Distance Tracker and Real-time Analysis, our solution offers comprehensive and intelligent insights, ensuring maximum safety and efficiency in various applications."
          </p>
        </div>
        
        <div className="footer-section px-15">
          <h3 className="text-lg font-bold mb-4 hover:text-orange-500 transition duration-300">Quick Links</h3>
          <ul className="list-none p-0">
            <li className="mb-2"><a href="#" className="text-white hover:text-orange-500 transition duration-300 text-sm hover:underline">Home</a></li>
            <li className="mb-2"><a href="#" className="text-white hover:text-orange-500 transition duration-300 text-sm hover:underline">About</a></li>
            <li className="mb-2"><a href="#" className="text-white hover:text-orange-500 transition duration-300 text-sm hover:underline">Contact</a></li>
            <li className="mb-2"><a href="#" className="text-white hover:text-orange-500 transition duration-300 text-sm hover:underline">Privacy Policy</a></li>
            <li className="mb-2"><a href="#" className="text-white hover:text-orange-500 transition duration-300 text-sm hover:underline">Terms of Service</a></li>
          </ul>
        </div>
       
        <div className="footer-section px-10">
          <h3 className="text-lg font-bold mb-4 hover:text-orange-500 transition duration-300">Community</h3>
          <ul className="list-none p-0">
            <li className="mb-2"><a href="#" className="text-white hover:text-orange-500 transition duration-300 text-sm hover:underline">Documentation</a></li>
            <li className="mb-2"><a href="#" className="text-white hover:text-orange-500 transition duration-300 text-sm hover:underline">Customers</a></li>
            <li className="mb-2"><a href="#" className="text-white hover:text-orange-500 transition duration-300 text-sm hover:underline">Resources</a></li>
            <li className="mb-2"><a href="#" className="text-white hover:text-orange-500 transition duration-300 text-sm hover:underline">Webinars</a></li>
            <li className="mb-2"><a href="#" className="text-white hover:text-orange-500 transition duration-300 text-sm hover:underline">Support</a></li>
          </ul>
        </div>

        <div className="footer-section px-10">
          <h3 className="text-lg font-bold mb-4 hover:text-orange-500 transition duration-300">Get In Touch</h3>
          <p className="mb-2 text-sm"><i className="fas fa-map-marker-alt"></i> 123 Main Street, New Delhi, India</p>
          <p className="mb-2 text-sm"><i className="fas fa-phone-alt"></i> +91 12345 67890</p>
          <p className="mb-2 text-sm"><i className="fas fa-envelope"></i> info@recogmotion.com</p>
        </div>
      </div>

      <div className="text-center mt-8 text-xs ">
      <div className="flex justify-center space-x-4 ">
            <a href="#" className="hover:text-orange-500 transition duration-300">🌐 Facebook</a>
            <a href="#" className="hover:text-orange-500 transition duration-300">🐦 Twitter</a>
            <a href="#" className="hover:text-orange-500 transition duration-300">🔗 LinkedIn</a>
            <a href="https://www.instagram.com/er.diwakar07/" className="hover:text-orange-500 transition duration-300">📷 Instagram</a>
          </div>
        <p className="mt-4">© 2025 RECOGMOTION. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;