import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");

  const isOnline = useOnlineStatus();

  return (
    <div className="flex justify-between p-4 shadow my-2">
      <div className="flex">
        <Link to="/">
          <img className="w-24 h-24" src={LOGO_URL} alt="logo" />
        </Link>
      </div>
      <div className="nav-items text-lg font-semibold pointer">
        <ul className="flex p-4 m-4 gap-8">
          <li>Online status : {isOnline ? "✅" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <button
            className="login-btn"
            onClick={() => {
              if (loginBtn === "Login") {
                setLoginBtn("Logout");
              } else {
                setLoginBtn("Login");
              }
            }}
          >
            {loginBtn}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
