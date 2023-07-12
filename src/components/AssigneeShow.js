import { useState } from "react";
import styles from "../login.module.css";
import { Avatar, AvatarGroup, Stack, Tooltip } from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      height: 30,
      width: 30,
      fontSize: 14,
      "&:hover": {
        opacity: 0.8,
        cursor: "pointer",
      },
    },
    children: `${name.split(" ")[0][0].toUpperCase()}${name
      .split(" ")[1][0]
      .toUpperCase()}`,
  };
}

function AssigneeShow({ assignees }) {
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
      <Tooltip
        describeChild
        title={`${assignee.firstName} ${assignee.lastName}`}
        placement="bottom-start"
        key={assignee.id}
      >
        <Avatar
          {...stringAvatar(`${assignee.firstName} ${assignee.lastName}`)}
        />
      </Tooltip>
    );
  });

  return (
    <Stack
      className={`${styles.custom_assignee_list}`}
      direction="row"
      spacing={assignees.length < 4 && 0.5}
    >
      {assignees.length >= 4 && (
        <AvatarGroup
          sx={{
            "& .MuiAvatar-root": { width: 30, height: 30, fontSize: 14 },
          }}
        >
          {assignees && renderedAssignees}
        </AvatarGroup>
      )}

      {assignees.length < 4 && <>{assignees && renderedAssignees}</>}
    </Stack>
  );
}

export default AssigneeShow;
