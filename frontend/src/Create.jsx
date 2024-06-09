import React, { useState } from "react";

const Create = ({ handleAdd }) => {
  const [task, setTask] = useState("");

  const handleSubmit = () => {
    if (task.trim()) {
      handleAdd(task);
      setTask("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="create-form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button type="button" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

export default Create;
