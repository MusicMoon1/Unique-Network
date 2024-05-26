import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { theme } from '../../utils/Theme'
import liveloop from '../../assets/liveloop.png'
import macImage from '../../assets/mac.png'
import windowImage from '../../assets/window.png'
import WindowIcon from '@mui/icons-material/Window';
import AppleIcon from '@mui/icons-material/Apple';

export default function LiveLoopPage() {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <>
            <Grid container sx={{ display: "flex", padding: isMobile ? "0" : "25px 35px", flexDirection: isMobile && "column", alignItems: isMobile && "center" }}>
                <Grid item sx={{ width: isMobile ? "350px" : "1270px", display: "flex", justifyContent: "space-between", flexDirection: isMobile && "column" }}>
                    <Grid item style={{ width: isMobile ? "320px" : "300px", marginTop: isMobile && "20px" }}>
                        <ol style={{ display: isMobile ? "none" : "block", fontSize: "14px", padding: "0 20px", margin: 0, lineHeight: "36px", fontWeight: 700, fontFamily: theme.fonts.Light, color: theme.colors.textcolor }}>
                            <li style={{ color: theme.colors.yellow }}>LiveLoop</li>
                            <li>Pricing</li>
                            <li>Features</li>
                            <li>Pricing / Download <WindowIcon /> <AppleIcon /> </li>
                        </ol>
                        <Box sx={{ width: "234px", height: "74px", borderRadius: "8px", padding: "5px", background: theme.colors.background2, display: isMobile ? "none" : "flex", alignItems: "center", flexDirection: "column" }}>
                            <Typography variant='h6' sx={{ width: "210px", textAlign: "center", fontSize: "8.5px" }}>
                                For MusicMoon users, LiveLoop offers for a limited period of -30% OFF. Download Now using the code:
                            </Typography>
                            <Box sx={{ width: "109px", textAlign: "center", margin: "10px 0", borderRadius: "3px", height: "19px", fontSize: "13px", background: theme.colors.yellow }}>
                                MUSICMOON30
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: isMobile && "center" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", width: isMobile ? "320px" : "1000px", height: isMobile ? "300px" : "398px", background: theme.colors.black }}>
                            <img src={liveloop} alt="about" height={isMobile && 300} width={isMobile && 370} />
                        </Box>
                        <ol style={{ display: isMobile ? "block" : "none", width: "350px", fontSize: "16px", margin: "20px", padding: isMobile ? "" : 0, lineHeight: "36px", fontWeight: 700, fontFamily: theme.fonts.Light, color: theme.colors.textcolor }}>
                            <li style={{ color: theme.colors.yellow }}>LiveLoop</li>
                            <li>Pricing</li>
                            <li>Features</li>
                            <li>Download LiveLoop MacOS</li>
                            <li>Download LiveLoop Windows</li>
                        </ol>
                        <Typography variant='h1' sx={{
                            width: isMobile ? "320px" : '998px',
                            fontSize: isMobile ? "14px" : "16px",
                            fontWeight: 400,
                            color: theme.colors.white,
                            lineHeight: "31px",
                            fontFamily: theme.fonts.Light,
                            marginTop: "30px"
                        }}>
                            LiveLoop is the new generation music making daw
                        </Typography>
                        <Typography variant='h1' sx={{
                            width: isMobile ? "320px" : '998px',
                            fontSize: isMobile ? "14px" : "16px",
                            fontWeight: 400,
                            color: theme.colors.white,
                            lineHeight: "31px",
                            fontFamily: theme.fonts.Light,
                            marginTop: "30px"
                        }}>
                            Experience new creative ways of composing and experimenting with sound, create live performances and recordings with one versatile and user-friendly interface. Loop multi-layered sounds and complex rhythms in real-time, quantized to the beat with a unique sync mode, or choose between 6 other looping modes. Liveloop comes with a complex set of features, FX, and Plug-ins support such as VST and M4L. READ MORE
                        </Typography>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}
