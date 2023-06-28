import styles from "../login.module.css";

function DescrTextArea() {
  return (
    <>
      <textarea
        className={styles.descr_textarea}
        placeholder="Edit your description"
      />
    </>
  );
}

export default DescrTextArea;
