import React from "react";

const TaskNumber = ({ q, index, setAnswerList, answerList }) => {
  //Check answer!
  const handleClick = (e) => {
    const number = e.target.name;
    const choice = e.target.value;
    if (answerList?.find((answer) => answer.number === number)) {
      const changeState = answerList.map((answer) => {
        if (answer?.number === number) {
          return { ...answer, choice: choice };
        } else {
          return answer;
        }
      });
      setAnswerList(changeState);
    } else {
      setAnswerList([...answerList, { number: number, choice: choice }]);
    }
  };
  return (
    <div className="TaskNumber">
      <h3 className="question">
        <span>{index + 1}.&#41;</span> {q.question}
      </h3>
      <div className="choices">
        <label htmlFor={`A${index}`}>
          <input
            type="radio"
            id={`A${index}`}
            value="A"
            name={index}
            onClick={(e) => handleClick(e)}
          />
          &ensp;A. {q.choiceA}
        </label>

        <label htmlFor={`B${index}`}>
          <input
            type="radio"
            id={`B${index}`}
            value="B"
            name={index}
            onClick={(e) => handleClick(e)}
          />
          &ensp;B. {q.choiceB}
        </label>

        <label htmlFor={`C${index}`}>
          <input
            type="radio"
            id={`C${index}`}
            value="C"
            name={index}
            onClick={(e) => handleClick(e)}
          />
          &ensp;C. {q.choiceC}
        </label>

        <label htmlFor={`D${index}`}>
          <input
            type="radio"
            id={`D${index}`}
            value="D"
            name={index}
            onClick={(e) => handleClick(e)}
          />
          &ensp;D. {q.choiceD}
        </label>
      </div>
    </div>
  );
};

export default TaskNumber;
