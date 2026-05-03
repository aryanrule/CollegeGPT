import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f7f7fb] text-gray-900 flex flex-col">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-xl font-semibold">
          College<span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">GPT</span>
        </h1>

        <div className="flex gap-4">
          <Link to="/login">
            <button className="px-5 py-2 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md hover:scale-105 transition-all">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">

        <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
          Study smarter with{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
            CollegeGPT
          </span>
        </h1>

        <p className="mt-6 text-gray-500 max-w-xl text-lg">
          Upload your PDFs, ask questions, and get instant AI-powered answers tailored for students.
        </p>

        {/* CTA */}
        <div className="mt-10 flex gap-5">
          <Link to="/register">
            <button className="px-7 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="px-7 py-3 rounded-full bg-white border border-gray-200 text-lg shadow-sm hover:shadow-md hover:scale-105 transition-all">
              Login
            </button>
          </Link>
        </div>

        {/* FEATURE CARDS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            "Upload multiple PDFs",
            "Ask questions instantly",
            "Get precise AI answers",
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <p className="text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <p className="text-center text-sm text-gray-400 pb-6">
        Built for students • CollegeGPT
      </p>
    </div>
  );
};

export default Home;