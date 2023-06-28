import styles from "../login.module.css";
import { AiOutlineFolderAdd, AiFillPlusCircle } from "react-icons/ai";

function NoProjectCreated() {
  return (
    <div className={styles.no_project_container}>
      <div className={styles.padding_container}>
        <div className={styles.no_project_content}>
          <AiOutlineFolderAdd className={styles.no_project_image} />

          <span className={styles.no_project_content_text_container}>
            <p className={styles.no_project_title}>No boards created</p>
            <p>Create board to use this feature</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoProjectCreated;
