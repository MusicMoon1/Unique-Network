import { Button } from '@mui/material'
import React from 'react'
import { theme } from '../../utils/Theme'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function IconButton({ children, width, height, margin, fontSize, boderColor, fontFamily, icon, iconWidth, iconHeight, color, iconColor, border, padding, fontWeight, borderRadius, text, hoverBackground, hoverColor, onClick }) {
    return (
        <Button
            onClick={onClick}
            startIcon={icon || <CancelOutlinedIcon sx={{ color: iconColor || theme.colors.yellow, width: iconWidth || "33px", height: iconHeight || "33px" }} />}
            sx={{
                display: 'flex',
                margin: margin,
                alignItems: 'center', // Align items vertically in the center
                justifyContent: 'center',
                width: width || "150px",
                height: height,
                padding: padding || "1rem 0",
                fontSize: fontSize || "22px",
                fontFamily: fontFamily || theme.fonts.DM,
                color: color || theme.colors.black,
                fontWeight: fontWeight || 700,
                borderRadius: borderRadius || "50px",
                textTransform: 'none',
                border: `3px solid ${boderColor || theme.colors.yellow}`,
                "&:hover": {
                    background: hoverBackground || theme.colors.black,
                    color: hoverColor || theme.colors.yellow,
                },
            }}
        >
            {text}
            {children}
        </Button>


    )
}

