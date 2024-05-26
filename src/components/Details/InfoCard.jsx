import React, { useState } from 'react'
import { ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material'
import { theme } from '../../utils/Theme'
import image from '../../assets/profile.png'

function InfoCard() {
    const isMobile = useMediaQuery("(max-width:600px)");
    const [alignment, setAlignment] = useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const toggleButtons = [
        { value: "info", label: "Info" },
        { value: "owner", label: "Owner" },
        { value: "history", label: "History" },
        { value: "bids", label: "Bids" }
    ];
    return (
        <div style={{ width: isMobile ? "311px" : "384px", height: isMobile ? "443px" : "424px", marginTop: isMobile && "7%", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
            <div style={{ width: "100%", height: "86px", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                <div>
                    <Typography variant='h6' sx={{ height: "48px", color: theme.colors.white, fontSize: isMobile ? "2.4rem" : "2.5rem", fontWeight: 400, fontFamily: theme.fonts.Light }}>
                        Video Moon Lady
                    </Typography>
                </div>
                <div style={{ display: "flex", width: "234px", height: "30px" }}>
                    <Typography variant='h6' sx={{ color: theme.colors.white, padding: "1% 2%", borderRadius: "5px", marginRight: "1rem", fontSize: "1rem", fontWeight: 700, fontFamily: theme.fonts.Light, border: `2px solid ${theme.colors.yellow}` }}>
                        Ξ0.515
                    </Typography>
                    <Typography variant='h6' sx={{ color: theme.colors.white, padding: "1% 2%", borderRadius: "5px", marginRight: "1rem", fontSize: "1rem", fontWeight: 700, fontFamily: theme.fonts.Light, border: `2px solid ${theme.colors.textcolor}` }}>
                        $1,1k
                    </Typography>
                    <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: "1rem", fontWeight: 500, fontFamily: theme.fonts.Light }}>
                        10 in stock
                    </Typography>
                </div>
            </div>
            <div style={{ width: "100%", height: "48px" }}>
                <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: "1rem", fontWeight: 400, fontFamily: theme.fonts.Light }}>
                    This NFT Card will give you Access to Special Airdrops. To learn more visit MusicMoon.org
                </Typography>
            </div>



            <div style={{ width: "100%", height: "210px", display: "flex", justifyContent: "space-between", flexDirection: 'column' }}>
                <div>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        sx={{
                            width: "100%",
                            border: '1px solid white',
                            padding: '5px',
                            borderRadius: '20px', // Border radius for ToggleButtonGroup

                        }}
                    >
                        {toggleButtons.map((button, index) => (
                            <ToggleButton
                                key={index}
                                value={button.value}
                                sx={{
                                    height: "28px",
                                    fontSize: "14px",
                                    color: theme.colors.textcolor,
                                    borderRadius: "0px",
                                    "&.Mui-selected": {
                                        color: 'black',
                                        backgroundColor: 'white',
                                        borderRadius: "20px",
                                    },
                                }}
                            >
                                {button.label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </div>
                <div style={{ width: "100%", height: "67px", display: "flex", borderBottom: `1px solid ${theme.colors.darkgrey}`, }}>
                    <div style={{ marginRight: "10px" }}>
                        <img src={image} alt="image" width={48} height={48} style={{ borderRadius: "50%" }} />
                    </div>
                    <div>
                        <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: "0.87rem", fontWeight: 400, fontFamily: theme.fonts.Light }}>
                            Owner
                        </Typography>
                        <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: "0.87rem", fontWeight: 500, fontFamily: theme.fonts.Light }}>
                            Josepet Bass
                        </Typography>
                    </div>
                </div>
                <div style={{ width: "100%", height: "67px", display: "flex", borderBottom: `1px solid ${theme.colors.darkgrey}` }}>
                    <div style={{ marginRight: "10px" }}>
                        <img src={image} alt="image" width={48} height={48} style={{ borderRadius: "50%" }} />
                    </div>
                    <div>
                        <Typography variant='h6' sx={{ color: theme.colors.textcolor, fontSize: "0.87rem", fontWeight: 400, fontFamily: theme.fonts.Light }}>
                            Creator
                        </Typography>
                        <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: "0.87rem", fontWeight: 500, fontFamily: theme.fonts.Light }}>
                            Chris Scarlat
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard