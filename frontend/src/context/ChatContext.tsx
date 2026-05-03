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

    const newInput = input;

    setPreviousPrompt((prev) => [...prev, newInput]);
    setInput("");

    try {
      const response = await fetch(
        "https://ai-verse-xnf4.onrender.com/api/getdata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: newInput }),
        }
      );

      const data = await response.json();

      const responseInText =
        data?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

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