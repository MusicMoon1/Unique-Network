import React from 'react'
import image from '../../assets/hero.png'
import { theme } from '../../utils/Theme'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import Posts from './Posts';
import { TextPostData, postData } from '../../Constants';
import TextPost from './TextPost';
import Footer from '../Footer';
import cardDetails from "../../assets/CardDetail.png"
export default function LandingPage() {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <div style={{ width: "100%" }}>
            <div className='hero' style={{
                width: "100%",
                height: isMobile ? "50vh" : "100vh",
            }}>
                <img src={image} alt="hero" width={"100%"} height={"100%"} />
            </div>
            <div style={{ width: "100%", height: isMobile ? "400px" : "250px", background: theme.colors.yellow, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Typography variant='h1' style={{ width: isMobile ? "250px" : "471px", textAlign: "center", fontWeight: 600, fontSize: "32px", fontFamily: theme.fonts.Light }}>
                    MusicMoon is
                </Typography>
                <Typography variant='h1' style={{ width: isMobile ? "250px" : "471px", textAlign: "center", fontWeight: 600, fontSize: "32px", fontFamily: theme.fonts.Light }}>
                    a music web3 platform
                </Typography>
                <Typography variant='h1' style={{ width: isMobile ? "250px" : "471px", marginTop: "15px", textAlign: "center", fontWeight: 400, fontSize: "18px", fontFamily: theme.fonts.Light }}>
                    that combines music and instrument NFTs with a DAO to create a supportive ecosystem where artists retain rights, earn royalties, and connect with fans.
                </Typography>
            </div>
            <div>
                <Grid container gap={10} sx={{ margin: "60px 0", justifyContent: "center" }}>
                    {postData.map((post, index) => {
                        return (
                            <Grid key={index + 1} item>
                                <Posts title={post.title} des={post.des} postImg={post.postImg} linktext={post.linktext} link={post.link} />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
            <div style={{ width: "100%", height: isMobile ? "650px" : "450px", background: "#9BFF00", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: isMobile ? "300px" : "890px", display: "flex", flexDirection: isMobile && "column-reverse", alignItems: "center" }}>
                    <div>
                        <img src={cardDetails} alt="card-details" />
                    </div>
                    <div>
                        <Typography variant='h6' sx={{ color: theme.colors.black, fontSize: "32px", fontWeight: 600, fontFamily: theme.fonts.Light }}>
                            Resolving Control and Ownership Issues:
                        </Typography>
                        <Typography variant='h6' sx={{ color: theme.colors.black, fontSize: "18px", fontWeight: 400, fontFamily: theme.fonts.Light, display: isMobile && "none" }}>
                            MusicMoon enables artists to retain full control and ownership of their work. Through its blockchain-based platform, artists can mint their music as Non-Fungible Tokens (NFTs), ensuring they maintain rights over their creations. This approach contrasts with traditional record label contracts, offering artists more freedom and long-term earnings potential from their work.
                        </Typography>
                        <Typography variant='h6' sx={{ color: theme.colors.black, fontSize: "18px", fontWeight: 700, fontFamily: theme.fonts.Light }}>
                            Join us on Discord
                        </Typography>
                    </div>
                </div>
            </div>
            <div>
                <Grid container gap={10} sx={{ margin: "60px 0 250px", justifyContent: "center" }}>
                    {TextPostData.map((post, index) => {
                        return (
                            <Grid key={index + 1} item>
                                <TextPost title={post.title} des={post.des} />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
            <div style={{ marginLeft: isMobile ? "" : "-100px" }}>
                <Footer />
            </div>
        </div>
    )
}
