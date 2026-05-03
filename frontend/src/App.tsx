import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import StudentLayout from "./pages/StudentLayout";

import ChatSidebar from "./components/chatsidebar";

import AdminLayout from "./pages/AdminLayout"




function App() {

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;