import "./css/conversation.css";
import { AiOutlineSend } from "react-icons/ai";
import "./css/ChatInput.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import LogoImage from "../../images/tinder.png";
import { useEffect, useState } from "react";

const Conversation = ({ user, setActiveChat, chatClickedUser }) => {
  const { _id, firstName, photos } = chatClickedUser;
  const [inputMessage, setInputMessage] = useState("");
  const [senderMessages, setSenderMessages] = useState(null);
  const [receiverMessages, setReceiverMessages] = useState(null);

  // get Send Messages
  const getSenderMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/messages?senderId=${user._id}&receiverId=${_id}`
      );
      setSenderMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // get Receiver Messages
  const getReceiverMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/messages?senderId=${_id}&receiverId=${user._id}`
      );
      setReceiverMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user._id && getSenderMessages();
    _id && getReceiverMessages();
  }, [_id, user._id]);

  const messages = [];

  senderMessages?.[0]?.["messages"]?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["id"] = user?._id;
    formattedMessage["name"] = user?.firstName;
    formattedMessage["img"] = user?.photos?.[0];
    formattedMessage["message"] = message.message;
    formattedMessage["timestamps"] = message.timestamps;
    messages.push(formattedMessage);
  });

  receiverMessages?.[0]?.["messages"]?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["id"] = chatClickedUser?._id;
    formattedMessage["name"] = chatClickedUser?.firstName;
    formattedMessage["img"] = chatClickedUser?.photos?.[0];
    formattedMessage["message"] = message.message;
    formattedMessage["timestamps"] = message.timestamps;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort(
    (a, b) => new Date(a.timestamps) - new Date(b.timestamps)
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8000/messages`, {
        senderId: user._id,
        receiverId: chatClickedUser._id,
        message: inputMessage,
      });
      getSenderMessages();
      getReceiverMessages();
      setInputMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="chat_header">
        <div className="left">
          <div
            className="img"
            style={{ backgroundImage: "url(" + photos[0] + ")" }}
          ></div>
          <div className="details">
            <span>Conversation with {firstName}</span>
            <span>Alex Liked you on 25/06/2022</span>
          </div>
        </div>
        <div
          className="center"
          style={{ backgroundImage: "url(" + LogoImage + ")" }}
        >
          {/* <img src={LogoImage} alt="" srcset="" /> */}
        </div>
        <div className="right">
          <IoMdCloseCircleOutline onClick={() => setActiveChat(false)} />
        </div>
      </div>

      {descendingOrderMessages && (
        <section className="Chat_text">
          {descendingOrderMessages.map((e, index) =>
            e.id === user._id ? (
              <div className="Chat_from_me" key={index}>
                <div className="date">
                  {new Date(e.timestamps).toLocaleString()}
                </div>
                <p className="text">{e.message}</p>
                <div className="status">Sent</div>
              </div>
            ) : (
              <div className="Chat_from_them" key={e._id}>
                <div
                  className="img"
                  style={{ backgroundImage: "url(" + e.img + ")" }}
                ></div>
                <p className="text">{e.message}</p>
              </div>
            )
          )}
        </section>
      )}

      {/* chat_input */}
      <div className="Chat_input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            value={inputMessage}
            placeholder="Enter you message..."
            onChange={(e) => setInputMessage(e.target.value)}
            required
          />
          <button type="submit">
            <AiOutlineSend />
          </button>
        </form>
      </div>
    </>
  );
};

export default Conversation;
