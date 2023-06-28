import { useEffect, useState } from "react";
import useProjectContext from "../hooks/useProjectContext";
import Card from "./Card";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineEdit } from "react-icons/md";
import Modal from "./Modal";
import delete_logo from "../images/cancel-close-10374.svg";
import styles from "../login.module.css";
import { useNavigate } from "react-router-dom";
import authHeader from "../services/auth-header";

function ProjectShow({ project }) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newName, setNewName] = useState(project.projectName);
  const [duplicateName, setDuplicateName] = useState("");
  const [isDuplicateName, setIsDuplicateName] = useState(false);

  const { deleteProjectById, editProjectById, searchProjectByName } =
    useProjectContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = authHeader(user);
  const navigate = useNavigate();

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    deleteProjectById(project.projectId, headers);
    setShowDeleteModal(false);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
    setIsDuplicateName(false);
    setDuplicateName("");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isProjectExist = await searchProjectByName(
      newName,
      user.username,
      headers
    );

    if (project.projectName === newName) {
      handleClose();
    }

    if (isProjectExist.data === 1) {
      setIsDuplicateName(true);
      setDuplicateName(newName);
      return;
    }
    editProjectById(project.projectId, newName, headers);
    handleClose();
  };

  const actionBar = (
    <div>
      <button
        onClick={handleSubmit}
        className={`${styles.register_btn} large-btn`}
      >
        Edit
      </button>
    </div>
  );

  const actionDelete = (
    <div className={styles.delete_btn_container}>
      <button
        onClick={handleDelete}
        className={`large-btn ${styles.delete_btn}`}
      >
        Confirm
      </button>
    </div>
  );

  const actionCancel = (
    <div className={styles.cancel_btn_container}>
      <button
        onClick={handleDeleteModalClose}
        className={`large-btn ${styles.cancel_btn}`}
      >
        Cancel
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
            className="board-name"
            value={newName}
            onChange={handleChange}
          />
          {isDuplicateName && (
            <div className={`${styles.alert} ${styles.field_error}`}>
              Project name <span className="highlight">'{duplicateName}'</span>{" "}
              is already existed. Please choose another name.
            </div>
          )}
        </form>
      </div>
    </Modal>
  );

  const delete_image = (
    <img
      src={delete_logo}
      alt="delete_logo"
      style={{ height: 30, width: 30 }}
      className={styles.success_logo}
    />
  );

  const deleteModal = (
    <Modal
      onClose={handleDeleteModalClose}
      actionBar={actionDelete}
      cancelBar={actionCancel}
      image={delete_image}
    >
      <h1>Are you sure?</h1>
      <p>
        Do you really want to delete '{project.projectName}' board? This process
        cannot be undone
      </p>
    </Modal>
  );

  let content = <h3>{project.projectName}</h3>;

  const toBoardDetail = () => {
    navigate(`/boards/${project.projectId}`);
  };

  const isAdmin = project.createdBy === user.username;

  return (
    <>
      <Card className="project-show" onClick={toBoardDetail}>
        <div
          style={{
            backgroundImage: `url(https://picsum.photos/seed/${project.projectId}/300/200)`,
          }}
          className="project-item"
        >
          <div className="overlay"></div>
          {isAdmin && (
            <div>
              <button onClick={handleDeleteClick}>
                <TiDeleteOutline className="icon-delete" />
              </button>
              <button onClick={handleClick}>
                <MdOutlineEdit className="icon-edit" />
              </button>
            </div>
          )}

          {content}
        </div>
      </Card>

      {showModal && modal}
      {showDeleteModal && deleteModal}
    </>
  );
}

export default ProjectShow;
