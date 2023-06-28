import { Link, Outlet } from "react-router-dom";
import useProjectContext from "../hooks/useProjectContext";

function BoardLayout() {
  const { projects } = useProjectContext();

  const renderedLinks = projects.map((project) => {
    return (
      <>
        <Link to={`/boards/${project.id}`} children={project.projectName} />
        <br />
      </>
    );
  });

  return (
    <>
      {renderedLinks}
      <Outlet />
    </>
  );
}

export default BoardLayout;
