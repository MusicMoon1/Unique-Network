import React from 'react'
import { FormControl, InputAdornment, TextField, useMediaQuery } from '@mui/material'

import Navbar from '../../components/Navbar'
import ButtonBox from '../../components/Nopage/ButtonBox'
import Footer from '../../components/Footer'

import arrow from '../../assets/icons/bgRightArrow.png'
import image404 from '../../assets/404.svg'
import { theme } from '../../utils/Theme'
import { Link } from 'react-router-dom'

export default function NoPage() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleChange = () => {

  }
  return (
    <div style={{ background: theme.colors.navColor }}>
      <Navbar />
      <div style={{ width: "100%", height: "100vh", margin: "5% 0 13%", background: theme.colors.navColor }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "3% 0" }}>
          <img src={image404} alt="image-404" style={{ width: isMobile ? "80%" : "40%" }} /> {/* Use percentage width */}
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <p style={{ width: isMobile ? "311px" : "", textAlign: "center", color: theme.colors.white, fontFamily: theme.fonts.Light, fontSize: "3rem", fontWeight: 700, margin: 0 }}>Sorry, we couldn't find that page.</p>
          <p style={{ color: theme.colors.textcolor, fontFamily: theme.fonts.Light, fontSize: "14px", fontWeight: 400, margin: 0 }}>Maybe give one of these a try?</p>
          <div style={{ margin: "15px 0" }}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <TextField
                onChange={handleChange}
                name=""
                value=""
                variant="outlined"
                size="small"
                type="text"
                placeholder="Enter Your Search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Link to='/' style={{ width: "32px", height: "32px", fontFamily: theme.fonts.DM, fontWeight: 700, textDecoration: "none", color: theme.colors.yellow, background: theme.colors.yellow, borderRadius: "25px" }}>
                        <img src={arrow} alt="" width={32} height={32} />
                      </Link>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ sx: { color: theme.colors.textcolor } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "2.5rem",
                    width: isMobile ? "311px" : "300px",
                    height: "48px",
                    padding: "2px 6px",
                    marginTop: "5px",
                    fontSize: "14px",
                    fontFamily: theme.fonts.Light,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.colors.borderColor,
                    borderWidth: "3px"
                  },
                  "& .MuiInputBase-input": {
                    color: theme.colors.textcolor,
                  },
                }}
              />
            </FormControl>
          </div>
          <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: "column", margin: "5% 0" }}>
            <p style={{ color: theme.colors.white, fontFamily: theme.fonts.Light, fontSize: "24px", fontWeight: 600, margin: isMobile ? "0 0 7% 0" : "0 0 2.5% 0" }}>Explore more</p>
            <ButtonBox />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
