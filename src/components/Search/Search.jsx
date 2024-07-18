import React, { useState, Fragment } from "react";

import { useNavigate  } from "react-router-dom";

import "./Search.css";

function Search() {
  const [keyword, setKeyword] = useState("");

  const history = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
   
    if (keyword.trim()) {
      return history(`/products/${keyword}`);
    } else {
      return history("/products/");
    }
  }

  return (
    <form onSubmit={submitHandler} className="searchBox">
      <input
        type="text"
        onChange={(event) => {
          setKeyword(event.target.value);
        }}
      />
      <input type="submit" />
    </form>
  );
}

export default Search;
