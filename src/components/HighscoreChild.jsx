import React from "react";

const HighscoreChild = ({ name, score }) => {
  return (
    <tr className="HighscoreChild">
      <td>{name}</td>
      <td>{score}</td>
    </tr>
  );
};

export default HighscoreChild;
