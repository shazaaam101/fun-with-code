import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import "./SignUp.css";

const SignUp = ({ setIsAuth }) => {
  const emailRegisterRef = useRef();
  const passwordRegisterRef = useRef();
  const usernameRef = useRef();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const updateUser = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: usernameRef.current.value,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
      console.log("ASDSA");
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRegisterRef.current.value,
        passwordRegisterRef.current.value
      );

      emailRegisterRef.current.value = "";
      passwordRegisterRef.current.value = "";

      setIsAuth(true);
      localStorage.setItem("isAuth", true);
      updateUser();
    } catch (error) {
      setIsError(true);
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={register}>
      <div className="sign-up">
        <div className="container">
          <div className="wrapper">
            <h3 className="title">Register</h3>
            {isError && <p className="error">Invalid email or password</p>}

            <input
              type="email"
              placeholder="Email"
              ref={emailRegisterRef}
              pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
              required
            />
            <input
              type="text"
              placeholder="Username"
              ref={usernameRef}
              pattern="[A-Za-z0-9._!]{1,12}"
              required
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRegisterRef}
              required
            />
            <button type="submit" className="authen-btn">
              Create user
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
