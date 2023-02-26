import { collection, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import PlayBox from "../../../components/PlayBox";
import "./Play.css";
const Play = ({ user }) => {
  const [questionList, setQuestionList] = useState([]);
  const [value, setValue] = useState("");
  console.log("questionLsit", questionList);

  const findCategory = useCallback(() => {
    const valueLocal = value.trim().toLowerCase();
    console.log(valueLocal);
    if (valueLocal.length === 0) {
      console.log("Hrllo");
      return questionList;
    }
    const newList = questionList.filter(({ nameCategory }) =>
      nameCategory.toLowerCase().includes(valueLocal)
    );
    console.log(newList);
    return newList;
  }, [value, questionList]);

  useEffect(() => {
    const getLists = async () => {
      const data = await getDocs(collection(db, "questionList"));
      setQuestionList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLists();
  }, []);

  return (
    <div className="Play">
      <input
        className="searchbar"
        type="search"
        placeholder="Find category..."
        onInput={(e) => {
          findCategory();
          setValue(e.target.value);
          console.log(e.target.value);
        }}
      />
      <div className="grid">
        {console.log(",fidsf", findCategory())}
        {findCategory()?.map((questionBox) => {
          return (
            <PlayBox
              key={questionBox.id}
              nameCategory={questionBox.nameCategory}
              id={questionBox.id}
              user={user}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Play;
