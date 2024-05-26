import { Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react';
import { theme } from '../../utils/Theme';
export default function TextPost({ title, des, }) {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <Grid container gap={3} style={{ width: isMobile ? "300px" : "350px"}}>
            <Grid>
                <Typography variant='h1' style={{ fontSize: isMobile ? "22px" : "32px", fontFamily: theme.fonts.Light, color: theme.colors.white }}>
                    {title || "1.LiveLoop Software (www.liveloop.live):"}
                </Typography>
            </Grid>
            <Grid>
                <Typography variant='h1' style={{ fontSize: "18px", fontFamily: theme.fonts.Light, color: theme.colors.white }}>
                    {
                        des || "This platform enables artists and labels to craft and perform music. It's designed to be accessible to a broad user base, ranging from novices to experienced professionals, and offers versatile features for music creation."
                    }
                </Typography>
            </Grid>
        </Grid>
    )
}
