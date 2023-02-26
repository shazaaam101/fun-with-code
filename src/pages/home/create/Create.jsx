import React, { useState } from "react";
import CreateQuestion from "../../../components/CreateQuestion";
import CreateTitle from "../../../components/CreateTitle";
import "./Create.css";
const Create = ({ user }) => {
  const [title, setTitle] = useState("");
  const [doneTitle, setDoneTitle] = useState(false);

  return (
    <div className="Create">
      <div className="container">
        {!doneTitle ? (
          <CreateTitle setTitle={setTitle} setDoneTitle={setDoneTitle} />
        ) : (
          <CreateQuestion title={title} user={user} />
        )}
      </div>
    </div>
  );
};

export default Create;
