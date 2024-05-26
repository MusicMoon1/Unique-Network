import React, { useEffect, useState } from 'react'
import IconButton from '../Login/IconButton';
import filtericon from "../../assets/icons/filterIcon.svg"
import { theme } from '../../utils/Theme';
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import { categories } from '../../Constants';

function MarketSidebar({ handleClick }) {
    const isMobile = useMediaQuery("(max-width:600px)");
    // const [checked, setChecked] = useState([0]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeButton, setActiveButton] = useState(null);


    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    // const handleToggle = (value) => () => {
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }

    //     setChecked(newChecked);
    // };
    console.log('activeButton', activeButton)

    return (
        <div style={{
            width: isMobile ? "100%" : "16rem",
        }}>
            {isMobile &&
                <div style={{ marginBottom: "15px", }} onClick={isMobile ? toggleSidebar : ""}>
                    <img src={filtericon} alt="filericon" />
                    <span style={{ margin: "0 20px", fontSize: "14px", fontWeight: 700, color: theme.colors.textcolor, fontFamily: theme.fonts.Light, }}>{sidebarOpen ? "Hide Filters" : "Show Filters"}</span>
                </div>
            }
            <div style={{ overflow: "hidden", transition: "height 0.5s ease", height: sidebarOpen ? "850px" : 0 }}>
                {sidebarOpen &&
                    <div >
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "59px", height: "25px", marginRight: " 10px", padding: "0  5px 10px 0px", borderBottom: `2px solid ${theme.colors.white}`, fontSize: "14px", fontWeight: 700, color: theme.colors.white, fontFamily: theme.fonts.Light }}>Song</div>
                            <div style={{ width: "59px", height: "20px", fontSize: "14px", fontWeight: 700, color: theme.colors.textcolor, fontFamily: theme.fonts.Light, }}>Album</div>
                        </div>
                        <p style={{ fontSize: "14px", fontWeight: 400, color: theme.colors.white, fontFamily: theme.fonts.Light, }}>Categories</p>
                        <div style={{ width: "258px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                            {categories.map((button, index) => (
                                <IconButton
                                    key={index}
                                    width="fit-content"
                                    padding="0.3rem 0.5rem"
                                    fontSize="14px"
                                    boderColor={activeButton === button ? "black" : theme.colors.yellow}
                                    icon=" "
                                    borderRadius="10px"
                                    text={button}
                                    fontWeight={400}
                                    onClick={() => { handleClick(button); setActiveButton(button) }}
                                    color={activeButton === button ? theme.colors.yellow :theme.colors.textcolor}
                                />
                            ))}
                        </div>
                        {/* <p style={{ fontSize: "14px", fontWeight: 400, color: theme.colors.white, fontFamily: theme.fonts.Light, marginBottom: "0", paddingTop: "10px" }}>Status</p> */}
                        {/* <div>
                            <List sx={{ width: '100%', maxWidth: 360 }}>
                                {[0, 1, 2,].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;
                                    return (
                                        <ListItem key={value} sx={{ padding: 0, margin: 0 }}>
                                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense sx={{ padding: 0, margin: 0 }}>
                                                <ListItemIcon sx={{ minWidth: 'auto', height: "30px" }}> 
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(value) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                        sx={{ color: theme.colors.textcolor }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    id={labelId}
                                                    primary={actions[value]}
                                                    sx={{ color: theme.colors.textcolor, margin: 0, fontFamily: theme.fonts.Light, }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div> */}

                        {/* <p style={{ fontSize: "14px", fontWeight: 400, color: theme.colors.white, fontFamily: theme.fonts.Light, margin: "0", }}>Currency</p> */}
                        {/* <div>
                            <List sx={{ width: '100%', maxWidth: 360 }}>
                                {[0, 1, 2,].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;
                                    return (
                                        <ListItem key={value} sx={{ padding: 0, margin: 0 }}>
                                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense sx={{ padding: 0, margin: 0 }}>
                                                <ListItemIcon sx={{ minWidth: 'auto', height: "30px" }}>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(value) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                        sx={{ color: theme.colors.textcolor }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    id={labelId}
                                                    primary={actions2[value]}
                                                    sx={{ color: theme.colors.textcolor, margin: 0, fontFamily: theme.fonts.Light, }}
                                                />
                                            </ListItemButton>
                                        </ListItem>

                                    );
                                })}
                            </List>
                        </div> */}
                        {/* <p style={{ fontSize: "14px", fontWeight: 400, color: theme.colors.white, fontFamily: theme.fonts.Light, margin: "0", }}>Currency</p>
                        <div>
                            <List sx={{ width: '100%', maxWidth: 360 }}>
                                {[0, 1, 2].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;
                                    return (
                                        <ListItem key={value} sx={{ padding: 0, margin: 0 }}>
                                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense sx={{ padding: 0, margin: 0 }}>
                                                <ListItemIcon sx={{ minWidth: 'auto', height: "30px" }}>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(value) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                        sx={{ color: theme.colors.textcolor }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    id={labelId}
                                                    primary={actions3[value]}
                                                    sx={{ color: theme.colors.textcolor, margin: 0, fontFamily: theme.fonts.Light, }}
                                                />
                                            </ListItemButton>
                                        </ListItem>

                                    );
                                })}
                            </List>
                        </div> */}
                    </div>
                }
            </div>
        </div>
    )
}

export default MarketSidebar