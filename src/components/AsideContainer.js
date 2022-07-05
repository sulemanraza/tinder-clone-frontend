import React, { useEffect, useState } from "react";
import AsideHeader from "./Dashboard/ChatHeader";
import MatchesDisplayTab from "./Dashboard/MatchesDisplayTab";
import ChatDisplayTab from "./Dashboard/ChatDisplayTab";
import axios from "axios";

const AsideContainer = ({ setActiveChat, user, setChatClickedUser }) => {
  const [chatActive, setChatActive] = useState(false);
  const [matchedProfiles, setMatchedProfiles] = useState(null);

  const matchesUserIds = user?.matches?.map(({ user_id }) => user_id);
  const Image = "https://i.imgur.com/Lnt9K7l.jpeg";

  useEffect(() => {
    const getMatches = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/users/matches`,
          {
            userIds: matchesUserIds,
          }
        );
        setMatchedProfiles(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMatches();
  }, []);

  return (
    <div className="Aside_Container">
      <AsideHeader setActiveChat={setActiveChat} user={user} />
      <div className="Chat_Btn">
        <button
          className={!chatActive ? "option active" : "option"}
          onClick={() => setChatActive(false)}
        >
          Matches
        </button>
        <button
          className={chatActive ? "option active" : "option"}
          onClick={() => setChatActive(true)}
        >
          Chat
        </button>
      </div>
      {!chatActive && <MatchesDisplayTab matchedProfiles={matchedProfiles} />}
      {chatActive && (
        <ChatDisplayTab
          setActiveChat={setActiveChat}
          matchedProfiles={matchedProfiles}
          setChatClickedUser={setChatClickedUser}
        />
      )}
    </div>
  );
};

export default AsideContainer;
