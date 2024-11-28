import React from "react";
import "./Dropdown.css";

const Dropdown = ({ setGrouping, setOrdering }) => {
  return (
    <div className="dropdown">
      <label>
        Grouping:
        <select onChange={(e) => setGrouping(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </label>
      <label>
        Ordering:
        <select onChange={(e) => setOrdering(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>
  );
};

export default Dropdown;
