import "./css/ChatDisplayTab.css";
import ChatIcon from "./ChatIcon";

const ChatDisplayTab = ({
  setActiveChat,
  matchedProfiles,
  setChatClickedUser,
}) => {
  // set Chat user
  const handleClick = (chatClickedUser) => {
    setActiveChat(true);
    setChatClickedUser(chatClickedUser);
  };

  return (
    <div className="ChatList">
      {!matchedProfiles && (
        <div className="Chat_icon">
          <ChatIcon />
          <h3>Say Hello</h3>
          <p>
            Looking to strike up a conversation? When you match with others, you
            can send them a message under “Matches”
          </p>
        </div>
      )}
      <h4>Messages</h4>

      {/* users Chat List  */}
      <ul className="UserList">
        {matchedProfiles?.map((e, index) => (
          <li
            className="user_profile"
            key={index}
            onClick={() => handleClick(e)}
          >
            <div
              className="user_profile_img"
              style={{ backgroundImage: "url(" + e.photos?.[0] + ")" }}
            ></div>
            <div className="user_profile_info">
              <div className="name">
                <span>{e.firstName}</span>
                <span>*</span>
              </div>
              <p>New Match! Hello Say</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatDisplayTab;
