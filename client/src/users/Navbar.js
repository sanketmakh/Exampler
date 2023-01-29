import React, { useState } from "react";
import "./Navbar.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

export default function Navbar() {
  const pathname = window.location.pathname;
  const [value, setValue] = useState(pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <BottomNavigation
        sx={{ position: "fixed", bottom: 0, width: 1.0 }}
        className="mx-auto"
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          component={Link}
          to="/student/activetest"
          label="activetest"
          value="/student/activetest"
          icon={<MenuBookIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/student/profile"
          label="profile"
          value="/student/profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
  );
}
