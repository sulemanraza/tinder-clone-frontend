import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogo from "../images/google-sign-in.svg";
import IosLogo from "../images/appal-store.png";
import AndroidLogo from "../images/app-store.png";
import { useCookies } from "react-cookie";

// Auth Model
const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords need to match!");
        return;
      }
      const response = await axios.post(
        `http://localhost:8000/users/${isSignUp ? "signup" : "login"}`,
        { email, password }
      );
      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);

      if (response.status === 201 && isSignUp) navigate("/onboarding");
      if (response.status === 200 && !isSignUp) navigate("/dashboard");

      window.location.reload();
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="auth_Modal">
      <div className="closeBtn" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="512px"
          height="512px"
        >
          <path d="M 7.5 1 C 3.914063 1 1 3.914063 1 7.5 C 1 11.085938 3.914063 14 7.5 14 C 11.085938 14 14 11.085938 14 7.5 C 14 3.914063 11.085938 1 7.5 1 Z M 10.207031 9.5 L 9.5 10.207031 L 7.5 8.207031 L 5.5 10.207031 L 4.792969 9.5 L 6.792969 7.5 L 4.792969 5.5 L 5.5 4.792969 L 7.5 6.792969 L 9.5 4.792969 L 10.207031 5.5 L 8.207031 7.5 Z" />
        </svg>
      </div>
      <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p className="terms">
        By clicking Log In, you agree to our Terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button className="secondary_button" type="submit">
          {isSignUp ? "Sign Up" : "Sign IN"}
        </button>
        <p>{error}</p>
      </form>
      <button className="secondary_button Google_signIn">
        <img src={GoogleLogo} alt="" />
        <span>Sign {isSignUp ? "Up" : "IN"} with Google</span>
      </button>
      <hr style={{ margin: isSignUp ? "15px 0" : "30px 0" }} />
      <h2>GET THE APP</h2>
      <div className="app_logos">
        <a
          href="https://play.google.com/store/apps/details?id=com.tinder"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={AndroidLogo} className="android_logo" alt="" />
        </a>
        <a
          href="https://apps.apple.com/us/app/tinder-dating-new-people/id547702041"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={IosLogo} alt="" className="ios_logo" />
        </a>
      </div>
    </div>
  );
};

export default AuthModal;
