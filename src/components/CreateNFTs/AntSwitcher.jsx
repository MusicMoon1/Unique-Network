import styled from '@emotion/styled';
import { Switch, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import React from 'react';

const theme = createTheme();

export default function AntSwitcher() {
    const isMobile = useMediaQuery("(max-width:600px)");
    const AntSwitch = styled(Switch)(({ theme, customColor }) => ({
        width: isMobile ? 21 : 42, // Adjusted width for mobile
        height: isMobile ? 11 : 21, // Adjusted height for mobile
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: isMobile ? 8 : 17, // Adjusted thumb width for mobile
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: `translateX(${isMobile ? 5 : 9}px)`, // Adjusted transform for mobile
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: isMobile ? 1 : 2, // Adjusted padding for mobile
            '&.Mui-checked': {
                transform: `translateX(${isMobile ? 11 : 21}px)`, // Adjusted transform for mobile
                color: '#000',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: customColor,
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: isMobile ? 8 : 17, // Adjusted thumb width for mobile
            height: isMobile ? 8 : 17, // Adjusted thumb height for mobile
            borderRadius: '50%',
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: isMobile ? 5 : 9, // Adjusted border radius for mobile
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? '#fff' : '#fff',
            boxSizing: 'border-box',
            width: isMobile ? 21 : 42, // Adjusted width for mobile
            height: isMobile ? 11 : 21, // Adjusted height for mobile
        },
    }));

    const customColor = '#FDFF8F';

    return (
        <ThemeProvider theme={theme}>
            <AntSwitch
                defaultChecked
                customColor={customColor}
                inputProps={{ 'aria-label': 'ant design' }}
            />
        </ThemeProvider>
    );
}
