import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const HeaderNavbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#333" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Make sure the image paths are correct */}
          <img
            src="src/assets/images/bscs.png"  // Updated path for public folder
            alt="Logo1"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <img
            src="src/assets/images/itlogo.png"  // Updated path for public folder
            alt="Logo2"
            style={{ height: "40px" }}
          />
        </Box>
        <Box>
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Schedules</Button>
          <Button color="inherit">Enrollment</Button>
          <Button color="inherit">Log Out</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderNavbar;
