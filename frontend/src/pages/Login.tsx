import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔥 for now dummy login (later replace with API)
    login(role);

    // redirect based on role
    if (role === "admin") navigate("/admin");
    else navigate("/student");
  };

  return (
    <div className="min-h-screen bg-[#f7f7fb] flex items-center justify-center px-4">
      
      {/* CARD */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

        {/* LOGO */}
        <h1 className="text-3xl font-semibold text-center mb-6">
          College
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            GPT
          </span>
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* ROLE SELECT (TEMP for demo) */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 py-2 rounded-lg border transition ${
                role === "student"
                  ? "bg-purple-500 text-white"
                  : "border-gray-300"
              }`}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 rounded-lg border transition ${
                role === "admin"
                  ? "bg-indigo-500 text-white"
                  : "border-gray-300"
              }`}
            >
              Admin
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="mt-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:scale-105 transition"
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-purple-500 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;