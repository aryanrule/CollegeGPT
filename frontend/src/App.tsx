import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import StudentLayout from "./pages/StudentLayout";
import AdminLayout from "./pages/AdminLayout";

import ChatSidebar from "./components/chatsidebar";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Student Routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<div>Student Dashboard</div>} />
        <Route path="chat" element={<ChatSidebar />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<div>Admin Dashboard</div>} />
      </Route>

    </Routes>
  );
}

export default App;