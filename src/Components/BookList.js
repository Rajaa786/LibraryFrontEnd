import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Link } from "react-router-dom";

const columns = [
  // { id: "id", label: "Book Id", minWidth: 170, align: "center" },
  { id: "book_name", label: "Book Name", minWidth: 170, align: "center" },
  { id: "author_name", label: "Author", minWidth: 170, align: "center" },
  {
    id: "borrowed_by",
    label: "Borrowed by",
    minWidth: 170,
    align: "center",
  },
  {
    id: "borrowed_date",
    label: "Date of borrow",
    minWidth: 170,
    align: "center",
  },
  {
    id: "expected_return_date",
    label: "Expected date of return",
    minWidth: 170,
    align: "center",
  },
];

function BookList({ bookList, studentList }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const returnConcatenatedName = (student_id) => {
    if (student_id === 0) return "None";
    let tmpIndex = studentList.findIndex((student) => {
      return student.id === student_id;
    });
    return (
      studentList[tmpIndex].first_name + " " + studentList[tmpIndex].last_name
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", height: "92%" }}>
      <TableContainer sx={{ maxHeight: "84%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ minWidth: 170 }}>
                Book Id
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
            {bookList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((book, index) => {
                const { id, ...restOfData } = book;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={book.id}>
                    <TableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    {columns.map((column) => {
                      const value =
                        column.id == "borrowed_by"
                          ? returnConcatenatedName(book.stud_id)
                          : book[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <Link
                        to={`/bookDetails/${id}`}
                        state={{
                          restOfData,
                          stud_id: book.stud_id,
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
        {" "}
        <Button
          variant="contained"
          component={Link}
          to="/addBook"
          sx={{
            marginBlock: "1rem",
          }}
        >
          Add Book
        </Button>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        sx={{
          height: "7%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        component="div"
        count={bookList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default BookList;
