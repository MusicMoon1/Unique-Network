import { Box, Button, Grid, InputAdornment, TextField, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { theme } from "../utils/Theme";
import Yellowlogo from '../assets/icons/Yellowlogo.png'
import windowImage from '../assets/window.png'
import macImage from '../assets/mac.png'
import discord from '../assets/icons/discord.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from "react-router-dom";


export default function Footer({ background }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Grid
      container
      sx={{
        minHeight: "24.8rem",
        background: background || theme.colors.navColor,
        borderTop: `1px solid ${theme.colors.borderColor}`,
      }}
    >
      <Grid
        container
        sx={{
          margin: isMobile ? "" : "0 2rem",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          minHeight: "24.8rem",
          borderTop: `2px solid ${theme.colors.borderColor}`,
          padding: isMobile ? "4rem 2rem 0" : "2rem 1rem 0"
        }}
      >
        <Grid item sx={{ width: "321px", height: "189px", padding: isMobile ? "0" : "20px", border: isMobile ? "" : `1px solid #353940`, color: 'white', }}>
          <img src={Yellowlogo} alt="yellowIcon" />
          <Typography variant="h6"
            sx={{
              width: isMobile ? '12rem' : '17.5rem',
              fontSize: isMobile ? "0.8rem" : "1rem",
              fontFamily: theme.fonts.Light,
              marginTop: "0.5rem"
            }}>
            Join MusicMoon DAO’s mailing list to get the latest news.
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter your email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ArrowForwardIcon sx={{ color: theme.colors.white }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ sx: { color: theme.colors.textcolor } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                width: isMobile ? "19rem" : "281px",
                padding: "4px",
                marginTop: "0.5rem",
                "& fieldset": {
                  border: "none",
                },
                borderBottom: `1px solid ${theme.colors.borderColor}`,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                display: "none",
              },
              "& .MuiInputBase-input": {
                color: theme.colors.textcolor,
              },
            }}
          />
        </Grid>
        <Grid item sx={{ width: isMobile ? "350px" : "451px", height: isMobile ? "120px" : "80px", padding: isMobile ? "0px" : "20px", color: 'white', marginTop: isMobile ? "10px" : "40px" }}>
          <Typography variant="h6"
            sx={{
              width: isMobile ? '18rem' : '28rem',
              fontSize: isMobile ? "0.6rem" : "0.625rem",
              fontFamily: theme.fonts.Light,
              marginTop: "0.5rem",
              fontWeight: 700,
              color: theme.colors.textcolor
            }}>
            <span style={{ color: theme.colors.white }}>30% OFF LiveLoop</span> is a unique tool for musicians of all professional levels. With LiveLoop you can create, compose, perform and record music through an intuitive, versatile and easy-to-use software.
          </Typography>
          <Box sx={{ width: "206px", height: "28px", marginTop: "10px" }}>
            <img src={windowImage} alt="window" />
            <img src={macImage} alt="mac" />
          </Box>

        </Grid>
        <Grid item sx={{ width: isMobile ? "350px" : "499px", height: isMobile ? "200px" : "130px", padding: isMobile ? "0px" : "20px", color: 'white', marginTop: isMobile ? "20px" : "0px" }}>
          <Box sx={{ width: "193px", height: "25px", display: "flex", justifyContent: "space-between" }}>
            <Link to='https://discord.gg/3AqZK5mc'>
              <img src={discord} alt="discord" />
            </Link>
            <Link to='https://twitter.com/MusicMoon111'>
              <XIcon sx={{ color: theme.colors.textcolor }} />
            </Link>
            <Link to='https://www.linkedin.com/company/musicmoon/'>
              <LinkedInIcon sx={{ color: theme.colors.textcolor }} />
            </Link>
            <Link to='https://www.instagram.com/musicmoon111/'>
              <InstagramIcon sx={{ color: theme.colors.textcolor }} />
            </Link>
          </Box>
          <Typography variant="h6"
            sx={{
              width: isMobile ? '18rem' : '28rem',
              fontSize: isMobile ? "0.6rem" : "0.625rem",
              fontFamily: theme.fonts.Light,
              marginTop: "1rem",
              fontWeight: 700,
              color: theme.colors.textcolor
            }}>
            This website is maintained by MusicMoon DAO. The contents and opinions of this website are those of MusicMoon DAO. MusicMoon DAO provides links to the cryptocurrency exchanges as a service to the public. Information provided by these websites are not warranted by MusicMoon DAO to be correct, complete and up-to-date. MusicMoon DAO is not responsible for their content and expressly rejects and liability for damages of any kind resulting from the use, reference to, or reliance on any information contained within these websites.
          </Typography>
        </Grid>
        <Grid xs={12} sx={{ color: 'white', borderTop: `2px solid ${theme.colors.borderColor}`, height: '85px', display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "space-between", color: theme.colors.textcolor }}>
          <Typography variant="h6" sx={{ fontSize: isMobile ? "10px" : "12px", fontFamily: theme.fonts.Light }}>Copyright © 2024 MusicMoon DAO. Mint Your Melody, Own Your Legacy. 2024.</Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: 700, fontFamily: theme.fonts.Light, display: { xs: "none", sm: "block" }, marginRight: "15px" }}>Privacy Policy </Typography>
            <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: 700, fontFamily: theme.fonts.Light, display: { xs: "none", sm: "block" }, }}>Terms & Conditions </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
