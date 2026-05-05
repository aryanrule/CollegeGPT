import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ContextType = {
  input: string;
  setInput: (val: string) => void;

  recentPrompt: string;
  setRecentPrompt: (val: string) => void;

  previousPrompt: string[];
  setPreviousPrompt: React.Dispatch<React.SetStateAction<string[]>>;

  showResult: boolean;
  setShowResult: (val: boolean) => void;

  loading: boolean;
  setLoading: (val: boolean) => void;

  resultdata: string;
  setResultData: (val: string) => void;

  generateAnswer: () => Promise<void>;
};

// 👇 create context with undefined safety
export const ChatContext = createContext<ContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const dummycontent = 
"This is a sample paragraph of dummy content designed to simulate a long response in a chat interface. It helps in testing how your layout behaves when a large amount of text is rendered dynamically, ensuring that the content scrolls properly without breaking the design or stretching the screen unexpectedly. By using placeholder text like this, you ca Testing with extended placeholder content allows developers to identify potential performance bottlenecks and rendering issues early in the development process. It also helps in evaluating how text wraps, how spacing behaves, and whether the design remains visually appealing under stress. By proactively addressing these concerns, you reduce the chances of encountering layout bugs when real user data begins to flow through the systemn verify that spacing, font size, and readability remain consistent across different screen sizes, while also checking that key elements such as the input box and navigation bar stay fixed in their intended positions. This approach allows you to build a more stable and user-friendly interface before integrating real API responses into your application.";
function getdummyresponse () {
    return dummycontent;
}

const ChatContextProvider = ({ children }: Props) => {
  const [input, setInput] = useState<string>("");
  const [recentPrompt, setRecentPrompt] = useState<string>("");
  const [previousPrompt, setPreviousPrompt] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultdata, setResultData] = useState<string>("");

  // typing effect
  const delayPara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const generateAnswer = async () => {
    if (!input.trim()) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    const question = input;

    setPreviousPrompt((prev) => [...prev, question]);
    setInput("");

    try {
      // const response = await fetch(
      //   "http://localhost:5000/api/v1/chat",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ question : question }),
      //   }
      // );
      // console.log("response" , response);  

      // const data = await response.json();
      // console.log("data" , data);  
     
      // // const responseInText =
      // //   data?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
     
      // const responseInText = data?.answer;
      const responseInText = getdummyresponse();
      // formatting bold (**text** → <b>text</b>)
      let responseArray = responseInText.split("**");
      let newResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 1) {
          newResponse += "<b>" + responseArray[i] + "</b>";
        } else {
          newResponse += responseArray[i];
        }
      }

      // line breaks
      let newResponse2 = newResponse.split("*").join("</br>");

      // typing effect
      let words = newResponse2.split(" ");
      words.forEach((word, i) => {
        delayPara(i, word + " ");
      });

    } catch (error) {
      console.log("error generating response:", error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: ContextType = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    previousPrompt,
    setPreviousPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultdata,
    setResultData,
    generateAnswer,
  };

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;

// ✅ custom hook (VERY important)
export const usechatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useAppContext must be used inside ChatContextProvider");
  }
  return context;
};