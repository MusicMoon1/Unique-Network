import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../../utils/Theme';
import leftArrow from '../../assets/icons/leftArrow.png'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function ProfileHeader() {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <Grid sx={{ height: "100px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: isMobile ? "0 2rem" : "0 7.5rem", borderTop: `2px solid ${theme.colors.borderColor}`, borderBottom: `2px solid ${theme.colors.borderColor}` }}>
            <Box>
                <Button sx={{ width: isMobile ? "175px" : "222px", height: isMobile ? "36px" : "56.25px", display: "flex", justifyContent: "space-between", padding: "0 15px", border: `3px solid ${theme.colors.textcolor}`, borderRadius: "40px" }} >
                    <img src={leftArrow} alt="" />
                    <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: isMobile ? "13px" : "18px", fontFamily: theme.fonts.DM }}>
                      <Link to="/profile" style={{color:"white",textDecoration:"none"}}>
                        Back to Profile
                      </Link>
                    </Typography>
                </Button>
            </Box>
            <Box sx={{ width: "265px", display: isMobile ? "none" : "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link to="/profile" style={{ textDecoration: "none", color: theme.colors.textcolor, fontSize: "18px", fontWeight: 700, fontFamily: theme.fonts.DM }} >
                    Profile
                </Link>
                <ChevronRightIcon sx={{ color: "white" }} />
                <Link to="/profile/edit" style={{ textDecoration: "none", color: theme.colors.white, fontSize: "18px", fontWeight: 700, fontFamily: theme.fonts.DM, }} >
                    Edit Profile
                </Link>
            </Box>
        </Grid>
    )
}
