import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Panel from "./Panel";
import MemberShow from "./MemberShow";
import styles from "../login.module.css";

function Dropdown({ members }) {
  const [isExpandedListOpen, setIsExpandedList] = useState(false);

  const divEl = useRef();

  const onExpandedListClick = () => {
    setIsExpandedList(!isExpandedListOpen);
  };

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setIsExpandedList(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const renderedMembers = members.map((member) => {
    return <MemberShow key={member.id} name={member.email} />;
  });

  return (
    <div ref={divEl} className={styles.expanded_container}>
      <Panel onClick={onExpandedListClick}>
        <h3 className={styles.project_members_dropdown_title}>Members</h3>
      </Panel>
      {isExpandedListOpen && (
        <Panel
          className={`absolute top-full ${styles.expanded_item_container}`}
        >
          <div className={styles.joined_members}>
            <h1>Joined Members:</h1>
            <hr className={styles.btm_form_separator} />
          </div>
          {renderedMembers}
        </Panel>
      )}
    </div>
  );
}

export default Dropdown;
