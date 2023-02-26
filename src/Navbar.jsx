import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
// import logoImage from "./img/COQ_MINILOGO.png";

const Navbar = ({ user, setUser, setIsAuth }) => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      setUser({});
      navigate("/sign-in");
    });
  };

  window.addEventListener("click", (event) => {
    if (event.target.closest(".btn-hamburger")) return;
    if (openHamburger) {
      setOpenHamburger(false);
    }
  });

  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const navbarEle = document.querySelector(".Navbar");
    if (openHamburger) {
      setOpenHamburger(false);
    }
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      //scroll down
      navbarEle.classList.add("shrink");
    } else if (st < lastScrollTop) {
      //scroll up
      navbarEle.classList.remove("shrink");
    }
    lastScrollTop = st <= 0 ? 0 : st;
  });

  return (
    <div className="Navbar">
      <div className="container">
        <div className="wrapper">
          <Link to="/" className="link">
            <div className="logo">
              {/* <img src={logoImage} alt="logo-pic" /> */}

              <h1 className="logo-name">
                CAPD
                <div className="draw">
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                M
              </h1>
            </div>
          </Link>

          <ul className={openHamburger ? "list open" : "list"}>
            <li>
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/guide" className="link">
                Guide
              </Link>
            </li>

            {!user ? (
              <li>
                <Link to="/sign-in" className="link">
                  Sign in
                </Link>
              </li>
            ) : (
              <li>
                <button className="btn-sign-out" onClick={logout}>
                  Sign out
                </button>
              </li>
            )}
          </ul>

          <button
            className="btn-hamburger"
            onClick={() => setOpenHamburger((prev) => !prev)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <i className="fa-solid fa-user user">{user?.displayName}</i>
      </div>
    </div>
  );
};

export default Navbar;
