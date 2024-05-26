import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../../../components/Navbar'
import LoginHeader from '../../../components/Login/LoginHeader'
import LoginMain from '../../../components/Login/LoginMain'
import Footer from '../../../components/Footer'
import { theme } from '../../../utils/Theme'

export default function Login() {
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
        <LoginMain />
      </Box>
      <Footer />
    </Box>
  )
}
