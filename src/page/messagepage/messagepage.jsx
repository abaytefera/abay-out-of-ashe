import {
  faArrowLeft,
  faFile,
  faMicrophone,
  faPhone,
  faSearch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { ControlLogic } from "../../ControlLofic/Controllogic";

const MessageSection = () => {
  const [chat, setChat] = useState(false);
  const isWide = useMediaQuery({ query: "(min-width: 900px)" });
  const { isDarkmode } = ControlLogic();

  const messageArray = [
    {
      profile: "bit.png",
      fullName: "abay tefera",
      LastMessage: "selam new",
      Time: "4 min ago",
    },
    {
      profile: "bit.png",
      fullName: "adugna tefera",
      LastMessage: "bro yimechihi",
      Time: "yesterday",
    },
     {
      profile: "bit.png",
      fullName: "bitiko love",
      LastMessage: "selam new",
      Time: "30 min ago",
    },
    {
      profile: "bit.png",
      fullName: "join man",
      LastMessage: "bro man yimechihi",
      Time: "3 day ago",
    },
  ];

  const messagetext = [
    { text: "selam new", own: "sender", bg: "bg-sky-600 text-white" },
    {
      profile: "bit.png",
      text: "man yimechi brother",
      own: "receiver",
      bg: "bg-gray-300 text-black",
    },
     { text: "selam new", own: "sender", bg: "bg-sky-600 text-white" },
    {
      profile: "bit.png",
      text: "man yimechi brother",
      own: "receiver",
      bg: "bg-gray-300 text-black",
    },
     { text: "selam new", own: "sender", bg: "bg-sky-600 text-white" },
    {
      profile: "bit.png",
      text: "man yimechi brother",
      own: "receiver",
      bg: "bg-gray-300 text-black",
    },
     { text: "selam new", own: "sender", bg: "bg-sky-600 text-white" },
    {
      profile: "bit.png",
      text: "man yimechi brother",
      own: "receiver",
      bg: "bg-gray-300 text-black",
    },
  ];

  return (
    <div
      className={`${
        isDarkmode ? "bg-gray-800 text-white" : "bg-white"
      } flex w-full h-[calc(100vh-64px)] overflow-hidden`}
    >
      {/* Sidebar - Chat List */}
      <div
        className={`${
          isWide || !chat ? "flex" : "hidden"
        } flex-col w-full max-w-[300px] border-r shadow-sm ${
          isDarkmode ? "bg-gray-900 text-white" : "bg-white"
        } min-h-0 overflow-hidden`}
      >
        <h2 className="text-2xl font-bold px-4 pt-4 pb-2">Messages</h2>

        {/* Search Bar */}
        <div className="mx-4 mb-3 bg-gray-100 dark:bg-gray-700 rounded flex items-center px-3 py-2">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="search"
            className={`bg-transparent flex-1 outline-none ${
              isDarkmode ? "placeholder:text-gray-300 text-white" : ""
            }`}
            placeholder="Search..."
          />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto space-y-4 px-4 pb-4 min-h-0">
          {messageArray.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => setChat(true)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.profile}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="profile"
                />
                <div>
                  <h3 className="font-semibold text-sm">{item.fullName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.LastMessage}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{item.Time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      <div
        className={`flex flex-col flex-1 min-h-0 overflow-hidden ${
          chat || isWide ? "flex" : "hidden"
        } ${isDarkmode ? "bg-gray-800" : "bg-white"}`}
      >
        {/* Mobile back arrow */}
        {!isWide && (
          <span
            className="p-4 block md:hidden cursor-pointer"
            onClick={() => setChat(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        )}

        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src="bit.png"
              className="w-10 h-10 rounded-full object-cover"
              alt="profile"
            />
            <div>
              <h1 className="font-bold">abay tefera</h1>
              <p className="text-green-400 text-sm">Online</p>
            </div>
          </div>
          <div className="flex gap-4 text-xl">
            <FontAwesomeIcon
              icon={faVideo}
              className="text-pink-600 cursor-pointer"
              title="Video Call"
            />
            <FontAwesomeIcon
              icon={faPhone}
              className="text-green-600 cursor-pointer"
              title="Voice Call"
            />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 flex  flex-col overflow-y-auto px-4 py-4 space-y-4 min-h-0">
          {messagetext.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col max-w-[60%] ${
                msg.own === "sender" ? "self-end items-end" : "self-start"
              }`}
            >
              {msg.profile && (
                <img
                  src={msg.profile}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div className={`${msg.bg} px-4 py-2 rounded-xl`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div
          className={`w-full flex items-end gap-4 px-4 py-3 ${
            isDarkmode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <div className="text-xl text-gray-700 dark:text-white flex gap-3">
            <FontAwesomeIcon icon={faFile} className="cursor-pointer" />
            <FontAwesomeIcon icon={faMicrophone} className="cursor-pointer" />
          </div>
          <textarea
            rows={1}
            placeholder="Type a message..."
            className={`flex-1 resize-none rounded px-4 py-2 max-h-[150px] outline-none ${
              isDarkmode ? "bg-gray-800 text-white" : "bg-white"
            }`}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2 rounded">
            Send
          </button>
        </div>
      </div>

      {/* Message empty hint (mobile) */}
      {!chat && !isWide && (
        <div className="flex justify-center items-center text-gray-600 w-full">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default MessageSection;
