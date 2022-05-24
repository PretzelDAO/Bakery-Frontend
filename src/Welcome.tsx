import CSS from "csstype";
import React from "react";
import { AppState, useMessageContext } from "./context/MessageContext";
export const Welcome: React.FC = ({ children }) => {
  const messageContext = useMessageContext();
  return (
    <div className="flex flex-col h-full justify-between py-24">
      <div>Welcome</div>

      <button
        className="bg-white rounded-md"
        onClick={() => messageContext.setAppState(AppState.chat)}
      >
        Get Started
      </button>
    </div>
  );
};
