import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function BookDetailsPage({ studentList, addStatus, onUpdateHandler }) {
  const book_id = useParams();
  const navigate = useNavigate();
  const state = useLocation().state;

  let book_name = "";
  let author_name = "";
  let borrowed_by = -1;
  let borrowed_date = new Date();
  let expected_return_date = new Date();
  if (state) {
    borrowed_by = state.index;
    [book_name, author_name, borrowed_date, expected_return_date] = [
      state.restOfData.book_name,
      state.restOfData.author_name,
      state.restOfData.borrowed_date,
      state.restOfData.expected_return_date,
    ];
  }

  const [borrowedDateValue, setBorrowedValue] = useState(new Date());
  const [returnDateValue, setReturnValue] = useState(new Date());
  const [bookValue, setBookValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [borrowedBy, setBorrowedByValue] = useState(-1);
  const [saveDisabled, setSaveDisable] = useState(true);

  useEffect(() => {
    setBookValue(book_name);
    setAuthorValue(author_name);
    setBorrowedByValue(borrowed_by);
    setBorrowedValue(borrowed_date);
    setReturnValue(expected_return_date);
  }, []);

  const handleBorrowChange = (event) => {
    setBorrowedValue(event);
  };

  const handleReturnChange = (event) => {
    setReturnValue(event);
  };

  const handleTextFieldChange = (event) => {
    let updatedValue = event.target.value;

    switch (event.target.name) {
      case "book_name":
        setBookValue(updatedValue);
        break;
      case "author":
        setAuthorValue(updatedValue);
        break;
      case "borrowed_by":
        setBorrowedByValue(updatedValue);
        break;
      default:
        break;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let data = {
      book_name: bookValue,
      author: authorValue,
      borrowed_by:
        // addStatus?
        borrowedBy === 0
          ? "None"
          : [
              studentList[borrowedBy].first_name,
              studentList[borrowedBy].last_name,
            ].join(" "),
      borrowed_date: borrowedDateValue,
      return_date: returnDateValue,
    };
    console.log(data);
    if (addStatus) {
      axios
        .post("/addNewBook", data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`/updateBook/${book_id}`, data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error("book update error" + err));
    }
    onUpdateHandler("books");

    navigate("/books");
  };

  const editClickHandler = () => {
    setSaveDisable(false);
  };
  // console.log(studentList[0]);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBlock: 4,
      }}
    >
      <Typography
        sx={{
          opacity: 0.7,
        }}
        fontSize="2.5rem"
        variant="h4"
        gutterBottom
        component="div"
      >
        Book Details
      </Typography>
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          "& .MuiTextField-root": { marginBlock: 4, width: "100%" },
          width: "60%",
        }}
      >
        <TextField
          fullWidth
          label="Book Name"
          name="book_name"
          id="book_name"
          onChange={handleTextFieldChange}
          InputProps={{
            readOnly: !addStatus && saveDisabled,
          }}
          value={bookValue}
          required
        />
        <TextField
          fullWidth
          label="Author"
          name="author"
          id="author"
          onChange={handleTextFieldChange}
          InputProps={{
            readOnly: !addStatus && saveDisabled,
          }}
          value={authorValue}
          required
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-autowidth-label">
            Borrowed by
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="borrowed_by"
            name="borrowed_by"
            value={borrowedBy}
            onChange={handleTextFieldChange}
            label="Borrowed by"
            readOnly={!addStatus && saveDisabled}
            required
          >
            <MenuItem value={-1}>
              <em>None</em>
            </MenuItem>
            {studentList.map((student, index) => {
              return (
                <MenuItem key={student.id} value={index}>
                  {[student.first_name, student.last_name].join(" ")}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Box className="handleDate">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Borrowed Date"
              value={borrowedDateValue}
              inputFormat="dd/MM/yyyy"
              onChange={handleBorrowChange}
              name="borrowed_date"
              id="borrowed_date"
              renderInput={(params) => <TextField {...params} />}
              readOnly={!addStatus && saveDisabled}
              required
            />
            <DesktopDatePicker
              label="Expected Return Date"
              value={returnDateValue}
              inputFormat="dd/MM/yyyy"
              onChange={handleReturnChange}
              name="return_date"
              id="return_date"
              readOnly={!addStatus && saveDisabled}
              renderInput={(params) => <TextField {...params} />}
              required
            />
          </LocalizationProvider>
        </Box>

        <Box
          sx={{
            marginBlock: 4,
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={!addStatus && saveDisabled}
            endIcon={<SaveIcon />}
          >
            Save
          </Button>
          {!addStatus ? (
            <Button
              color="primary"
              variant="contained"
              onClick={editClickHandler}
              endIcon={<EditIcon />}
            >
              Edit
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

export default BookDetailsPage;
