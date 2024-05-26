import { Button } from '@mui/material'
import React from 'react'
import { theme } from '../../utils/Theme'

export default function BackgroundButton({ width, height, fontSize, fontFamily, background, color, fontWeight, borderRadius, text, hoverBackground, hoverColor, onClick }) {
    return (
        <Button
            onClick={onClick}
            sx={{
                width: width || "150px",
                height: height,
                padding: "1rem 0",
                fontSize: fontSize || "22px",
                fontFamily: fontFamily || theme.fonts.DM,
                background: background || theme.colors.yellow,
                color: color || theme.colors.black,
                fontWeight: fontWeight || 700,
                borderRadius: borderRadius || "50px",
                textTransform: 'none',
                "&:hover": {
                    background: hoverBackground || theme.colors.black,
                    color: hoverColor || theme.colors.yellow,
                },
            }}
        >
            {text}
        </Button>


    )
}
