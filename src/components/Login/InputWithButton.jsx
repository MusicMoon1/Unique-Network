
import React from 'react'
import { Box, FormControl, Input, InputAdornment, InputLabel, TextField, Typography, useMediaQuery } from '@mui/material'
import { theme } from '../../utils/Theme'
import { Link } from 'react-router-dom';

export default function InputWithButton({ label, placeholder, labelColor, fontsize, fontfamily, onChange, type, value, width, linkText, placeholderColor, boxWidth, linkTo, inputName }) {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <>
            <Box sx={{ width: isMobile ? "100%" : boxWidth, margin: "1rem 0", }}>
                <InputLabel htmlFor="input-with-icon-adornment" sx={{ color: labelColor || theme.colors.textcolor, fontSize: "16.8px", fontFamily: theme.fonts.Light, fontWeight: 700 }}>
                    {label}
                </InputLabel>
                <FormControl variant="standard" sx={{ width: "100%" }}>
                    <TextField
                        onChange={onChange}
                        name={inputName}
                        value={value}
                        variant="outlined"
                        size="small"
                        type={type || "password"}
                        placeholder={placeholder}
                        InputProps={{
                            endAdornment: linkText ? (
                                <InputAdornment position="end">
                                    <Link
                                        to={linkTo}
                                        style={{
                                            fontSize: isMobile ? "0.9rem" : "1.2rem",
                                            fontFamily: theme.fonts.DM,
                                            fontWeight: 700,
                                            textDecoration: "none",
                                            border: `3px solid ${theme.colors.black}`,
                                            padding: isMobile ? "0.2rem 0.9rem" : "0.4rem 0.9rem",
                                            borderRadius: "25px"
                                        }}
                                        className="hover-link"
                                    >
                                        {linkText}
                                    </Link>
                                </InputAdornment>
                            ) : null,
                        }}
                        InputLabelProps={{ sx: { color: theme.colors.textcolor } }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "0.8rem",
                                width: isMobile ? "100%" : { width },
                                padding: isMobile ? "2px 6px" : "10px 6px",
                                marginTop: "5px",
                                fontSize: fontsize || "19px",
                                fontFamily: fontfamily || theme.fonts.Poppins,
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.colors.borderColor,
                                borderWidth: "3px"
                            },
                            "& .MuiInputBase-input": {
                                color: placeholderColor || theme.colors.textcolor,
                            },
                        }}
                    />
                </FormControl>
            </Box>
        </>
    )
}
