import React from 'react'
import { Box, Button, Grid, useMediaQuery } from '@mui/material'
import leftArrow from '../../assets/icons/leftArrow.png'
import { theme } from '../../utils/Theme'
import { Link } from 'react-router-dom'


export default function LoginHeader() {

    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Grid sx={{ height: "90px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: isMobile ? "0 2rem" : "0 7.5rem", borderTop: `2px solid ${theme.colors.borderColor}`, borderBottom: `2px solid ${theme.colors.borderColor}` }}>
            <Box>
                <Link to="/">
                    <Button sx={{ width: "67.5px", height: "56.25px", border: `3px solid ${theme.colors.textcolor}`, borderRadius: "25px" }} >
                        <img src={leftArrow} alt="" />
                    </Button>
                </Link>
            </Box>
            <Box>
                <Link to="/auth/login" style={{ textDecoration: "none", color: theme.colors.white, fontSize: "19.5px", fontWeight: 700, fontFamily: theme.fonts.Light }} >
                    Login
                </Link>
                <Link to="/auth/register" style={{ textDecoration: "none", color: theme.colors.yellow, fontSize: "19.5px", fontWeight: 700, fontFamily: theme.fonts.Light, marginLeft: "2rem" }} >
                    Signup
                </Link>
            </Box>
        </Grid>
    )
}
