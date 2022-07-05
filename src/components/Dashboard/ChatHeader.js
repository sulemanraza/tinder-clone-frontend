import { BiLogOutCircle } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AsideHeader = ({ setActiveChat, user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const Image = user?.photos[0]
    ? user.photos[0]
    : "https://i.imgur.com/MWAcQRM.jpeg";

  let navigate = useNavigate();

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="aside_container_header">
      <div className="profile" onClick={() => setActiveChat(false)}>
        <div
          className="img_container"
          style={{ backgroundImage: "url(" + Image + ")" }}
          onClick={() => navigate("/onboarding")}
        ></div>
        <h3>{user?.firstName}</h3>
      </div>
      <div className="logout">
        <BiLogOutCircle onClick={logout} />
      </div>
    </div>
  );
};

export default AsideHeader;
