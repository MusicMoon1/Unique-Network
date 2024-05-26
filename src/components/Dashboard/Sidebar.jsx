import React, { useState } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { theme } from '../../utils/Theme'
import logo from "../../assets/icons/Yellowlogo.png"
import home from "../../assets/icons/home.png"
import home2 from "../../assets/icons/home2.png"
import dao from "../../assets/icons/dao.png"
import dao2 from "../../assets/icons/dao2.png"
import library from "../../assets/icons/library.png"
import library2 from "../../assets/icons/library2.png"
import market from "../../assets/icons/market.png"
import market2 from "../../assets/icons/market2.png"
import setting from "../../assets/icons/setting.png"
import governance from "../../assets/icons/governance.png"
import community from "../../assets/icons/community.png"
import { Link } from 'react-router-dom'


export default function Sidebar({ boxNo }) {
    const isMobile = useMediaQuery("(max-width:600px)");
    const boxesData = [
        {
            logo: logo,
            items: [
                { link: "/dashboard", icon: home, icon2: home2, text: "Home", width: 19, height: 22 },
                { link: "/dashboard/library", icon: library, icon2: library2, text: "My Library", width: 27, height: 24 },
                { link: "/dashboard/marketplace", icon: market, icon2: market2, text: "Marketplace", width: 30, height: 24 },
                { link: "/dashboard/dao", icon: dao, icon2: dao2, text: "Dao", width: 32, height: 32 },
                { link: "#", icon: governance, icon2: governance, text: "Governance", width: 36, height: 32 },
                { link: "#", icon: community, icon2: community, text: "Community", width: 32, height: 32 }
            ]
        },
    ];
    const [activeBox, setActiveBox] = useState(boxNo ? boxNo : 0);

    const handleBoxClick = (itemIndex) => {
        setActiveBox(boxNo);
    };
    return (
        <Box
            sx={{
                width: isMobile ? "75px" : "91px",
                height: "1000px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                borderRight: `1px solid #353945`,
                position: "relative",
                top: isMobile ? -78 : -87,
                zIndex: 2
            }}
        >

            {boxesData.map((box, index) => (
                <Box key={index}>
                    {box.logo && (
                        <Box sx={{ width: isMobile ? "75px" : "91px", height: isMobile ? "75px" : "91px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Link to="/">
                                <img src={box.logo} alt="logo" width={49} height={43} />
                            </Link>
                        </Box>
                    )}

                    {box.items.map((item, itemIndex) => (

                        <Box key={itemIndex}
                            onClick={() => handleBoxClick(itemIndex)}
                            sx={{ width: isMobile ? "75px" : "91px", height: isMobile ? "75px" : "91px", display: "flex", justifyContent: "center", alignItems: "center", }}>
                            <Link to={item.link} style={{ textDecoration: "none" }}>
                                <Box sx={{ width: isMobile ? "55px" : "75px", height: isMobile ? "60px" : "84px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "8px", backgroundColor: activeBox === itemIndex ? theme.colors.yellow : "", }}>
                                    <Box sx={{ width: "48px", height: "48px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <img src={activeBox === itemIndex ? item.icon2 : item.icon} alt={item.text} width={item.width} height={item.height} />
                                    </Box>
                                    {
                                        activeBox === itemIndex ? <></> :
                                            <Typography variant='h6' sx={{ fontSize: "10px", fontFamily: theme.fonts.Light, fontWeight: 500, color: theme.colors.textcolor2 }}>{item.text}</Typography>
                                    }
                                </Box>
                            </Link>
                        </Box>
                    ))}
                </Box>
            ))}
            <Box
                onClick={() => handleBoxClick(5)}
                sx={{ width: "91px", height: "91px", display: "flex", justifyContent: "center", alignItems: "center", }}>
                <Box sx={{ width: "75px", height: "84px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "8px", backgroundColor: activeBox === 5 ? theme.colors.yellow : "", }}>
                    <Box sx={{ width: "48px", height: "48px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={setting} alt={setting} width={33} height={33} />
                    </Box>

                    {
                        activeBox === 5 ? <></> :
                            <Typography variant='h6' sx={{ fontSize: "10px", fontFamily: theme.fonts.Light, fontWeight: 400, color: theme.colors.textcolor2 }}>Settings</Typography>
                    }
                </Box>
            </Box>
        </Box>
    );
};
