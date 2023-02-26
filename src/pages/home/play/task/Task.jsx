import { setDoc, collection, getDocs, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../../firebase-config";
import Button from "../../../../components/Button";
import TaskNumber from "../../../../components/TaskNumber";
import "./Task.css";

const Task = ({ user }) => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const { id } = useParams();
  const collectionRef = collection(db, `reportedHighscore/${id}/children`);
  const navigate = useNavigate();
  console.log(question);
  console.log(answerList);

  const finishAnswer = async () => {
    let score = 0;
    const checkAnswer = () => {
      answerList.map((answer) => {
        if (answer?.choice === question[answer.number]?.answer) {
          score = score + 1;
        }
      });
    };
    //check answer all the question.
    if (answerList.length !== question.length) return;
    checkAnswer();

    const docRef = doc(collectionRef, user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      alert("You have already played it.");
    } else {
      console.log(score);
      await setDoc(docRef, {
        score: score,
        user: user.email,
        name: user.displayName,
      });
      navigate(`/play/highscore/${id}`);
    }
  };

  useEffect(() => {
    const getLists = async () => {
      const data = await getDocs(collection(db, "questionList"));
      const questionList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const [_question] = questionList.filter((q) => q.id === id);
      setTitle(_question.nameCategory);
      setQuestion(_question.questionList);
    };

    getLists();
  }, []);

  return (
    <div className="Task">
      <div className="container">
        <h2 className="title">{title}</h2>
        {question.map((q, index) => {
          return (
            <TaskNumber
              key={index}
              q={q}
              index={index}
              setAnswerList={setAnswerList}
              answerList={answerList}
            />
          );
        })}
        <Button text="Done" onClick={finishAnswer} />
      </div>
    </div>
  );
};

export default Task;
