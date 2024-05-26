import React from 'react'
import { theme } from '../../utils/Theme';
import yellowIcon from '../../assets/icons/yellowicon.png'
import { useMediaQuery } from '@mui/material';

export default function ButtonBox() {
    const isMobile = useMediaQuery("(max-width:600px)");
    const data = [
        { title: 'Videos', items: 138 },
        { title: 'Music', items: 85 },
        { title: 'Loops', items: 205 },
        { title: 'Midis', items: 205 },
    ];

    const renderedData = data.map((item, index) => (
        <div key={index} style={{ width: "256px", height: "64px", display: "flex", justifyContent: "center", alignItems: "center", border: `1px solid ${theme.colors.borderColor}`, borderRadius: "40px", margin: "0 10px" }}>
            <div style={{ width: "25%", display: "flex", justifyContent: "center" }}>
                <img src={yellowIcon} alt="" />
            </div>
            <div style={{ width: "75%" }}>
                <p style={{ color: theme.colors.white, fontFamily: theme.fonts.Light, fontSize: "16px", fontWeight: 500, margin: 0 }}>{item.title}</p>
                <p style={{ color: theme.colors.textcolor, fontFamily: theme.fonts.Light, fontSize: "12px", fontWeight: 400, margin: 0 }}>{item.items} items</p>
            </div>
        </div>
    ));

    return (
        <div style={{ width: isMobile ? "365px" : "100%", display: "flex", flexWrap: "nowrap", overflowX: "auto", }}>
            <style>
                {`
        /* Hide scrollbar for WebKit browsers */
        ::-webkit-scrollbar {
            width: 0px;
        }
        `}
            </style>
            <div style={{ margin: "0 10px", display: "flex", }}>
                {renderedData}
            </div>
        </div>


    )
}
