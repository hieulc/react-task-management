import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { PROJECT_API } from "../context/api";
import axios from "axios";
import authHeader from "../services/auth-header";

function AdminTable({ id }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = authHeader(user);
  const [tableData, setTableData] = useState([]);

  const fetchTableData = useCallback(async () => {
    const projectId = id;

    const response = await axios.get(PROJECT_API + `/tableData/${projectId}`, {
      headers,
    });

    setTableData(response.data);
  }, []);

  const isDaysWeeksOrMonths = (workingDays) => {
    if (workingDays < 7) {
      if (workingDays === 1) {
        return `one day`;
      }
      return `${workingDays} days`;
    }

    if (workingDays >= 7 && workingDays <= 30) {
      const weeks = Math.floor(workingDays / 7);

      const days = workingDays % 7;
      if (days > 0) {
        return `${weeks} weeks ${days > 0 && days} days`;
      } else {
        if (weeks === 1) {
          return `one week`;
        }
        return `${weeks} weeks`;
      }
    }

    if (workingDays > 30) {
      const month = Math.floor(workingDays / 30);
      const leftDays = workingDays % 30;
      if (leftDays >= 7) {
        const weeks = Math.floor(leftDays / 7);
        const remainDays = leftDays % 7;
        if (remainDays > 0) {
          return `${month} months ${weeks} weeks ${remainDays} days`;
        } else {
          return `${month} months ${weeks} weeks`;
        }
      } else {
        if (leftDays > 0) {
          return `${month} months ${leftDays} days`;
        } else {
          return `${month} months`;
        }
      }
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "300px" }} size="small">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Assignee</TableCell>
            <TableCell align="right">Completed Tasks</TableCell>
            <TableCell align="right">Working Days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.username}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.username}</TableCell>
              <TableCell align="right">{row.completedTasks}</TableCell>
              <TableCell align="right">
                {isDaysWeeksOrMonths(row.workingDays)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminTable;
