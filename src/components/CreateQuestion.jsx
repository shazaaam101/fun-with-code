import React, { useEffect, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
const CreateQuestion = ({ title, user }) => {
  const [questionList, setQuestionList] = useState([]);
  const questionRef = useRef();
  const choiceARef = useRef();
  const choiceBRef = useRef();
  const choiceCRef = useRef();
  const choiceDRef = useRef();
  const navigate = useNavigate();
  const collectionRef = collection(db, "questionList");
  const [index, setIndex] = useState(0);
  const radioAnswer = document.getElementsByName("answer");
  console.log(questionList);
  console.log(user);

  //updating number of quesiton.
  useEffect(() => {
    const questionElement = document.getElementById("question");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    for (let i = 0; i < radioAnswer.length; i++) {
      if (questionList[index]?.answer === radioAnswer[i]?.value) {
        radioAnswer[i].checked = "checked";
      }
    }
    questionRef.current.value = questionList[index]?.question
      ? questionList[index].question
      : "";
    choiceARef.current.value = questionList[index]?.choiceA
      ? questionList[index]?.choiceA
      : "";
    choiceBRef.current.value = questionList[index]?.choiceB
      ? questionList[index]?.choiceB
      : "";
    choiceCRef.current.value = questionList[index]?.choiceC
      ? questionList[index]?.choiceC
      : "";
    choiceDRef.current.value = questionList[index]?.choiceD
      ? questionList[index]?.choiceD
      : "";
    questionElement?.focus();

    index === 0
      ? (prevBtn.style.display = "none")
      : (prevBtn.style.display = "initial");
    index === questionList.length
      ? (nextBtn.style.display = "none")
      : (nextBtn.style.display = "initial");
  }, [index, questionList, radioAnswer, setQuestionList]);

  const changeIndex = (action) => {
    if (action === "prev" && index > 0) {
      setIndex((prev) => prev - 1);
    } else if (action === "next" && index < questionList.length) {
      if (index === questionList.length - 1) {
        radioAnswer[0].checked = "checked";
      }
      setIndex((prev) => prev + 1);
    }
  };

  const addAnswer = () => {
    let _answer = "";
    for (let i = 0; i < radioAnswer.length; i++) {
      if (radioAnswer[i].checked) {
        _answer = radioAnswer[i].value;
      }
    }
    setQuestionList([
      ...questionList,
      {
        question: questionRef.current.value,
        choiceA: choiceARef.current.value,
        choiceB: choiceBRef.current.value,
        choiceC: choiceCRef.current.value,
        choiceD: choiceDRef.current.value,
        answer: _answer,
      },
    ]);
    questionRef.current.value = "";
    questionRef.current.value = "";
    choiceARef.current.value = "";
    choiceBRef.current.value = "";
    choiceCRef.current.value = "";
    choiceDRef.current.value = "";
    setIndex((index) => index + 1);
    radioAnswer[0].checked = "checked";
  };
  //editing question.
  const editAnswer = () => {
    questionList[index].question = questionRef.current.value;
    questionList[index].choiceA = choiceARef.current.value;
    questionList[index].choiceB = choiceBRef.current.value;
    questionList[index].choiceC = choiceCRef.current.value;
    questionList[index].choiceD = choiceDRef.current.value;
    for (let i = 0; i < radioAnswer.length; i++) {
      if (radioAnswer[i].checked) {
        questionList[index].answer = radioAnswer[i].value;
      }
    }
    alert("Edited!");
  };
  //adding all question.
  const addQuestionList = async () => {
    if (questionList.length === 0) return;
    await addDoc(collectionRef, {
      nameCategory: title,
      questionList: questionList,
      author: user.displayName,
    });
    navigate("/");
  };

  //change number question.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (index === questionList.length) {
      return addAnswer();
    }
    return editAnswer();
  };

  return (
    <div className="CreateQuestion">
      <div className="container">
        <button onClick={() => changeIndex("prev")} className="prev-btn">
          &lt;
        </button>
        <button onClick={() => changeIndex("next")} className="next-btn">
          &gt;
        </button>
        <h3 className="title">{title}</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="question" className="question-label">
            {index + 1}
          </label>
          <textarea
            placeholder="question ..."
            cols="50"
            rows="5"
            required
            maxLength="200"
            autoFocus
            ref={questionRef}
            id="question"
          ></textarea>
          <section className="grid">
            <div className="block">
              <label htmlFor="A">A&ensp;</label>
              <input type="text" id="A" required ref={choiceARef} />
            </div>
            <div className="block">
              <label htmlFor="B">B&ensp;</label>
              <input type="text" id="B" required ref={choiceBRef} />
            </div>

            <div className="block">
              <label htmlFor="C">C&ensp;</label>
              <input type="text" id="C" required ref={choiceCRef} />
            </div>

            <div className="block">
              <label htmlFor="D">D&ensp;</label>
              <input type="text" id="D" required ref={choiceDRef} />
            </div>
          </section>

          <div className="true-answer">
            <p>true-answer</p>
            <div className="wrapper">
              <label htmlFor="">
                <span>A</span>
                <input type="radio" name="answer" value="A" defaultChecked />
              </label>
              |
              <label htmlFor="">
                <span>B</span>
                <input type="radio" name="answer" value="B" />
              </label>
              |
              <label htmlFor="">
                <span>C</span>
                <input type="radio" name="answer" value="C" />
              </label>
              |
              <label htmlFor="">
                <span>D</span>
                <input type="radio" name="answer" value="D" />
              </label>
            </div>
          </div>

          <div className="option">
            <Button
              type="submit"
              text={index === questionList.length ? "Add" : "Edit"}
            />
            <Button type="button" text="Done" onClick={addQuestionList} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
