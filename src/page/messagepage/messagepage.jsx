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
  const messageport = useMediaQuery({ query: "(min-width:900px)" });
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
        isDarkmode ? "bg-gray-800 text-white" : ""
      } flex w-full h-full overflow-hidden pb-15`}
    >
      {/* Left: Message List */}
      <div
        className={`w-[300px] max-w-full border-r border-gray-400 shadow-md ${
          isDarkmode ? "bg-gray-800 text-white" : "bg-white"
        } flex flex-col ${
          chat && messageport ? "flex" : chat ? "hidden" : "flex"
        }`}
      >
        <h2 className="text-2xl font-bold px-4 pt-4 pb-2">Message</h2>

        {/* Search */}
        <div className="mx-4 bg-gray-100 rounded flex items-center px-3 py-2">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="search"
            className={`bg-transparent ${
              isDarkmode ? "placeholder:text-black" : ""
            } outline-none flex-1`}
            placeholder="Search..."
            aria-label="Search messages"
          />
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto mt-4 px-4 space-y-5">
          {messageArray.map((item, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2"
              onClick={() => setChat(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setChat(true);
                }
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.profile}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={`${item.fullName} profile`}
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

      {/* Right: Chat Section */}
      <div
        className={`flex flex-col flex-1 ${
          isDarkmode ? "bg-gray-800" : "bg-white"
        } pb-[40px] ${chat ? "flex" : "hidden"}`}
      >
        {/* Chat Header */}
        <span
          className="self-start cursor-pointer p-4 block md:hidden"
          onClick={() => setChat(false)}
          role="button"
          tabIndex={0}
          aria-label="Back to messages"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setChat(false);
            }
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <div className="flex items-center justify-between p-4 shadow">
          <div className="flex items-center gap-4">
            <img
              src="bit.png"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h1 className="font-bold capitalize">abay tefera</h1>
              <p className="text-green-300 text-sm font-bold">Online</p>
            </div>
          </div>
          <div className="flex gap-4 text-xl">
            <FontAwesomeIcon
              icon={faVideo}
              className="text-pink-600 cursor-pointer"
              title="Video call"
            />
            <FontAwesomeIcon
              icon={faPhone}
              className="text-green-600 cursor-pointer"
              title="Voice call"
            />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {messagetext.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 max-w-[60%] ${
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
              <div className={`${msg.bg} px-4 py-2 rounded-xl`}>{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div
          className={`${
            isDarkmode ? "bg-gray-700" : "bg-gray-100"
          } px-4 py-3 w-full flex items-end gap-4 mb-13`}
        >
          <div className="text-xl text-gray-700 flex gap-3">
            <FontAwesomeIcon
              icon={faFile}
              className={`${isDarkmode ? "text-white" : ""} cursor-pointer`}
              title="Attach file"
            />
            <FontAwesomeIcon
              icon={faMicrophone}
              className={`${isDarkmode ? "text-white" : ""} cursor-pointer`}
              title="Record audio"
            />
          </div>
          <textarea
            rows={1}
            placeholder="Type a message..."
            className={`flex-1 shrink-1 resize-none max-w-full outline-none ${
              isDarkmode ? "transparent" : "bg-white"
            } rounded px-4 py-2 max-h-[150px] overflow-auto`}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            aria-label="Type your message"
          ></textarea>
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2 rounded">
            Send
          </button>
        </div>
      </div>

      {/* Empty message notice */}
      <div
        className={`justify-center m-auto text-gray-600 ${
          chat ? "hidden" : "flex"
        } md:hidden`}
      >
        Select a chat to start messaging
      </div>
    </div>
  );
};

export default MessageSection;
