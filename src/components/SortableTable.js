import { useState } from "react";
import TaskTable from "./TaskTable";
import moment from "moment/moment";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div className="mr-1">
        <AiOutlineArrowUp />
        <AiOutlineArrowDown />
      </div>
    );
  }
  if (sortOrder === null) {
    return (
      <div className="mr-1">
        <AiOutlineArrowUp />
        <AiOutlineArrowDown />
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div className="mr-1">
        <AiOutlineArrowUp />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div className="mr-1">
        <AiOutlineArrowDown />
      </div>
    );
  }
}

export default function SortableTable(props) {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const { config, data } = props;

  const handleClick = (label) => {
    if (sortBy && label !== sortBy) {
      setSortBy(label);
      setSortOrder("asc");
      return;
    }

    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  const newConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th
          className="cursor-pointer"
          onClick={() => handleClick(column.label)}
        >
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });

  let sortedData = data;
  if (sortBy && sortOrder) {
    const { sortValue } = config.find((column) => column.label === sortBy);
    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;

      if (sortBy === "Due date") {
        if (valueA === null) {
          return -1 * reverseOrder;
        } else if (valueB === null) {
          return 1 * reverseOrder;
        } else {
          const dateA = moment(valueA);
          const dateB = moment(valueB);
          return dateA.diff(dateB) * reverseOrder;
        }
      }

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return <TaskTable {...props} config={newConfig} data={sortedData} />;
}
