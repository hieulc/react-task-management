import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

function CustomLink({ to, children, className, activeClassName, icon }) {
  const currentPath = useLocation().pathname;
  const isActive = currentPath === to;

  const classes = classNames(
    "sidebar-menu text-black",
    className,
    isActive && activeClassName
  );

  return (
    <div className={classes}>
      <Link to={to} className="sidebar-icons">
        {icon}
      </Link>
      <Link to={to} className="sidebar-link">
        {children}
      </Link>
    </div>
  );
}

export default CustomLink;
