import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { theme } from "../../../utils/Theme";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Dashboard/Sidebar";
import LandingPage from "../../../components/LandingPage/LandingPage";

export default function FrontendHome() {
    const isMobile = useMediaQuery("(max-width:600px)");
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
                        <Navbar logotext={isMobile ? "" : "Home"} />
                        <Box sx={{ display: "flex", position: "relative" }}>
                            {
                                isMobile ? "" :
                                    <Sidebar boxNo={0} />
                            }
                            <LandingPage />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>

    );
}
