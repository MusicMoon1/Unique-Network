import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { theme } from "../../utils/Theme";
import { Link } from "react-router-dom";

const DashboardBox = ({ heading, link, background, boxWidth,marginBottom, color, boxHight, upperBoxHight, lowerBoxHight, icon, iconWidth, iconHight, imageWidth, imageHight, title, image }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <Link to={link} style={{ textDecoration: "none" }}>
            <Box sx={{ width: boxWidth || "303px", height: boxHight || "238px", background, borderRadius: "20px", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                <Box sx={{ width: "100%", height: "80px", display: "flex", alignItems: "center", pl: 2, marginTop: isMobile && "10px" }}>
                    {/* <img src={icon} alt="icon" width={iconWidth || 24} height={iconHight || 24} /> */}
                    <Typography variant="h1" sx={{ color, fontSize: isMobile ? "24px" : "42px", fontFamily: theme.fonts.Light, fontWeight: 700 }}>
                        {heading}
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", px: 2, height: upperBoxHight || "150px", display: "flex", alignItems: "center", marginTop: isMobile && "-20px", marginBottom: "4%" }}>
                    <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "end" }}>
                        <Typography variant='h6' sx={{ color, fontSize: isMobile ? "12px" : "1.2rem", fontFamily: theme.fonts.Light, fontWeight: 700 }}>
                            {title}
                        </Typography>
                    </Box>
                    <Box className="container" sx={{ width: "100%", height: lowerBoxHight || "100%", display: "flex", alignItems: "end", justifyContent: "end",marginBottom:marginBottom }}>
                        <img className="image" src={image} alt="image" width={imageWidth || 123} height={imageHight || 121} />
                    </Box>
                </Box>
            </Box>
        </Link>
    );
};

export default DashboardBox;
