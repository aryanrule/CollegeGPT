import { useState } from "react";
import {assets} from '../assets/assets/assets'
import { usechatContext } from "../context/ChatContext";
const ChatSidebar = () => {
  const [extended, setExtended] = useState(false);

  const { generateAnswer, setRecentPrompt, previousPrompt } = usechatContext();

  const handleSidebar = () => {
    setExtended(!extended);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f0f4f9] px-4 py-6">

      {/* TOP */}
      <div>
        {/* MENU */}
        <img
          onClick={handleSidebar}
          src={assets.menu_icon}
          alt=""
          className="w-5 ml-2 cursor-pointer"
        />

        {/* NEW CHAT */}
        <div className="flex items-center gap-2 mt-3 px-4 py-2 bg-[#e6eaf1] rounded-xl text-sm text-gray-500 cursor-pointer">
          <img src={assets.plus_icon} className="w-5" />
          {extended && <p>New Chat</p>}
        </div>

        {/* RECENT */}
        {extended && (
          <div className="flex flex-col mt-6 mb-5 animate-fadeIn">
            <p className="text-sm text-gray-500 mb-2">Recent</p>

            {previousPrompt.map((item: string, index: number) => (
              <div
                key={index}
                onClick={() => {
                  setRecentPrompt(item);
                  generateAnswer();
                }}
                className="flex items-start gap-2 p-2 pr-10 rounded-full text-[#282828] cursor-pointer mt-3 hover:bg-[#e2e6eb]"
              >
                <img src={assets.message_icon} className="w-5" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM */}
      <div>
        {[
          { icon: assets.question_icon, label: "Help" },
          { icon: assets.history_icon, label: "Activity" },
          { icon: assets.setting_icon, label: "Setting" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-2 p-2 pr-10 rounded-full cursor-pointer mt-3 hover:bg-[#e2e6eb]"
          >
            <img src={item.icon} className="w-5" />
            {extended && <p>{item.label}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;