import { Button } from '@mui/material'
import React from 'react'
import { theme } from '../../utils/Theme'

function BorderButton({ children, onClick, width, height, color, borderColor, fontSize, fontFamily, fontWeight, borderRadius, text }) {
    return (
        <Button
            onClick={onClick}
            sx={{
                width: width || "113px",
                height: height || "56px",
                color: color || "white",
                border: `2px solid ${borderColor || theme.colors.white}`,
                fontSize: fontSize || "19px",
                fontFamily: fontFamily || theme.fonts.DM,
                fontWeight: fontWeight || 700,
                borderRadius: borderRadius || "40px"
            }}>
            {text}
            {children}
        </Button>
    )
}

export default BorderButton 
