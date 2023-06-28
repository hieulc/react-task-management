import useProjectContext from "../hooks/useProjectContext";
import ProjectShow from "./ProjectShow";

function ProjectList() {
  const { projects } = useProjectContext();

  const renderedProjects = projects.map((project) => {
    return <ProjectShow key={project.id} project={project} />;
  });

  return <div>{renderedProjects}</div>;
}

export default ProjectList;
