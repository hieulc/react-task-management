import { useState } from "react";
import useProjectContext from "../hooks/useProjectContext";

function ProjectCreate() {
  const [name, setName] = useState("");

  const { createProject } = useProjectContext();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProject(name);
    setName("");
  };

  return (
    <div className="book-create">
      <form onSubmit={handleSubmit}>
        <label className="board-title">Board Title</label>
        <br />
        <input className="board-name" value={name} onChange={handleChange} />
      </form>
    </div>
  );
}

export default ProjectCreate;
