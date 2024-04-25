import React from "react";

function SearchEngine({ query, setQuery, search }) {
    const handleClick = ()=>{
        search()
      }
    const handleKeyPress = (e)=>{
        if (e.key === "Enter") {
            search();
        }}
  return (
    <div className="SearchEngine">
      <input
        type="text"
        className="city-search"
        placeholder="enter city name"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
       
      />
      <button onClick={handleClick}><i className="fas fa-search" style={{ fontSize: "18px" }}></i></button>
    </div>
  );
}

export default SearchEngine;