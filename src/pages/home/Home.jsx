import React, { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = ({ isAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // if (!isAuth) {
    //   navigate("/sign-in");
    // }
    randomLetterEffect();
  }, []);

  function randomLetterEffect(event) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iterator = 0;
    let element = null;
    if (!event) {
      element = document.querySelector(".hero-text");
    } else {
      element = event.target;
    }
    const interval = setInterval(() => {
      element.innerText = element.innerText
        .split("")
        .map((letter, index) => {
          if (index < iterator) {
            return element.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterator >= element.dataset.value.length) {
        clearInterval(interval);
      }
      iterator += 1 / 3;
    }, 30);
  }

  const handleClickLink = (event) => {
    if (!isAuth) {
      navigate("/sign-in");
    } else {
      navigate(`/${event.target.innerText.toLowerCase()}`);
    }
  };

  return (
    <div className="Home">
      <div className="container">
        <section className="hero">
          <h1 className="hero-text" data-value="WHAT'S FUN">
            WHAT'S FUN
          </h1>
        </section>
        <section className="section-create">
          <h3
            className="head-creator"
            data-value="CREATOR"
            onMouseOver={(event) => randomLetterEffect(event)}
          >
            CREATOR
          </h3>
          <button
            className="link-create"
            onClick={(event) => handleClickLink(event)}
          >
            CREATE
          </button>
        </section>
        <section className="section-play">
          <h3
            data-value="PLAYER"
            onMouseOver={(event) => randomLetterEffect(event)}
          >
            PLAYER
          </h3>
          <button
            className="link-play"
            onClick={(event) => handleClickLink(event)}
          >
            PLAY
          </button>
        </section>
      </div>
    </div>
  );
};

export default Home;
