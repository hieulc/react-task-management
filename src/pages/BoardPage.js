import Card from "../components/Card";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import useProjectContext from "../hooks/useProjectContext";
import ProjectShow from "../components/ProjectShow";
import styles from "../login.module.css";
import authHeader from "../services/auth-header";

function BoardPage() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [duplicateName, setDuplicateName] = useState("");
  const [isDuplicateName, setIsDuplicateName] = useState(false);

  const { fetchProjects, createProject, projects, searchProjectByName } =
    useProjectContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = authHeader(user);

  useEffect(() => {
    fetchProjects(headers, user.username);
  }, [fetchProjects]);

  const handleClick = () => {
    setShowModal(true);
    setIsDuplicateName(false);
    setDuplicateName("");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isExistedProject = await searchProjectByName(
      name,
      user.username,
      headers
    );

    if (isExistedProject.data === 1) {
      setIsDuplicateName(true);
      setDuplicateName(name);
      return;
    }

    createProject(name, user.username, headers);
    setName("");
    handleClose();
  };

  const actionBar = (
    <div>
      <button
        onClick={handleSubmit}
        className={`large-btn ${styles.create_btn}`}
      >
        Create
      </button>
    </div>
  );

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <div className="book-create">
        <form onSubmit={handleSubmit}>
          <label className="board-title">Board Title</label>
          <br />
          <input
            className={`board-name ${styles.board_input}`}
            value={name}
            onChange={handleChange}
            placeholder="Enter your board name"
          />
          {isDuplicateName && (
            <div className={`${styles.alert} ${styles.field_error}`}>
              Project name <span className="highlight">'{duplicateName}'</span>{" "}
              is already existed. Please choose another one.
            </div>
          )}
        </form>
      </div>
    </Modal>
  );

  const renderedProjects = projects.map((project) => {
    return <ProjectShow key={project.projectId} project={project} />;
  });

  return (
    <div className="flex-container">
      {renderedProjects}
      <Card className="card" onClick={handleClick}>
        <div className="card-content">Create new board</div>
      </Card>
      {showModal && modal}
    </div>
  );
}

export default BoardPage;
