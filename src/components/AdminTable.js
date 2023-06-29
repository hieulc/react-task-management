import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

function AdminTable() {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "300px" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Assignee</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Working Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminTable;
