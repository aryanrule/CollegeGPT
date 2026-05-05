import ChatSidebar from "../components/chatsidebar";
import StudentDashboard from "../components/Studentdashboard";



const StudentLayout = () => {
  return (
    <div className="flex h-screen"> 

      {/* SIDEBAR */}
      <ChatSidebar  />

      {/* MAIN CHAT AREA */}
      <StudentDashboard />

    </div>
  );
};

export default StudentLayout;