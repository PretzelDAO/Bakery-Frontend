import { Transition } from "@headlessui/react";
import { useEffect, useRef } from "react";
import {
  MessageContent,
  MessageType,
  useMessageContext,
} from "../context/MessageContext";
import { useWeb3 } from "../context/Web3Context";
import { welcomeMessage, mainMenuMessage } from "../messages/connectedMessage";
import { sleep } from "../utils/flowutils";
import { FlowButton } from "./FlowComponents/FlowButton";
import { FlowMessage } from "./FlowComponents/FlowMessage";

export const ChatInterface = () => {
  const messageContext = useMessageContext();
  const web3Context = useWeb3();

  // const welcomeMessage: MessageContent = welcomeMessage;

  useEffect(() => {
    if (messageContext.history.length == 0)
      messageContext.addMessage(welcomeMessage);
  }, []);

  // const messagesEndRef = useRef(null)

  // const scrollToBottom = () => {
  //   if (messagesEndRef.current)
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  // }

  // useEffect(scrollToBottom, [messageContext.history])

  // console.log('Messages:', messageContext.history)
  return (
    <div className="m-4 mb-3 flex flex-col overflow-y-auto  scrollbar-hide h-full justify-center overflow-visible">
      {/* <h1>Chat Below!</h1> */}
      <div className="mb-4 px-2 overflow-visible">
        {messageContext.history
          ? messageContext.history.map((m, index) => {
              return (
                <Transition
                  appear={true}
                  show={index >= messageContext.history.length - 4}
                  enter="transition transform scale ease-linear duration-300 "
                  enterFrom="opacity-0 -translate-y-2 scale-40"
                  enterTo="opacity-100 translate-y-0 scale-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  {FlowMessage(m)}
                </Transition>
              );
            })
          : "No Chat"}
        <div id="#last" />
      </div>
      <div className=" flex flex-row">
        {messageContext.history[
          messageContext.history.length - 1
        ]?.actions?.map((a) => (
          <Transition
            appear={true}
            show={true}
            enter="transition transform scale ease-linear duration-300 delay-200"
            enterFrom="opacity-0 -translate-y-2 scale-40"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition transform scale ease-linear duration-300 delay-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <FlowButton action={a}></FlowButton>
          </Transition>
        ))}
      </div>
    </div>
  );
};
