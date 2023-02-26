import React from "react";

const CreateTitle = ({ setTitle, setDoneTitle }) => {
  const doneInputTitle = (e) => {
    e.preventDefault();
    setDoneTitle(true);
    console.log("Enter title");
  };
  return (
    <div className="CreateTitle">
      <form onSubmit={(e) => doneInputTitle(e)}>
        <h3>Category</h3>
        <input
          type="text"
          placeholder="Enter title(< 30)"
          maxLength="30"
          autoFocus
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </div>
  );
};

export default CreateTitle;
