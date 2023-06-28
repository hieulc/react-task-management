import CustomLink from "./CustomLink";
import { FaTrello, FaElementor } from "react-icons/fa";
import { TbActivityHeartbeat } from "react-icons/tb";

function SideBar() {
  const links = [
    { label: "Boards", path: "/boards", icon: <FaTrello /> },
    { label: "Admin", path: "/admin", icon: <FaElementor /> },
    { label: "Home", path: "/", icon: <TbActivityHeartbeat /> },
  ];

  const { username } = JSON.parse(localStorage.getItem("user"));

  const renderedLinks = links.map((link) => {
    return (
      <CustomLink
        key={link.label}
        to={link.path}
        children={link.label}
        className="mb-3"
        activeClassName="font-bold border-l-4 border-gray-500 pl-2"
        icon={link.icon}
      />
    );
  });

  return (
    <div className="wrapper">
      <div className="sidebar-user">{username.split("@")[0]}'s workspace</div>

      <div className="sidebar">{renderedLinks}</div>
    </div>
  );
}

export default SideBar;
