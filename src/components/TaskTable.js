import { Fragment } from "react";

function TaskTable({ data, config }) {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return <th key={column.label}>{column.label}</th>;
  });

  const renderedRows = data.map((task) => {
    const renderedCells = config.map((column) => {
      return <td key={column.label}>{column.render(task)}</td>;
    });

    return (
      <tr className="border-b" key={task.taskId}>
        {renderedCells}
      </tr>
    );
  });

  return (
    <table className="table-auto border-spacing-2">
      <thead>
        <tr className="border-b-2">{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}

export default TaskTable;
