import "./css/dashboard.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import TinderCards from "../components/TinderCard";
import AsideContainer from "../components/AsideContainer";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [ActiveChat, setActiveChat] = useState();
  const [chatClickedUser, setChatClickedUser] = useState(null);
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users?_id=${cookies.UserId}`
        );
        setUser(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [cookies.UserId]);

  return (
    user && (
      <div className="dashboard">
        <AsideContainer
          setActiveChat={setActiveChat}
          user={user}
          setChatClickedUser={setChatClickedUser}
        />
        {ActiveChat && (
          <ChatContainer
            user={user}
            setActiveChat={setActiveChat}
            chatClickedUser={chatClickedUser}
          />
        )}
        {!ActiveChat && <TinderCards user={user} />}
      </div>
    )
  );
};

export default Dashboard;
