import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../login.module.css";

function TaskModal({ onClose, children, actionBar, image, cancelBar }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className={`fixed absolute inset-0 ${styles.window_overlay}`}
      ></div>
      <div className={`fixed absolute ${styles.task_modal}`}>
        <div className={styles.task_modal_content}>{children}</div>
        <div className={styles.task_modal_action}>
          <div className={styles.btn_container}>
            {cancelBar}
            {actionBar}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".task-modal-container")
  );
}

export default TaskModal;
