import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import DetailsPageBox from '../../components/Details/DetailsPageBox'
import VideoCard from '../../components/Details/VideoCard'
import InfoCard from '../../components/Details/InfoCard'
import { theme } from '../../utils/Theme'
import { Grid, useMediaQuery } from '@mui/material'

export default function DetailsPage() {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <div style={{ background: theme.colors.navColor }}>
            <Navbar />
            <Grid container style={{ minHeight: "768px", margin:'5% 0%', display: "flex", justifyContent: "space-between" }}>
                <Grid item xs={12} md={7.5} style={{ display: 'flex', justifyContent: "center" }}>
                    <VideoCard />
                </Grid>
                <Grid item xs={12} md={4.5} >
                    <div style={{minHeight:"768px",width:"100%", display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"}}>
                        <div item>
                            <InfoCard />
                        </div>
                        <div item>
                            <DetailsPageBox />
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Footer />
        </div>
    )
}
