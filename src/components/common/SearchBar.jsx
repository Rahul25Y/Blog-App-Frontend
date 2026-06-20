import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="input-group" style={{ maxWidth: "320px" }}>
      <span className="input-group-text bg-transparent border-end-0 border-color ps-3 text-muted-custom">
        <FiSearch size={16} />
      </span>
      <input
        type="text"
        className="form-control form-control-custom ps-2 border-start-0 text-sm"
        placeholder="Search Blogs..."
        aria-label="Search Blogs"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          fontSize: "0.9rem",
          height: "38px"
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
