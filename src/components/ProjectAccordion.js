import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import styles from "../login.module.css";
import AdminTable from "./AdminTable";

function ProjectAccordion({ project, setExpandedValue, expandedValue }) {
  const handleChange = (projectName) => (event, isExpanded) => {
    setExpandedValue(isExpanded ? projectName : "");
  };

  return (
    <>
      <Accordion
        expanded={expandedValue === `${project.projectName}`}
        onChange={handleChange(`${project.projectName}`)}
      >
        <AccordionSummary
          id={project.projectName}
          expandIcon={
            <MdExpandMore className={styles.project_accordion_icon_header} />
          }
        >
          <h2 className={styles.project_accordion_summary}>
            {project.projectName}
          </h2>
        </AccordionSummary>
        <AccordionDetails>
          <AdminTable id={project.projectId} />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default ProjectAccordion;
