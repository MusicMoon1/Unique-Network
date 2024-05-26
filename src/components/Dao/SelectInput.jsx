// SelectInput.js
import React from 'react';
import { theme } from '../../utils/Theme';

export default function SelectInput({ label, options, value, onChange, ...rest }) {
    const arrowIconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
`;
    return (
        <div style={{margin:"1rem 0"}}>
            <label style={{ fontSize: "14px",textTransform:"uppercase", fontFamily: theme.fonts.Light, color: theme.colors.textcolor, fontWeight: 700 }}>{label}</label>
            <select value={value} onChange={onChange} {...rest} style={{
                width: "100%",
                height: "57px",
                borderColor: theme.colors.textcolor,
                background: "transparent",
                borderWidth: "1.5px",
                borderRadius: "10px",
                padding: "10px",
                color: theme.colors.textcolor,
                fontSize: "14px",
                appearance: "none", // Hides the default arrow in some browsers
                paddingRight: "30px", // Ensures space for custom arrow
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='${encodeURIComponent(theme.colors.yellow)}' d='M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z'/%3E%3C/svg%3E")`, // Custom arrow
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "13px 13px" // Adjust the size of the arrow
            }}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}
