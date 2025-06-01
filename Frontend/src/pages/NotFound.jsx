import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="flex items-center justify-center h-screen flex-col text-center"
      style={{
        // background: "linear-gradient(135deg, #0a0a0a, #1e1e1e)",
        color: "white",
      }}
    >
      {/* Glowing 404 Animation */}
      <h1
        className="text-9xl font-bold neon-glow"
        style={{
          textShadow: "0px 0px 20px cyan, 0px 0px 40px cyan",
          animation: "flicker 1.5s infinite alternate",
        }}
      >
        404
      </h1>

      {/* Page Not Found Message */}
      <p
        className="text-xl mt-4"
        style={{
          opacity: 0.8,
          fontWeight: "bold",
        }}
      >
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Go Back Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-full transition duration-300 ease-in-out"
        style={{
          background: "linear-gradient(90deg, #00e5ff, #00bcd4)",
          color: "#000",
          fontWeight: "bold",
          textTransform: "uppercase",
          textDecoration: "none",
          boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.6)",
        }}
      >
        Go Back Home
      </Link>

      {/* CSS Animation for Flickering Effect */}
      <style>
        {`
          @keyframes flicker {
            0% { opacity: 1; text-shadow: 0px 0px 10px cyan, 0px 0px 20px cyan; }
            100% { opacity: 0.8; text-shadow: 0px 0px 20px cyan, 0px 0px 40px cyan; }
          }
        `}
      </style>
    </div>
  );
}

export default NotFound;
