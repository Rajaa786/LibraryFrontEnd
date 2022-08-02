import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function StudentDetailsPage({ addStatus, onUpdateHandler }) {
  const { student_id } = useParams();

  const navigate = useNavigate();
  const state = useLocation().state;
  let first_name = "";
  let last_name = "";
  if (state) {
    first_name = state.first_name;
    last_name = state.last_name;
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saveDisabled, setSaveDisable] = useState(true);

  useEffect(() => {
    setFirstName(first_name);
    setLastName(last_name);
  }, []);

  const handleTextFieldChange = (event) => {
    let updatedValue = event.target.value;
    switch (event.target.id) {
      case "first_name":
        setFirstName(updatedValue);
        break;
      case "last_name":
        setLastName(updatedValue);
        break;
      default:
        break;
    }
  };

  const editClickHandler = () => {
    setSaveDisable(false);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let data = {
      first_name: capitalizeFirstLetter(firstName),
      last_name: capitalizeFirstLetter(lastName),
    };

    if (addStatus) {
      axios.post("/addNewStudent", data).then((res) => {
        console.log(res.data);
      });
    } else {
      // console.log(student_id);
      axios
        .put(`/updateStudent/${student_id}`, data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("student update error " + err);
        });
    }
    onUpdateHandler("students");
    // window.location.href = "/students";
    navigate("/students");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
        Student Details
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmitHandler}
        sx={{
          "& .MuiTextField-root": { marginBlock: 4, width: "100%" },
          width: "60%",
        }}
      >
        <TextField
          fullWidth
          label="First Name"
          id="first_name"
          value={firstName}
          onChange={handleTextFieldChange}
          required
          InputProps={{
            readOnly: !addStatus && saveDisabled,
          }}
        />
        <TextField
          fullWidth
          label="Last Name"
          id="last_name"
          onChange={handleTextFieldChange}
          value={lastName}
          required
          InputProps={{
            readOnly: !addStatus && saveDisabled,
          }}
        />
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
            disabled={!addStatus && saveDisabled}
            endIcon={<SaveIcon />}
            type="submit"
          >
            Save
          </Button>

          {!addStatus ? (
            <Button
              onClick={editClickHandler}
              color="primary"
              variant="contained"
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

export default StudentDetailsPage;
