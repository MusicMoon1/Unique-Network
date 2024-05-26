import React from 'react'
import { Box, FormControl, InputLabel, TextField, useMediaQuery } from '@mui/material'
import { theme } from '../../utils/Theme'

export default function InputField({ label, placeholder,inputborderWidth, inputborderColor, onChange, width, height, fontfamily, fontsize, type, boxWidth, value, inputName, labelfontSize }) {
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <>
            <Box sx={{ width: isMobile ? "100%" : boxWidth, margin: "1rem 0", }}>
                <InputLabel htmlFor="input-with-icon-adornment" sx={{ color: theme.colors.textcolor, fontSize: labelfontSize || "16.8px", fontFamily: theme.fonts.Light, fontWeight: 700 }}>
                    {label}
                </InputLabel>
                <FormControl variant="standard" sx={{ width: "100%" }}>
                    <TextField
                        onChange={onChange}
                        value={value}
                        name={inputName}
                        variant="outlined"
                        type={type || "text"}
                        size="small"
                        placeholder={placeholder}
                        InputLabelProps={{ sx: { color: theme.colors.textcolor } }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "0.8rem",
                                width: isMobile ? "100%" : { width },
                                padding: isMobile ? "2px 6px" : "10px 6px",
                                marginTop: "5px",
                                fontSize: fontsize || "19px",
                                fontFamily: fontfamily || theme.fonts.Poppins,
                                height: height
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: inputborderColor || theme.colors.borderColor,
                                borderWidth: inputborderWidth || "3px"
                            },
                            "& .MuiInputBase-input": {
                                color: theme.colors.textcolor,
                            },
                        }}
                    />
                </FormControl>
            </Box >
        </>
    )
}
