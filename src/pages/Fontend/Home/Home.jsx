import React from "react";
import { Box } from "@mui/material";
import Navbar from "../../../components/Navbar";
import { theme } from "../../../utils/Theme";
import Sidebar from "../../../components/Dashboard/Sidebar";
import DashboadMain from "../../../components/Dashboard/DashboadMain";

export default function Home() {
  return (
    <>
      <Box sx={{ background: theme.colors.black }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            // borderRadius: "40px",

          }}
        >
          <Box sx={{
            flexGrow: 1, background: theme.colors.background, 
            // borderRadius: "40px",
            overflowY: "auto",
            scrollbarWidth: "",
            '&::-webkit-scrollbar': {
              width: "0em",
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.colors.background,
              borderRadius: "10px",
            },

          }}>
            <Navbar logotext="DashBoard" />
            <Box sx={{ display: "flex", position: "relative" }}>
              <Sidebar boxNo={0} />
              <DashboadMain />
            </Box>
          </Box>
        </Box>
      </Box>
    </>

  );
}
