import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function Navbar() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        "& .MuiTabs-flexContainer": {
          background: "aliceblue",
          height: "100%",
        },
        width: "100%",
        background: "white",
        height: "8%",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        selectionFollowsFocus
        sx={{
          width: "100%",
          background: "yellow",
          height: "100%",
        }}
      >
        <Tab label="Home" to="/" component={Link} />

        <Tab label="Students" to="/students" component={Link} />

        <Tab label="Books" to="/books" component={Link} />
      </Tabs>
    </Box>
  );
}

export default Navbar;
