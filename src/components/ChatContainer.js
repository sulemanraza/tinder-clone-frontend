import "./Dashboard/css/UserDetails.css";
import Conversation from "./Dashboard/Conversation";

const ChatContainer = ({ user, setActiveChat, chatClickedUser }) => {
  function getAge(dateString) {
    var ageInMilliseconds = new Date() - new Date(dateString);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }

  return (
    <div className="chat_container">
      <div className="chat_area">
        {/* chat box and input */}
        <div className="user_Chat">
          <Conversation
            setActiveChat={setActiveChat}
            chatClickedUser={chatClickedUser}
            user={user}
          />
        </div>

        {/* user Details Sidebar */}
        <div className="user_details">
          <div className="slide-container">
            <div
              className="imageContainer"
              style={{ backgroundImage: `url(${chatClickedUser.photos?.[0]})` }}
            ></div>
            <div className="details">
              <h3>
                {chatClickedUser.firstName} ,{" "}
                {getAge(
                  `${chatClickedUser.dob_year}-${chatClickedUser.dob_month}-${chatClickedUser.dob_day}`
                )}
              </h3>
              <p>{chatClickedUser.about}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
