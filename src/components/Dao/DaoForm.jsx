import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { theme } from '../../utils/Theme'
import InputField from '../Login/InputField'
import SelectInput from './SelectInput'
import { DAOStructure, InitialMembers, LegalStructure, Proposal, QuorumRequirement, SmartContract, voting, votingPeriod } from '../../Constants'
import BackgroundButton from '../Login/BackgroundButton'

export default function DaoForm() {
    return (
        <Grid sx={{padding:"0 10px"}}>
            <Typography variant='h1' style={{ fontSize: "20px", color: theme.colors.white }}>
                Create a DAO
            </Typography>
            <Typography variant='h1' style={{ fontSize: "16px", marginTop: "20px", color: theme.colors.white }}>
                Please add here the details required to create a new DAO
            </Typography>
            <InputField
                label={"DAO NAME"}
                placeholder={"DAO NAME"}
                labelfontSize={"14px"}
                fontsize={"14px"}
                inputborderColor={theme.colors.textcolor}
                inputborderWidth={"1.5px"}
            />
            <InputField
                label={"MISSION"}
                placeholder={"Mission Statement"}
                labelfontSize={"14px"}
                inputborderColor={theme.colors.textcolor}
                inputborderWidth={"1.5px"}
                fontsize={"14px"}
            />
            <InputField
                label={"Description"}
                placeholder={"Description"}
                labelfontSize={"14px"}
                inputborderColor={theme.colors.textcolor}
                inputborderWidth={"1.5px"}
                fontsize={"14px"}
            />
            <InputField
                label={"TOKEN NAME"}
                placeholder={"Governance Token Name"}
                labelfontSize={"14px"}
                inputborderColor={theme.colors.textcolor}
                inputborderWidth={"1.5px"}
                fontsize={"14px"}
            />
            <InputField
                label={"TOKEN SYMBOL"}
                placeholder={"Governance Token Symbol"}
                labelfontSize={"14px"}
                inputborderColor={theme.colors.textcolor}
                inputborderWidth={"1.5px"}
                fontsize={"14px"}
            />
            <InputField
                label={"TOKEN ALLOCATION"}
                placeholder={"Token Allocation"}
                labelfontSize={"14px"}
                inputborderColor={theme.colors.textcolor}
                inputborderWidth={"1.5px"}
                fontsize={"14px"}
            />
            <SelectInput label="VOTING SYSTEM" options={voting} />
            <SelectInput label="PROPOSAL THRESHOLD" options={Proposal} />
            <SelectInput label="Voting Period" options={votingPeriod} />
            <SelectInput label="Quorum Requirement" options={QuorumRequirement} />
            <SelectInput label="Initial Members" options={InitialMembers} />
            <SelectInput label="DAO Structure" options={DAOStructure} />
            <SelectInput label="Smart Contract Platform" options={SmartContract} />
            <InputField
                label={"Smart Contract Specifications"}
                placeholder={"Smart Contract Specifications"}
                labelfontSize={"14px"}
                inputborderColor={theme.colors.textcolor}
                inputborderWidth={"1.5px"}
                fontsize={"14px"}
            />
            <InputField
                label={"Additional information"}
                placeholder={"Additional information"}
                labelfontSize={"14px"}
                inputborderColor={theme.colors.textcolor}
                inputborderWidth={"1.5px"}
                fontsize={"14px"}
            />
            <SelectInput label="Legal Structure (if applicable)" options={LegalStructure} />
            <Box sx={{ textAlign: "end" }}>
                <BackgroundButton
                    width={"180px"}
                    height={"48px"}
                    text={"create"}
                    fontSize={"16px"}
                />
            </Box>
        </Grid>
    )
}
