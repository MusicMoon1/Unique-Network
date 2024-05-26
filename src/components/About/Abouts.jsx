import { Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { theme } from '../../utils/Theme'
import about from '../../assets/about.png'

export default function Abouts() {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <>
            <Grid container sx={{ display: "flex", marginTop: "25px", flexDirection: isMobile && "column-reverse", justifyContent: "space-around", alignItems: isMobile && "center" }}>
                <Grid item sx={{ width: isMobile ? "350px" : "720px", display: "flex", justifyContent: "space-between", flexDirection: isMobile && "column" }}>
                    <Grid item style={{ width: isMobile ? "320px" : "220px", marginTop: isMobile && "20px" }}>
                        <Typography variant='h1' sx={{
                            fontSize: "25px",
                            fontWeight: 700,
                            color: theme.colors.yellow,
                            fontFamily: theme.fonts.Light,
                            display: isMobile ? "block" : "none"
                        }}>
                            About
                        </Typography>
                        <ol style={{ fontSize: "16px", margin: isMobile ? "" : 0, padding: isMobile ? "" : 0, lineHeight: "36px", fontWeight: 700, fontFamily: theme.fonts.Light, color: theme.colors.textcolor }}>
                            <li style={{ color: theme.colors.yellow }}>Music Moon</li>
                            <li>LiveLoop Software</li>
                            <li>NFT Marketplace</li>
                            <li>Community Engagement DAO</li>
                            <li>Platform Governance DAO</li>
                            <li>MusicMoon ICO</li>
                            <li>Team</li>
                        </ol>
                    </Grid>
                    <Grid item sx={{ width: isMobile ? "320px" : '470px', height: isMobile ? "800px" : "700px", display: "flex", flexDirection: 'column', justifyContent: "space-between" }}>
                        <Typography variant='h1' sx={{
                            fontSize: isMobile ? "15px" : "20px",
                            fontWeight: 400,
                            color: theme.colors.white,
                            lineHeight: "31px",
                            fontFamily: theme.fonts.Light
                        }}>
                            MusicMoon is an extension of LiveLoop, known as "The Looping Software for Live Music Performance." It's a web3 platform developed for artists and labels to maximize the value of their creative output.
                        </Typography>
                        <Typography variant='h1' sx={{
                            fontSize: isMobile ? "13px" : "16px",
                            fontWeight: 400,
                            color: theme.colors.white,
                            lineHeight: "26px",
                            fontFamily: theme.fonts.Light
                        }}>
                            The platform integrates blockchain technology for music creation, distribution, and community engagement. The core of MusicMoon includes Non-Fungible Tokens (NFTs), utilizing the most popular chains for minting. This feature allows artists to monetize their work while retaining ownership rights.
                        </Typography>
                        <Typography variant='h1' sx={{
                            fontSize: isMobile ? "13px" : "16px",
                            fontWeight: 400,
                            color: theme.colors.white,
                            lineHeight: "26px",
                            fontFamily: theme.fonts.Light
                        }}>
                            MusicMoon also encompasses two Decentralized Autonomous Organizations (DAOs). The first DAO, facilitates community engagement between artists, labels, and fans, ensuring easy access for those new to blockchan.
                        </Typography>
                        <Typography variant='h1' sx={{
                            fontSize: isMobile ? "13px" : "16px",
                            fontWeight: 400,
                            color: theme.colors.white,
                            lineHeight: "26px",
                            fontFamily: theme.fonts.Light
                        }}>
                            The second DAO, focuses on platform governance. It enables stakeholders, including musicians, labels, and investors, to influence the direction and decisions of MusicMoon, fostering a democratic governance environment.
                        </Typography>
                        <Typography variant='h1' sx={{
                            fontSize: isMobile ? "13px" : "16px",
                            fontWeight: 400,
                            color: theme.colors.white,
                            lineHeight: "26px",
                            fontFamily: theme.fonts.Light
                        }}>
                            Additionally, the Initial Coin Offering (ICO) for MusicMoon Coin forms the financial backbone of the ecosystem, supporting transactions, premium feature access, and community governance. This ICO is central to establishing a self-sustaining economy within the MusicMoon ecosystem.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item sx={{ display: isMobile && "flex", justifyContent: isMobile && "center" }}>
                    <img src={about} alt="about" width={isMobile && 350} />
                </Grid>
            </Grid>
        </>
    )
}
