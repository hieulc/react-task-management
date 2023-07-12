import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

function CustomLink({
  to,
  children,
  className,
  activeClassName,
  icon,
  activeIcon,
  fetchProjects,
}) {
  const currentPath = useLocation().pathname;
  const isActive = currentPath === to;

  const classes = classNames(
    "sidebar-menu text-white",
    className,
    isActive && activeClassName
  );

  return (
    <div className={classes}>
      <Link to={to} className="sidebar-icons">
        {!isActive && icon}
        {isActive && activeIcon}
      </Link>
      <Link to={to} className="sidebar-link">
        {children}
      </Link>
    </div>
  );
}

export default CustomLink;
