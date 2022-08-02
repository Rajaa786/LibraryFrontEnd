import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
// import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const columns = [
  {
    id: "first_name",
    label: "First Name",
    minWidth: 170,
    align: "center",
  },

  {
    id: "last_name",
    label: "Last Name",
    minWidth: 170,
    align: "center",
  },
];

function StudentList({ studentList }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "92%",
        // background: "lightblue",
      }}
    >
      <TableContainer sx={{ maxHeight: "84%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ minWidth: 170 }}>
                Student Id
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student, index) => {
                if (index === 0) return null;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={student.id}
                  >
                    <TableCell align="center">
                      {page * rowsPerPage + index}
                    </TableCell>
                    {columns.map((column) => {
                      const value = student[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Link
                        to={`/studentDetails/${student.id}`}
                        state={{
                          first_name: student.first_name,
                          last_name: student.last_name,
                        }}
                      >
                        <EditOutlinedIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          component={Link}
          to="/addStudent"
          sx={{
            marginBlock: "1rem",
          }}
        >
          Add Student
        </Button>
      </Box>
      <TablePagination
        sx={{
          height: "7%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={studentList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default StudentList;
