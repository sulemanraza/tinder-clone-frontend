import Nav from "../components/Nav";
import { useState } from "react";
import AuthModal from "../components/AuthModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const authToken = false;
  const minimal = false;

  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(true);
  };
  return (
    <div className="overlay">
      <Nav
        authToken={authToken}
        minimal={minimal}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
        isSignUp={isSignUp}
      />
      <div className="home">
        <div className="home_wrap">
          <h1 className="primary_title">Swipe Right®</h1>
          <button className="primary_button" onClick={handleClick}>
            {authToken ? "Sign out" : "Create Account"}
          </button>
        </div>
        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  );
};

export default Home;
