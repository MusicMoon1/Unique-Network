import React, { useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { theme } from '../../utils/Theme';
import { toast } from 'react-toastify';
import InputField from '../Login/InputField';
import InputWithButton from '../Login/InputWithButton';
import BackgroundButton from '../Login/BackgroundButton';

import { useNavigate } from 'react-router-dom';
import { loginUserProfile } from '../../Backend/Backend';

const initialState = { email: "", password: "" }

export default function LoginMain() {
    const navigate = useNavigate()
    const isMobile = useMediaQuery("(max-width:600px)");
    const [state, setSatate] = useState(initialState);

    const handleChange = (e) => {
        setSatate({ ...state, [e.target.name]: e.target.value })
    }


    const handleLoginClick = () => {

        const { email, password } = state


        if (!email.length || !password.length) {
            return toast.warning("All inputs Required to Login")
        }
        loginUserProfile(email, password)
        // navigate('/')
    }
    // const handleClear = () => {
    //     setSatate(initialState)
    // }

    return (
        <>

            <Box sx={{ width: "100%", height: "666px" }}>
                <Box sx={{ textAlign: "center", minHeight: "102px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant='h6' sx={{ color: theme.colors.white, fontSize: isMobile ? "3rem" : "4rem", fontFamily: theme.fonts.Light, fontWeight: 700 }}>Login</Typography>
                </Box>
                <Box sx={{ width: "100%", height: "26rem", margin: "1rem 0 3rem", padding: isMobile ? "15px" : "", display: 'flex', justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

                    <InputField
                        label="YOUR EMAIL"
                        value={state.email}
                        inputName="email"
                        placeholder="Enter your email"
                        boxWidth="36rem"
                        width="100%"
                        onChange={handleChange}
                    />

                    <InputWithButton
                        label="Password"
                        value={state.password}
                        inputName="password"
                        placeholder="Your password"
                        width="100%"
                        boxWidth="36rem"
                        // linkText=" "
                        linkTo="/custom-link"
                        onChange={handleChange}
                    />
                    <Box sx={{ width: isMobile ? "340px" : "576px", marginTop: "3%", display: "flex", justifyContent: "end" }}>

                        <BackgroundButton
                            width="250px"
                            fontSize={isMobile ? "18px" : "22px"}
                            text="Login"
                            height="60px"
                            onClick={handleLoginClick}
                        />

                    </Box>
                </Box>
                {/* <Box sx={{ width: "100%", margin: "3rem 0", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ width: isMobile ? "95%" : "547px", display: 'flex', justifyContent: "end", alignItems: "center" }}>

                        <IconButton
                            width="150px"
                            height="60px"
                            border="0"
                            color={theme.colors.yellow}
                            fontSize={isMobile ? "18px" : "22px"}
                            text="Clear all"
                            onClick={handleClear}
                        />

                    </Box>
                </Box> */}
            </Box>
        </>
    )
}
