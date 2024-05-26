import React from 'react'
import iconimage from '../../assets/profile.png'
import { Typography, useMediaQuery } from '@mui/material'
import { theme } from '../../utils/Theme'
import BackgroundButton from '../Login/BackgroundButton'
import BorderButton from '../Profile/BorderButton'

export default function DetailsPageBox() {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (

        <div style={{ width: isMobile ? "343px" : "384px", height: isMobile ? "224px" : "240px", borderRadius: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: theme.colors.darkgrey, padding: "24px", }}>

            <div style={{ width: isMobile ? "298px" : "336px", height: "56px", display: "flex" }}>
                <div style={{ width: "48px", height: "48px", marginRight: "0 2%" }}>
                    <img src={iconimage} alt="profileImage" width={40} height={40} style={{ borderRadius: "50%" }} />
                </div>
                <div>
                    <div style={{ width: "100%", height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column" }}>
                        <div style={{ display: "flex", width: "234px", }}>
                            <Typography variant='h6' sx={{ color: theme.colors.textcolor, marginRight: "1rem", fontSize: "1rem", fontWeight: 500, fontFamily: theme.fonts.Light }}>
                                Highest bid by
                            </Typography>
                            <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: "1rem", fontWeight: 500, fontFamily: theme.fonts.Light }}>
                                Usman Shams
                            </Typography>
                        </div>
                        <div style={{ display: "flex", width: "234px", }}>
                            <Typography variant='h6' sx={{ color: theme.colors.white, marginRight: "1rem", fontSize: "1rem", fontWeight: 500, fontFamily: theme.fonts.Light }}>
                                Ξ1.46
                            </Typography>
                            <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: "1rem", fontWeight: 500, fontFamily: theme.fonts.Light }}>
                                $2,764.89
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: isMobile && "298px", display: isMobile && "flex", justifyContent: isMobile && "space-between" }}>
                <BackgroundButton
                    width={isMobile ? "145px" : "164px"}
                    height="48px"
                    text="Purchase now"
                    fontSize="16px"
                    fontFamily={theme.fonts.Light}
                />
                <BorderButton
                    width={isMobile ? "145px" : "164px"}
                    height="48px"
                    text="Place a bid"
                    fontSize="16px"
                    fontFamily={theme.fonts.Light}
                    borderColor={theme.colors.textcolor}
                />

            </div>

            <div style={{ display: "flex", }}>
                <Typography variant='h6' sx={{ color: theme.colors.white, marginRight: "1rem", fontSize: "0.87rem", fontWeight: 500, fontFamily: theme.fonts.Light }}>
                    Service fee
                </Typography>
                <Typography variant='h6' sx={{ color: theme.colors.white, marginRight: "1rem", fontSize: "0.87rem", fontWeight: 500, fontFamily: theme.fonts.Light }}>
                    1.5%
                </Typography>
                <Typography variant='h6' sx={{ color: theme.colors.white, marginRight: "1rem", fontSize: "0.87rem", fontWeight: 500, fontFamily: theme.fonts.Light }}>
                    Ξ2.563
                </Typography>
                <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: "0.87rem", fontWeight: 500, fontFamily: theme.fonts.Light }}>
                    $4,540.62
                </Typography>
            </div>
        </div>
    )
}
