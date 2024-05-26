import { Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import { theme } from '../../utils/Theme'
import DaoBox from './DaoBox'
import DaoForm from './DaoForm'

export default function CreateDaos() {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <Grid container style={{ marginTop: "20px", justifyContent: isMobile ? "" : "space-around" }}>
            <Grid item sx={{ marginBottom: isMobile && "20px" }}>
                <ol style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    fontFamily: theme.fonts.Light,
                    color: theme.colors.textcolor,
                    lineHeight: "30px",
                    // padding:0,
                    margin: 0
                }}>
                    <li>Introduction to DAO Governance</li>
                    <li>How to Participate</li>
                    <li>Governance Token Information</li>
                    <li>Current Proposals</li>
                    <li>Proposal Submission Process</li>
                    <li>Voting System and Process</li>
                    <li>Past Proposals and Results</li>
                    <li>FAQs</li>
                    <li>Resources and Documentation</li>
                    <li>Community Discussion Forums</li>
                    <li>Contact Information</li>
                </ol>
            </Grid>
            <Grid item sx={{ width: "480px" }}>
                <DaoForm />
            </Grid>
            <Grid item gap={5} sx={{ width: isMobile ? "350px" : "450px", margin: isMobile && "20px", display: "flex", justifyContent: "center" }}>
                <DaoBox
                    title={"DAO Name"}
                    summary={"A more detailed description of the DAO, including its objectives, intended community, and how it plans to operate."}
                    bgclr={theme.colors.yellow}
                    isActive={"Active"}
                    status={"Closed"}
                />
            </Grid>
        </Grid>
    )
}
