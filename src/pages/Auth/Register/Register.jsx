import { Box } from '@mui/material'
import React from 'react'
import { theme } from '../../../utils/Theme'
import Navbar from '../../../components/Navbar'
import LoginHeader from '../../../components/Login/LoginHeader'
import RegisterMain from '../../../components/Register/RegisterMain'
import Footer from '../../../components/Footer'

export default function Register() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                background: theme.colors.navColor,
            }}
        >
            <Navbar />
            <Box sx={{ flexGrow: 1 }}>
                <LoginHeader />
                <RegisterMain />
            </Box>
            <Footer />
        </Box>
    )
}
