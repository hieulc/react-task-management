import { useState } from "react";
import styles from "../login.module.css";
import { AiOutlineClose } from "react-icons/ai";

function AssigneeShow({ assignees, onRemoveAssignee }) {
  const [isHovering, setIsHovering] = useState();

  const handleMouseOver = (id) => {
    setIsHovering(id);
  };

  const handleMouseOut = () => {
    setIsHovering();
  };

  const removeAssignee = (assigneeId) => {
    onRemoveAssignee(assigneeId);
  };

  const uniqueIds = [];

  const uniqueAssigneeList = assignees.filter((assignee) => {
    const isDuplicated = uniqueIds.includes(assignee.id);
    if (!isDuplicated) {
      uniqueIds.push(assignee.id);
      return true;
    }
    return false;
  });

  const renderedAssignees = uniqueAssigneeList.map((assignee) => {
    return (
      <li
        className={styles.custom_members_list_item}
        key={assignee.id}
        onMouseOut={handleMouseOut}
        onMouseOver={() => handleMouseOver(assignee.id)}
      >
        <span className={styles.custom_members_name}>{assignee.email}</span>
        {isHovering === assignee.id && (
          <div
            className={styles.custom_members_icon}
            onClick={() => removeAssignee(assignee.id)}
          >
            <a>
              <AiOutlineClose />
            </a>
          </div>
        )}
      </li>
    );
  });

  return (
    <ul className={`${styles.custom_assignee_list}`}>
      {assignees && renderedAssignees}
    </ul>
  );
}

export default AssigneeShow;
