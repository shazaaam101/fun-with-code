import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import "./SignIn.css";

const SignIn = ({ setIsAuth }) => {
  const emailLoginRef = useRef();
  const passwordLoginRef = useRef();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        emailLoginRef.current.value,
        passwordLoginRef.current.value
      );
      emailLoginRef.current.value = "";
      passwordLoginRef.current.value = "";
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
      navigate("/");
    } catch (error) {
      setIsError(true);
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={login}>
      <div className="sign-in">
        <div className="container">
          <div className="wrapper">
            <h3 className="title">Login</h3>
            {isError && <p className="error">Invalid email or password</p>}
            <input
              type="email"
              placeholder="Email"
              ref={emailLoginRef}
              required
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordLoginRef}
              required
            />
            <div className="create-account">
              <p>New user ?</p>
              <Link to="/sign-up" className="link">
                Sign up
              </Link>
            </div>
            <button type="submit" className="authen-btn">
              login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
