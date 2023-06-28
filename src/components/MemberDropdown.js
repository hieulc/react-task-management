import { AiOutlineClose } from "react-icons/ai";
import styles from "../login.module.css";
import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import NotificationDialog from "./NotificationDialog";

function MemberDropdown({ members, onClose, onRemoveMember, admin }) {
  const [isHovering, setIsHovering] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  // const [memberEmail, setMemberEmail] = useState("");

  const { username } = JSON.parse(localStorage.getItem("user"));

  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleMouseOver = (id) => {
    setIsHovering(id);
  };

  const handleMouseOut = () => {
    setIsHovering();
  };

  const removeMember = (email) => {
    onRemoveMember(email);
  };

  // const handleOpenDialog = (email) => {
  //   setMemberEmail(email);
  //   setOpenDialog(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

  // const handleConfirm = () => {
  //   removeMember(email);
  //   setOpenDialog(false);
  //   setMemberEmail("");
  // };

  // const confirmDialog = (
  //   <NotificationDialog
  //     title={"Warning"}
  //     content={"Are you sure want to remove this member?"}
  //     onClose={handleCloseDialog}
  //     onOpen={handleOpenDialog}
  //     onConfirm={handleConfirm}
  //   />
  // );

  const renderedProjectMembers = members.map((member) => {
    return (
      <li
        key={member.id}
        className={styles.custom_members_list_item}
        onMouseOut={handleMouseOut}
        onMouseOver={() => handleMouseOver(member.id)}
      >
        <span className={styles.custom_members_name}>
          {member.email}
          {member.email === admin && (
            <span className={styles.owner_name_tag}>
              (<span className={styles.owner_name_tag_text}>Admin</span>)
            </span>
          )}
        </span>

        {isHovering === member.id &&
          member.email !== admin &&
          username === admin && (
            <span
              className={styles.board_member_icon_hover_close}
              onClick={() => removeMember(member.email)}
            >
              <AiOutlineClose />
            </span>
          )}
      </li>
    );
  });

  return ReactDOM.createPortal(
    <div className={`fixed absolute ${styles.members_dropdown}`} ref={divEl}>
      <div className={styles.members_dropdown_header}>
        <span className={styles.pop_over_header_title}>Members</span>
        <a
          href="#"
          className={styles.pop_over_header_close_btn}
          onClick={onClose}
        >
          <AiOutlineClose />
        </a>
      </div>
      <div className={styles.pop_over_content}>
        <div>
          <input
            type="text"
            placeholder="Search members"
            className={styles.search_members}
            autoFocus
          />
          <div className={styles.board_members}>
            <h4>Board members</h4>
            <ul className={styles.board_members_list}>
              {members && renderedProjectMembers}
            </ul>
          </div>
        </div>
      </div>
      {/* {openDialog && confirmDialog} */}
    </div>,
    document.querySelector(".member-modal-container")
  );
}

export default MemberDropdown;
