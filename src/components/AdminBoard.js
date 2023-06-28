import { useEffect } from "react";
import useAdminContext from "../hooks/useAdminContext";
import styles from "../login.module.css";
import NoProjectCreated from "./NoProjectCreated";
import ProjectAccordion from "./ProjectAccordion";
import { useState } from "react";

function AdminBoard() {
  const { managedProjects, fetchManagedProjects } = useAdminContext();
  const [expanded, setExpanded] = useState("");

  useEffect(() => {
    fetchManagedProjects();
  }, []);

  const onExpandedChange = (projectName) => {
    setExpanded(projectName);
  };

  const renderedProjects = managedProjects.map((project) => {
    return (
      <ProjectAccordion
        key={project.projectId}
        project={project}
        setExpandedValue={onExpandedChange}
        expandedValue={expanded}
      />
    );
  });

  const isEmpty = managedProjects.length === 0;

  return (
    <div className={styles.admin_board_container}>
      <div className={styles.nav_admin_board}>
        <div className={styles.nav_admin_board_title}>
          <span className={styles.nav_admin_board_span}>
            <p className={styles.nav_admin_board_text}>Table</p>
          </span>
        </div>
      </div>
      <hr className={styles.no_project_board_separator} />
      <div className={styles.admin_board}>
        {isEmpty ? (
          <NoProjectCreated></NoProjectCreated>
        ) : (
          <div className={styles.admin_accordion}>{renderedProjects}</div>
        )}
      </div>
    </div>
  );
}

export default AdminBoard;
