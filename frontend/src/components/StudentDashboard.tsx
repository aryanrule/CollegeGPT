import { useContext } from "react";
import { assets } from "../assets/assets/assets";
import Loading from "./Loading"; 
import { usechatContext } from "../context/ChatContext";
const StudentDashboard = () => {
  const {
    generateAnswer,
    recentPrompt,
    showResult,
    loading,
    resultdata,
    setInput,
    input,
  } = usechatContext()!;

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative">

      {/* NAV */}
      <div className="flex justify-between items-center">
        <p className="p-5 text-[56px] font-medium bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
          CollegeGPT
        </p>

        <img
          className="mt-5 mr-5 rounded-[40px] w-[100px]"
          src={assets.guts_icon}
          alt=""
        />
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-[900px] mx-auto">

        {!showResult ? (
          <>
            {/* GREETING */}
            <div className="my-[50px] text-[56px] text-[#c4c7c5] font-medium p-5">
              <p>
                <span>Hello 👋</span>
              </p>
              <p>How can I help you?</p>
            </div>
          </>
        ) : (
          <div className="px-[5%] max-h-[70vh] overflow-y-auto scrollbar-none">

            {/* RESULT TITLE */}
            <div className="my-10 flex items-center gap-5">
              <img
                src={assets.guts_icon}
                className="w-[100px] rounded-[30%]"
              />
              <p>{recentPrompt}</p>
            </div>

            {/* RESULT DATA */}
            <div className="flex gap-3">
              <img src={assets.gemini_icon} className="w-[50px]" />

              {loading ? (
                <Loading />
              ) : (
                <p
                  className="text-[17px] font-light leading-7"
                  dangerouslySetInnerHTML={{ __html: resultdata }}
                />
              )}
            </div>
          </div>
        )}

        {/* INPUT AREA */}
        <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto">

          <div className="flex items-center justify-center gap-5 bg-[#f0f4f9] px-5 py-2 rounded-full">

            <input
              type="text"
              placeholder="Enter the prompt..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none px-2 text-[18px]"
            />

            <div className="flex gap-4 items-center">
              <img src={assets.gallery_icon} className="w-6 cursor-pointer" />
              <img src={assets.mic_icon} className="w-6 cursor-pointer" />
              <img
                onClick={generateAnswer}
                src={assets.send_icon}
                className="w-6 cursor-pointer"
              />
            </div>

          </div>

          {/* FOOTER */}
          <p className="text-[13px] text-center font-light mt-4">
            Where curiosity meets innovation in AI.
            <br />
            Created by{" "}
            <span className="text-[20px] bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
              Aryan Sharma
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;