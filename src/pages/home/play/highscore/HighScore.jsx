import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebase-config";
import HighscoreChild from "../../../../components/HighscoreChild";
import "./HighScore.css";
const HighScore = () => {
  const [highscore, setHighscore] = useState([]);
  const { id } = useParams();
  const collectionRef = collection(db, `reportedHighscore/${id}/children`);
  const q = query(collectionRef, orderBy("score", "desc"));
  useEffect(() => {
    const getHighscore = async () => {
      const data = await getDocs(q);
      setHighscore(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getHighscore();
  }, []);

  return (
    <div className="HighScore">
      <table>
        <tbody>
          <tr>
            <th>NAME</th>
            <th>SCORE</th>
          </tr>
          {highscore.map((hs) => (
            <HighscoreChild key={hs.id} name={hs.name} score={hs.score} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HighScore;
