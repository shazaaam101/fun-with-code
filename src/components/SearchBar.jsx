import React from "react";
import "./SearchBar.css";

const SearchBar = ({ findCategory }) => {
  return (
    <div className="SearchBar">
      <input
        type="search"
        placeholder="Find category..."
        onInput={(e) => {
          findCategory(e.target.value);
          console.log(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
