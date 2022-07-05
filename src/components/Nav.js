import whiteLogo from "../images/tinder_logo_white.png";
import colorLogo from "../images/color-logo-tinder.png";

const Nav = ({ minimal, showModal, setShowModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };
  const authToken = false;
  return (
    <nav>
      <div className="logo_container">
        <img src={minimal ? colorLogo : whiteLogo} alt="" className="logo" />
      </div>
      {!authToken && !minimal && (
        <button
          className="nav_button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </nav>
  );
};

export default Nav;
