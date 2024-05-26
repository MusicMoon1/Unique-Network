import { Divider, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { theme } from '../../utils/Theme';

export default function DaoBox({ title, summary, passDate, percentage, status, bgclr, isActive }) {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <div style={{}}>
            <div style={{
                width: isMobile ? "100%" : "308px",
                height: isMobile ? "280px" : "317px",
                borderRadius: "12px",
                border: "1px solid #353940",
                background: "#2B2C2B",
                padding: "20px",
                boxShadow: "0px 0px 6.2px -1px #FDFF8F",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div>
                    <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: "12px", fontFamily: theme.fonts.Light, fontWeight: 700 }}>
                        {title}
                    </Typography>
                    <Typography variant='h6' sx={{ margin: "10px 0", color: theme.colors.textcolor2, fontSize: "10px", fontFamily: theme.fonts.Light, fontWeight: 400 }}>
                        {summary}
                    </Typography>
                    <Divider sx={{ background: theme.colors.textcolor2 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0", }}>
                        <Typography variant='h6' sx={{ color: theme.colors.textcolor2, fontSize: "10px", fontFamily: theme.fonts.Light, fontWeight: 400 }}>
                            Passes on {passDate}
                        </Typography>
                        <Typography variant='h6' sx={{ color: theme.colors.yellow, fontSize: "10px", fontFamily: theme.fonts.Light, fontWeight: 700 }}>
                            {percentage}%
                        </Typography>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <div style={{ width: "140px", height: "69px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div style={{ display: 'flex' }}>
                            <Typography variant='h6' sx={{ color: theme.colors.textcolor2, fontSize: "10px", fontFamily: theme.fonts.Light, fontWeight: 400, marginRight: "10px" }}>
                                {status}
                            </Typography>
                            <Typography variant='h6' sx={{ color: theme.colors.black, fontSize: "10px", fontFamily: theme.fonts.Light, fontWeight: 600, background: bgclr || theme.colors.background2, p: "0.5px 8px", borderRadius: "10px" }}>
                                {isActive || "Ended 7 days ago"}
                            </Typography>
                        </div>
                        <Typography variant='h6' sx={{ color: theme.colors.yellow, fontSize: "14px", fontFamily: theme.fonts.Light, fontWeight: 700 }}>
                            View on Snapshot
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}
