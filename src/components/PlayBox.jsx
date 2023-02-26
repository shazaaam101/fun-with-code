import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
const PlayBox = ({ nameCategory, id, user }) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const ignore = useRef(false);
  useEffect(() => {
    async function checkPlayed() {
      const collectionRef = collection(db, `reportedHighscore/${id}/children`);
      const docRef = doc(collectionRef, user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHasPlayed(true);
      }
    }
    if (!ignore.current) {
      checkPlayed();
      ignore.current = true;
    }
  }, [id, user.email]);
  return (
    <div className="PlayBox">
      <div className="wrapper">
        <h3 className="title">{nameCategory}</h3>
        <div className="link">
          <Link
            className={hasPlayed ? "link-play cannot" : "link-play"}
            to={`./task/${id}`}
          >
            {hasPlayed ? "DONE" : "PLAY"}
          </Link>
          <div className="line"></div>
          <Link className="link-highscore" to={`./highscore/${id}`}>
            HIGH SCORE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlayBox;
