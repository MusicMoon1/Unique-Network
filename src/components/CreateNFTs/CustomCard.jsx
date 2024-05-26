import React from 'react';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { theme } from '../../utils/Theme';

const CustomCard = ({ icon, iconColor, title }) => {
    return (
        <div style={{ width: "160px", minHeight: "108px", background: theme.colors.darkgrey, borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "2%" }}>
            <div style={{ width: "112px", minHeight: "76px", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: iconColor || theme.colors.white, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {icon || <AddIcon />}
                </div>
                <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: "0.9rem", lineHeight: "16px", fontFamily: theme.fonts.Light, fontWeight: 700 }}>
                    {title || "Create collection"}
                </Typography>
            </div>
        </div>
    );
};

export default CustomCard;
