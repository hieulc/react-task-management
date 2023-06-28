import { useState } from "react";
import useProjectContext from "../hooks/useProjectContext";
import Modal from "./Modal";

function ProjectEdit({ project, onSubmit }) {
  const [newName, setNewName] = useState(project.projectName);

  const { editProjectById } = useProjectContext();

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
    editProjectById(project.id, newName);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <input
        className="edit-input"
        value={newName}
        onChange={handleChange}
        placeholder="New board name"
      />
      <button className="button primary-btn">Save</button>
    </form>
  );
}

export default ProjectEdit;
