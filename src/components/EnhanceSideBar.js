import useSidebarContext from "../hooks/useSidebarContext";
import style from "../sidebar.module.css";
import { BiChevronRight, BiChevronLeft, BiUser } from "react-icons/bi";
import { DiTrello } from "react-icons/di";
import CustomLink from "./CustomLink";
import {
  AiOutlineUser,
  AiOutlinePlus,
  AiFillFolder,
  AiFillFolderOpen,
} from "react-icons/ai";
import { CgTrello } from "react-icons/cg";

import { HiOutlineTableCells } from "react-icons/hi2";
import { RiMoreLine } from "react-icons/ri";
import useProjectContext from "../hooks/useProjectContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authHeader from "../services/auth-header";

export default function EnhanceSideBar() {
  const { isOpen, closeSidebar, openSidebar } = useSidebarContext();
  const navigate = useNavigate();

  const { projects, fetchProjects } = useProjectContext();

  const user = JSON.parse(localStorage.getItem("user"));
  const headers = authHeader(user);

  useEffect(() => {
    fetchProjects(headers, user.username);
  }, [fetchProjects]);

  const handleClick = () => {
    openSidebar();
  };

  const handleClose = () => {
    closeSidebar();
  };

  const links = [
    {
      label: "Boards",
      path: "/boards",
      icon: <DiTrello />,
      activeIcon: <CgTrello />,
    },
    {
      label: "Admin",
      path: "/admin",
      icon: <AiOutlineUser />,
      activeIcon: <AiOutlineUser />,
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: <HiOutlineTableCells />,
      activeIcon: <HiOutlineTableCells />,
    },
  ];

  const navigateToProject = (id) => {
    navigate(`/boards/${id}`);
  };

  const renderedProjects = projects.map((project) => {
    const { projectId, projectName } = project;
    return (
      <li className={style.project_sidebar_item} key={projectId}>
        <CustomLink
          to={`/p/${projectId}`}
          children={projectName}
          activeClassName="active-sidebar"
          icon={<AiFillFolder />}
          activeIcon={<AiFillFolderOpen />}
        />
      </li>
    );
  });

  const renderedLinks = links.map((link) => {
    const { label, path, icon, activeIcon } = link;
    return (
      <CustomLink
        key={label}
        to={path}
        children={label}
        activeClassName="active-sidebar"
        icon={icon}
        activeIcon={activeIcon}
      />
    );
  });

  const { username } = JSON.parse(localStorage.getItem("user"));
  const simpleUserIcon = username.charAt(0).toUpperCase();

  const collapseSidebar = (
    <nav className={style.sidebar}>
      <div
        className={`${style.collapse_sidebar} ${style.collapse_sidebar_animation}`}
      >
        <div className={style.navigation_collapse}>
          <button className={style.expand_sidebar_btn} onClick={handleClick}>
            <span className={style.expand_sidebar_circle_icon_container}>
              <BiChevronRight className={style.expand_sidebar_circle_icon} />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );

  const expandedSidebar = (
    <nav className={style.sidebar_expanded}>
      <div className={style.navigation_expanded}>
        <div className={style.navigation_expanded_content}>
          <div className={style.navigation_expanded_content_header}>
            <div
              className={
                style.navigation_expanded_content_header_user_icon_container
              }
            >
              <div
                className={style.navigation_expanded_content_header_user_icon}
              >
                {simpleUserIcon}
              </div>
            </div>
            <div className={style.username_workspace}>
              <span className={style.username_workspace_text_container}>
                <p className={style.username_workspace_text}>
                  {username.split("@")[0]}'s workspace
                </p>
              </span>
            </div>
            <button className={style.sidebar_close_btn} onClick={handleClose}>
              <BiChevronLeft className={style.sidebar_close_btn_icon} />
            </button>
          </div>
          <div className={style.navigation_expanded_content_body}>
            <div>
              <div
                style={{
                  marginTop: "12px",
                }}
              >
                {renderedLinks}
              </div>
            </div>
          </div>
          <div
            className={style.sidebar_boards_container}
            style={{ marginTop: "6px" }}
          >
            <div className={style.sidebar_boards_header}>
              <h2>Your boards</h2>
              <div className={style.board_sidebar_btn_container}>
                <button className={style.setting_btn_sidebar}>
                  <span style={{ lineHeight: 1 }}>
                    <span style={{ lineHeight: 1 }}>
                      <RiMoreLine className={style.setting_icon_sidebar} />
                    </span>
                  </span>
                </button>
                <button className={style.create_board_btn_sidebar}>
                  <span style={{ lineHeight: 1 }}>
                    <span style={{ lineHeight: 1 }}>
                      <AiOutlinePlus className={style.setting_icon_sidebar} />
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div>
              {projects && (
                <ul className={style.list_project_sidebar_container}>
                  {renderedProjects}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {!isOpen && collapseSidebar}
      {isOpen && expandedSidebar}
    </>
  );
}
