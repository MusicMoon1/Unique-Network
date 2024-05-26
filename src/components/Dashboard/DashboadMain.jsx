import React from 'react'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { theme } from '../../utils/Theme'
import DashboardBox from './DashboardBox'
import library from '../../assets/icons/library2.png'
import market from '../../assets/icons/market.png'
import Dao from '../../assets/icons/dao2.png'
import cube from '../../assets/cube.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import sphere from '../../assets/sphere.png'
import dashboardBox from '../../assets/DashboardBox.png'
import hemisphere from "../../assets/hemisphere.png"
import Torus from '../../assets/Torus.png'



export default function DashboadMain() {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <Grid container gap={1.5} sx={{ display: "flex", marginTop: "7px",height:"100vh" }}>
            <Grid item>
                <Box>
                    <DashboardBox
                        boxWidth={isMobile ? "290px" : "303px"}
                        heading="Welcome"
                        color={theme.colors.yellow}
                        boxHight={isMobile ? "80px" : "840px"}
                        background={theme.colors.purple}
                        icon={library}
                        image={sphere}
                        imageWidth={isMobile ? 53 : ""}
                        imageHight={isMobile ? 51 : ""}
                        title="Chris"
                        link="#"
                    />
                </Box>
            </Grid>
            <Grid>

                <Grid item gap={1.5} sx={{ display: "flex", flexDirection: isMobile && "column" }}>
                    <Grid item gap={1.5} sx={{ display: "flex", flexDirection: "column" }}>
                        <Grid item gap={1.5} sx={{ display: "flex" }}>
                            <Box sx={{ width: isMobile ? "140px" : "313px", height: isMobile ? "120px" : "211px", display: "flex", justifyContent: "space-between", flexDirection: "column", background: "#4a9173", borderRadius: isMobile ? "10px" : "20px", padding: isMobile ? "10px 15px" : "20px 30px" }}>
                                <Typography variant="h1" sx={{ color: theme.colors.yellow, fontSize: isMobile ? "24px" : "42px", fontFamily: theme.fonts.Light, fontWeight: 700 }}>
                                    <FavoriteBorderIcon style={{ color: theme.colors.yellow, fontSize: isMobile ? "14px" : "22px", marginRight: isMobile ? "10px" : "20px" }} />  4.850
                                </Typography>
                                <Typography variant="h1" sx={{ width: isMobile ? "80px" : "115px", letterSpacing: "1px", color: theme.colors.yellow, fontSize: isMobile ? "12px" : "18px", fontFamily: theme.fonts.Light, fontWeight: 600 }}>
                                    Creators  on
                                    the platform
                                </Typography>
                            </Box>
                            <Box sx={{ width: isMobile ? "140px" : "313px", height: isMobile ? "120px" : "211px", display: "flex", justifyContent: "space-between", flexDirection: "column", background: theme.colors.grey, borderRadius: isMobile ? "10px" : "20px", padding: isMobile ? "10px 15px" : "20px 30px" }}>
                                <div>
                                    <Typography variant="h1" sx={{ width: isMobile ? "100%" : "115px", marginBottom: isMobile ? "10px" : "15px", letterSpacing: "1px", color: theme.colors.yellow, fontSize: isMobile ? "12px" : "18px", fontFamily: theme.fonts.Light, fontWeight: 600 }}>
                                        New Users
                                    </Typography>
                                    <Typography variant="h1" sx={{ color: theme.colors.yellow, fontSize: isMobile ? "24px" : "42px", fontFamily: theme.fonts.Light, fontWeight: 700 }}>
                                        54K
                                    </Typography>
                                </div>
                                <Typography variant="h1" sx={{ width: isMobile ? "100%" : "115px", letterSpacing: "1px", color: theme.colors.yellow, fontSize: isMobile ? "12px" : "18px", fontFamily: theme.fonts.Light, fontWeight: 600 }}>
                                    +20%
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid>
                            <img src={dashboardBox} alt="dashboard" width={isMobile ? 290 : ""} />
                        </Grid>
                    </Grid>
                    <Grid item gap={1.5} sx={{ display: "flex", flexDirection: isMobile ? "row" : "column" }}>
                        <Box>
                            <DashboardBox
                                heading={"MMDAO"}
                                boxWidth={isMobile ? "140px" : "309px"}
                                boxHight={isMobile ? "114px" : "446px"}
                                background={"#999999"}
                                icon={market}
                                image={hemisphere}
                                color={"#3e1212"}
                                imageHight={isMobile ? 50 : 110}
                                imageWidth={isMobile ? 50 : 110}
                                title="About"
                                link="#"
                            />
                        </Box>
                        <Box>
                            <DashboardBox
                                boxWidth={isMobile ? "140px" : "309px"}
                                boxHight={isMobile ? "114px" : "195px"}
                                background={theme.colors.purple}
                                color={theme.colors.black}
                                icon={Dao}
                                image={Torus}
                                imageHight={isMobile ? 40 : 60}
                                imageWidth={isMobile ? 60 : 100}
                                title="Dao"
                                marginBottom={3}
                                link="#"
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid item gap={1.5} sx={{ display: "flex", marginTop: "12px" }}>
                    <Box>
                        <DashboardBox
                            boxWidth={isMobile ? "140px" : "321px"}
                            boxHight={isMobile ? "100px" : "177px"}
                            background={theme.colors.yellow}
                            color={theme.colors.black}
                            image={cube}
                            upperBoxHight={190}
                            imageHight={isMobile ? 40 : 80}
                            imageWidth={isMobile ? 40 : 80}
                            marginBottom={isMobile && "40px"}
                            title="Marketplace"
                            link="#"
                        />
                    </Box>
                    <Box sx={{ width: isMobile ? "140px" : "626px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: isMobile ? "100px" : "177px", background: "#4A9173", borderRadius: isMobile ? "10px" : "20px", padding: isMobile ? "10px 15px" : "20px 30px" }}>
                        <Typography variant="h1" sx={{ width: isMobile ? "94px" : "130px", letterSpacing: "1px", color: theme.colors.yellow, fontSize: isMobile ? "10px" : "13px", fontFamily: theme.fonts.Light, fontWeight: 600, }}>
                            LiveLoop Lite For MusicMoon Users.
                        </Typography>
                        <Typography variant="h1" sx={{ width: isMobile ? "100%" : "451px", letterSpacing: "1px", color: theme.colors.white, fontSize: "10px", textAlign: "justify", fontFamily: theme.fonts.Light, fontWeight: 600, display: isMobile && "none" }}>
                            30% OFF LiveLoop is a unique tool for musicians of all professional levels. With LiveLoop you can create, compose, perform and record music through an intuitive, versatile and easy-to-use software.
                        </Typography>
                        <Typography variant="h1" sx={{ width: isMobile ? "100%" : "451px", letterSpacing: "1px", color: theme.colors.white, fontSize: isMobile ? "14px" : "18px", textAlign: "justify", fontFamily: theme.fonts.Light, fontWeight: 600, }}>
                            LiveLoop
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* <Box>
                    <DashboardBox
                        boxWidth={isMobile ? "100%" : "303px"}
                        boxHight="238px"
                        background={theme.colors.lightBlue}
                        color={theme.colors.black}
                        icon={Dao}
                        image={Torus}
                        imageHight={90}
                        imageWidth={125}
                        title="Dao"
                        link="/dashboard/dao"
                    />
                </Box> */}
            {/* <Grid item>
                <Box>
                    <DashboardBox
                        boxWidth={isMobile ? "100%" : "565px"}
                        boxHight={isMobile ? "238px" : "497px"}
                        background={theme.colors.grey}
                        icon={market}
                        image={hemisphere}
                        color={theme.colors.white}
                        iconWidth={30}
                        upperBoxHight={180}
                        lowerBoxHight={155}
                        imageHight={isMobile ? 105 : 152}
                        imageWidth={isMobile ? 105 : 152}
                        title="MarketPlace"
                        link="/dashboard/marketplace"
                    />
                </Box>
            </Grid>
            <Grid item>
                <Box>
                    <DashboardBox
                        boxWidth={isMobile ? "100%" : "892px"}
                        boxHight={isMobile ? "238px" : "323px"}
                        background={theme.colors.darkBlue}
                        icon={qr}
                        color={theme.colors.white}
                        image={cube}
                        iconWidth={36}
                        iconHight={36}
                        upperBoxHight={190}
                        imageHight={isMobile ? 90 : 140}
                        imageWidth={isMobile ? 90 : 140}
                        title="Wallet"
                        link="/dashboard/wallet"
                    />
                </Box>
            </Grid> */}
        </Grid>
    )
}
