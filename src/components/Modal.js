import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../login.module.css";

function Modal({ onClose, children, actionBar, image, cancelBar }) {
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
        className="fixed absolute inset-0 bg-gray-300 opacity-80"
      ></div>
      <div
        className={`fixed absolute inset-40 p-5 bg-white ${styles.modal_container}`}
      >
        {image}
        <div
          className={`flex flex-col justify-between ${styles.modal_message}`}
        >
          {children}
          <div className={styles.btn_container}>
            {cancelBar}
            {actionBar}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
