import React, { useContext } from "react";
import { PasswordContext } from "../context/PasswordContext";

const SearchBar = () => {
  const { setSearchQuery } = useContext(PasswordContext);

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search here.."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
