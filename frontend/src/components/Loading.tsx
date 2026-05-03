import React from "react";
const Loading = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="h-5 rounded bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] animate-loader"></div>
      <div className="h-5 rounded bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] animate-loader"></div>
      <div className="h-5 rounded bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] animate-loader"></div>
    </div>
  );
};

export default Loading;