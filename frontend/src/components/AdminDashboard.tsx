import { useState } from "react";
import { assets } from "../assets/assets/assets";

const AdminDashboard = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleUpload = () => {
    if (!files) return;

    console.log(files);
    // 🔥 later: send to backend (multer / s3)
  };

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">

      {/* NAV */}
      <div className="flex justify-between items-center">
        <p className="p-5 text-[56px] font-medium bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
          Admin Panel
        </p>

        <img
          className="mt-5 mr-5 rounded-[40px] w-[100px]"
          src={assets.guts_icon}
          alt=""
        />
      </div>

      {/* MAIN */}
      <div className="max-w-[900px] mx-auto">

        {/* GREETING */}
        <div className="my-[50px] text-[40px] text-[#c4c7c5] font-medium px-5">
          <p>
            <span>Manage your data 📂</span>
          </p>
          <p className="text-[20px] mt-2 text-gray-500">
            Upload PDFs for your RAG system
          </p>
        </div>

        {/* UPLOAD CARD */}
        <div className="bg-[#f0f4f9] p-6 rounded-2xl mx-5">

          <p className="text-lg font-medium mb-4">Upload Documents</p>

          {/* FILE INPUT */}
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="mb-4"
          />

          {/* FILE PREVIEW */}
          {files && (
            <div className="mb-4 text-sm text-gray-600">
              {Array.from(files).map((file, i) => (
                <p key={i}>📄 {file.name}</p>
              ))}
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleUpload}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[#4b90ff] to-[#ff5546] text-white hover:scale-105 transition"
          >
            Upload PDFs
          </button>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 px-5">

          <div className="bg-white p-5 rounded-xl">
            <p className="text-sm text-gray-500">Documents</p>
            <p className="text-2xl font-semibold mt-2">24</p>
          </div>

          <div className="bg-white p-5 rounded-xl">
            <p className="text-sm text-gray-500">Users</p>
            <p className="text-2xl font-semibold mt-2">120</p>
          </div>

          <div className="bg-white p-5 rounded-xl">
            <p className="text-sm text-gray-500">Queries</p>
            <p className="text-2xl font-semibold mt-2">340</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;